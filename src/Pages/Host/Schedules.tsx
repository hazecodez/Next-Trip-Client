import Navbar from "../../Components/Host/Navbar"
import Footer from "../../Components/Common/Footer"

export default function Schedules() {
  return (
    <>
   <div className="flex flex-col h-screen justify-between bg-[#F2F2F2]">
      <Navbar />
      <div className="flex justify-center items-center h-full">
          <span className="loading loading-infinity loading-lg"></span>
          <h2>Coming Soon...</h2>
        </div>
      <Footer who="host" />
      </div>
    </>
    
  )
}
