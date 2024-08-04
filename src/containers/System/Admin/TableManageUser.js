import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "./TableManageUser.scss";
import { fetchAllUserStart, deleteUserStart } from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

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

                    return (
                      <tr key={`user-${index}`}>
                        <th scope="row">{item.id}</th>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
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
                        Not found users
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableManageUser;
