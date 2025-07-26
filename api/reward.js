export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  const {
    user_id: userId,
    reward_item: rewardItem,
    reward_amount: rewardAmount,
    transaction_id: transactionId,
  } = req.body;

  if (!userId || !transactionId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  console.log("🎉 Reward received:", {
    userId,
    rewardItem,
    rewardAmount,
    transactionId,
  });

  res.status(200).json({ message: "✅ Reward processed" });
}
