import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";
import Banner from "../../Components/Traveler/Banner";
import PackageCard from "../../Components/Host/PackageCard";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <PackageCard/>

      {/* <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        We invest in the{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          world’s potential
        </span>
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p> */}

      
      <Footer bgColor="bg-base-100" Logo="../Traveler/Logo.png" />
    </>
  );
}
