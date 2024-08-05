import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "./ManageDoctor.scss";
import {} from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

const ManageDoctor = (props) => {
  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const dispatch = useDispatch();
  const [arrUsers, setArrUsers] = useState([]);
  const language = useSelector((state) => state.app.language);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const defaultInforDoctor = {
    contentMarkdown: "",
    contentHTML: "",
    description: "",
    selectedDoctor: {},
  };
  const [valueDoctor, setValueDoctor] = useState(defaultInforDoctor);

  useEffect(() => {
    // dispatch(fetchAllUserStart());
  }, []);

  useEffect(() => {
    // setArrUsers(usersRedux);
  }, []);

  const handleSaveContentMarkdown = () => {
    console.log("valuedoctor", valueDoctor);
  };

  const handleOnChangeDesc = (event) => {
    setValueDoctor({
      ...valueDoctor,
      description: event.target.value,
      selectedDoctor: selectedDoctor,
    });
  };

  const handleEditorChange = ({ html, text }) => {
    setValueDoctor({
      ...valueDoctor,
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  return (
    <div className="manage-doctor-container">
      <div className="container">
        <div className="manage-doctor-title">Tạo thông tin chi tiết bác sĩ</div>
        <div className="intro-info">
          <div className="content-left">
            <label htmlFor="doctor">Chọn bác sĩ</label>
            <Select
              defaultValue={selectedDoctor}
              onChange={setSelectedDoctor}
              options={options}
            />
          </div>
          <div className="content-right">
            <label htmlFor="content-right">Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows={4}
              name=""
              id="content-right"
              onChange={(e) => handleOnChangeDesc(e)}
              value={valueDoctor.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={() => handleSaveContentMarkdown()}
        >
          Lưu thông tin
        </button>
      </div>
    </div>
  );
};

export default ManageDoctor;
