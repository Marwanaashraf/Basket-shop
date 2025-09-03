export interface IUserContext {
  auth: string | null;
  updateAuth: (token: string | null) => void;
}