// Append a record to Airtable using the REST API
async function appendToAirtable(email) {
  const apiToken = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Subscribers';

  if (!apiToken || !baseId) {
    console.warn('Airtable env vars not configured — skipping Airtable append.');
    return;
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Email: email.trim(),
          'Subscribed At': new Date().toUTCString(),
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Airtable error: ${JSON.stringify(err)}`);
  }
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Basic validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfiguration: missing API key' });
  }

  try {
    // 1. Send notification email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OffsetX <onboarding@resend.dev>',
        to: ['yashika@offsetx.ai'],
        subject: '🌱 New OffsetX Subscriber',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #e0e0e0; border-radius: 12px;">
            <h2 style="color: #a8d5a2; margin-bottom: 8px;">New subscriber on OffsetX</h2>
            <p style="color: #888; font-size: 14px; margin-bottom: 24px;">Someone just signed up for early access.</p>
            <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px 20px;">
              <p style="margin: 0; font-size: 16px; color: #fff;">📧 <strong>${email.trim()}</strong></p>
            </div>
            <p style="color: #555; font-size: 12px; margin-top: 24px;">Submitted via offsetx.ai · ${new Date().toUTCString()}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // 2. Append email to Airtable (non-blocking — failure won't affect user response)
    try {
      await appendToAirtable(email);
    } catch (sheetErr) {
      console.error('Airtable append error:', sheetErr);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

