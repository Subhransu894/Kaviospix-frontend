import { useEffect, useState } from "react";

function Favorites(){
    const [images,setImages]=useState([])
    const [loading,setLoading]=useState(true)
    const [selectedImage,setSelectedImage]=useState(null)

    const fetchFavorites = async()=>{
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:4000/images/favorites",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message)
            }
            setImages(data.images)
        } catch (error) {
            console.log("Failes to fetch favorites",error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchFavorites()
    },[])
    if (loading) {
        return <p>Loading favorites...</p>;
    }
    return(
        <div className="container py-4">
            <div className="mb-4">
                <h1 className="fw-semibold mb-1">
                    <i className="bi bi-heart-fill me-2"></i>
                    Favorites
                </h1>

                <p className="text-secondary mb-0">
                    Your favorite photos
                </p>
            </div>
            {/* images */}
            {images.length === 0 ? (
                <div className="text-center py-5">
                    <i
                        className="bi bi-heart text-secondary"
                        style={{ fontSize: "50px" }}
                    ></i>
                    <h4 className="mt-3">
                        No Favorites yet
                    </h4>
                    <p className="text-secondary">
                        Mark some photos to favorite to see them here
                    </p>
                </div>
            ):(
                <div className="row g-4">
                    {images.map((image)=>(
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={image._id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img 
                                    src={image.imageUrl} 
                                    alt={image.name} 
                                    className="card-img-top" 
                                    style={{height:"220px",objectFit:"cover",cursor:"pointer"}}
                                    onClick={()=>setSelectedImage(image)} 
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-truncate mb-0">
                                        {image.name}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Modal of favorites */}
            {selectedImage && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.75)" }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedImage.name}</h5>
                                <button className="btn btn-close" onClick={()=>setSelectedImage(null)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img src={selectedImage.imageUrl} alt={selectedImage.name} className="img-fluid rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Favorites;