import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const REDIS_URL = 'https://musical-zebra-80134.upstash.io';
const REDIS_TOKEN = Deno.env.get('REDIS_TOKEN');

Deno.serve(async (req) => {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

    if (!REDIS_TOKEN) {
      return Response.json({ error: 'Redis token not configured' }, { status: 500 });
    }

    const entry = JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), ts: Date.now() });
    const url = `${REDIS_URL}/lpush/waitlist/${encodeURIComponent(entry)}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '(unreadable)');
      return Response.json({ error: `Redis write failed (${res.status}): ${body}` }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});