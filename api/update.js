export default async function handler(req, res) {
  try {
    const { id, answer } = req.body;

    if (!id || !answer) {
      return res.status(400).json({ error: "Missing id or answer" });
    }

    const normalizedAnswer = answer.trim().toLowerCase();
    let statusId = "";

    // ✅ Условие: если ответ "нет" — переводим в "Wazzup"
    if (["нет", "no", "н", "n"].includes(normalizedAnswer)) {
      statusId = "UC_OJYG5L"; // Wazzup
    } else {
      return res.status(200).json({ message: "Answer is not 'нет'. No status change." });
    }

    const response = await fetch("https://rfinance.bitrix24.kz/rest/40605/uxo2jy910110rz8j/crm.lead.update.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(id),
        fields: {
          STATUS_ID: statusId
        }
      }),
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
