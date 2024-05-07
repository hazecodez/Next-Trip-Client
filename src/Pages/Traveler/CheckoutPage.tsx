import Footer from "../../Components/Common/Footer";
import Checkout from "../../Components/Traveler/Checkout";
import Navbar from "../../Components/Traveler/Navbar";


export default function CheckoutPage() {
  return (
    <>
    <Navbar/>
    <Checkout/>
    <Footer who="traveler"/>
    </>
  )
}
