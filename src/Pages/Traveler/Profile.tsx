import Navbar from "../../Components/Traveler/Navbar";
import Footer from "../../Components/Common/Footer";

export default function Profile() {
  return (
    <>
      <div className="flex flex-col h-screen justify-between bg-[#5C8374]">
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-infinity loading-lg"></span>
          <h2>Coming Soon...</h2>
        </div>
        <Footer who="traveler" />
      </div>
    </>
  );
}
