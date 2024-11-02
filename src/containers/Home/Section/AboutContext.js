import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./About.scss";
import { useVideo } from "../../../context/VideoContext";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import VideoPlayerContext from "../../../components/VideoPlayer/VideoPlayerContext";

const AboutContext = ({ aboutRef, saveScrollPosition }) => {
  const { state, togglePiP, setPiP } = useVideo();
  const isPiP = state.isPiP;
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Gọi hàm saveScrollPosition từ HomePage để lưu vị trí khi About render
    saveScrollPosition();
  }, [saveScrollPosition]);

  // Bị loop vô tận
  // Khởi tạo trạng thái PiP từ localStorage khi component mount
  // useEffect(() => {
  //   const savedPiPState = JSON.parse(localStorage.getItem("isPiP"));
  //   if (savedPiPState !== null) {
  //     setPiP(savedPiPState);
  //   }
  // }, [setPiP]);
  useEffect(() => {
    const savedPiPState = JSON.parse(localStorage.getItem("isPiP"));
    if (savedPiPState !== null && savedPiPState !== isPiP) {
      setPiP(savedPiPState);
    }
  }, [isPiP, setPiP]);

  // console.log("scrollPosition", scrollPosition);

  useEffect(() => {
    if (aboutRef.current) {
      console.log("aboutRef hiện tại:", aboutRef.current);
      const { top } = aboutRef.current.getBoundingClientRect();
      const scrollY = window.scrollY + top;
      setScrollPosition(scrollY); // Lưu vị trí so với viewport
      console.log("Vị trí cuộn About:", scrollY); // Log vị trí cuộn
    } else {
      console.log("aboutRef chưa được gán!");
    }
  }, [aboutRef]);

  // Hàm lưu vị trí cuộn của About
  const handleExpandPlayer = () => {
    if (!isPiP && aboutRef.current) {
      const { top } = aboutRef.current.getBoundingClientRect(); // Lấy vị trí của About
      setScrollPosition(window.scrollY + top); // Lưu vị trí so với viewport
      console.log("scrollPosition1", scrollPosition);
    } else if (isPiP) {
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
    togglePiP();
  };

  return (
    <div className="section-share section-about" ref={aboutRef}>
      <div className="container">
        <div className="section-about-header">
          <FormattedMessage id="about.title" />
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <VideoPlayerContext
              position={isPiP ? "fixed" : "relative"}
              bottom={isPiP ? "1rem" : "auto"}
              right={isPiP ? "1rem" : "auto"}
              width={isPiP ? "300px" : "100%"}
              onExpandPlayer={handleExpandPlayer}
            />
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

export default AboutContext;
