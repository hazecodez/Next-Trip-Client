import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";
import Banner from "../../Components/Traveler/Banner";
import PackageCard from "../../Components/Common/PackageCard";
import BlogCard from "../../Components/Traveler/BlogCard";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="flex justify-center p-8 bg-[#F2F2F2]">
        <h1 className="text-black text-3xl font-bold">
        Packages
        </h1>
      </div>
      <hr />
      <PackageCard who="traveler" />
      <hr />
      <div className="flex justify-center p-8 bg-[#F2F2F2]">
        <h1 className="text-black text-3xl font-bold">
        Blogs
        </h1>
      </div>
      <hr />
      <BlogCard />

      <Footer who="traveler" />
    </>
  );
}
