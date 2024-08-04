import React from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import { fetchTopDoctor } from "../../../store/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LANGUAGES } from "../../../utils";

const OutstandingDoctor = (props) => {
  const { settings } = props;

  const dispatch = useDispatch();
  const topDoctorsRedux = useSelector((state) => state.admin.topDoctors);
  const language = useSelector((state) => state.app.language);
  const [arrDoctors, setArrDoctors] = useState([]);

  useEffect(() => {
    dispatch(fetchTopDoctor());
  }, [dispatch]);

  useEffect(() => {
    setArrDoctors(topDoctorsRedux);
  }, [topDoctorsRedux]);

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
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div className="section-custom" key={`top-doctor-${index}`}>
                      <div className="custom-border">
                        <div className="outer-bg">
                          <div
                            className="bg-img section-outstanding-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                        </div>
                        <div className="text-center position">
                          <div className="section-title">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div className="">Thần Kinh</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutstandingDoctor;
