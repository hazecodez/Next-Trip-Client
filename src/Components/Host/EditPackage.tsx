import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Common/Footer";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import HostAPIs from "../../APIs/HostAPIs";
import { useFormik } from "formik";
import PackageSchema from "../../Validations/Host/PackageSchema";
import Package from "../../Interfaces/common/Package";
import { toast } from "sonner";

export default function EditPackage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [previewSources, setPreviewSources] = useState([]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    previewFiles(files);
  };

  const previewFiles = (files: FileList | null) => {
    const newPreviewSources = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file = files[i];
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        newPreviewSources.push(reader.result as string);
        if (newPreviewSources.length === files.length) {
          setPreviewSources(newPreviewSources);
        }
      };
    }
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await HostAPIs.package_details(id as string);
        if (response?.data) {
          setDetails(response.data);
          setFieldValue("name", response?.data.name);
          setFieldValue("capacity", response?.data.capacity);
          setFieldValue("destination", response?.data.destination);
          setFieldValue("dur_start", response?.data.dur_start);
          setFieldValue("dur_end", response?.data.dur_end);
          setFieldValue("stay", response?.data.stay);
          setFieldValue("room_type", response?.data.room_type);
          setFieldValue("amenities", response?.data.amenities);
          setFieldValue("food", response?.data.food);
          setFieldValue("depa_airport", response?.data.depa_airport);
          setFieldValue("arrival_airport", response?.data.arrival_airport);
          setFieldValue("book_start", response?.data.book_start);
          setFieldValue("book_end", response?.data.book_end);
          setFieldValue("activities", response?.data.activities);
          setFieldValue("price", response?.data.price);
          setFieldValue("itinerary", response?.data.itinerary);
          setFieldValue("arrival_time", response?.data.arrival_time);
          setFieldValue("depa_time", response?.data.depa_time);
          setFieldValue("_id", response.data._id);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchDetails();
  }, []);

  const Submission = async (formData: Package) => {
    try {
      const response = await HostAPIs.update_package(formData, previewSources);
      if (response?.data.status) {
        toast.success(response.data.message);
        navigate("/host/my_packages");
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      _id: details._id | "",
      name: details.name | "",
      capacity: details.capacity | "",
      destination: details.destination | "",
      dur_start: details.dur_start | "",
      dur_end: details.dur_end | "",
      stay: details.stay | "",
      room_type: details.room_type | "",
      amenities: details.amenities | "",
      food: details.food | "",
      depa_airport: details.depa_airport | "",
      arrival_airport: details.arrival_airport | "",
      book_start: details.book_start | "",
      book_end: details.book_end | "",
      activities: details.activities | "",
      price: details.price | "",
      itinerary: details.itinerary | "",
      arrival_time: details.arrival_time | "",
      depa_time: details.depa_time | "",
      images: details.images | [""],
    },
    validationSchema: PackageSchema,
    onSubmit: Submission,
  });

  return (
    <>
      <Navbar />
      <div className=" bg-[#F2F2F2]   flex justify-evenly">
        <div className="  py-5 bg-[#fae9dc] shrink-0  min-h-full md:w-4/6 w-11/12  shadow">
          <form className="w-5/6  mx-auto" onSubmit={handleSubmit}>
            <h1 className="text-2xl text-center text-gray-700 font-bold my-5">
              Package Details{" "}
            </h1>
            <div className=" flex flex-col md:flex-row w-full md:gap-10 ">
              <div className="relative z-0  w-full mb-5 group">
                <p className="m-2 text-black font-bold">Package Name</p>
                <input
                  type="text"
                  className="rounded-full peer py-3  ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your package name here"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.name && touched.name ? (
                  <p className="text-orange-400">{errors.name}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Maximum Capacity</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your max package capacity. eg: 20"
                  name="capacity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.capacity}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>

                {errors.capacity && touched.capacity ? (
                  <p className="text-orange-400">{errors.capacity}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Destination</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select your destination."
                  name="destination"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.destination}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.destination && touched.destination ? (
                  <p className="text-orange-400">{errors.destination}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <p className="m-2 text-black font-bold">
                    Duration Start Date
                  </p>
                  <input
                    type="date"
                    className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Start Date"
                    name="dur_start"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dur_start}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                  {errors.dur_start && touched.dur_start ? (
                    <p className="text-orange-400">{errors.dur_start}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <p className="m-2 text-black font-bold">Duration End Date</p>
                  <input
                    type="date"
                    className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="End Date"
                    name="dur_end"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dur_end}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                  {errors.dur_end && touched.dur_end ? (
                    <p className="text-orange-400">{errors.dur_end}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <h1 className="text-lg text-center text-gray-700  my-5">
              Accommodations{" "}
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Stay</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select your stay"
                  name="stay"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stay}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.stay && touched.stay ? (
                  <p className="text-orange-400">{errors.stay}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Room Type</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select Room Types."
                  name="room_type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.room_type}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.room_type && touched.room_type ? (
                  <p className="text-orange-400">{errors.room_type}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Amenities</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your package Amenities."
                  name="amenities"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amenities}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.amenities && touched.amenities ? (
                  <p className="text-orange-400">{errors.amenities}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Food</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter the foods you offer"
                  name="food"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.food}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.food && touched.food ? (
                  <p className="text-orange-400">{errors.food}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h1 className="text-lg text-center text-gray-700  my-5">
              Flight Timings{" "}
              <span className="text-xs text-gray-400"> (optional)</span>
            </h1>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Departure Airport</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select Departure Airport"
                  name="depa_airport"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.depa_airport}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.depa_airport && touched.depa_airport ? (
                  <p className="text-orange-400">{errors.depa_airport}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Arrival Airport</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select Arrival Airport"
                  name="arrival_airport"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.arrival_airport}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.arrival_airport && touched.arrival_airport ? (
                  <p className="text-orange-400">{errors.arrival_airport}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Departure Time</p>
                <input
                  type="date"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select Departure Airport"
                  name="depa_time"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.depa_time}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.depa_time && touched.depa_time ? (
                  <p className="text-orange-400">{errors.depa_time}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Arrival Time</p>
                <input
                  type="date"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Select Arrival Airport"
                  name="arrival_time"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.arrival_time}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.arrival_time && touched.arrival_time ? (
                  <p className="text-orange-400">{errors.arrival_time}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <p className="m-2 text-black font-bold">Booking Time Start</p>
                  <input
                    type="date"
                    className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Start Date"
                    name="book_start"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.book_start}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                  {errors.book_start && touched.book_start ? (
                    <p className="text-orange-400">{errors.book_start}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <p className="m-2 text-black font-bold">Booking Time End</p>
                  <input
                    type="date"
                    className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="End Date"
                    name="book_end"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.book_end}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                  {errors.book_end && touched.book_end ? (
                    <p className="text-orange-400">{errors.book_end}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Images</p>

                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  placeholder="You can't touch this"
                  multiple
                  className="rounded-full   w-full bg-gray-100  "
                  onChange={handleFileInputChange}
                  //   onBlur={handleBlur}
                />

                <div className=" absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {/* {errors.images && touched.images ? (
                  <p className="text-orange-400">{errors.images}</p>
                ) : (
                  ""
                )} */}
              </div>
            </div>
            <div className="flex justify-evenly flex-wrap">
              {/* <img   
                      key="1" 
                      className="m-4 w-56 h-auto"
                      src={`https://res.cloudinary.com/doac4pi2c/image/upload/${details.images[0]}`}
                      alt={`Preview 1`}
                    /> */}
              {previewSources
                ? previewSources.map((source, index) => (
                    <img
                      key={index}
                      className="m-4 w-56 h-auto"
                      src={source}
                      alt={`Preview ${index + 1}`}
                    />
                  ))
                : details.images.map((image, index) => (
                    <img
                      key={index}
                      className="m-4 w-56 h-auto"
                      src={`https://res.cloudinary.com/doac4pi2c/image/upload/${image}`}
                      alt={`Preview ${index + 1}`}
                    />
                  ))}
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Activities</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter activities here"
                  name="activities"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.activities}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.activities && touched.activities ? (
                  <p className="text-orange-400">{errors.activities}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <p className="m-2 text-black font-bold">Price</p>
                <input
                  type="text"
                  className="rounded-full peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter the pricing for the package"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></div>
                {errors.price && touched.price ? (
                  <p className="text-orange-400">{errors.price}</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <p className="m-2 text-black font-bold">Itinerary</p>
            <textarea
              id="itinerary"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your day by day plan."
              name="itinerary"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.itinerary}
            ></textarea>
            {errors.itinerary && touched.itinerary ? (
              <p className="text-orange-400">{errors.itinerary}</p>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="m-4 btn btn-wide bg-[#C63D2F] hover:bg-[#E25E3E] border-none text-white text-xl text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer bgColor="bg-[#C63D2F]" Logo="../Host/HostLogo.png" />
    </>
  );
}
