import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useContext } from "react";
import { AuthContext } from "../../Context/ContextProvider";

function randomID(len: number) {
  let result = "";
  if (result) return result;
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;

  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function Video() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const {setVideoCall} = useContext(AuthContext)
  const myMeeting = async (element: any) => {
    // generate Kit Token
    // const appID = import.meta.env.VITE_ZEGO_APP_ID;
    // const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
    const appID = 1220893534;
    const serverSecret = "b870df89b233b6ba8ae65e772acb113a";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "copy link",
          url: "http://localhost:5173/host/video?roomID=" + roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
