import { Dispatch, SetStateAction } from "react";

export interface IUserContext {
  auth: string | null;
  updateAuth: (token: string | null) => void;
  userId: string | null, 
  updateUserId: (token: string | null) => void,
}