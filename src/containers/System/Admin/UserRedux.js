import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

const UserRedux = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const [genderArr, setGenderArr] = useState([]);

  useEffect(() => {
    // componentDidMount equivalent
    fetchAllCode();
  }, []);

  const fetchAllCode = async () => {
    try {
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        setGenderArr(res.data);
      }
      // console.log("check data", genderArr);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container user-redux-container">
      <div className="title">User Manage Redux</div>
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
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((item, index) => {
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
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="roleId" className="form-label">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select id="roleId" className="form-select" name="roleId">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="image" className="form-label">
                  <FormattedMessage id="manage-user.avatar" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  placeholder="Enter your avatar..."
                />
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
    </div>
  );
};

export default UserRedux;
