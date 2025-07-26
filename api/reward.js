import admin from 'firebase-admin';

// 🔐 API Key للحماية
const API_KEY = process.env.ADMOB_SECRET || 'SECRET_REWARD_KEY';

// ✅ تهيئة Firebase Admin مرة واحدة فقط
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    user_id: userId,
    reward_item: rewardItem,
    reward_amount: rewardAmount,
    transaction_id: transactionId,
  } = req.body;

  if (!userId || !transactionId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await db.collection('rewards').add({
      userId,
      rewardItem,
      rewardAmount,
      transactionId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('🎁 Reward saved:', transactionId);

    return res.status(200).json({ message: '✅ Reward processed & saved' });
  } catch (error) {
    console.error('🔥 Firestore error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
// Trigger Vercel redeploy
