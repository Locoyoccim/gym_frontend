// import { Navigate } from "react-router-dom";
// import { useAuth } from "./memoria/AuthProvider";
import { ElementComponent } from "../../interfaces";

function ProtectedRoute({ Element }: ElementComponent) {
    // const { isAuthenticated } = useAuth();

    // return !isAuthenticated ? <Navigate to={'/'} /> : <Element />

    return <Element />; // DEV: auth bypass — revertir antes de producción
}

export default ProtectedRoute;
