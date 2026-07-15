// TEMPORARY DEBUG ENDPOINT — remove after fixing
// Hit: GET /api/test-airtable to test Airtable connectivity
export default async function handler(req, res) {
  const apiToken = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Subscribers';

  // Check env vars are present
  if (!apiToken || !baseId) {
    return res.status(500).json({
      error: 'Missing env vars',
      hasToken: !!apiToken,
      hasBaseId: !!baseId,
      tableName,
    });
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
        error: 'Airtable rejected the request',
        status: response.status,
        airtableResponse: data,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Test row inserted into Airtable!',
      record: data,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Fetch failed',
      message: err.message,
    });
  }
}
