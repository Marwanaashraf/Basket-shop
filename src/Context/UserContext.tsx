import { createContext, ReactNode, useState } from "react";
import { IUserContext } from "../Interfaces/userContex";

export const User = createContext<IUserContext | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [auth, setAuth] = useState<string | null>(
    localStorage.getItem("tokenuser") || null
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId") || null
  );
  // const [userId, setUserId] = useState<string | null>(
  //   localStorage.getItem("userId")||null);

  const updateAuth = (token: string | null) => {
    setAuth(token);
    if (token) {
      localStorage.setItem("tokenuser", token);
    } else {
      localStorage.removeItem("tokenuser");
    }
  };

  const updateUserId = (userId: string | null) => {
    setUserId(userId);
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  };

  return (
    <User.Provider value={{ auth, updateAuth, userId, updateUserId }}>
      {children}
    </User.Provider>
  );
}
