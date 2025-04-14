export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, answer } = req.body;

  if (!id || !answer) {
    return res.status(400).json({ error: 'Missing id or answer' });
  }

  const bitrixWebhook = 'https://rfinance.bitrix24.kz/rest/40605/uxo2jy910110rz8j/crm.lead.update.json';

  try {
    const response = await fetch(bitrixWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Number(id),
        fields: {
          UF_CRM_1744654954464: answer,
        }
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
}
