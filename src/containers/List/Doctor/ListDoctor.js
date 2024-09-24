import React from "react";
import BookMark from "../../Home/BookMark";
import HomeHeader from "../../Home/HomeHeader";
import { useEffect } from "react";
import { fetchTopDoctor } from "../../../store/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import "../../List/List.scss";
import HomeFooter from "../../Home/HomeFooter";

const ListDoctor = (props) => {
  const history = useHistory();

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
    <div>
      <HomeHeader />
      <BookMark name={<FormattedMessage id="list.outstanding-doctor" />} />
      <div className="container mt-4">
        <div className="list-container">
          <div className="list-header">
            <span className="title-list">
              <FormattedMessage id="list.outstanding-doctor" />
            </span>
            {/* <button className="btn-list">
              <FormattedMessage id="homepage.more-infor" />
            </button> */}
          </div>
          <div className="list-body">
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
                    className="list-custom"
                    key={`top-doctor-${index}`}
                    onClick={() => handleViewDetailDoctor(item)}
                  >
                    <div className="custom-border">
                      <div className="outer-bg">
                        <div
                          className="bg-img list-outstanding-doctor"
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                            backgroundColor: "#45c3d2",
                          }}
                        ></div>
                      </div>
                      <div className="text-center">
                        <div className="list-title">
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="">
                          {language === LANGUAGES.VI
                            ? item.Doctor_Infor.speciatyData.name
                            : item.Doctor_Infor.speciatyData.nameEn}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <hr />
      <HomeFooter className="p-0" />
    </div>
  );
};

export default ListDoctor;
