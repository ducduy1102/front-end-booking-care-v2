import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";
import "./ManageSpecialty.scss";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import { useState } from "react";
import _ from "lodash";
import { createNewSpecialtyService } from "../../../services/userService";
import { toast } from "react-toastify";

// Initialize a markdown parser
const mdParser = new MarkdownIt();

const ManageSpecialty = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  const defaultValueSpecialty = {
    name: "",
    imageBase64: "",
    descriptionHTML: "",
    descriptionMarkdown: "",
  };

  const [valueSpecialty, setValueSpecialty] = useState(defaultValueSpecialty);

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  const handleOnChangeInput = (event, name) => {
    let _userData = _.cloneDeep(valueSpecialty);
    _userData[name] = event.target.value;

    setValueSpecialty(_userData);
  };

  const handleEditorChange = ({ html, text }) => {
    setValueSpecialty({
      ...valueSpecialty,
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  const handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("base64 file image: ", base64);
      // let objectUrl = URL.createObjectURL(file);
      // setPreviewImgURL(objectUrl);
      setValueSpecialty({ ...valueSpecialty, imageBase64: base64 });
    }
  };

  const handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialtyService(valueSpecialty);
    if (res && res.errCode === 0) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="container manage-specialty-container">
      <div className="manage-specialty-title">Manage Specialty</div>
      <div className="add-new-specialty row g-3">
        <div className="col-6">
          <label htmlFor="name" className="form-label">
            Tên chuyên khoa
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={valueSpecialty.name}
            onChange={(e) => handleOnChangeInput(e, "name")}
          />
        </div>
        <div className="col-6">
          <label htmlFor="" className="form-label">
            Tên chuyên khoa
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleOnChangeImage(e)}
          />
        </div>
        <div className="md-editor-container">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={valueSpecialty.descriptionMarkdown}
          />
        </div>
        <div className="">
          <button
            className="btn-save-specialty"
            onClick={() => handleSaveNewSpecialty()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSpecialty;
