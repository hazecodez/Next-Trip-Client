import ChatBox from "../../Components/Common/ChatBox";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";

export default function ChatPage() {
  return (
    <>
    <Navbar/>
    <ChatBox who="traveler" />
    <Footer who="traveler" />
    </>
  )
}
