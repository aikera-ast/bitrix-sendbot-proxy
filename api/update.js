export default async function handler(req, res) {
  const { id, answer } = req.query;

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
        },
      }),
    });

    const data = await response.json();
    return res.status(200).json({ result: data.result, time: data.time });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
