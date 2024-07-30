import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpg";

const Specialty = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="section-specialty">
      <div className="container">
        <div className="specialty-container">
          <div className="specialty-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="specialty-custom">
                <div className="bg-img"></div>
                <div className="specialty-title">Cơ xương khớp</div>
              </div>
              <div className="specialty-custom">
                <div className="bg-img"></div>
                <div className="specialty-title">Cơ xương khớp</div>
              </div>
              <div className="specialty-custom">
                <div className="bg-img"></div>
                <div className="specialty-title">Cơ xương khớp</div>
              </div>
              <div className="specialty-custom">
                <div className="bg-img"></div>
                <div className="specialty-title">Cơ xương khớp</div>
              </div>
              <div className="specialty-custom">
                <div className="bg-img"></div>
                <div className="specialty-title">Cơ xương khớp</div>
              </div>
              <div className="specialty-custom">
                <div className="bg-img"></div>
                <div className="specialty-title">Cơ xương khớp</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialty;
