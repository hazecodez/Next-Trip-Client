import React, { useState } from "react";
import "./Css/CreateForm.css";
import BlogSchema from "../../Validations/Traveler/BlogSchema";
import { Blog, User } from "../../Interfaces/Interfaces";
import { RiseLoader } from "react-spinners";

interface UserData {
  traveler?: {
    traveler: User;
  };
}

import { useFormik } from "formik";
import { toast } from "sonner";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { useSelector } from "react-redux";

interface modalProp {
  onClose: () => void;
}

export default function CreateBlog({ onClose }: modalProp) {
  const [preview, setPreview] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loader, setLoader] = useState(false);
  const traveler = useSelector((state: UserData) => state.traveler);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
    }
  };
  const submit = async (form: Blog) => {
    try {
      if (!preview) {
        setImageError(true);
      } else {
        setLoader(true);
        const response = await TravelerAPIs.create_blog(
          form,
          preview,
          traveler?.traveler.name as string
        );
        if (response?.data.status) {
          toast.success(response.data.message);
          onClose();
          setLoader(false);
        } else {
          toast.error(response?.data.message);
          setLoader(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        caption: "",
        experience: "",
        location: "",
        
      },
      validationSchema: BlogSchema,
      onSubmit: submit,
    });

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="form-container">
          <label className="custum-file-upload ml-6">
            {preview ? (
              <>
                <img className="h-48 w-72" src={preview} alt="" />
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <>
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill=""
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
                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="text">
                  <span>Click to upload image</span>
                </div>
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </>
            )}
          </label>
          {imageError && <p className="text-orange-400">Image is required.</p>}

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                id="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
              />
              {errors.location && touched.location ? (
                <p className="text-orange-400">{errors.location}</p>
              ) : (
                ""
              )}
            </div>

            <div className="form-group">
              <label>Caption</label>
              <input
                name="caption"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.caption}
                type="text"
              />
              {errors.caption && touched.caption ? (
                <p className="text-orange-400">{errors.caption}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label>Share your Experience...</label>
              <textarea
                cols={50}
                rows={10}
                id="textarea"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.experience}
                name="experience"
              />
              {errors.experience && touched.experience ? (
                <p className="text-orange-400">{errors.experience}</p>
              ) : (
                ""
              )}
            </div>
            {loader ? (
              <div className="loader-container">
                <RiseLoader color="#5C8374" size={30} />

                <p className="pt-10 pl-6 text-[#92aba2] text-lg">
                  Wait for while....
                </p>
              </div>
            ) : (
              <div className="flex">
                <button
                  onClick={onClose}
                  className="form-submit-btn m-5 mb-0 bg-[#260b0b] hover:bg-[#371717]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="form-submit-btn bg-[#0a1a22] hover:bg-[#152229]"
                >
                  Create
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
