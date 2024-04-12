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
              className={`bg-gray-200 text-gray-800 hover:text-gray-800 dark:bg-${
                activeTab === "1" ? "gray" : ""
              }-800 dark:text-white py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-full hover:text-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:hover:text-dark-400 `}
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
              className={`bg-gray-200 text-gray-800 hover:text-gray-800 dark:bg-${
                activeTab === "2" ? "red" : ""
              }-800 dark:text-white py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-full hover:text-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:hover:text-gray-800 `}
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
