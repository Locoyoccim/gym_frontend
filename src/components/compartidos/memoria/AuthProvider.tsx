import { createContext, ReactNode, useContext, useState } from "react"; 


interface childrenProps {
    children :  ReactNode
} 

interface AuthContextProps{
    isAuthenticated: boolean,
    Login: (token: string) => void;
    Logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null >(null)


export function AuthProvider({ children }: childrenProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    const Login = (token : string) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
    }

    const Logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    return ( <>
        <AuthContext.Provider value={{isAuthenticated, Login, Logout}}>
            {children}
        </AuthContext.Provider></>
     );
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  };