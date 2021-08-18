import admin from 'firebase-admin';

const config = {
  "type": "service_account",
  "project_id": process.env.NEXT_PUBLIC_PROJECT_ID,
  "private_key_id": process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
  "private_key": process.env.NEXT_PUBLIC_PRIVATE_KEY,
  "client_email": process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  "client_id": process.env.NEXT_PUBLIC_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.NEXT_PUBLIC_CLIENT_CERT_URL,
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(config),
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.database();
