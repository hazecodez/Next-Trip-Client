import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { UserData } from "../../Interfaces/Interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function VideoHost() {
  const { roomId } = useParams();
  const host = useSelector((state: UserData) => state.host);
  const navigate = useNavigate();
  const meetingRef = useRef(null);

  useEffect(() => {
    if (!host) return;
    const cleanRoomId = roomId?.substring(1);
    const appID = 1387401103;
    const serverSecret = "4f5edb76766fbae9ed9336280b8897ec";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      cleanRoomId as string,
      host.host._id as string,
      host.host.name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,
      turnOnCameraWhenJoining: true,
      turnOnMicrophoneWhenJoining: false,
      showLeaveRoomConfirmDialog: false,
      onLeaveRoom: () => {
        zp.hangUp();
        navigate("/host/chat");
      },
      onUserLeave: () => {
        zp.destroy();
        navigate("/host/chat");
      },
    });
    return () => {
      zp.destroy();
    };
  }, [host]);

  return (
    <>
      <div>
        <div ref={meetingRef} style={{ width: "100vw", height: "100vh" }}>
          Video call {host?.host.name} {host?.host._id}
        </div>
      </div>
    </>
  );
}
