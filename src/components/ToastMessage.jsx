import { useEffect } from "react"
function ToastMessage({message,type="success",onClose}){
    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose()
        },3000)
        return ()=> clearTimeout(timer)
    },[onClose])
    return(
        <div className="toast-container position-fixed top-0 end-0 p-3">
            <div className={`toast show text-bg-${type}`} role="alert" onClick={onClose}>
                <div className="d-flex ">
                    <div className="toast-body">{message}</div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
                </div>
            </div>
        </div>
    )
}
export default ToastMessage;