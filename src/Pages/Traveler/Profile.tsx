import Navbar from "../../Components/Traveler/Navbar";
import Footer from "../../Components/Common/Footer";
import ProfileCard from "../../Components/Common/ProfileCard";
import { Who } from "../../Interfaces/Interfaces";

export default function Profile() {
  return (
    <>
      <Navbar />
      <ProfileCard who={Who.Traveler} />
      <Footer who="traveler" />
    </>
  );
}
