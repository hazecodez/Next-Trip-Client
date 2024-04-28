import DetailCard from "../../Components/Common/DetailCard";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Host/Navbar";

export default function PackageDetails() {
  return (
    <>
      <Navbar />
      
      <DetailCard who="Host" />
      <Footer who="host" />
    </>
  );
}
