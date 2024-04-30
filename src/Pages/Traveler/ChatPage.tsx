import ChatBody from "../../Components/Common/Chat/ChatBody";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";
import { Who } from "../../Interfaces/Interfaces";

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <ChatBody who={Who.Traveler} />
      <Footer who="traveler" />
    </>
  );
}
