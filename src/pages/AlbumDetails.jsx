import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import UploadImage from "../components/UploadImage";
import ToastMessage from "../components/ToastMessage";


function AlbumDetails(){
    const {albumId} = useParams()

    const [images,setImages]=useState([])

    const [editingImageId,setEditingImageId]=useState(null)

    const [editName,setEditName]=useState("")
    const [editTags,setEditTags]=useState("")
    const [editPerson,setEditPerson]=useState("")
    const [editFavorite,setEditFavorite]=useState(false)

    const [selectedImage,setSelectedImage] = useState(null)
    const [comments,setComments]=useState("")

    const [shareEmail,setShareEmail]=useState("")
    const [showShareModal,setShowShareModal]=useState(false)

    const [users,setUsers]=useState([])

    const [album,setAlbum]=useState(null)

    const [toast,setToast]=useState({show:false,message:"",type:"success"})

    //fetch images
    const fetchImages=async()=>{
        try {
            const token = localStorage.getItem("token")

            const response = await fetch(`https://kaviospix-backend-57jz.onrender.com/images?albumId=${albumId}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                const data = await response.json()
                if(!response.ok){
                    throw new Error(data.message)
                }
                setImages(data.images)
        } catch (error) {
            console.error(error.message)
        }
    }
    //fetch album
    const fetchAlbum=async()=>{
        try{
            const token = localStorage.getItem("token")

            const response = await fetch("https://kaviospix-backend-57jz.onrender.com/albums",{
                headers:{
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            const currentAlbum = data.albums.find((album)=>album.albumId === albumId)
            setAlbum(currentAlbum)
        }catch(error){
            console.error(error.message)
        }
    }
    //fetch num of users
    const fetchUsers=async()=>{
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("https://kaviospix-backend-57jz.onrender.com/users",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            console.log(data)
            setUsers(data.users)
        } catch (error) {
            console.error(error.message)
        }
    }

    // fetch user from backend using toke
    const getUserFromToken=()=>{
        const token = localStorage.getItem("token")
        if(!token){
            return null
        }
        try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            return payload
        } catch (error) {
            console.error("Invalid token")
            return null
        }
    }
    const user = getUserFromToken()
    const isOwner = album?.ownerId?.toString() === user?.mongoUserId
    useEffect(()=>{
        fetchImages()
        fetchAlbum()
    },[albumId])

    //delete an image
    const handleDelete=async(imageId)=>{
        const confirmDelete = window.confirm("Are you sure! you want to delete this image?")
        if(!confirmDelete){
            return
        }
        try {
            const token = localStorage.getItem("token")

            const response = await fetch(`https://kaviospix-backend-57jz.onrender.com/images/${imageId}`,{
                method:"DELETE",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }

            setToast({show:true,message:"Image deleted successfully",type:"success"})
            fetchImages()
        } catch (error) {
            console.error(error.message)
            setToast({show:true,message:error.message,type:"danger"})
        }
    }

    const handleUpdate = async(imageId)=>{
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://kaviospix-backend-57jz.onrender.com/images/${imageId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editName,
                    tags: editTags.split(",").map((tag)=>tag.trim()).filter((tag)=>tag !== ""),
                    person: editPerson,
                    isFavorite: editFavorite
                })
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            setToast({show:true,message:"Image updated successfully",type:"success"})
            setEditingImageId(null)
            fetchImages()
        } catch (error) {
            console.error(error.message)
            setToast({show:true,message:error.message,type:"danger"})
        }
    }

    //handle favorite
    const handleFavorite = async(image)=>{
        try {
            const token = localStorage.getItem("token")

            const response = await fetch(`https://kaviospix-backend-57jz.onrender.com/images/${image.imageId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    isFavorite: !image.isFavorite
                })
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            fetchImages()
        } catch (error) {
            console.error(error.message)
            setToast({show:true,message:error.message,type:"danger"})
        }
    }

    //handel comment
    const handleComment = async(image)=>{
        const newComment = comments[image.imageId] || ""
        if(newComment.trim() === ""){
            return
        }
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://kaviospix-backend-57jz.onrender.com/images/${image.imageId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    comments: [...(image.comments || []),newComment.trim()]
                })
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            setComments((prev)=>({...prev,[image.imageId]:""}))
            fetchImages()
        } catch (error) {
            console.error(error.message)
            setToast({show:true,message:error.message,type:"danger"})
        }
    }

    //handleShare
    const handleShare=async()=>{
        if(shareEmail.trim()===""){
            setToast({show:true,message:"Please enter an email",type:"warning"})
            return
        }
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`https://kaviospix-backend-57jz.onrender.com/albums/${albumId}/share`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: shareEmail.trim()
                })
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            setToast({show:true,message:"Album shared successfully",type:"success"})
            setShareEmail("")
            setShowShareModal(false)
        } catch (error) {
            console.error(error.message)
            setToast({show:true,message:error.message,type:"danger"})
        }
    }
    return (
        <>
            {toast.show && (
                <ToastMessage message={toast.message} type={toast.type} onClose={()=>setToast({show:false,message:"",type:"success"})} />
            )}
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="fw-semibold mb-1">
                            <i className="bi bi-images me-2"></i>
                            {album?.name || "Album details"}
                        </h1>
                        <p className="text-secondary mb-0">Manage your photos</p>
                    </div>
                    {isOwner && (
                        <button type="button" className="btn btn-outline-primary" onClick={()=>{
                                setShowShareModal(true)
                                fetchUsers()
                            }}>
                            <i className="bi bi-share me-2"></i>
                            Share Album
                        </button>
                    )}
                </div>
                <div className="row g-4">
                    {images.map((image)=>(
                    <div className="col-12 col-sm-6 col-md-12 col-lg-3" key={image._id}>
                            <ImageCard 
                                key={image._id}
                                image={image}
                                onDelete={handleDelete}
                                onEdit={(image) => {
                                    setEditingImageId(image.imageId);
                                    setEditName(image.name);
                                    setEditPerson(image.person || "");
                                    setEditTags(image.tags.join(", "));
                                    setEditFavorite(image.isFavorite);
                                }}
                                onImageClick={(image)=>setSelectedImage(image)}
                                onFavorite={handleFavorite}
                                comment={comments[image.imageId] || ""}
                                setComment={(value)=>setComments((prev)=>({...prev,[image.imageId]:value}))}
                                onAddComment={handleComment}
                                isOwner={isOwner}
                            />
                    </div>
                    ))}
                </div>

                {selectedImage && (
                    <div className="modal d-block" tabIndex="-1" style={{backgroundColor:"rgba(0,0,0,0.75)"}}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {selectedImage.name}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={()=>setSelectedImage(null)}>
                                    </button>
                                </div>
                                <div className="modal-body text-center">
                                    <img src={selectedImage.imageUrl} alt={selectedImage.name} className="image-fluid rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* edit image */}
                {editingImageId && (
                    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.75)" }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        <i className="bi bi-pencil-square me-2"></i>
                                        Edit image
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={()=>setEditingImageId(null)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Image Name</label>
                                        <input type="text" 
                                            className="form-control"
                                            value={editName} 
                                            onChange={(e)=>setEditName(e.target.value)}  
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"> Tags</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editTags}
                                            onChange={(e) => setEditTags(e.target.value)}
                                            placeholder="travel, vacation, beach"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Person</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editPerson}
                                            onChange={(e) => setEditPerson(e.target.value)}
                                            placeholder="Person name"
                                        />
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="editFavorite"
                                            checked={editFavorite}
                                            onChange={(e) =>
                                                setEditFavorite(e.target.checked)
                                            }
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="editFavorite"
                                        >
                                            Favorite
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={()=>setEditingImageId(null)}
                                    >
                                        cancel
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={()=>handleUpdate(editingImageId)}
                                    >
                                        <i className="bi bi-check-lg me-1"></i>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* shared email */}
                {showShareModal && (
                    <div className="modal d-block" tabIndex="-1" style={{backgroundColor:"rgba(0,0,0,0.75)"}}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        <i className="bi bi-share me-2"></i>
                                            Share Album
                                    </h5>
                                    <button type="button" className="btn-close" 
                                    onClick={()=>setShowShareModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <label className="form-label">
                                        User Email
                                    </label>
                                    <select className="form-select" value={shareEmail} onChange={(e)=>{setShareEmail(e.target.value)}}>
                                        <option value="">Select a user </option>
                                        {users.map((user)=>{
                                            <option value={user.email} key={user.userId}>
                                                {user.email}
                                            </option>
                                        })}
                                    </select>
                                    <small className="text-secondary">
                                        Select the user you want to share this album with.
                                    </small>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button"  
                                        className="btn btn-secondary"
                                        onClick={()=>{
                                            setShareEmail("");
                                            setShowShareModal(false)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleShare}
                                    >
                                        <i className="bi bi-share me-1"></i>
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isOwner && (
                    <div className="mt-4">
                        <UploadImage albumId={albumId} onUploadSuccess={fetchImages}/>
                    </div>
                )}
            </div>
        </>
    )
}
export default AlbumDetails;