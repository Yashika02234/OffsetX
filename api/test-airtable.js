// TEMPORARY DEBUG ENDPOINT — remove after fixing
export default async function handler(req, res) {
  const apiToken = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Subscribers';

  if (!apiToken || !baseId) {
    return res.status(500).json({ error: 'Missing env vars', hasToken: !!apiToken, hasBaseId: !!baseId });
  }

  try {
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
            Email: 'debug-test@offsetx.ai',
            'Subscribed At': new Date().toUTCString(),
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: 'Airtable insert failed',
        status: response.status,
        airtableResponse: data,
        diagnostics: { baseId, tableName, token_prefix: apiToken.slice(0, 12) + '...' },
      });
    }

    return res.status(200).json({ success: true, record: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
