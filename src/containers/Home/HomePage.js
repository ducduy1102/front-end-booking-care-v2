import React, { useEffect } from "react";
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

  return (
    <div>
      <HomeHeader isShowBanner={true} />
      <Specialty settings={settings} />
      <MedicalFacility settings={settings} />
      <OutstandingDoctor settings={settings} />
      <HandBook settings={settings} />
      <About />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
