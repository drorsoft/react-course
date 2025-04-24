
import { addDoc, collection, getDocs } from "firebase/firestore";

const useLocalStorage = import.meta.env.MODE === 'production' ? true : false;


const randomFirebaseId = () => {
    return Math.random().toString(36).substring(2, 15)
}
const localstorageAddDoc = async (collection, data) => {
    const allRecords = JSON.parse(localStorage.getItem(collection)) || []
    allRecords.push(data)
    localStorage.setItem(collection, JSON.stringify(allRecords))
    return { id: randomFirebaseId(), ...data }
}
const localstorageGetDocs = async (collection) => {
    const allRecords = JSON.parse(localStorage.getItem(collection)) || []
    return { docs: allRecords.map((record) => ({ id: randomFirebaseId(), data: () => record })) }
}

export const firebaseProvider = () => {
    if (useLocalStorage) {
        return { addDoc: localstorageAddDoc, collection: () => { }, getDocs: localstorageGetDocs }
    }
    return { addDoc, collection, getDocs }
}