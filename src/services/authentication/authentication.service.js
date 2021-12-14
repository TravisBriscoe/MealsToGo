import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const loginRequest = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const createNewUser = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};
