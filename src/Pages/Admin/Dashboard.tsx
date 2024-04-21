import Footer from "../../Components/Admin/Footer";
import Navbar from "../../Components/Admin/Navbar";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between bg-[#D2E0FB]">
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <span className="loading text-black loading-infinity loading-lg"></span>
          <h2 className="text-black">Coming Soon...</h2>
        </div>
        <Footer />
      </div>
    </>
  );
}
