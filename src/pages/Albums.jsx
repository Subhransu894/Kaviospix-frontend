import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAlbum from "../components/CreateAlbum";

function Albums(){
    const [albums,setAlbums] = useState([])
    const navigate = useNavigate()
    const fetchAlbum=async()=>{
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:4000/albums",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            setAlbums(data.albums)
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(()=>{
        fetchAlbum()
    },[])
    return(
        <div className="conatiner py-4">
            {/* header */}
            <div className="mb-4">
                <h1 className="fw-semibold mb-1">My Albums</h1>
                <p className="text-secondary mb-0">Organize and manage your photos</p>
            </div>
             <CreateAlbum onAlbumCreated={fetchAlbum} />
            <div className="row g-4 mt-2">
                {albums.map((album) => (
                    <div className="col-12 col-md-6 col-lg-4" key={album._id}>
                        <div
                            className="card h-100 border-0 shadow-sm"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                navigate(`/albums/${album.albumId}`)
                            }
                        >
                            <div className="card-body d-flex align-items-center">

                                {/* Folder icon */}
                                <div
                                    className="bg-light rounded-3 d-flex align-items-center justify-content-center me-3"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        fontSize: "24px"
                                    }}
                                >
                                    <i className="bi bi-folder-fill"></i>
                                </div>

                                {/* Album information */}
                                <div className="overflow-hidden">
                                    <h5 className="card-title mb-1 text-truncate">
                                        {album.name}
                                    </h5>

                                    <p className="card-text text-secondary small text-truncate mb-0">
                                        {album.description || "No description"}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Albums;