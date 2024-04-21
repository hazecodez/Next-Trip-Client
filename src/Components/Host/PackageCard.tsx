export default function PackageCard() {
  return (
    <div className="flex flex-wrap items-center justify-evenly bg-[#F2F2F2] py-10 px-12">
      <div className="card-wrapper mb-4">
        <div className="card w-96 glass bg-[#f2ceb3]">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="car!"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-black">Life hack</h2>
            <p className="text-black">How to park your car at your garage?</p>
            <div className="card-actions items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
