import Footer from "../../Components/Common/Footer";
import ProfileCard from "../../Components/Common/ProfileCard";
import Navbar from "../../Components/Host/Navbar";
import { Who } from "../../Interfaces/Interfaces";

export default function ProfilePage() {
  return (
    <>
      <Navbar />

      <ProfileCard who={Who.Host} />

      <Footer who="host" />
    </>
  );
}
