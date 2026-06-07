import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const createOrUpdateUser = async (user) => {
  if (!user?.uid) return null;

  const userRef = doc(db, "users", user.uid);
  const payload = {
    uid:       user.uid,
    name:      user.displayName || user.name || "",
    email:     user.email || "",
    photoURL:  user.photoURL || "",
    lastLogin: serverTimestamp(),
  };

  try {
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      await updateDoc(userRef, payload);
      return payload;
    }

    const newDoc = {
      ...payload,
      createdAt: serverTimestamp(),
    };

    await setDoc(userRef, newDoc, { merge: true });
    return newDoc;
  } catch (error) {
    console.error("createOrUpdateUser failed", error);
    throw error;
  }
};
