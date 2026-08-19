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
                {/* Hamburger button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* right-side */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center ms-lg-auto gap-2 mt-3 mt-lg-0">
                        <button className="btn btn-outline-primary" onClick={()=>navigate("/albums")}>
                            <i className="bi bi-collection me-1"></i>
                            My Albums
                        </button>
                        <button
                            className="btn btn-outline-primary " onClick={() => navigate("/photos")}>
                            <i className="bi bi-images me-1"></i>
                            All Photos
                        </button>
                        <button className="btn btn-outline-primary" onClick={()=>navigate("/favorites")}>
                            <i className="bi bi-heart-fill me-1"></i>
                            Favorites
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-1"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;