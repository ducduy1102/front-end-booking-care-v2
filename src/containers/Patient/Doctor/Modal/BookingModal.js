import React from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { LANGUAGES } from "../../../../utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import { DatePicker } from "../../../../components/Input";
import { fetchGenderStart } from "../../../../store/actions";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";

const BookingModal = ({ isOpenModal, closeBookingModal, dataTime }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const genderRedux = useSelector((state) => state.admin.genders);

  const defaultValueBooking = {
    fullname: "",
    phoneNumber: "",
    email: "",
    address: "",
    reason: "",
    birthday: "",
    gender: "",
    doctorId: "",
  };

  const [valueBooking, setValueBooking] = useState(defaultValueBooking);
  const [selectedGender, setSelectedGender] = useState("");

  const fetchGenderRedux = () => dispatch(fetchGenderStart());

  useEffect(() => {
    fetchGenderRedux();
  }, []);

  useEffect(() => {
    // Logic when language changes if needed
    if (language || genderRedux.length > 0) {
      setValueBooking({
        ...valueBooking,
        listGenders: buildDataGender(genderRedux),
        gender: selectedGender,
      });
    }
  }, [language, genderRedux, selectedGender]);

  useEffect(() => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let doctorId = dataTime.doctorId;
      let timeType = dataTime.timeType;
      setValueBooking({
        ...valueBooking,
        doctorId: doctorId,
        timeType: timeType,
      });
    }
  }, [dataTime]);

  const buildDataGender = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.forEach((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  const handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...valueBooking };
    stateCopy[id] = valueInput;
    setValueBooking({ ...stateCopy });

    //c2
    // setValueBooking((prevState) => ({
    //   ...prevState,
    //   [id]: valueInput,
    // }));
  };

  const handleOnChangeDatePicker = (date) => {
    setValueBooking({ ...valueBooking, birthday: date[0] });
  };

  const handleChangeSelected = (selectedOptions) => {
    setSelectedGender(selectedOptions);
    // setValueBooking({ ...valueBooking, gender: selectedOptions });
  };

  const handleConfirmBooking = async () => {
    // validate input
    let date = new Date(valueBooking.birthday).getTime();
    console.log("date", date);
    let res = await postPatientBookAppointment({
      fullname: valueBooking.fullname,
      phoneNumber: valueBooking.phoneNumber,
      email: valueBooking.email,
      address: valueBooking.address,
      reason: valueBooking.reason,
      date: valueBooking.birthday,
      gender: valueBooking.gender.value,
      doctorId: valueBooking.doctorId,
      timeType: valueBooking.timeType,
    });

    if (res && res.errCode === 0) {
      toast.success(res.message);
      closeBookingModal();
    } else {
      toast.error(res.message);
    }
  };
  // console.log("valueBooking", valueBooking);

  return (
    <Modal
      isOpen={isOpenModal}
      className="booking-modal-container"
      size="lg"
      centered
    >
      <div className="booking-modal-content">
        <div className="booking-modal-header">
          <span className="header-title">Thông tin đặt lịch khám bệnh</span>
          <span className="header-close" onClick={closeBookingModal}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="booking-modal-body">
          <div className="doctor-infor">
            <ProfileDoctor
              doctorId={dataTime?.doctorId}
              isShowDescriptionDoctor={false}
              dataTime={dataTime}
            />
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label" htmlFor="fullname">
                Họ tên
              </label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                value={valueBooking.fullname}
                onChange={(e) => handleOnChangeInput(e, "fullname")}
              />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="phoneNumber">
                Số điện thoại
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                value={valueBooking.phoneNumber}
                onChange={(e) => handleOnChangeInput(e, "phoneNumber")}
              />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={valueBooking.email}
                onChange={(e) => handleOnChangeInput(e, "email")}
              />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Địa chỉ liên hệ
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={valueBooking.address}
                onChange={(e) => handleOnChangeInput(e, "address")}
              />
            </div>
            <div className="">
              <label className="form-label" htmlFor="">
                Lý do khám
              </label>
              <input
                type="text"
                className="form-control"
                id="reason"
                value={valueBooking.reason}
                onChange={(e) => handleOnChangeInput(e, "reason")}
              />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Ngày sinh
              </label>
              <DatePicker
                onChange={handleOnChangeDatePicker}
                className="form-control date-picker"
                value={valueBooking.birthday}
              />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Giới tính
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="patient.booking-modal.selectGender" />
                }
                defaultValue={selectedGender}
                onChange={handleChangeSelected}
                // options={genders}
                options={valueBooking.listGenders}
              />
            </div>
          </div>
        </div>
        <div className="booking-modal-footer">
          <button
            className="btn-booking-confirm"
            onClick={() => handleConfirmBooking()}
          >
            Xác nhận
          </button>
          <button className="btn-booking-cancel" onClick={closeBookingModal}>
            Hủy
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;
