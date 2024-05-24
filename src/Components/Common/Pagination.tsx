import { pagination } from "../../Interfaces/Interfaces";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: pagination) {
  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="join grid grid-cols-2 ">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage == 1}
            className="join-item btn btn-outline text-black"
          >
            Previous page
          </button>
          {/* {currentPage} */}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={totalPages + 1 == currentPage}
            className="join-item btn btn-outline text-black"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
