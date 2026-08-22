import { useState } from "react"

function EditAlbum({album,onAlbumUpdated,onCancel,onMessage}){
    const [name,setName]=useState(album.name)
    const [description,setDescription]=useState(album.description)
    const [updating,setUpdating]=useState(false)

    const handleUpdate = async()=>{
        if(!name.trim()){
            onMessage("Album is required","warning")
            return
        }
        try {
            setUpdating(true)
            const token = localStorage.getItem("token")
            const response = await fetch(`https://kaviospix-backend-57jz.onrender.com/albums/${album.albumId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({name,description})
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            onMessage("Album updated successfully","success")
            onAlbumUpdated()
        } catch (error) {
            console.error(error.message)
            onMessage(error.messagem,"danger")
        }finally{
            setUpdating(false)
        }
    }
    return (
        <>
            <div className="card shadow-sm border-0 mt-3">
                <div className="card-body">
                    <h3 className="card-title mb-4">Edit Album</h3>
                    <div className="mb-3">
                        <label className="form-label">Album name</label>
                        <input type="text" 
                            value={name} 
                            onChange={(e)=>setName(e.target.value)}
                            placeholder="Enter album name"
                            className="form-control"
                         />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            rows="3"
                            value={description} 
                            onChange={(e)=>setDescription(e.target.value)} 
                            placeholder="Enter album description"
                            className="form-control" 
                        />
                    </div>
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-primary"
                            onClick={handleUpdate} 
                            disabled={updating}
                        >
                                {updating ? "Updating..." : "Save"}
                            </button>
                        <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}export default EditAlbum;