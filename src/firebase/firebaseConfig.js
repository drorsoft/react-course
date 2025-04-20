import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    projectId: "iceceream-legend",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

