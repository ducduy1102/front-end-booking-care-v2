import React, { useState, useEffect } from "react";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialtyService } from "../../../services/userService";
import "./Specialty.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Specialty = (props) => {
  const { settings } = props;
  const history = useHistory();
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    fetchAllSpecialty();
  }, []);

  const fetchAllSpecialty = async () => {
    let res = await getAllSpecialtyService();
    if (res && res.errCode === 0) {
      setDataSpecialty(res.data ? res.data : []);
    }
  };

  const handleViewDetailSpecialty = (specialty) => {
    history.push(`/detail-specialty/${specialty.id}`);
  };

  return (
    <div className="section-share section-specialty">
      <div className="container">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.specialty-popular" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-custom specialty-child"
                      key={`specialty-${index}`}
                      onClick={() => handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="bg-img section-specialty"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="text-center section-title specialty-name">
                        {language === LANGUAGES.VI ? item.name : item.nameEn}
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

export default Specialty;
