export default function Pagination() {
  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="join grid grid-cols-2 ">
          <button className="join-item btn btn-outline text-black">Previous page</button>
          <button className="join-item btn btn-outline text-black">Next</button>
        </div>
      </div>
    </>
  );
}
