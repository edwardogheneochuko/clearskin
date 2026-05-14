import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import useAuthStore from "../store/authStore";

export const initAuthListener = () => {
  const setUser = useAuthStore.getState().setUser;
  const setLoading = useAuthStore.getState().setLoading;

  setLoading(true);

  onAuthStateChanged(auth, (user) => {
    setUser(user || null);
    setLoading(false);
  });
};