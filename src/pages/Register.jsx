import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmedPassword,setShowConfirmedPassword]=useState(false)

    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            alert("Password don't match")
            return
        }
        try {
            const response = await fetch("http://localhost:4000/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,password
                })
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            alert("Registration successful")
            navigate("/login")
        } catch (error) {
            console.error(error.message)
            alert(error.message)   
        }
    }
    return(
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">
                            {/* logo title */}
                            <div className="text-center mb-4">
                                <div className="mb-3">
                                    <i
                                        className="bi bi-images"
                                        style={{ fontSize: "45px" }}
                                    ></i>
                                </div>
                                <h2 className="fw-bold mb-2">
                                    create Account
                                </h2>
                                <p className="text-secondary mb-0">
                                    Create your KVIOSPix account
                                </p>
                            </div>
                            {/* form  */}
                            <form onSubmit={handleSubmit}>
                                {/* email */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-envelope"></i>
                                        </span>
                                        <input 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            value={email}
                                            onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* password */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock"></i>
                                        </span>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="Enter your password" 
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button" 
                                            className="btn btn-outline-secondary" 
                                            onClick={()=>setShowPassword(!showPassword)}
                                         >
                                            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                         </button>
                                    </div>
                                </div>
                                {/* confirm-password */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Confirm Password
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-shield-lock"></i>
                                        </span>
                                        <input 
                                            type={showConfirmedPassword?"text":"password"} 
                                            placeholder="Confirm your password" 
                                            value={confirmPassword}
                                            onChange={(e)=>setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={()=>setShowConfirmedPassword(!showConfirmedPassword)}
                                        >
                                            <i
                                                className={
                                                    showConfirmedPassword
                                                        ? "bi bi-eye-slash"
                                                        : "bi bi-eye"
                                                }
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                                {/* register buttom */}
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2"
                                >
                                    <i className="bi bi-person-plus me-2"></i>
                                    Register
                                </button>
                            </form>
                            {/* devider */}
                            <div className="d-flex aligm-items-center my-4">
                                <hr  className="flex-grow-1"/>
                                <span className="mx-3 text-secondary small">
                                    OR
                                </span>
                                <hr  className="flex-grow-1"/>
                            </div>
                            {/* Google register */}
                            <button
                                className="btn btn-outline-dark w-100 py-2"
                                type="button"
                                onClick={()=>{
                                    window.location.href = "http://localhost:4000/auth/google"
                                }}
                            >
                                <i className="bi bi-google me-2"></i>
                                Continue with Google
                            </button>
                            {/* Login */}
                            <div className="text-center mt-4">
                                <span className="text-secondary">
                                    Already have an account?{""}
                                </span>
                                <button className="btn btn-link p-0" type="button" onClick={()=>navigate("/login")}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;