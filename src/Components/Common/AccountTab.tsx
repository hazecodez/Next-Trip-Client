export default function AccountTab() {
  return (
    <>
      <div className="flex">
        <div className="flex bg-gray-200 hover:bg-gray-200 rounded-lg transition p-1 bg-white-700">
          <nav className="flex space-x-1" aria-label="Tabs" role="tablist">
            <button
              type="button"
              className="hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white active"
              id="segment-item-1"
              data-hs-tab="#segment-1"
              aria-controls="segment-1"
              role="tab"
            >
              &nbsp;&nbsp;PERSONAL ACCOUNT&nbsp;&nbsp;
            </button>
            <button
              type="button"
              className="hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white"
              id="segment-item-2"
              data-hs-tab="#segment-2"
              aria-controls="segment-2"
              role="tab"
            >
              &nbsp;&nbsp;MYBIZ ACCOUNT &nbsp;&nbsp;&nbsp;
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
