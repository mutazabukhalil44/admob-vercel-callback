// pages/api/test-firebase.js

import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req, res) {
  try {
    const time = new Date().toISOString();
    await admin.firestore().collection("test").add({ timestamp: time });

    res.status(200).json({ message: "✅ اتصال Firebase ناجح", timestamp: time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
