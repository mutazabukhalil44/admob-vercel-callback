export default function handler(req, res) {
  const {
    user_id: userId,
    reward_item: rewardItem,
    reward_amount: rewardAmount,
    transaction_id: transactionId,
  } = req.query;

  if (!userId || !transactionId) {
    return res.status(400).json({error: "Missing required fields"});
  }

  console.log("🎉 Reward received:", {
    userId,
    rewardItem,
    rewardAmount,
    transactionId,
  });

  res.status(200).json({message: "✅ Reward processed"});
}
