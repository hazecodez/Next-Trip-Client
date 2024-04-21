import Footer from "../../Components/Admin/Footer";
import Navbar from "../../Components/Admin/Navbar";

export default function Blogs() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between bg-[#D2E0FB]">
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-infinity loading-lg"></span>
          <h2>Coming Soon...</h2>
        </div>
        <Footer />
      </div>
    </>
  );
}
