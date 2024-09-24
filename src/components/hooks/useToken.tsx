import { TokenName } from "../../servicios/config"

const useToken = () =>{
    const getToken = () => localStorage.getItem(TokenName)
    const setToken = (token: string) => localStorage.setItem(TokenName, token)  
    const removeToken = () => localStorage.removeItem(TokenName)
    return {getToken, setToken, removeToken}
} 
export default useToken;  // exportar el hook para que pueda ser utilizado en otros archivos