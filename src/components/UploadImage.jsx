import { useRef, useState } from "react";

function UploadImage({ albumId, onUploadSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image");
            return;
        }

        try {
            setUploading(true);

            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("albumId", albumId);

            const response = await fetch(
                "http://localhost:4000/images",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
               throw new Error(data.error || data.message)
            }

            alert("Image uploaded successfully");

            setSelectedFile(null);
            fileInputRef.current.value = "";

            onUploadSuccess();
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body">
                <h5 className="card-title mb-3">
                    <i className="bi bi-cloud-arrow-up me-2"></i>
                    Upload Image
                </h5>
                <div className="row g-3 align-items-center ">
                    <div className="col-12 col-md-8">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <button 
                            className="btn btn-primary w-100"
                            onClick={handleUpload} 
                            disabled={uploading}
                        >
                            <i className={uploading?"bi bi-arrow-repeat me-1" : "bi bi-cloud-upload me-2"}></i>
                            {uploading ? "Uploading..." : "Upload Image"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadImage;