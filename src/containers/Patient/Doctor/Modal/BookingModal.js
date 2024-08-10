import React from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { LANGUAGES } from "../../../../utils";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";

const BookingModal = ({ isOpenModal, closeBookingModal, dataTime }) => {
  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    // Logic when language changes if needed
  }, [language]);

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
          {/* {JSON.stringify(dataTime)} */}
          <div className="doctor-infor"></div>
          <div className="price">Giá khám 500000VND</div>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Họ tên
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Số điện thoại
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Email
              </label>
              <input type="email" className="form-control" />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Địa chỉ liên hệ
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="">
              <label className="form-label" htmlFor="">
                Lý do khám
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Đặt cho ai
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-6">
              <label className="form-label" htmlFor="">
                Giới tính
              </label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="booking-modal-footer">
          <button className="btn-booking-confirm">Xác nhận</button>
          <button className="btn-booking-cancel" onClick={closeBookingModal}>
            Hủy
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;
