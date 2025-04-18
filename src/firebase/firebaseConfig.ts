// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { activate, fetchConfig, getRemoteConfig } from "firebase/remote-config";
import { fetchAndActivate, getValue } from "firebase/remote-config";

// Ensure all required environment variables are defined
const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
  "VITE_FIREBASE_MEASUREMENT_ID",
];

const missingEnvVars = requiredEnvVars.filter((key) => !import.meta.env[key]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}
    , please check your .env file or environment configuration.`
  );
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const remoteConfig = getRemoteConfig(app);
const analytics = getAnalytics(app);

export { analytics, auth, db, provider, remoteConfig };

// Initialize Remote Config settings
// This is for later features that might require remote configuration.
remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour

const isFetched = await fetchAndActivate(remoteConfig);

if (isFetched) {
  console.log("Remote config activated and fetched successfully.");
  const currency = getValue(remoteConfig, "currency");
  const theme = getValue(remoteConfig, "theme");
  console.log("Currency: ", currency);
  console.log("Theme: ", theme);
  // Use the fetched values in your application
}
else {
  console.log("Remote config was already up to date.");
}

remoteConfig.defaultConfig = {
  currency: "USD",
  theme: "synthwave",
}

fetchConfig(remoteConfig);
activate(remoteConfig);

// firebase login
// firebase init
// firebase deploy