import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "./TableManageUser.scss";
import { fetchAllUserStart, deleteUserStart } from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

const TableManageUser = (props) => {
  const dispatch = useDispatch();
  const [arrUsers, setArrUsers] = useState([]);
  const language = useSelector((state) => state.app.language);
  const usersRedux = useSelector((state) => state.admin.users);
  const genderRedux = useSelector((state) => state.admin.genders);
  const positionRedux = useSelector((state) => state.admin.positions);
  const roleRedux = useSelector((state) => state.admin.roles);

  useEffect(() => {
    dispatch(fetchAllUserStart());
  }, []);

  useEffect(() => {
    setArrUsers(usersRedux);
  }, [usersRedux]);

  const handleEditUser = (user) => {
    // setUserDataEdit(user);
    props.handleEditUserFromParentKey(user);
  };

  const handleDeleteUser = async (user) => {
    dispatch(deleteUserStart(user.id));
  };

  return (
    <div className="users-container">
      <div className="container">
        <div className="users-content">
          <div className="mt-3 mb-5 table-user">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th>
                    <FormattedMessage id="manage-user.email" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.first-name" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.last-name" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.date-of-birth" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.address" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.gender" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.phone-number" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.role" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.position" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-user.actions" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrUsers && arrUsers.length > 0 ? (
                  arrUsers.map((item, index) => {
                    const gender = genderRedux.find(
                      (g) => g.keyMap === item.gender
                    );
                    const position = positionRedux.find(
                      (p) => p.keyMap === item.positionId
                    );
                    const role = roleRedux.find(
                      (r) => r.keyMap === item.roleId
                    );

                    const getValue = (obj) =>
                      obj
                        ? language === LANGUAGES.VI
                          ? obj.valueVi
                          : obj.valueEn
                        : "";

                    let birthday = +item?.birthday;
                    const dateObj = new Date(birthday * 1000);

                    const locale =
                      language === LANGUAGES.VI ? "vi-VI" : "en-US";

                    const formattedDate = new Intl.DateTimeFormat(locale, {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    }).format(dateObj);

                    return (
                      <tr key={`user-${index}`}>
                        <th scope="row">{item.id}</th>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{formattedDate}</td>
                        <td>{item.address}</td>
                        <td>{getValue(gender)}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{getValue(role)}</td>
                        <td>{getValue(position)}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => handleEditUser(item)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            type="submit"
                            className="btn-delete"
                            onClick={() => handleDeleteUser(item)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan={9} className="text-center">
                        <FormattedMessage id="manage-user.not-found" />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManageUser;
