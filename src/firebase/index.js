import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAPH9wP-GhTjUYCRrclnKj1-3bvyVIdQDU",
  authDomain: "images-storage-3a0d3.firebaseapp.com",
  projectId: "images-storage-3a0d3",
  storageBucket: "images-storage-3a0d3.appspot.com",
  messagingSenderId: "31637417993",
  appId: "1:31637417993:web:776c04cecae727f01bc8d8",
  measurementId: "G-8DH4SKC3W4"
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
