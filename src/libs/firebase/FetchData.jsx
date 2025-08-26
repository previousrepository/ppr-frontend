import { db } from "./config";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const subscribeToCollection = (collectionName, callback) => {
  const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });

  return unsubscribe;
};

export const subscribeToDocument = (collectionName, docId, callback) => {
  const docRef = doc(db, collectionName, docId);
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    callback(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
  });

  return unsubscribe;
};

export const subscribeWithFilters = (collectionName, filters = [], orderByField = null, callback) => {
  let q = collection(db, collectionName);

  if (filters.length > 0) {
    const filterClauses = filters.map(([field, op, val]) => where(field, op, val));
    q = query(q, ...filterClauses);
  }

  if (orderByField) {
    q = query(q, orderBy(orderByField));
  }

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });

  return unsubscribe;
};