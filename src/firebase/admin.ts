
import * as admin from 'firebase-admin';
import 'server-only';

let app: admin.app.App;

if (!admin.apps.length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccount) {
        try {
            const parsedServiceAccount = JSON.parse(serviceAccount);
            app = admin.initializeApp({
                credential: admin.credential.cert(parsedServiceAccount),
            });
        } catch (e) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT:", e);
            throw new Error("Firebase Admin initialization failed. Invalid service account format.");
        }
    } else {
        // In a deployed environment, this should be set.
        // During local dev, you might not have it. We won't throw here,
        // but functions will fail if they need admin access without it.
        console.warn("FIREBASE_SERVICE_ACCOUNT is not set. Admin features will fail.");
    }
} else {
  app = admin.app();
}

function getInitializedApp() {
    if (!app) {
        throw new Error("Firebase Admin SDK has not been initialized. Is FIREBASE_SERVICE_ACCOUNT set?");
    }
    return app;
}


export const getAdminAuth = () => {
    return getInitializedApp().auth();
}

export const getAdminFirestore = () => {
    return getInitializedApp().firestore();
}
