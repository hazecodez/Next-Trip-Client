import { useState } from "react";
import Footer from "../../Components/Common/Footer";
import BlogCard from "../../Components/Traveler/BlogCard";
import Navbar from "../../Components/Traveler/Navbar";
import CreateBlog from "../../Components/Traveler/CreateBlog";
import ButtonCreateBlog from "../../Components/Traveler/ButtonCreateBlog";
export default function Blogs() {
  const [createModal, setCreateModal] = useState(false);
  const closeModal = () => {
    setCreateModal(false);
  };
  return (
    <>
      <Navbar />
      {createModal && <CreateBlog onClose={closeModal} />}
      <div className="bg-[#5C8374] py-4 px-14  flex justify-end ">
        <ButtonCreateBlog setCreateModal={setCreateModal} />
      </div>
      <BlogCard />
      <Footer who="traveler" />
    </>
  );
}
