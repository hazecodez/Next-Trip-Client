import ChatBox from "../../Components/Common/ChatBox";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Host/Navbar";

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <ChatBox who="host" />
      <Footer who="host" />
    </>
  );
}
