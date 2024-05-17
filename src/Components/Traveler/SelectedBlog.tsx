import "./Css/BlogCard.css";

interface modalProp {
  onClose: () => void;
  id: string;
}

export default function SelectedBlog({ onClose, id }: modalProp) {
  console.log(id);

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
            <p className="pl-3 pt-1">@user_name</p>
          </div>

          <a href="#" className="title">
            7 Tools for Faster Development in React
          </a>
          <span className="datetime">3 min to read</span>
          <div className="image-preview ">
            <img
              className="rounded h-64"
              src="https://www.holidify.com/images/bgImages/MUNNAR.jpg"
              alt=""
            />
            <br />
            <h1 className="text-xl">
              A London Christmas:j cherished traditions and new discoveries.
            </h1>
          </div>
          <div className="comment-like">
            <span>
              <svg
                fill=""
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                id="Uploaded to svgrepo.com"
                version="1.1"
              >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21.081,6C23.752,6.031,26,8.766,26,12c0,5.106-6.47,10.969-10.001,13.593 C12.466,22.974,6,17.12,6,12c0-3.234,2.248-5.969,4.918-6C13.586,6.175,13.926,6.801,16,8.879C18.069,6.806,18.418,6.173,21.081,6 M20.911,4.006L20.912,4C18.993,4,17.259,4.785,16,6.048C14.741,4.785,13.007,4,11.088,4l0.001,0.006C7.044,3.936,4,7.719,4,12 c0,8,11.938,16,11.938,16h0.124C16.062,28,28,20,28,12C28,7.713,24.951,3.936,20.911,4.006z"
                    className="bentblocks_een"
                  ></path>{" "}
                </g>
              </svg>
              10
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill=""
                    d="M4.49999 20.25C4.37892 20.2521 4.25915 20.2248 4.1509 20.1705C4.04266 20.1163 3.94916 20.0366 3.87841 19.9383C3.80766 19.8401 3.76175 19.7261 3.74461 19.6063C3.72747 19.4864 3.73961 19.3641 3.77999 19.25L5.37999 14C5.03175 13.0973 4.85539 12.1375 4.85999 11.17C4.8584 10.1057 5.06918 9.0518 5.47999 8.06999C5.88297 7.13047 6.45975 6.27549 7.17999 5.54999C7.90382 4.82306 8.76344 4.24545 9.70999 3.84999C10.6889 3.4344 11.7415 3.22021 12.805 3.22021C13.8685 3.22021 14.9211 3.4344 15.9 3.84999C17.3341 4.46429 18.5573 5.48452 19.4191 6.7851C20.2808 8.08568 20.7434 9.60985 20.75 11.17C20.7437 13.2771 19.9065 15.2966 18.42 16.79C17.6945 17.5102 16.8395 18.087 15.9 18.49C14.0091 19.2819 11.8865 19.3177 9.96999 18.59L4.71999 20.19C4.64977 20.22 4.57574 20.2402 4.49999 20.25ZM12.8 4.74999C11.5334 4.75547 10.2962 5.13143 9.24068 5.83153C8.18519 6.53164 7.35763 7.52528 6.85999 8.68999C6.19883 10.2911 6.19883 12.0889 6.85999 13.69C6.91957 13.8548 6.91957 14.0352 6.85999 14.2L5.62999 18.37L9.77999 17.11C9.94477 17.0504 10.1252 17.0504 10.29 17.11C11.0824 17.439 11.932 17.6083 12.79 17.6083C13.648 17.6083 14.4976 17.439 15.29 17.11C16.0708 16.7813 16.779 16.3018 17.3742 15.6989C17.9693 15.096 18.4397 14.3816 18.7583 13.5967C19.077 12.8118 19.2376 11.9717 19.231 11.1245C19.2244 10.2774 19.0508 9.4399 18.72 8.65999C18.2234 7.50094 17.398 6.51285 16.3459 5.81792C15.2937 5.123 14.0609 4.75171 12.8 4.74999Z"
                  ></path>{" "}
                </g>
              </svg>
              4
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
              x
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
              <div className="flex">
                <img
                  className="avatar"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OnF25iXucIOQkieN9v75o5TCNmr7X75d_LowE9dUX4bVnGaFQ2F6KI7p&s=10"
                  alt=""
                />
                &nbsp;&nbsp;
                <div className="message-box left rounded-tl-none">
                  <p>Hello, How are you?</p>
                </div>
              </div>
              <br />
            </div>
          </div>
          <form
            className={`flex items-center mr-5 mb-5  px-3 py-2 
          rounded-full bg-[#092635]`}
          >
            <input
              type="text"
              placeholder="Send your comment......"
              className={`flex w-full bg-[#133e54]
          rounded-full focus:outline-none
           focus:border-indigo-300 pl-10 h-10`}
            />
            <button className="bg-[#133e54] ml-5 text-2xl w-12 h-10 rounded-full">
            <i className="fa-solid fa-paper-plane"/>
            </button>
          </form>
          {/* <div className="message-input">
            <form>
              <textarea
                placeholder="Type your message here"
                className="message-send bg-[#f2f2f2]"
              ></textarea>
              <button type="submit" className="button-send">
                Send
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </>
  );
}
