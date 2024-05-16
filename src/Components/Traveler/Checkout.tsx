import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Package from "../../Interfaces/common/Package";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import {
  BookedTravelers,
  Gender,
  BookTravelerList,
  bookingData,
} from "../../Interfaces/Interfaces";
import AddTraveler from "../../Validations/Traveler/AddTraveler";
import { useFormik } from "formik";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date: Date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

export default function Checkout() {
  const { id } = useParams();
  const [packDetails, setPackDetails] = useState<Package>();
  const [travelers, setTravelers] = useState<BookTravelerList[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedGender, setSelectedGender] = useState("Other");

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    useFormik({
      initialValues: {
        name: "",
        age: 0,
      },
      validationSchema: AddTraveler,
      onSubmit: handleAddTraveler,
    });
  //to add new traveler details
  async function handleAddTraveler(Data: BookedTravelers) {
    setTravelers([
      ...travelers,
      { name: Data.name, age: Data.age, gender: selectedGender },
    ]);
  }
  //to remove the traveler details
  async function removeTraveler(index: number) {
    setTravelers((prev) => prev.filter((_, i) => i !== index));
  }

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await TravelerAPIs.package_details(id as string);
        setPackDetails(response?.data);
        setTotalPrice(response?.data.price);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDetails();
  }, []);

  //to handle Book Now package
  async function handleBookNow() {
    if (travelers.length > packDetails?.capacity) {
      toast.warning(`Only ${packDetails?.capacity} seats left.`);
    } else if (travelers.length === 0) {
      toast.warning("Please add travelers.");
    } else {
      const Data: bookingData = {
        name: packDetails?.name as string,
        packageId: packDetails?._id,
        totalPrice: totalPrice * travelers.length,
        travelers: travelers,
        hostId: packDetails?.host as string,
      };
      const response = await TravelerAPIs.package_booking(Data);
      if (response?.data.sessionId) {
        const sessionId = response?.data.sessionId;
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        stripe?.redirectToCheckout({ sessionId });
      }
    }
  }

  return (
    <>
      <div className="bg-[#c8c2c2] flex    ">
        <div
          className={` w-full my-10 h-full lg:mx-28 sm:mx-2 md:mx-5  rounded-md`}
        >
          <div className="p-8 text-black flex justify-between w-full bg-gray-300 h-full shadow-2xl rounded">
            <div>
              <h1 className="text-2xl font-bold font-mono">
                {packDetails?.name}
              </h1>
              {packDetails?.capacity < 11 && (
                <p className="text-red-700 font-bold">
                  only {packDetails?.capacity} seats left.
                </p>
              )}

              <br />
              <p>
                <i className="fa-solid fa-calendar-days" />
                &nbsp; &nbsp; Start at {formatDate(packDetails?.dur_start as string)}&nbsp;&nbsp; Ends
                on {formatDate(packDetails?.dur_end as string)}
              </p>
            </div>

            <div>
              <p>
                <span className="font-bold text-black text-md">
                  {" "}
                  ₹ {packDetails?.price} *
                </span>{" "}
                {travelers.length} Travelers
              </p>
              <p className="text-3xl font-bold">
                ₹ {totalPrice * travelers.length}.00{" "}
              </p>
              <br />
              <button
                onClick={handleBookNow}
                className="text-lg btn btn-wide bg-[#092635] text-[#9EC8B9] hover:bg-[#9EC8B9] hover:text-[#092635] border-none"
              >
                BOOK NOW
              </button>
            </div>
          </div>

          <div className="w-full h-full pb-5 bg-white mt-2 shadow-2xl rounded">
            <div
              className={`w-full h-16 flex justify-center items-center text-2xl text-black bg-[#5C8374] `}
            >
              <h1>Travelers Details</h1>
            </div>

            <div className=" w-full flex flex-wrap m-5">
              <div className="mr-10">
                <p className="text-lg text-black">Add Traveler Details</p>

                <form onSubmit={handleSubmit}>
                  <div className="flex w-64 flex-wrap">
                    {errors.name && touched.name && (
                      <p className="text-red-500 text-xs">{errors.name}</p>
                    )}
                    <input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Traveler name"
                      className="input text-black bg-gray-300 focus:bg-gray-400 w-64 m-1"
                    />

                    <input
                      type="number"
                      name="age"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Age"
                      className="input text-black bg-gray-300 focus:bg-gray-400 w-20 m-1"
                    />

                    <div className="dropdown dropdown-top">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 bg-gray-300 border-none hover:bg-gray-400 w-40"
                      >
                        {selectedGender}
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu  shadow bg-gray-500 text-white rounded-box w-52"
                      >
                        <li>
                          <a onClick={() => handleGenderChange(Gender.Male)}>
                            Male
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleGenderChange(Gender.Female)}>
                            Female
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleGenderChange(Gender.Other)}>
                            Other
                          </a>
                        </li>
                      </ul>
                    </div>
                    {errors.age && touched.age && (
                      <p className="text-red-500 text-xs">{errors.age}</p>
                    )}
                    <button
                      type="submit"
                      className="btn btn-wide bg-gray-800 hover:bg-gray-500 hover:text-gray-800 border-none"
                    >
                      ADD TRAVELER
                    </button>
                  </div>
                </form>
              </div>
              {travelers.map((user, index) => (
                <div
                  key={index}
                  className="card w-64 bg-[#c8c2c2] text-black shadow-xl "
                >
                  <div className="card-body">
                    <p>Name : {user.name}</p>
                    <p>Age: {user.age}</p>
                    <div className="flex">
                      <p>Gender: {user.gender}</p>
                      <i
                        onClick={() => removeTraveler(index)}
                        className="fa-solid fa-trash hover:text-red-700 hover:shadow-lg rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
