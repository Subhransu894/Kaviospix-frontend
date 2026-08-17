import { useSearchParams, useNavigate } from "react-router-dom";
import {useEffect } from "react"

function AuthSuccess(){
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const token = searchParams.get("token")

        if(token){
            localStorage.setItem("token",token)
            navigate("/albums")
        }else{
            navigate("/")
        }
    },[searchParams,navigate])
    return (
        <h2>Logging you in...</h2>
    )
}
export default AuthSuccess;