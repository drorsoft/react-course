
import { addDoc, collection, getDocs } from "firebase/firestore";

const useLocalStorage = process.env.MODE === 'production' ? true : false;


const fakeAddDoc = async (collectionRef, data) => {
    console.log("Fake addDoc called with data:", data);

    return { id: "fakeId" };
};

export const firebaseProvider = () => {
    return { addDoc, collection, getDocs }
}