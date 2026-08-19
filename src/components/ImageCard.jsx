function ImageCard({image,onDelete,onEdit,onImageClick,onFavorite,comment,setComment,onAddComment,isOwner}){
        return(
            <div className="card h-100 shadow-sm border-0">
                {/* image */}
                <img 
                    src={image.imageUrl} 
                    alt={image.name} 
                    onClick={()=>onImageClick(image)} 
                    className="card-img-top"
                    style={{height:"220px",objectFit:"cover",cursor:"pointer"}}
                />
                <div className="card-body">
                    <h5 className="card-title text-truncate mb-3">
                        {image.name}
                    </h5>
                    {/* action buttons */}
                    {isOwner && (
                        <div className="d-flex gap-2 mb-3">
                            <button
                            onClick={() => onDelete(image.imageId)}
                            className="btn btn-sm btn-outline-danger"
                            > 
                                <i className="bi bi-trash me-1"></i>
                                Delete 
                            </button>
                            <button
                            onClick={() => onEdit(image)}
                            className="btn btn-sm btn-outline-primary"
                            >
                                <i className="bi bi-pencil me-1"></i>
                                Edit
                            </button>
                            <button 
                                onClick={()=>onFavorite(image)}
                                className="btn btn-sm btn-outline-warning"
                            >
                                <i className={image.isFavorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                            </button>
                        </div>  
                    )}
                    {/* edit section */}
                </div>
                {/* comment section */}
                <div className="border-top pt-3 px-3 pb-3">
                    <h6 className="mb-3"> 
                        <i className="bi bi-chat-left-text me-2"></i>
                         comments
                    </h6>
                    {image.comments && image.comments.length > 0 ? (
                        <div className="mb-3">
                            {image.comments.map((comment,index)=>(
                                <p className="small text-secondary mb-2" key={index}>
                                    <i className="bi bi-chat me-2"></i>
                                    {comment}
                                </p>
                            ))}
                        </div>
                    ):(
                        <p className="small text-secondary mb-3">
                            No Comments yet
                        </p>
                    )}
                    {isOwner && (
                        <div className="input-group input-group-sm mt-2">
                            <input 
                                type="text" 
                                value={comment} 
                                className="form-control"
                                onChange={(e)=>setComment(e.target.value)} 
                                placeholder="Add a comment"
                            />
                            <button 
                                onClick={()=>onAddComment(image)}
                                className="btn btn-primary"
                            >
                                Add Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>

        )
}
export default ImageCard;