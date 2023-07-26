import {
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
} from "firebase/firestore";

const createDocIfNotExists = async (
  document: DocumentReference<unknown, DocumentData>,
  data: any
) => {
  const d = await getDoc(document);
  if (!d.exists()) {
    await setDoc(document, data);
  }
};

export const firebaseUtils = { createDocIfNotExists };
