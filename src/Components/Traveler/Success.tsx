import { useNavigate } from "react-router-dom";

export default function Success() {
    const navigate = useNavigate()
  return (
    <div className="h-screen w-full bg-[#c8c2c2]">
      <div className="flex flex-wrap items-center justify-center">
        <img src="../Traveler/successLogo.png" className="w-40 pt-32" />
        <p className="text-3xl font-bold text-[#092635] lg:pt-32 text-center">
          Congratulations! Your travel package is booked, <br />
          and you're all set to soar to new adventures! <br /> Bon voyage!
        </p>
      </div>
      <div className="flex justify-center items-center pt-28">
        <button onClick={()=> navigate("/bookings")} className="btn btn-wide rounded-full text-[#c8c2c2] text-xl bg-[#092635] hover:bg-[#c8c2c2] hover:text-[#092635]">
          BOOKINGS
        </button>
      </div>
    </div>
  );
}
