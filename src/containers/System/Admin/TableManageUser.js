import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "./TableManageUser.scss";
import { fetchAllUserStart, deleteUserStart } from "../../../store/actions";
// import { emitter } from "../../utils/emitter";

const TableManageUser = (props) => {
  const dispatch = useDispatch();
  const [arrUsers, setArrUsers] = useState([]);
  // const [userDataEdit, setUserDataEdit] = useState({});
  const usersRedux = useSelector((state) => state.admin.users);

  useEffect(() => {
    dispatch(fetchAllUserStart());
  }, [dispatch]);

  useEffect(() => {
    setArrUsers(usersRedux);
  }, [usersRedux]);

  const handleEditUser = (user) => {
    // setUserDataEdit(user);
    // console.log("edit user", user);
    props.handleEditUserFromParentKey(user);
  };

  const handleDeleteUser = async (user) => {
    dispatch(deleteUserStart(user.id));
  };

  return (
    <div className="users-container">
      <div className="container">
        <div className="users-content">
          <div className="mt-3 table-user">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {arrUsers && arrUsers.length > 0 ? (
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={`user-${index}`}>
                        <th scope="row">{item.id}</th>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          {item.gender === "M"
                            ? "Male"
                            : item.gender === "F"
                            ? "Female"
                            : "Other"}
                        </td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          {item.roleId === "R1"
                            ? "Admin"
                            : item.roleId === "R2"
                            ? "Doctor"
                            : "Patient"}
                        </td>
                        <td>{item.positionId} </td>
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
                        Not found users
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
