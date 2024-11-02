import React, { Component, useEffect, useRef, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./About.scss";

const About = () => {
  const [isPiP, setIsPiP] = useState(false);

  const togglePiP = () => {
    setIsPiP(!isPiP);
  };

  const containerRef = useRef(null);

  // useEffect(() => {
  //   const checkAndAddMiniPlayer = () => {
  //     const rightControls = document.querySelector(".content-left");
  //     if (rightControls) {
  //       // Tạo thẻ mới
  //       const miniPlayer = document.createElement("div");
  //       miniPlayer.className = "mini-player"; // Thêm class
  //       miniPlayer.textContent = "Mini Player"; // Thêm nội dung cho thẻ mới

  //       // Thêm thẻ mới vào DOM
  //       rightControls.appendChild(miniPlayer);
  //     }
  //   };

  //   // Kiểm tra khi component mount
  //   checkAndAddMiniPlayer();

  //   // Optional: Kiểm tra lại khi DOM thay đổi
  //   const observer = new MutationObserver(checkAndAddMiniPlayer);
  //   observer.observe(document.body, { childList: true, subtree: true });

  //   // Cleanup observer khi component unmount
  //   return () => observer.disconnect();
  // }, []);

  return (
    <div className="section-share section-about">
      <div className="container">
        <div className="section-about-header">
          <FormattedMessage id="about.title" />
        </div>
        <div className="section-about-content">
          <div
            // ref={containerRef}
            className="content-left"
            style={{
              position: isPiP ? "fixed" : "relative",
              bottom: isPiP ? "1rem" : "auto", // bottom-4
              right: isPiP ? "1rem" : "auto", // right-4
              width: isPiP ? "60vh" : "70%", // w-64 / w-full
              height: isPiP ? "53vh" : "100%", // h-36 / h-64
              transition: "all 0.3s",
              boxShadow: isPiP ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none", // shadow-lg
              zIndex: isPiP ? 50 : "auto", // z-50
              // aspectRatio: 16 / 9,
            }}
          >
            <iframe
              id="youtube-video"
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/MhQKe-aERsU"
              title="Ed Sheeran - Shape Of You ( cover by J.Fla )"
              frameBorder="0"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; ${
                isPiP ? "picture-in-picture" : ""
              }; web-share`}
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            {/* <button onClick={enablePiP}>Enable Picture-in-Picture</button> */}
            <button
              onClick={togglePiP}
              style={{
                position: "absolute",
                // top: "5px",
                // right: "5px",
                top: isPiP ? "5px" : "",
                bottom: isPiP ? "" : "2.2%",
                // right: isPiP ? "5px" : "30%",
                right: isPiP ? "" : "25%",
                left: isPiP ? "0px" : "",
                backgroundColor: "transparent",
                color: "white",
                padding: "0.25rem 0.75rem",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              // onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")} // Hover effect tương đương với 'hover:bg-blue-600'
              // onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              {/* {isPiP ? "Exit PiP" : "Enable Picture-in-Picture"} */}
              {/* Thu nhỏ */}
              {!isPiP && (
                <svg
                  viewBox="0 0 24 24"
                  className="mini-player"
                  style={{
                    height: "24px",
                    width: "24px",
                    color: "",
                    // position: "absolute",
                    // top: "10px", // adjust as needed
                    // right: "10px", // adjust as needed
                    // backgroundColor: "#3b82f6", // bg-blue-500
                    // color: "red", // text-white
                    // padding: "0.25rem 0.75rem", // py-1 px-3
                    // borderRadius: "0.375rem", // rounded-md
                    // cursor: "pointer",
                    // transition: "background-color 0.3s",
                  }}
                >
                  <path
                    fill="currentColor"
                    d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
                  />
                </svg>
              )}
              {/* Phóng to */}
              {isPiP && (
                <svg
                  className="expand-player"
                  height="24px"
                  version="1.1"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="none"
                    stroke-width="1"
                  >
                    <g transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) ">
                      <path
                        d="M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z"
                        fill="#fff"
                        fill-rule="nonzero"
                      ></path>
                    </g>
                  </g>
                </svg>
              )}
            </button>
          </div>
          <div className="content-right">
            <p>
              &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quasi assumenda eius laudantium quas. Aliquid, sit reiciendis.
              Repellendus, asperiores similique odit sunt veritatis omnis
              excepturi, non aperiam dolor cumque delectus perferendis. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              consequuntur, vitae tenetur ea amet aliquam odio odit obcaecati
              esse quod dolore fugiat ab pariatur laudantium est reprehenderit,
              sed voluptate distinctio?&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

// import React, { useRef, useEffect, useState } from "react";
// import { FormattedMessage } from "react-intl";

// const About = () => {
//   const videoRef = useRef(null);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   useEffect(() => {
//     const handleMetadataLoad = () => {
//       setIsVideoLoaded(true);
//     };

//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.addEventListener("loadedmetadata", handleMetadataLoad);
//     }

//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener("loadedmetadata", handleMetadataLoad);
//       }
//     };
//   }, []);

//   const enablePiP = async () => {
//     const videoElement = videoRef.current;

//     if (document.pictureInPictureEnabled && videoElement && isVideoLoaded) {
//       try {
//         await videoElement.requestPictureInPicture();
//       } catch (error) {
//         console.error("Error enabling PiP:", error);
//       }
//     } else {
//       alert(
//         "Picture-in-Picture is not supported by this browser or the video is not ready yet."
//       );
//     }
//   };

//   return (
//     <div className="section-share section-about">
//       <div className="container">
//         <div className="section-about-header">
//           <FormattedMessage id="about.title" />
//         </div>
//         <div className="section-about-content">
//           <div className="content-left">
//             <video
//               ref={videoRef}
//               width="100%"
//               height="400"
//               src="https://www.youtube.com/embed/MhQKe-aERsU" // Replace with a valid video source
//               controls
//             />
//             <button onClick={enablePiP}>Enable Picture-in-Picture</button>
//           </div>
//           <div className="content-right">
//             <p>
//               &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Quasi assumenda eius laudantium quas. Aliquid, sit reiciendis.
//               Repellendus, asperiores similique odit sunt veritatis omnis
//               excepturi, non aperiam dolor cumque delectus perferendis.&rdquo;
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

// import React, { useRef, useEffect, useState } from "react";
// import { FormattedMessage } from "react-intl";

// const About = () => {
//   const videoRef = useRef(null);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   useEffect(() => {
//     const handleMetadataLoad = () => {
//       setIsVideoLoaded(true);
//     };

//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.addEventListener("loadedmetadata", handleMetadataLoad);
//     }

//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener("loadedmetadata", handleMetadataLoad);
//       }
//     };
//   }, []);

//   const enablePiP = async () => {
//     const videoElement = videoRef.current;
//     console.log(videoElement);

//     if (document.pictureInPictureEnabled && videoElement && isVideoLoaded) {
//       try {
//         await videoElement.requestPictureInPicture();
//       } catch (error) {
//         console.error("Error enabling PiP:", error);
//       }
//     } else {
//       alert(
//         "Picture-in-Picture is not supported by this browser or the video is not ready yet."
//       );
//     }
//   };

//   console.log(videoRef);

//   return (
//     <div className="section-share section-about">
//       <div className="container">
//         <div className="section-about-header">
//           <FormattedMessage id="about.title" />
//         </div>
//         <div className="section-about-content">
//           <div className="content-left">
//             {/* <iframe
//               ref={videoRef}
//               width="100%"
//               height="400"
//               src="cat_doi_noi_sau.mp4"
//               title="Ed Sheeran - Shape Of You (cover by J.Fla)"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe> */}
//             <video
//               ref={videoRef}
//               width="100%"
//               height="400"
//               src="cat_doi_noi_sau.mp4" // Đảm bảo đường dẫn đúng đến file video .mp4
//               controls
//             />
//             {/* <button onClick={enablePiP}>Enable Picture-in-Picture</button> */}
//           </div>
//           <div className="content-right">
//             <p>
//               &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Quasi assumenda eius laudantium quas. Aliquid, sit reiciendis.
//               Repellendus, asperiores similique odit sunt veritatis omnis
//               excepturi, non aperiam dolor cumque delectus perferendis.&rdquo;
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
