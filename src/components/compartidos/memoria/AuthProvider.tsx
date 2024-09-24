import { createContext, useContext, useState } from "react";
import { childrenContext, AuthContextProps } from "../../../interfaces";
import useToken from "../../hooks/useToken";

const defaultAuthContext: AuthContextProps = {
  isAuthenticated: false,
  Login: () => {},
  Logout: () => {},
  GetToken: () => "",
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export function AuthProvider({ children }: childrenContext) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { getToken, setToken, removeToken } = useToken();

  const GetToken = () => getToken() || "";

  const Login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const Logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <>
      <AuthContext.Provider
        value={{ isAuthenticated, Login, Logout, GetToken }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};