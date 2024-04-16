import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import Cookies from "js-cookie";
import { TravelerLogin } from "../../Redux/Slices/Traveler";
import { hostLogin } from "../../Redux/Slices/Host";
import HostAPIs from "../../APIs/HostAPIs";
import { toast, Toaster } from "sonner";

export default function Otp({ who }: { who: "host" | "traveler" }) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
  });
  const [fullOTP, setFullOTP] = useState("");
  const ref = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  function onChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = event.target;
    if (!/^\d*$/.test(value)) return;
    setOtp((prev) => ({
      ...prev,
      [name]: value.slice(-1),
    }));
    if (value && index < 3) {
      ref.current[index + 1].focus();
    }
    const newFullOTP = Object.values({
      ...otp,
      [name]: value.slice(-1),
    }).join("");
    setFullOTP(newFullOTP);
  }

  function handleBack(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === "Backspace") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    }
  }

  const OtpInputFields = () => {
    return (
      <>
        {Object.keys(otp).map((key, index) => (
          <div key={index} className="w-16 h-16 ">
            <input
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-700"
              type="text"
              name={key}
              value={otp[key as keyof typeof otp]}
              onChange={(event) => onChange(event, index)}
              onKeyUp={(event) => handleBack(event, index)}
              ref={(element) => {
                ref.current[index] = element as HTMLInputElement;
              }}
            />
          </div>
        ))}
      </>
    );
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (who === "traveler") {
        const OtpResponse = await TravelerAPIs.confirmOTP(fullOTP);
        if (OtpResponse?.data.status) {
          dispatch(
            TravelerLogin({
              traveler: OtpResponse.data.travelerData,
            })
          );
          Cookies.remove("travelerOtp");
          toast.success(OtpResponse.data.message);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } else if (who === "host") {
        const otpResponse = await HostAPIs.verifyOTP(fullOTP);
        if (otpResponse?.data.status) {
          dispatch(
            hostLogin({
              host: otpResponse.data.hostData,
            })
          );
          toast.success(otpResponse.data.message);
          setTimeout(() => {
            navigate("/host/");
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <Toaster richColors expand={true} position="top-right" />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {OtpInputFields()}
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 dark:bg-${
                          who === "host" ? "red" : "gray"
                        }-800 border-none text-white text-sm shadow-sm`}
                      >
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-gray-800"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
