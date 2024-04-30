import ChatBody from "../../Components/Common/Chat/ChatBody";
import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Host/Navbar";
import {Who} from "../../Interfaces/Interfaces";

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <ChatBody who={Who.Host} />
      <Footer who="host" />
    </>
  );
}
