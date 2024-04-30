// // import EmojiPicker from "emoji-picker-react";
// // import { useState } from "react";
// import Who from "../../../Interfaces/Interfaces";

// type WhoseChatinput = {
//   who: Who;
// };

// export default function ChatInput({ who }: WhoseChatinput) {
//   // const [inputStr, setInputStr] = useState("");
//   // const [showPicker, setShowPicker] = useState(false);
//   return (
//     <>
//       <div>{/* <EmojiPicker /> */}</div>
//       <div className="bg-[#F2F2F2] flex justify-end">
//         <div
//           className={`flex w-3/4 items-center mr-5 mb-5  px-3 py-2 
//         rounded-full ${who === "traveler" ? "bg-[#092635]" : "bg-[#C63D2F]"}`}
//         >
//           <button
//             type="button"
//             className={`p-2 rounded-full cursor-pointer
//             ${who === "traveler" ? "hover:bg-[#133e54]" : "hover:bg-[#E25E3E]"}
//            text-blue-100 `}
//           >
//             <i className="fa-solid fa-face-kiss-wink-heart text-2xl " />
//             <span className="sr-only">Add emoji</span>
//           </button>
//           <input
//             type="text"
//             placeholder="Send message"
//             className={`flex w-full ${
//               who === "traveler" ? "bg-[#133e54]" : "bg-[#E25E3E] text-white"
//             } 

//           rounded-full focus:outline-none
//            focus:border-indigo-300 pl-10 h-10`}
//           />
//           <button
//             className={`inline-flex justify-center p-2
//            rounded-full cursor-pointer
//            ${who === "traveler" ? "hover:bg-[#133e54]" : "hover:bg-[#E25E3E]"}
//            text-blue-100`}
//           >
//             <i className="fa-solid fa-paper-plane text-2xl" />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
