export default async function handler(req, res) {
  const { id, answer } = req.query;

  if (!id || !answer) {
    return res.status(400).json({ error: 'Missing id or answer' });
  }

  const statusToSet = answer.trim().toLowerCase() === 'нет' ? 'UC_OJYG5L' : null;

  if (!statusToSet) {
    return res.status(200).json({ result: 'Nothing to update' });
  }

  const bitrixWebhook = 'https://rfinance.bitrix24.kz/rest/40605/uxo2jy910110rz8j/crm.lead.update.json';

  try {
    const response = await fetch(`${bitrixWebhook}?id=${id}&fields[STATUS_ID]=${statusToSet}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Update failed', details: error.message });
  }
}
