import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const loginRequest = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const createNewUser = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  const auth = getAuth();
  return signOut(auth);
};
