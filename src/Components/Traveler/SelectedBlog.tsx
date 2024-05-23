import { useEffect, useState } from "react";
import "./Css/BlogCard.css";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { Blog, User } from "../../Interfaces/Interfaces";
import { format } from "timeago.js";
import { toast } from "sonner";
import { useSelector } from "react-redux";

interface modalProp {
  onClose: () => void;
  blogId: string;
}

interface UserData {
  traveler?: {
    traveler: User;
  };
}

export default function SelectedBlog({ onClose, blogId }: modalProp) {
  const [update, setUpdate] = useState(false);
  const [comment, setComment] = useState("");
  const [blog, setBlog] = useState<Blog>();
  const [likeOrNot, setLikeOrNot] = useState(false);
  const traveler = useSelector((state: UserData) => state.traveler);
  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await TravelerAPIs.blog_details(blogId);
        if (response?.data.status) {
          setBlog(response.data.details);
          setUpdate(!update);
          
          if (
            response?.data.details.liked_users?.includes(
              traveler?.traveler._id as string
            )
          ) {
            setLikeOrNot(true);
          }
        } else {
          toast.error(response?.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  }, [update]);
  async function commented() {
    const response = await TravelerAPIs.comment_blog(
      blog?._id as string,
      comment
    );
    toast.success(response?.data.message);
    setUpdate(!update)
    setComment("")
  }
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
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center flex-wrap justify-center z-50">
        <div className="post-card h-4/5">
          <div className="flex">
            <img
              className="avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OnF25iXucIOQkieN9v75o5TCNmr7X75d_LowE9dUX4bVnGaFQ2F6KI7p&s=10"
              alt=""
            />
            <p className="pl-3 pt-1">{blog?.userName}</p>
          </div>

          <a href="#" className="title">
            {blog?.caption}
          </a>
          <span className="datetime">{format(blog?.time as Date)}</span>
          <div className="image-preview ">
            <img
              className="rounded h-64"
              src={`https://res.cloudinary.com/doac4pi2c/image/upload/${blog?.image}`}
              alt=""
            />
            <br />
            <h1 className="text-xl">{blog?.experience}</h1>
          </div>
          <div className="comment-like">
            <span>
              {likeOrNot ? (
                <i
                  onClick={() => {
                    like_unlike(blog?._id as string),
                      setUpdate(!update),
                      setLikeOrNot(true);
                  }}
                  className="fa-solid fa-heart text-red-600 text-2xl"
                />
              ) : (
                <i
                  onClick={() => {
                    like_unlike(blog?._id as string),
                      setUpdate(!update),
                      setLikeOrNot(false);
                  }}
                  className="fa-regular fa-heart text-2xl"
                ></i>
              )}
              &nbsp;&nbsp;&nbsp;
              {blog?.liked_users?.length}
            </span>
            <span>
              <i className="fa-regular fa-comment text-2xl" />{" "}
              &nbsp;&nbsp;&nbsp;
              {blog?.comments?.length}
            </span>
          </div>
        </div>

        {/* Comment Section */}

        <div className="card-container">
          <div className="flex justify-end">
            <a
              onClick={onClose}
              className="text-2xl pr-5 text-white font-semibold cursor-pointer"
            >
              <i className="fa-regular fa-circle-xmark pt-5"></i>
            </a>
          </div>
          <div
            className="card-body"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="messages-container">
              {blog?.comments?.length ? (
                blog?.comments?.map((com, index) => (
                  <div className="flex" key={index}>
                    <img
                      className="avatar"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OnF25iXucIOQkieN9v75o5TCNmr7X75d_LowE9dUX4bVnGaFQ2F6KI7p&s=10"
                      alt=""
                    />
                    &nbsp;&nbsp;
                    <div className="message-box left rounded-tl-none">
                      <p>{com.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-28">No Comments</p>
              )}
            </div>
          </div>
          <div
            className={`flex items-center mr-5 mb-5  px-3 py-2 
          rounded-full bg-[#092635]`}
          >
            <input
              type="text"
              placeholder="Send your comment......"
              value={comment}
              name="comment"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setComment(e.target.value)
              }
              className={`flex w-full bg-[#133e54]
          rounded-full focus:outline-none
           focus:border-indigo-300 pl-10 h-10`}
            />
            <button
              onClick={commented}
              className="bg-[#133e54] ml-5 text-2xl w-12 h-10 rounded-full"
            >
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
