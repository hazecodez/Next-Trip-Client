import { useNavigate } from "react-router-dom";

export default function AccountTab() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex">
        <div className="flex bg-gray-200 hover:bg-gray-200 rounded-lg transition p-1 bg-white-700">
          <nav className="flex space-x-1" aria-label="Tabs" role="tablist">
            <button
              type="button"
              className={`hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 dark:hs-tab-active:bg-gray-700 dark:hs-tab-active:text-white py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:hover:text-gray-400 active`}
              role="tab"
              onClick={() => navigate("/login")}
            >
              &nbsp;&nbsp;PERSONAL ACCOUNT&nbsp;&nbsp;
            </button>
            <button
              type="button"
              className={` hs-tab-active:bg-gray-200 hs-tab-active:text-gray-800 hs-tab-active:hover:text-gray-800 dark:hs-tab-active:bg-gray-700 dark:hs-tab-active:text-white py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 rounded-lg hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:hover:text-gray-400 `}
              role="tab"
              onClick={() => navigate("/host/login")}
            >
              &nbsp;&nbsp;MYBIZ ACCOUNT &nbsp;&nbsp;&nbsp;
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
