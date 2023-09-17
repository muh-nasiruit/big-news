import { firestore } from "../components/firebase.js";
import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  orderBy,
  // limit,
  Timestamp,
  where,
} from "firebase/firestore";

export async function createSummary({ uid, text, title }) {
//   const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const data = { uid: uid,
     text: text,
     title: title,
     date: Timestamp.now() };
  const docRef = await addDoc(collection(firestore, "summaries"), data);
  console.log('Data Saved!')
  return { id: docRef.id, ...data };
}

export async function delSummary(id) {
  await deleteDoc(doc(firestore, "summaries", id));
}

export async function fetchSummary({uid}) {
    // console.log(uid)
    const snapshot = await getDocs(
        query(collection(firestore, "summaries"), where("uid", "==", uid), orderBy("date", "desc"))
    );
    const check = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    // console.log(check);
    return check
}