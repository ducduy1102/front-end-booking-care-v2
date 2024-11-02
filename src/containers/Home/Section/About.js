import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./About.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPiP, togglePiP } from "../../../store/actions";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";

const About = ({ aboutRef, saveScrollPosition }) => {
  const isPiP = useSelector((state) => state.admin.isPiP);
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Gọi hàm saveScrollPosition từ HomePage để lưu vị trí khi About render
    saveScrollPosition();
  }, [saveScrollPosition]);

  // Khởi tạo trạng thái PiP từ localStorage khi component mount
  useEffect(() => {
    const savedPiPState = JSON.parse(localStorage.getItem("isPiP"));
    if (savedPiPState !== null) {
      dispatch(setPiP(savedPiPState));
    }
  }, [dispatch]);

  console.log("scrollPosition", scrollPosition);

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
      setScrollPosition(window.scrollY); // Đặt vị trí cuộn hiện tại trước khi thu nhỏ
      console.log("scrollPosition1", scrollPosition);
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
    dispatch(togglePiP());
  };

  console.log("scrollPosition", scrollPosition);

  return (
    <div className="section-share section-about" ref={aboutRef}>
      <div className="container">
        <div className="section-about-header">
          <FormattedMessage id="about.title" />
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <VideoPlayer
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

export default About;
