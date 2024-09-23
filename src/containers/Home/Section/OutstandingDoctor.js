import React from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import { fetchTopDoctor } from "../../../store/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LANGUAGES, path } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import NavLinkBookMark from "../NavLinkBookMark";

const OutstandingDoctor = (props) => {
  const history = useHistory();

  const { settings } = props;

  const dispatch = useDispatch();
  const topDoctorsRedux = useSelector((state) => state.admin.topDoctors);
  const language = useSelector((state) => state.app.language);
  const [arrDoctors, setArrDoctors] = useState([]);

  useEffect(() => {
    dispatch(fetchTopDoctor());
  }, []);

  useEffect(() => {
    setArrDoctors(topDoctorsRedux);
  }, [topDoctorsRedux]);

  const handleViewDetailDoctor = (doctor) => {
    history.push(`/detail-doctor/${doctor.id}`);
  };

  return (
    <div className="section-share section-outstanding-doctor">
      <div className="container">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>

            <NavLinkBookMark to={path.LIST_DOCTOR} className="">
              <button className="btn-section">
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </NavLinkBookMark>
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
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="section-custom"
                      key={`top-doctor-${index}`}
                      onClick={() => handleViewDetailDoctor(item)}
                    >
                      <div className="custom-border">
                        <div className="outer-bg">
                          <div
                            className="bg-img section-outstanding-doctor"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                              backgroundColor: "#45c3d2",
                            }}
                          ></div>
                        </div>
                        <div className="text-center position">
                          <div className="section-title">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div className="specialties-name">
                            {language === LANGUAGES.VI
                              ? item.Doctor_Infor.speciatyData.name
                              : item.Doctor_Infor.speciatyData.nameEn}
                          </div>
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
