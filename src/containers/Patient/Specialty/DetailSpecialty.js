import React from "react";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../Home/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";

const DetailSpecialty = (props) => {
  const language = useSelector((state) => state.app.language);
  const arrDoctorId = [122, 131, 134, 135];
  useEffect(() => {
    // Logic when language changes if needed
  }, [language]);

  return (
    <div className="detail-specialty-container">
      <HomeHeader isShowBanner={false} />
      <div className="description-specialty">
        <div className="container">hi</div>
      </div>
      <div className="child-doctor-container">
        <div className="container">
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="child-doctor" key={`detail-doctor-${index}`}>
                  <div className="detail-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        // dataTime={dataTime}
                      />
                    </div>
                  </div>
                  <div className="detail-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra-infor">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailSpecialty;
