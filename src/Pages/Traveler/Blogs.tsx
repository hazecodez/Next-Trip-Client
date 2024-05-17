import { useState } from "react";
import Footer from "../../Components/Common/Footer";
import BlogCard from "../../Components/Traveler/BlogCard";
import Navbar from "../../Components/Traveler/Navbar";
import "./Css/Button.css";
import CreateBlog from "../../Components/Traveler/CreateBlog";
export default function Blogs() {
  const [createModal, setCreateModal] = useState(false);
  const closeModal = () => {
    setCreateModal(false)
  };
  return (
    <>
      <Navbar />
      {createModal && <CreateBlog onClose={closeModal} />}
      <div className="bg-[#5C8374] py-4 px-14 flex justify-end ">
        <a className="button bg-[#092635]" onClick={() => setCreateModal(true)}>
          <span className="button__icon-wrapper">
            <svg
              width="10"
              className="button__icon-svg text-[#092635]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 15"
            >
              <path
                fill="currentColor"
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              ></path>
            </svg>

            <svg
              className="button__icon-svg  button__icon-svg--copy"
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              fill="none"
              viewBox="0 0 14 15"
            >
              <path
                fill="currentColor"
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              ></path>
            </svg>
          </span>
          Create
        </a>
      </div>
      <BlogCard />
      <Footer who="traveler" />
    </>
  );
}
