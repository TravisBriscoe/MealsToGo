import React, { createContext, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { loginRequest, createNewUser } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState([]);

  onAuthStateChanged(getAuth(), (usr) => {
    setIsLoading(true);
    if (usr) {
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
        console.log(isLoading);
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

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);

    if (password !== repeatedPassword) {
      setError("Error: Passwords do nut match!");
      setIsLoading(false);
      return;
    }

    createNewUser(email, password)
      .then((u) => {
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
    signOut(getAuth());
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
