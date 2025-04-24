
import { addDoc, collection, getDocs } from "firebase/firestore";

const useLocalStorage = process.env.MODE === 'production' ? true : false;


export const firebaseProvider = () => {
    return { addDoc, collection, getDocs }
}