import DetailCard from "../../Components/Common/DetailCard";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";

export default function PackageDetails() {
  return (
    <>
      <Navbar />
      <DetailCard who="Traveler" />
      <Footer who="traveler" />
    </>
  );
}
