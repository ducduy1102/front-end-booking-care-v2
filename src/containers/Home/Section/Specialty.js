import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

const Specialty = (props) => {
  const { settings } = props;

  return (
    <div className="section-share section-specialty">
      <div className="container">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="section-custom">
                <div className="bg-img section-specialty"></div>
                <div className="section-title">Cơ xương khớp</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-specialty"></div>
                <div className="section-title">Cơ xương khớp</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-specialty"></div>
                <div className="section-title">Cơ xương khớp</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-specialty"></div>
                <div className="section-title">Cơ xương khớp</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-specialty"></div>
                <div className="section-title">Cơ xương khớp</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-specialty"></div>
                <div className="section-title">Cơ xương khớp</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialty;
