import React from "react";
import "../../containers/Home/Section/About.scss";
import { useHistory } from "react-router-dom";
import { useVideo } from "../../context/VideoContext"; // Import the custom hook

const VideoPlayerContext = ({
  className,
  display,
  position,
  bottom,
  right,
  width,
  onExpandPlayer,
}) => {
  const { state, togglePiP } = useVideo(); // Destructure isPiP and togglePiP from context
  const isPiP = state.isPiP;
  const history = useHistory();

  const handleExpandPlayer = () => {
    history.push("/home");
    togglePiP(); // Use context function to toggle PiP
  };

  return (
    <div
      style={{
        display: display,
        position: position,
        bottom: bottom,
        right: right,
        width: width,
        transition: "all 0.3s",
        boxShadow: isPiP ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none",
        zIndex: isPiP ? 50 : "auto",
      }}
      className={className}
    >
      <iframe
        id="youtube-video"
        width="100%"
        height={isPiP ? "200px" : "400px"}
        src="https://www.youtube.com/embed/MhQKe-aERsU"
        title="Ed Sheeran - Shape Of You (cover by J.Fla)"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button
        onClick={isPiP ? handleExpandPlayer : togglePiP}
        style={{
          position: "absolute",
          top: isPiP ? "5px" : "",
          bottom: isPiP ? "" : "2.2%",
          right: isPiP ? "" : "25%",
          left: isPiP ? "0px" : "",
          backgroundColor: "transparent",
          color: "white",
          padding: "0.25rem 0.75rem",
          borderRadius: "2px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        {isPiP ? (
          <svg
            className="expand-player"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
          >
            <g fill="none" stroke="none">
              <g transform="translate(12 12) scale(-1 1) translate(-12 -12)">
                <path
                  d="M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z"
                  fill="#fff"
                ></path>
              </g>
            </g>
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="mini-player"
            style={{ height: "24px", width: "24px" }}
          >
            <path
              fill="currentColor"
              d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default VideoPlayerContext;
