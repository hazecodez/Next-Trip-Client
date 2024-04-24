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
          className="btn btn-wide bg-[#C63D2F] border-none text-[#FFBB5C] hover:bg-[#FFBB5C] hover:text-[#C63D2F] text-xl"
        >
          Create Package
        </button>
      </div>
      <PackageCard who="host" />
      <Footer bgColor="bg-[#C63D2F]" Logo="../Host/HostLogo.png" />
    </>
  );
}
