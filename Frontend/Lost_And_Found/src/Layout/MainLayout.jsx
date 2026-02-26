import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
function MainLayout() {
  return (
    <>
        <div className="min-h-screen flex flex-col">
        <Navbar />
        <main style={{ minHeight: "80vh" }} className="grow">
            <Outlet />
        </main>
        <Footer />
        </div>
    </>
  )
}

export default MainLayout
