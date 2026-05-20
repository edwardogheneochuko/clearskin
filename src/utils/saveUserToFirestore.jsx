import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const saveUserToFirestore = async (user) => {
  if (!user?.uid) return;

  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      uid:       user.uid,
      email:     user.email,
      name:      user.displayName || user.name || "",
      photoURL:  user.photoURL || "",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};