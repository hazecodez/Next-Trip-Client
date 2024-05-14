import Footer from "../../Components/Common/Footer";
import BookedPackages from "../../Components/Traveler/BookedPackages";
import Navbar from "../../Components/Traveler/Navbar";


export default function Bookings() {
  return (
    <>
    <Navbar/>
    <div className="w-full h-full bg-[#c8c2c2]">
    <BookedPackages/>
    </div>
    
    <Footer who="traveler" />
    </>
  )
}
