import React from "react";
import Slider from "react-slick";

const MedicalFacility = (props) => {
  const { settings } = props;
  return (
    <div className="section-share section-medical-facility">
      <div className="container">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="section-custom">
                <div className="bg-img section-medical-facility"></div>
                <div className="section-title">Bệnh viện xây dựng</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-medical-facility"></div>
                <div className="section-title">Bệnh viện xây dựng</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-medical-facility"></div>
                <div className="section-title">Bệnh viện xây dựng</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-medical-facility"></div>
                <div className="section-title">Bệnh viện xây dựng</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-medical-facility"></div>
                <div className="section-title">Bệnh viện xây dựng</div>
              </div>
              <div className="section-custom">
                <div className="bg-img section-medical-facility"></div>
                <div className="section-title">Bệnh viện xây dựng</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalFacility;
