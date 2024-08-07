import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { fetchAllDoctors, fetchAllScheduleTime } from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { DatePicker } from "../../../components/Input";
import moment from "moment";

const ManageSchedule = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const language = useSelector((state) => state.app.language);
  const allDoctorsRedux = useSelector((state) => state.admin.allDoctors);
  const allScheduleTimeRedux = useSelector(
    (state) => state.admin.allScheduleTime
  );

  const [listDoctor, setListDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [rangeTime, setRangeTime] = useState([]);

  console.log("scheduleTime", allScheduleTimeRedux);

  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(fetchAllScheduleTime());
  }, [dispatch]);

  const buildDataInputSelect = useCallback(
    (inputData) => {
      let result = [];
      if (inputData && inputData.length > 0) {
        inputData.forEach((item) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      return result;
    },
    [language]
  );

  useEffect(() => {
    if (allDoctorsRedux || language || allScheduleTimeRedux) {
      const dataSelect = buildDataInputSelect(allDoctorsRedux);
      setListDoctor(dataSelect);
      setRangeTime(allScheduleTimeRedux);
    }
  }, [allDoctorsRedux, allScheduleTimeRedux, language, buildDataInputSelect]);

  const handleChangeSelected = async (selectedDoctor) => {
    setSelectedDoctor(selectedDoctor);
    const dataSelect = buildDataInputSelect(allDoctorsRedux);
    setListDoctor(dataSelect);
    // console.log("doctor", selectedDoctor);
  };

  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(date[0]);
    // console.log("date value", date);
  };

  return (
    <div className="manage-schedule-container">
      <div className="manage-schedule-title">
        <FormattedMessage id="manage-schedule.title" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 form-group">
            <label className="label">
              <FormattedMessage id="manage-schedule.choose-doctor" />
            </label>
            <Select
              defaultValue={selectedDoctor}
              onChange={handleChangeSelected}
              options={listDoctor}
            />
          </div>
          <div className="col-6 form-group">
            <label className="label">
              <FormattedMessage id="manage-schedule.choose-date" />
            </label>
            <DatePicker
              onChange={handleOnChangeDatePicker}
              className="form-control date-picker"
              value={currentDate[0]}
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="pick-hour-container">
          {rangeTime &&
            rangeTime.length > 0 &&
            rangeTime.map((item, index) => {
              return (
                <button key={`time-${index}`} className="btn btn-schedule">
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </button>
              );
            })}
        </div>
        <button className="btn btn-primary">
          <FormattedMessage id="manage-schedule.save" />
        </button>
      </div>
    </div>
  );
};

export default ManageSchedule;
