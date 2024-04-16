import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Common/Navbar";


export default function HomePage() {
  return (
    <>
      <Navbar Class={
          "border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        }
        logo="../Traveler/Logo.png"
        Tabs={["Home", "Blogs", "Packages"]}/>
      <Footer Class="dark:bg-gray-800" Logo="../Traveler/Logo.png" />
    </>
  );
}
