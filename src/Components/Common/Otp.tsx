import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import Cookies from "js-cookie";
import { TravelerLogin } from "../../Redux/Slices/Traveler";
import { hostLogin } from "../../Redux/Slices/Host";
import HostAPIs from "../../APIs/HostAPIs";
import { toast } from "sonner";

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
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline rounded-3xl border border-none text-lg bg-gray-100 focus:bg-gray-50 focus:ring-1 ring-gray-700"
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
          navigate("/");
        }else {
          toast.warning(OtpResponse?.data.message)
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
          navigate("/host/");
        }else {
          toast.warning(otpResponse?.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function resendOtp() {
    try {
      if (who === "traveler") {
        const response = await TravelerAPIs.resendOtp();
        if (response?.data.status) {
          toast.success(response.data.message)
          navigate("/otp");
        } else {
          toast.error(response?.data.message);
          navigate("/signup");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#F2F2F2] py-12">
        <div
          className={`relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl`}
        >
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div
                className={`font-semibold text-${
                  who === "traveler" ? "[#092635]" : "[#C63D2F]"
                } text-3xl`}
              >
                <p>Email Verification</p>
              </div>
              <div
                className={`flex flex-row text-sm font-medium text-${
                  who === "traveler" ? "[#092635]" : "[#C63D2F]"
                }`}
              >
                <p>We have sent a code to your email</p>
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
                        className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-${
                          who === "traveler" ? "[#092635]" : "[#C63D2F]"
                        } border-none text-white text-sm shadow-sm`}
                      >
                        Verify Account
                      </button>
                    </div>
                    <div className="flex justify-evenly">
                      <span className="countdown font-mono text-2xl">
                        <span>00</span>:<span>59</span>
                      </span>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-gray-800"
                        onClick={resendOtp}
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
