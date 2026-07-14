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

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Subscribe handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
