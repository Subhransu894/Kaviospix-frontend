import { useState } from "react"
import ToastMessage from "./ToastMessage"
function CreateAlbum({onAlbumCreated}){
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [creating,setCreating]=useState(false)
    const [toast,setToast]=useState({
        show: false,message:"",type:"success"
    })

    const handleCreate=async()=>{
        if(!name.trim()){
            setToast({show:true,message:"Album is required",type:"warning"})
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
            setToast({show:true,message:"Album created successfully",type:"success"})

            setName("")
            setDescription("")

            onAlbumCreated()
        } catch (error) {
            console.error(error.message)
            setToast({show:true,message: error.message,type:"warning"})
        }finally{
            setCreating(false)
        }
    }
    return(
        <>
            {toast.show && (
                <ToastMessage message={toast.message} type={toast.type} 
                onClose={()=>setToast({show:false,message:"",type:"success"})}/>
            )}
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
        </>
    )
}
export default CreateAlbum;