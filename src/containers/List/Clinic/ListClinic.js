import React from "react";
import BookMark from "../../Home/BookMark";
import HomeHeader from "../../Home/HomeHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import "../../List/List.scss";
import "./ListClinic.scss";
import { getAllClinicService } from "../../../services/userService";
import HomeFooter from "../../Home/HomeFooter";

const ListClinic = () => {
  const history = useHistory();
  const [dataClinics, setDataClinics] = useState([]);
  const language = useSelector((state) => state.app.language);
  const intl = useIntl();

  useEffect(() => {
    fetchClinics();
  }, []);

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "list.title.outstanding-medical-facilities",
    });
  }, [language]);

  const fetchClinics = async () => {
    let res = await getAllClinicService();

    if (res && res.errCode === 0) {
      setDataClinics(res.data ? res.data : []);
    }
  };

  const handleViewDetailClinic = (clinic) => {
    history.push(`/detail-clinic/${clinic.id}`);
  };
  return (
    <div>
      <HomeHeader />
      <BookMark
        name={<FormattedMessage id="list.outstanding-medical-facilities" />}
      />
      <div className="container mt-4">
        <div className="list-container">
          <div className="list-header">
            <span className="title-list">
              <FormattedMessage id="list.outstanding-medical-facilities" />
            </span>
            {/* <button className="btn-list">
              <FormattedMessage id="homepage.more-infor" />
            </button> */}
          </div>
          <div className="list-body">
            {dataClinics &&
              dataClinics.length > 0 &&
              dataClinics.map((item, index) => {
                return (
                  <div
                    className="list-custom clinic-child"
                    key={`clinic-${index}`}
                    onClick={() => handleViewDetailClinic(item)}
                  >
                    <div
                      className="bg-img list-clinic"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="text-center list-title">
                      {language === LANGUAGES.VI ? item.name : item.nameEn}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <hr />
      <HomeFooter className="p-0 " />
    </div>
  );
};

export default ListClinic;
