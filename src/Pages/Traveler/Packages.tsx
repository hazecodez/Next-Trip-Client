import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";
import Banner from "../../Components/Traveler/Banner";
import PackageCard from "../../Components/Common/PackageCard";

export default function Packages() {
  return (
    <>
      <Navbar />
      <Banner />
      <PackageCard who="traveler" />
      <Footer who="traveler" />
    </>
  );
}
