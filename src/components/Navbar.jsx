import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate()

    const handleLogout = ()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }
    return(
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
            <div className="container">
                {/* brand */}
                <button 
                    className="navbar-brand btn btn-link text-decoration-none fw-bold p-0"
                    onClick={()=>navigate("/albums")}
                >
                    <i className="bi bi-images me-2"></i>
                    KVIOSPix
                </button>
                {/* right-side */}
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-primary me-2" onClick={()=>navigate("/albums")}>
                        <i className="bi bi-collection me-1"></i>
                        My Albums
                    </button>
                    <button
                        className="btn btn-outline-primary me-2" onClick={() => navigate("/photos")}>
                        <i className="bi bi-images me-1"></i>
                        All Photos
                    </button>
                    <button className="btn btn-outline-primary me-2" onClick={()=>navigate("/favorites")}>
                         <i className="bi bi-heart-fill me-1"></i>
                         Favorites
                    </button>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-1"></i>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;