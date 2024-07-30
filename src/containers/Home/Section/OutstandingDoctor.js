import React from "react";
import Slider from "react-slick";

const OutstandingDoctor = (props) => {
  const { settings } = props;
  return (
    <div className="section-share section-outstanding-doctor">
      <div className="container">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="section-custom">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor"></div>
                  </div>
                  <div className="text-center position">
                    <div className="section-title">
                      Giáo sư, Tiến sĩ, Bác sĩ Minions
                    </div>
                    <div className="">Thần Kinh</div>
                  </div>
                </div>
              </div>
              <div className="section-custom">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor"></div>
                  </div>
                  <div className="text-center position">
                    <div className="section-title">
                      Giáo sư, Tiến sĩ, Bác sĩ Minions
                    </div>
                    <div className="">Thần Kinh</div>
                  </div>
                </div>
              </div>
              <div className="section-custom">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor"></div>
                  </div>
                  <div className="text-center position">
                    <div className="section-title">
                      Giáo sư, Tiến sĩ, Bác sĩ Minions
                    </div>
                    <div className="">Thần Kinh</div>
                  </div>
                </div>
              </div>
              <div className="section-custom">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor"></div>
                  </div>
                  <div className="text-center position">
                    <div className="section-title">
                      Giáo sư, Tiến sĩ, Bác sĩ Minions
                    </div>
                    <div className="">Thần Kinh</div>
                  </div>
                </div>
              </div>
              <div className="section-custom">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor"></div>
                  </div>
                  <div className="text-center position">
                    <div className="section-title">
                      Giáo sư, Tiến sĩ, Bác sĩ Minions
                    </div>
                    <div className="">Thần Kinh</div>
                  </div>
                </div>
              </div>
              <div className="section-custom">
                <div className="custom-border">
                  <div className="outer-bg">
                    <div className="bg-img section-outstanding-doctor"></div>
                  </div>
                  <div className="text-center position">
                    <div className="section-title">
                      Giáo sư, Tiến sĩ, Bác sĩ Minions
                    </div>
                    <div className="">Thần Kinh</div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutstandingDoctor;
