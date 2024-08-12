import React from "react";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorByIdService } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { CommonUtils } from "../../../utils";

const ProfileDoctor = ({ doctorId, isShowDescriptionDoctor, dataTime }) => {
  const language = useSelector((state) => state.app.language);

  const [dataProfile, setDataProfile] = useState({});

  useEffect(() => {
    // Logic when language changes if needed
  }, [language]);

  useEffect(() => {
    const fetchDataDoctor = async () => {
      let data = await getDoctorId(doctorId);
      setDataProfile(data);
    };
    fetchDataDoctor();
  }, []);

  const getDoctorId = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorByIdService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  let nameVi = "",
    nameEn = "";
  if (dataProfile?.positionData) {
    nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
  }

  const renderBookingModal = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      date = CommonUtils.capitalizeFirstLetter(date);
      return (
        <>
          <div className="">
            {time} &nbsp; {date}
          </div>
          <div className="">Miễn phí đặt lịch</div>
        </>
      );
    }
    return <></>;
  };

  // console.log("dataProfile", dataProfile);

  return (
    <div className="profile-doctor-container">
      <div className="container intro-doctor">
        <div
          className="content-left"
          style={{
            backgroundImage: `url(${
              dataProfile?.image ? dataProfile.image : ""
            })`,
          }}
        ></div>
        <div className="content-right">
          <div className="content-right-title">
            {language === LANGUAGES.VI ? nameVi : nameEn}
          </div>
          <div className="content-right-desc">
            {isShowDescriptionDoctor ? (
              <>
                {dataProfile?.Markdown?.description && (
                  <span>{dataProfile.Markdown.description}</span>
                )}
              </>
            ) : (
              <>{renderBookingModal(dataTime)}</>
            )}
          </div>
        </div>
      </div>
      <div className="price">
        <FormattedMessage id="patient.extra-infor-doctor.price" />:{" "}
        {dataProfile?.Doctor_Infor && language === LANGUAGES.VI && (
          <NumberFormat
            className="currency"
            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"VND"}
          />
        )}
        {dataProfile?.Doctor_Infor && language === LANGUAGES.EN && (
          <NumberFormat
            className="currency"
            value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"$"}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDoctor;
