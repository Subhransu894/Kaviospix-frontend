import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAlbum from "../components/CreateAlbum";
import ToastMessage from "../components/ToastMessage";

function Albums(){
    const [albums,setAlbums] = useState([])
    const [toast,setToast]=useState({show:false,message:"",type:"success"})

    const navigate = useNavigate()
    const fetchAlbum=async()=>{
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("https://kaviospix-backend-57jz.onrender.com/albums",{
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

    const handleDeleteAlbum =async(albumId)=>{
        const confirmDelete = window.confirm("Are you sure you want to delete this album?")
        if(!confirmDelete){
            return
        }
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://kaviospix-backend-57jz.onrender.com/albums/${albumId}`,{
                method:'DELETE',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            setToast({show:true,message:"Album deleted successfully",type:"success"})
            fetchAlbum()
        } catch (error) {
            console.error(error.message)
            setToast({show:true,message:error.message,type:"danger"})
        }
    }
    return(
        <>
            {toast.show && (
                <ToastMessage message={toast.message} type={toast.type} onClose={()=>setToast({show:false,message:"",type:"success"})} />
            )}
            <div className="container py-4">
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
                                    <div className="overflow-hidden flex-grow-1">
                                        <h5 className="card-title mb-1 text-truncate">
                                            {album.name}
                                        </h5>

                                        <p className="card-text text-secondary small text-truncate mb-0">
                                            {album.description || "No description"}
                                        </p>
                                    </div>
                                    <button type="button" className="btn btn-sm btn-outline-danger ms-2"
                                        onClick={(e)=>{
                                            e.stopPropagation()
                                            handleDeleteAlbum(album.albumId)
                                        }}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Albums;