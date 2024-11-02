import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import "./HomePage.scss";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutstandingDoctor from "./Section/OutstandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import { useIntl } from "react-intl";
import AboutContext from "./Section/AboutContext";

const HomePage = () => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const intl = useIntl();
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    document.title = intl.formatMessage({ id: "homepage.home" });
  }, [language]);

  const aboutRef = useRef(null);

  const [aboutScrollPosition, setAboutScrollPosition] = useState(0);
  const saveScrollPosition = () => {
    if (aboutRef.current) {
      const scrollPosition = aboutRef.current.offsetTop;
      setAboutScrollPosition(scrollPosition); // Lưu vị trí cuộn trong HomePage
      console.log("Vị trí cuộn About trong HomePage:", scrollPosition); // Log vị trí cuộn
    }
  };

  console.log("aboutRef", aboutRef);
  console.log("aboutScrollPosition", aboutScrollPosition);

  return (
    <div>
      <HomeHeader isShowBanner={true} />
      <Specialty settings={settings} />
      <MedicalFacility settings={settings} />
      <OutstandingDoctor settings={settings} />
      <HandBook settings={settings} />
      {/* Redux */}
      {/* <About
        aboutRef={aboutRef}
        saveScrollPosition={saveScrollPosition}
        // handleExpandPlayer={handleExpandPlayer}
      /> */}

      {/* Context */}
      <AboutContext
        aboutRef={aboutRef}
        saveScrollPosition={saveScrollPosition}
      />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
