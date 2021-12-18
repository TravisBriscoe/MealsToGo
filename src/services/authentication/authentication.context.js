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
      setUser(usr);
      if (isLoading) {
        setIsLoading(false);
      }
    } else {
      if (isLoading) {
        setIsLoading(false);
      }
    }
  });

  const onLogin = (email, password) => {
    if (!isLoading) {
      setIsLoading(true);
    }
    setTimeout(() => {
      loginRequest(email, password)
        .then((u) => {
          setUser(u);
          setError(null);
          if (isLoading) {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (!isLoading) {
            setIsLoading(true);
          }
          const newErr = err.toString().split("(auth/");
          const errSplit = newErr[1].split(").");
          setError("Error: " + errSplit);
          if (isLoading) {
            setIsLoading(false);
          }
        });
    }, 1000);
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Error: Passwords do nut match!");
      setIsLoading(false);
      return;
    }

    createNewUser(email, password)
      .then((u) => {
        if (!isLoading) {
          setIsLoading(true);
        }
        setUser(u);
        setError(null);
        if (isLoading) {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isLoading) {
          setIsLoading(true);
        }
        const newErr = err.toString().split("(auth/");
        const errSplit = newErr[1].split(").");
        setError("Error: " + errSplit);
        if (isLoading) {
          setIsLoading(false);
        }
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
