import React, { createContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import * as firebase from "firebase";
import {
  loginRequest,
  createNewUser,
  logoutUser,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);

  onAuthStateChanged(getAuth(), (usr) => {
    if (usr) {
      setIsLoading(true);
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setError(null);
      })
      .catch((err) => {
        const newErr = err.toString().split("(auth/");
        const errSplit = newErr[1].split(").");
        setError("Error: " + errSplit);
      });
    setIsLoading(false);
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do nut match!");
      setIsLoading(false);
      return;
    }

    createNewUser(email, password)
      .then((u) => {
        setIsLoading(true);
        setUser(u);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        const newErr = err.toString().split("(auth/");
        const errSplit = newErr[1].split(").");
        setError("Error: " + errSplit);
      });
  };

  const onLogout = () => {
    setUser(null);
    logoutUser();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
