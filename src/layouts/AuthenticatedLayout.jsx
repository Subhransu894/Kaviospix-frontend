import Navbar from "../components/Navbar"

function AuthenticatedLayout({children}){
    return(
        <div>
            <Navbar/>
            <main>
                {children}
            </main>
        </div>
    )
}
export default AuthenticatedLayout;
