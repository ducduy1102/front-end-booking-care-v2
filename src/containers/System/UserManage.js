import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, getAllUsers } from "../../services/userService";
import "./UserManage.scss";
import ModalUser from "./ModalUser";

const UserManage = () => {
  const [arrUsers, setArrUsers] = useState([]);

  // Modal update/create user
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);

  // const dispatch = useDispatch();
  // const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let res = await getAllUsers("ALL");

    if (res && res.errCode === 0) {
      setArrUsers(res.users);
      console.log("list user", res.users);
    }
  };

  const handleAddNewUser = () => {
    setIsOpenModalUser(true);
  };

  const toggleUserModal = async () => {
    setIsOpenModalUser(!isOpenModalUser);
  };

  const confirmCreateNewUser = async (data) => {
    try {
      const res = await createNewUser(data);
      if (res && res.errCode !== 0) {
        alert(res.message);
      } else {
        await fetchUsers();
        setIsOpenModalUser(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-container">
      <div className="container">
        <ModalUser
          isOpen={isOpenModalUser}
          toggleUserModal={toggleUserModal}
          confirmCreateNewUser={confirmCreateNewUser}
        />

        <div className="text-center title">Manage Users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => handleAddNewUser()}
          >
            <i className="fa fa-plus-circle"></i> Add new user
          </button>
        </div>
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
                  <th>RoleId</th>
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
                        <td>{item.gender}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.roleId}</td>
                        <td>
                          <button className="btn-edit">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button type="submit" className="btn-delete">
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

export default UserManage;
