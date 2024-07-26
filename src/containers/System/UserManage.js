import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getALLUsers } from "../../services/userService";
import "./UserManage.scss";

const UserManage = () => {
  const [arrUsers, setArrUsers] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    // componentDidMount equivalent
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let res = await getALLUsers("ALL");
    // console.log("res", res);
    if (res && res.errCode === 0) {
      setArrUsers(res.users);
      console.log("list user", res.users);
    }
  };

  return (
    <div className="users-container">
      <div className="text-center title">Manage Users</div>
      <div className="users-table">
        <div className="container">
          <div className="row">
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
                    <th>RoleId</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {arrUsers &&
                    arrUsers.length > 0 &&
                    arrUsers.map((item, index) => {
                      return (
                        <tr key={`user-${index}`}>
                          <th scope="row">{item.id}</th>
                          <td>{item.email}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.address}</td>
                          <td>{item.gender}</td>
                          <td>{item.phoneNumber}</td>
                          <td>{item.roleId}</td>
                          <td>
                            <button className="btn-edit">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button type="submit" className="btn-delete">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
