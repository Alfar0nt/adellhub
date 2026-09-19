/**
 * Cloudflare Pages Functions: POST /api/waitlist
 * Menerima data pendaftaran waitlist dan mengirim notifikasi ke grup Telegram (Topic).
 */

const PRODUCTION_ORIGIN = 'https://adellhub.biz.id';

function isOriginAllowed(origin) {
  if (!origin) return false; // Block request tanpa Origin header
  if (origin === PRODUCTION_ORIGIN || origin.endsWith('.pages.dev')) return true;

  // Mendukung pengujian lokal (localhost, 127.0.0.1, LAN IP seperti Wrangler port 8788, Vite 3000/5173)
  try {
    const url = new URL(origin);
    const host = url.hostname;
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host.startsWith('192.168.') ||
      host.startsWith('10.') ||
      host.startsWith('172.')
    ) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = isOriginAllowed(origin);

  return {
    'Access-Control-Allow-Origin': allowed ? (origin || 'https://adellhub.biz.id') : 'https://adellhub.biz.id',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function stripHtmlTags(str) {
  return String(str || '').replace(/<[^>]*>/g, '').trim();
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// async function checkRateLimit(clientIP) {
//   const CACHE_KEY = `rate_limit:${clientIP}`;
//   const CACHE_TTL = 60;
//   const MAX_REQUESTS = 5;
//
//   const cache = caches.default;
//   const cached = await cache.match(CACHE_KEY);
//
//   if (cached) {
//     const { count, resetAt } = await cached.json();
//     if (Date.now() > resetAt) {
//       await cache.put(CACHE_KEY, new Response(JSON.stringify({ count: 1, resetAt: Date.now() + CACHE_TTL * 1000 }), {
//         headers: { 'Cache-Control': `max-age=${CACHE_TTL}` }
//       }));
//       return true;
//     }
//     if (count >= MAX_REQUESTS) {
//       return false;
//     }
//     await cache.put(CACHE_KEY, new Response(JSON.stringify({ count: count + 1, resetAt }), {
//       headers: { 'Cache-Control': `max-age=${CACHE_TTL}` }
//     }));
//     return true;
//   }
//
//   await cache.put(CACHE_KEY, new Response(JSON.stringify({ count: 1, resetAt: Date.now() + CACHE_TTL * 1000 }), {
//     headers: { 'Cache-Control': `max-age=${CACHE_TTL}` }
//   }));
//   return true;
// }

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
  const origin = context.request.headers.get('Origin') || '';
  if (origin && !isOriginAllowed(origin)) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(context.request),
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('Origin') || '';

  // 0. Rate limiting (bypass untuk localhost/debugging)
  // COMMENTED: Debugging production error - rate limiting may cause "Worker threw exception"
  // let clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For')?.split(',')[0].trim() || '127.0.0.1';
  // const isLocalhost = clientIP === '127.0.0.1' || clientIP === '::1';
  // if (!isLocalhost) {
  //   const allowed = await checkRateLimit(clientIP);
  //   if (!allowed) {
  //     return new Response(
  //       JSON.stringify({ success: false, error: 'Terlalu banyak permintaan. Silakan coba lagi dalam 60 detik.' }),
  //       {
  //         status: 429,
  //         headers: { 'Content-Type': 'application/json' },
  //       }
  //     );
  //   }
  // }

  // 1. CORS Validation: Block request dari origin yang tidak diizinkan
  if (origin && !isOriginAllowed(origin)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Forbidden: Origin tidak diizinkan' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const corsHeaders = getCorsHeaders(request);

  // 2. Validasi Content-Type
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

  // 3. Parse payload dengan perlindungan batas ukuran (max 10KB)
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

  // 4. Anti-Spam: Honeypot check (jika field tersembunyi terisi, tolak secara silent)
  if (website && String(website).trim().length > 0) {
    return new Response(
      JSON.stringify({ success: true, message: 'Pendaftaran berhasil diterima' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  // 5. Anti-Spam: Time-to-submit check (bot biasanya submit < 2 detik)
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

  // 6. Input Sanitization & Validation
  // Bersihkan tag HTML dari input string
  const cleanName = stripHtmlTags(name);
  const cleanEmail = stripHtmlTags(email);
  const cleanService = stripHtmlTags(service) || 'Adellhub';

  if (!cleanName) {
    return new Response(
      JSON.stringify({ success: false, error: 'Nama lengkap wajib diisi' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  if (cleanName.length > 100) {
    return new Response(
      JSON.stringify({ success: false, error: 'Nama maksimal 100 karakter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  // Cegah newline / CRLF injection pada email
  if (/[\r\n]/.test(cleanEmail)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Format email tidak valid' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Format email tidak valid' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  if (cleanEmail.length > 254) {
    return new Response(
      JSON.stringify({ success: false, error: 'Email maksimal 254 karakter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  if (cleanService.length > 100) {
    return new Response(
      JSON.stringify({ success: false, error: 'Nama layanan maksimal 100 karakter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  // 7. Konfigurasi kredensial Telegram dari environment
  let token, chatId, threadIdRaw;
  try {
    token = env.TELEGRAM_BOT_TOKEN;
    chatId = env.TELEGRAM_CHAT_ID;
    threadIdRaw = env.TELEGRAM_THREAD_ID;
  } catch (err) {
    console.error('Telegram env binding error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Layanan saat ini tidak tersedia. Silakan coba lagi nanti.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  if (!token || !chatId) {
    console.error('Telegram config missing - token:', !!token, 'chatId:', !!chatId);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Layanan saat ini tidak tersedia. Silakan coba lagi nanti.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  const threadId = threadIdRaw ? parseInt(threadIdRaw, 10) : undefined;
  const clientDevice = stripHtmlTags(userAgent || request.headers.get('User-Agent') || 'Unknown device').slice(0, 200);
  const timestampWIB = formatWIB(new Date());

  // 8. Format pesan Telegram dengan HTML escaping menyeluruh
  const messageLines = [
    '🔔 <b>Pendaftaran Waitlist Baru!</b>',
    '',
    `👤 <b>Nama:</b> ${escapeHtml(cleanName)}`,
    `📧 <b>Email:</b> ${escapeHtml(cleanEmail)}`,
    `🏷️ <b>Layanan:</b> ${escapeHtml(cleanService)}`,
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

  // 9. Kirim notifikasi ke Telegram Bot API
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
