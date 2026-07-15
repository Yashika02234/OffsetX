// TEMPORARY DEBUG ENDPOINT — remove after fixing
// Hit: GET /api/test-airtable to test Airtable connectivity
export default async function handler(req, res) {
  const apiToken = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Subscribers';

  if (!apiToken || !baseId) {
    return res.status(500).json({
      error: 'Missing env vars',
      hasToken: !!apiToken,
      hasBaseId: !!baseId,
    });
  }

  const diagnostics = {
    baseId_used: baseId,
    tableName_used: tableName,
    token_prefix: apiToken.slice(0, 12) + '...',
  };

  try {
    // List tables in the base — this confirms if Base ID + token are correct
    const metaRes = await fetch(
      `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
      { headers: { Authorization: `Bearer ${apiToken}` } }
    );
    const metaData = await metaRes.json();

    if (!metaRes.ok) {
      return res.status(500).json({
        error: 'Cannot access base — Base ID is wrong or token has no access to this base',
        diagnostics,
        airtableMetaResponse: metaData,
      });
    }

    // Return the exact table names found in the base
    const availableTables = metaData.tables?.map(t => t.name) || [];

    return res.status(200).json({
      success: true,
      diagnostics,
      availableTables,
      hint: 'Set AIRTABLE_TABLE_NAME in Vercel to exactly match one of the availableTables (case-sensitive)',
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Fetch failed',
      message: err.message,
      diagnostics,
    });
  }
}
