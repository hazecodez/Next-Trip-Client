import { useState } from "react";
import { useNavigate } from "react-router-dom";
type propTypes = {
  tabNumber: string;
};

export default function AccountTab({ tabNumber }: propTypes) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(tabNumber);

  return (
    <>
      <div className="flex">
        <div className="flex bg-gray-200 hover:bg-gray-200 rounded-full transition p-2 bg-gray shadow-lg">
          <nav className="flex space-x-1" aria-label="Tabs" role="tablist">
            <button
              type="button"
              className={`${
                activeTab === "1" ? "dark:bg-gray-800 text-white" : "text-black"
              }  py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center  rounded-full  disabled:opacity-50 disabled:pointer-events-none  `}
              role="tab"
              onClick={() => {
                navigate("/login");
                setActiveTab("1");
              }}
            >
              PERSONAL ACCOUNT
            </button>
            <button
              type="button"
              className={` text-gray-800  ${
                activeTab === "2" ? "bg-[#C63D3F] text-white" : "bg-transparent text-black"
              }  py-3 px-4 inline-flex items-center gap-x-2  text-sm font-medium text-center  rounded-full disabled:opacity-50 disabled:pointer-events-none `}
              role="tab"
              onClick={() => {
                navigate("/host/login");
                setActiveTab("2");
              }}
            >
              MYBIZ ACCOUNT
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
