import React from "react";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../Home/HomeHeader";

const DetailSpecialty = (props) => {
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    // Logic when language changes if needed
  }, [language]);

  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className="doctor-detail-container">Hello</div>
    </>
  );
};

export default DetailSpecialty;
