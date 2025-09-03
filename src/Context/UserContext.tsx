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

  const updateAuth = (token: string | null) => {
    setAuth(token);
    if (token) {
      localStorage.setItem("tokenuser", token);
    } else {
      localStorage.removeItem("tokenuser");
    }
  };

  return (
    <User.Provider value={{ auth, updateAuth }}>
      {children}
    </User.Provider>
  );
}
