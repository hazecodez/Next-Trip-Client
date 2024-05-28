import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { UserData } from "../../Interfaces/Interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Video() {
  const { roomId } = useParams();
  const traveler = useSelector((state: UserData) => state.traveler);
  const navigate = useNavigate();
  const meetingRef = useRef(null);

  useEffect(() => {
    if (!traveler) return;
    const cleanRoomId = roomId?.substring(1);
    const appID = 1387401103;
    const serverSecret = "4f5edb76766fbae9ed9336280b8897ec";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      cleanRoomId as string,
      traveler.traveler._id as string,
      traveler.traveler.name
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
        navigate("/chat");
      },
      onUserLeave: () => {
        zp.destroy();
        navigate("/chat");
      },
    });
    return () => {
      zp.destroy();
    };
  }, [traveler]);

  return (
    <>
      <div>
        <div ref={meetingRef} style={{ width: "100vw", height: "100vh" }}>
          Video call {traveler?.traveler.name} {traveler?.traveler._id}
        </div>
      </div>
    </>
  );
}
