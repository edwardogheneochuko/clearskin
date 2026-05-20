import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import useAuthStore from "@/store/authStore";
import { saveUserToFirestore } from "./saveUserToFirestore";

export const initAuthListener = () => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    const setUser    = useAuthStore.getState().setUser;
    const setLoading = useAuthStore.getState().setLoading;

    if (firebaseUser) {
      const userData = {
        uid:      firebaseUser.uid,
        email:    firebaseUser.email,
        name:     firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };

      setUser(userData);

      await saveUserToFirestore(firebaseUser);
    } else {
      setUser(null);
    }

    setLoading(false);
  });

  window.addEventListener("beforeunload", () => {
    signOut(auth);
  });
};