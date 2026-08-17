import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Login(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const [showPassword,setShowPassword]=useState(false)
    const navigate = useNavigate()

    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:4000/auth/login",{
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
            //save JWT
            localStorage.setItem("token",data.token)
            alert("Login Successful")
            navigate("/albums")
        } catch (error) {
            console.error(error.message)
            alert(error.message)
        }
    }
    return(
       <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">
                            {/* logo / title */}
                            <div className="text-center mb-4">
                                <div className="mb-3">
                                    <i
                                        className="bi bi-images"
                                        style={{ fontSize: "45px" }}
                                    ></i>
                                </div>
                                <h2 className="fw-bold mb-2">
                                    Welcome Back
                                </h2>
                                <p className="text-secondary mb-0">
                                    Login to your KVIOSPix account
                                </p>
                            </div>
                            {/* login form */}
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
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={()=>setShowPassword(!showPassword)}
                                        >
                                            <i
                                                className={
                                                    showPassword
                                                        ? "bi bi-eye-slash"
                                                        : "bi bi-eye"
                                                }
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                                {/* Login button */}
                                <button type="submit" className="btn btn-primary w-100 py-2">
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login
                                </button>
                            </form>
                            {/* devider */}
                            <div className="d-flex align-items-center my-4">
                                <hr className="flex-grow-1"/>
                                <span className="mx-3 text-secondary small">OR</span>
                                <hr className="flex-grow-1"/>
                            </div>
                            {/* Google Login */}
                            <button
                                type="button"
                                className="btn btn-outline-dark w-100 py-2"
                                onClick={()=>{
                                    window.location.href="http://localhost:4000/auth/google";
                                }}
                            >
                                <i className="bi bi-google me-2"></i>
                                Continue With Google
                            </button>
                            {/* Register */}
                            <div className="text-center mt-4">
                                <span className="text-secondary">
                                    Don't have an account?{" "}
                                </span>
                                <button 
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={()=>navigate("/register")}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>

    )
}
export default Login;