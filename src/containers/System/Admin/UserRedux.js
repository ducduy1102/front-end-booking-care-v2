import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import {
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
} from "../../../store/actions";
import "../UserManage.scss";
import "./UserRedux.scss";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

const UserRedux = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const genderRedux = useSelector((state) => state.admin.genders);
  const positionRedux = useSelector((state) => state.admin.positions);
  const roleRedux = useSelector((state) => state.admin.roles);
  const isLoading = useSelector((state) => state.admin.isLoading);

  const [isOpen, setIsOpen] = useState(false);
  const [previewImagURL, setPreviewImagURL] = useState("");

  // c2: call api trong redux rồi gọi ra
  useEffect(() => {
    dispatch(fetchGenderStart());
    dispatch(fetchPositionStart());
    dispatch(fetchRoleStart());
  }, [dispatch]);

  // const [genderArr, setGenderArr] = useState([]);
  // useEffect(() => {
  //   setGenderArr(genderRedux);
  // }, [genderRedux]);

  const handleOnChangeImage = (e) => {
    let file = e.target.files[0];
    // console.log("objecturrl", objectUrl);
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      setPreviewImagURL(objectUrl);
    }
  };

  const openPreviewImage = () => {
    if (!previewImagURL) return;
    setIsOpen(true);
  };

  return (
    <div className="container user-redux-container">
      <div className="title">User Manage Redux</div>
      {isLoading === true ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <form className="row g-3">
                <div className="my-3 col-12">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div className="col-md-3">
                  <label htmlFor="email" className="form-label">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email..."
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="password" className="form-label">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password..."
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="firstName" className="form-label">
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name..."
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="lastName" className="form-label">
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name..."
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number..."
                  />
                </div>
                <div className="col-md-9">
                  <label htmlFor="address" className="form-label">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Enter your address..."
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="gender" className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select id="gender" className="form-select" name="gender">
                    {genderRedux &&
                      genderRedux.length > 0 &&
                      genderRedux.map((item, index) => {
                        return (
                          <option key={`gender-${index}`}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="position" className="form-label">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select id="position" className="form-select" name="position">
                    {positionRedux &&
                      positionRedux.length > 0 &&
                      positionRedux.map((item, index) => {
                        return (
                          <option key={`position-${index}`}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="roleId" className="form-label">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select id="roleId" className="form-select" name="roleId">
                    {roleRedux &&
                      roleRedux.length > 0 &&
                      roleRedux.map((item, index) => {
                        return (
                          <option key={`role-${index}`}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="avatar" className="form-label">
                    <FormattedMessage id="manage-user.avatar" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      type="file"
                      name=""
                      id="preview-img"
                      onChange={(e) => handleOnChangeImage(e)}
                      hidden
                    />
                    <label className="label-upload" htmlFor="preview-img">
                      Tải ảnh <i className="fas fa-cloud-upload-alt"></i>
                    </label>
                    <div
                      className="preview-img"
                      style={{
                        backgroundImage: `url(${previewImagURL})`,
                      }}
                      onClick={() => openPreviewImage()}
                    ></div>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isOpen === true && (
        <Lightbox
          mainSrc={previewImagURL}
          onCloseRequest={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserRedux;
