import React from "react";
import { useSelector } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import { useEffect, useState } from "react";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDateService } from "../../../services/userService";
import { CommonUtils } from "../../../utils";

const DoctorSchedule = (props) => {
  const language = useSelector((state) => state.app.language);
  const [allDays, setAllDays] = useState([]);
  const [allAvailabletime, setAllAvailabletime] = useState([]);

  useEffect(() => {
    fetchDate(language);
  }, [language]);

  const fetchDate = async (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = CommonUtils.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    let res = await getScheduleDoctorByDateService(135, 1723136400000);
    console.log("check res schedule", res);
    setAllDays(allDays);
  };

  const handleOnChangeSelectDate = async (e) => {
    if (props.doctorIdFromParent && props.doctorIdFromParent !== -1) {
      let doctorId = props.doctorIdFromParent;
      let date = e.target.value;
      let res = await getScheduleDoctorByDateService(doctorId, date);
      if (res && res.errCode === 0) {
        setAllAvailabletime(res.data ? res.data : []);
      }
      console.log("check res schedule", res);
    }
  };

  //   if (detailDoctor?.positionData) {
  //     nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
  //     nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
  //   }

  return (
    <div className="doctor-schedule-container">
      <div className="all-schedule">
        <select onChange={(e) => handleOnChangeSelectDate(e)}>
          {allDays &&
            allDays.length > 0 &&
            allDays.map((item, index) => {
              return (
                <option key={`allday-${index}`} value={item.value}>
                  {item.label}
                </option>
              );
            })}
        </select>
      </div>
      <div className="all-available-time">
        <div className="text-calendar">
          <i className="fas fa-calendar-alt"></i>
          <span>Lịch Khám</span>
        </div>
        <div className="time-content">
          {allAvailabletime && allAvailabletime.length > 0 ? (
            allAvailabletime.map((item, index) => {
              let timeDisplay =
                language === LANGUAGES.VI
                  ? item.timeTypeData.valueVi
                  : item.timeTypeData.valueEn;
              return <button key={`time-${index}`}>{timeDisplay}</button>;
            })
          ) : (
            <div className="">
              Không có lịch hẹn trong thời gian này. Vui lòng chọn thời gian
              khác!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
