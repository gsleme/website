import type React from "react"
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

function AuthRoute({children, publico}:{children:React.ReactElement; publico:boolean}) {
    const { usuario } = useAuth();

    if (!publico && !usuario) {
        return <Navigate to='/entrar' replace/>
    }
    
    if (publico && usuario) {
        return <Navigate to='/dashboard' replace/>
    }

    return children
}

export default AuthRoute