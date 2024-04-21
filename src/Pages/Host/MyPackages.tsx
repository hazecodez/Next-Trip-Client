import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Host/Navbar";
import PackageCard from "../../Components/Host/PackageCard";

export default function MyPackages() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="bg-[#F2F2F2] py-4 px-14 flex justify-end ">
        <button
          onClick={() => navigate("/host/create_package")}
          className="btn btn-wide bg-[#C63D2F] hover:bg-[#E25E3E] border-none text-white text-xl"
        >
          Create Package
        </button>
      </div>
      <PackageCard />
      <Footer bgColor="bg-[#C63D2F]" Logo="../Host/HostLogo.png" />
    </>
  );
}
