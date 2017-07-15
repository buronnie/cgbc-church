import Auth from 'j-toker';
import { apiUrl } from '../config/api';

export const setApiUrl = (apiUrl) => {
  Auth.configure({ apiUrl });
};

export const signup = (email, password, password_confirmation) => {
  return Auth.emailSignUp({ email, password, password_confirmation });
};

export const login = (email, password) => {
  return Auth.emailSignIn({ email, password });
};

export const logout = () => {
  return Auth.signOut();
};

export const validateToken = () => {
  setApiUrl(apiUrl);
  return Auth.validateToken();
};
