export default async function handler(req, res) {
  const { id, ...fields } = req.query;

  const bitrixWebhook = 'https://rfinance.bitrix24.kz/rest/40605/uxo2jy910110rz8j/crm.lead.update.json';

  try {
    const response = await fetch(`${bitrixWebhook}?id=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          UF_CRM_1744654954464: Object.values(fields)[0] // берёт первое значение, пришедшее в URL
        }
      }),
    });

    const result = await response.json();
    return res.status(200).json({ result, time: Date.now() });
  } catch (error) {
    return res.status(500).json({ error: 'Bitrix update failed', details: error });
  }
}
