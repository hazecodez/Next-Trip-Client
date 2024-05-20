import { useEffect, useState } from "react";
import "./Css/BlogCard.css";
import SelectedBlog from "./SelectedBlog";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { Blog, User } from "../../Interfaces/Interfaces";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface UserData {
  traveler?: {
    traveler: User;
  };
}

export default function BlogCard() {
  const [blogModal, setBlogModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogId, setBlogId] = useState("");
  const [update, setUpdate] = useState(false);
  const traveler = useSelector((state: UserData) => state.traveler);
  const closeModal = () => {
    setBlogModal(false);
    setUpdate(!update)
  };
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await TravelerAPIs.fetch_blogs();
        if (response?.data.status) {
          const processedBlogs = response.data.blogs.map((blog: Blog) => {
            const liked = blog?.liked_users?.includes(
              traveler?.traveler._id as string
            );
            return { ...blog, liked };
          });
          setBlogs(processedBlogs);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogs();
  }, [update]);

  async function like_unlike(blogId: string) {
    try {
      const response = await TravelerAPIs.like_unlike_blog(blogId);
      if (response?.data.status) {
        toast.success(response.data.message);
        setUpdate(!update);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-wrap items-center justify-evenly bg-[#5C8374] py-10 px-12 ">
        {blogs &&
          blogs?.map((blog: Blog, index: number) => (
            <div key={index} className="post-card">
              {blogModal && (
                <SelectedBlog onClose={closeModal} blogId={blogId} />
              )}
              <div className="flex">
                <img
                  className="avatar"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OnF25iXucIOQkieN9v75o5TCNmr7X75d_LowE9dUX4bVnGaFQ2F6KI7p&s=10"
                  alt=""
                />
                <p className="pl-3 pt-1">@{blog.userName}</p>
              </div>

              <a
                onClick={() => {
                  setBlogModal(true);
                  setBlogId(blog._id as string);
                }}
                className="title"
              >
                {blog.caption}
              </a>
              <span className="datetime">{format(blog?.time as Date)}</span>
              <div className="image-preview">
                <img
                  className="rounded"
                  src={`https://res.cloudinary.com/doac4pi2c/image/upload/${blog?.image}`}
                  alt=""
                />
              </div>
              <div className="comment-like">
                <span>
                  {blog.liked ? (
                    <i
                      onClick={() => like_unlike(blog._id as string)}
                      className="fa-solid fa-heart text-red-600 text-2xl"
                    />
                  ) : (
                    <i
                      onClick={() => like_unlike(blog._id as string)}
                      className="fa-regular fa-heart text-2xl"
                    ></i>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  {blog.liked_users?.length}
                </span>
                <span>
                  <i
                    className="fa-regular fa-comment text-2xl"
                    onClick={() => {
                      setBlogModal(true);
                      setBlogId(blog._id as string);
                    }}
                  />{" "}
                  &nbsp;&nbsp;&nbsp;
                  {blog.comments?.length}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
