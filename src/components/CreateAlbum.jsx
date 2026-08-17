import { useState } from "react"

function CreateAlbum({onAlbumCreated}){
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [creating,setCreating]=useState(false)

    const handleCreate=async()=>{
        if(!name.trim()){
            alert("Album name is required")
            return
        }
        try {
            setCreating(true)
            const token = localStorage.getItem("token")
            const response=await fetch("https://kaviospix-backend-57jz.onrender.com/albums",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,description
                })
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            alert("Album created successfully")

            setName("")
            setDescription("")

            onAlbumCreated()
        } catch (error) {
            console.error(error.message)
            alert(error.message)
        }finally{
            setCreating(false)
        }
    }
    return(
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body ">
                <h5 className="card-title mb-3">
                    <i className="bi bi-folder-plus me-2"></i>
                    Create Album
                </h5>
                <div className="row g-3">
                    <div className="col-12 col-md-5">
                        <input type="text" className="form-control" placeholder="Album name" value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-5">
                        <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </div>
                   <div className="col-12 col-md-2">
                         <button onClick={handleCreate} disabled={creating} className="btn btn-primary w-100">
                            <i className="bi bi-plus-lg me-1"></i>
                            {creating ? "Creating...":"create album"}
                        </button>
                   </div>
                </div>
            </div>
        </div>
    )
}
export default CreateAlbum;