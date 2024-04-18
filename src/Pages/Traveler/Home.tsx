import Footer from "../../Components/Common/Footer";
import Navbar from "../../Components/Traveler/Navbar";
import Banner from "../../Components/Traveler/Banner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />

      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        We invest in the{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          world’s potential
        </span>
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p>

      <div className="flex items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Amazing Kashmir Vacay with Gulmarg & Sonmarg
            </h2>
            <p>Magnificent Kashmir Holiday -With Houseboat Stay......</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">₹56,488</button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Amazing Kashmir Vacay with Gulmarg & Sonmarg
            </h2>
            <p>Magnificent Kashmir Holiday -With Houseboat Stay......</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">₹56,488</button>
            </div>
          </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Amazing Kashmir Vacay with Gulmarg & Sonmarg
            </h2>
            <p>Magnificent Kashmir Holiday -With Houseboat Stay......</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">₹56,488</button>
            </div>
          </div>
        </div>
      </div>
      <Footer bgColor="bg-base-100" Logo="../Traveler/Logo.png" />
    </>
  );
}
