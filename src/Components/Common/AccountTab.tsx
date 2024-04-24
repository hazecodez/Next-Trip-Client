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
                activeTab === "1" ? "bg-[#092637] text-white" : ""
              } hover:text-gray-800 dark:bg-gray-800 dark:text-white py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-800  rounded-full hover:text-neutral-content disabled:opacity-50 disabled:pointer-events-none dark:hover:text-dark-800 `}
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
              className={` text-gray-800 hover:text-gray-800 ${
                activeTab === "2" ? "bg-[#C63D3F] text-white" : ""
              } dark:text-white py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center  rounded-full hover:text-neutral-content disabled:opacity-50 disabled:pointer-events-none dark:hover:text-gray-800 `}
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
