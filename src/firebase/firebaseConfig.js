import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { privateConfig } from "../private/privateConfig";



const firebaseConfig = {
    projectId: privateConfig.firebaseProjectId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

