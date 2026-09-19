/**
 * Cloudflare Pages Functions: POST /api/waitlist
 * Menerima data pendaftaran waitlist dan mengirim notifikasi ke grup Telegram (Topic).
 */

const ALLOWED_ORIGINS = [
  'https://adellhub.biz.id',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.pages.dev');

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://adellhub.biz.id',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatWIB(date = new Date()) {
  try {
    return (
      new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
        .format(date)
        .replace(/\./g, ':') + ' WIB'
    );
  } catch {
    return date.toISOString();
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(context.request),
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = getCorsHeaders(request);

  // 1. Validasi Content-Type
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Content-Type harus application/json' }),
      {
        status: 415,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  // 2. Parse payload dengan perlindungan batas ukuran (max 10KB)
  let body;
  try {
    const rawText = await request.text();
    if (rawText.length > 10240) {
      return new Response(
        JSON.stringify({ success: false, error: 'Payload melebihi batas ukuran maksimal (10KB)' }),
        {
          status: 413,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }
    body = JSON.parse(rawText);
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Format JSON tidak valid' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  const {
    name,
    email,
    service = 'Adellhub',
    userAgent,
    website, // Honeypot field
    formOpenedAt, // Timestamp modal dibuka
  } = body || {};

  // 3. Anti-Spam: Honeypot check (jika field tersembunyi terisi, tolak secara silent)
  if (website && String(website).trim().length > 0) {
    return new Response(
      JSON.stringify({ success: true, message: 'Pendaftaran berhasil diterima' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  // 4. Anti-Spam: Time-to-submit check (bot biasanya submit < 2 detik)
  if (formOpenedAt && typeof formOpenedAt === 'number') {
    const timeTaken = Date.now() - formOpenedAt;
    if (timeTaken > 0 && timeTaken < 2000) {
      return new Response(
        JSON.stringify({ success: true, message: 'Pendaftaran berhasil diterima' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }
  }

  // 5. Validasi field wajib
  const trimmedName = String(name || '').trim();
  const trimmedEmail = String(email || '').trim();
  const trimmedService = String(service || 'Adellhub').trim();

  if (!trimmedName) {
    return new Response(
      JSON.stringify({ success: false, error: 'Nama lengkap wajib diisi' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  if (trimmedName.length > 100) {
    return new Response(
      JSON.stringify({ success: false, error: 'Nama maksimal 100 karakter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Format email tidak valid' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  if (trimmedEmail.length > 254) {
    return new Response(
      JSON.stringify({ success: false, error: 'Email maksimal 254 karakter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  // 6. Konfigurasi kredensial Telegram dari environment
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  const threadIdRaw = env.TELEGRAM_THREAD_ID;

  if (!token || !chatId) {
    console.error('Konfigurasi environment TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID belum diatur.');
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Konfigurasi server belum lengkap. Silakan hubungi kami via email.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  const threadId = threadIdRaw ? parseInt(threadIdRaw, 10) : undefined;
  const clientDevice = userAgent || request.headers.get('User-Agent') || 'Unknown device';
  const timestampWIB = formatWIB(new Date());

  // 7. Format pesan Telegram dengan HTML escaping
  const messageLines = [
    '🔔 <b>Pendaftaran Waitlist Baru!</b>',
    '',
    `👤 <b>Nama:</b> ${escapeHtml(trimmedName)}`,
    `📧 <b>Email:</b> ${escapeHtml(trimmedEmail)}`,
    `🏷️ <b>Layanan:</b> ${escapeHtml(trimmedService)}`,
    `🕐 <b>Waktu:</b> ${timestampWIB}`,
    `📱 <b>Device:</b> ${escapeHtml(clientDevice)}`,
    '',
    '#waitlist #adellhub',
  ];

  const telegramPayload = {
    chat_id: chatId,
    text: messageLines.join('\n'),
    parse_mode: 'HTML',
  };

  // Kirim ke topic spesifik jika thread ID valid
  if (typeof threadId === 'number' && !isNaN(threadId)) {
    telegramPayload.message_thread_id = threadId;
  }

  // 8. Kirim notifikasi ke Telegram Bot API
  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telegramPayload),
    });

    if (!telegramRes.ok) {
      const errText = await telegramRes.text();
      console.error('Telegram Bot API response error:', telegramRes.status, errText);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Gagal mengirim notifikasi ke Telegram. Silakan hubungi kami via email.',
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Pendaftaran waitlist berhasil dikirim!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (err) {
    console.error('Network error calling Telegram API:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Terjadi masalah jaringan saat menghubungi server notifikasi.',
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
}
