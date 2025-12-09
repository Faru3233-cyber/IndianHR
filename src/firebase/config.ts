
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDaLwGV3XiwJjmH28fiCxGMGTRy1IK4n_w",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-5897640146-72335.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-5897640146-72335",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "699666735270",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:699666735270:web:4fb990462a8abfbc0c1467",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// This check is important for Vercel deployments
if (!firebaseConfig.projectId) {
    throw new Error("Firebase project ID is not set in environment variables.");
}

export { firebaseConfig };
