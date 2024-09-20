import { createContext, useContext, useState, useEffect } from "react";
import { childrenContext, AuthContextProps } from "../../../interfaces";

const defaultAuthContext: AuthContextProps = {
  isAuthenticated: false,
  Login: () => {},
  Logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export function AuthProvider({ children }: childrenContext) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Si el token existe, el usuario está autenticado
    }
  }, []);

  const Login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    
  };

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, Login, Logout }}>
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
