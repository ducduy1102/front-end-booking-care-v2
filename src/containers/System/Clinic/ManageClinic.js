import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import "./ManageClinic.scss";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import { useState } from "react";
import _ from "lodash";
import { createNewClinicService } from "../../../services/userService";
import { toast } from "react-toastify";

// Initialize a markdown parser
const mdParser = new MarkdownIt();

const ManageClinic = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  const defaultValueClinic = {
    name: "",
    address: "",
    imageBase64: "",
    descriptionHTML: "",
    descriptionMarkdown: "",
  };

  const [valueClinic, setValueClinic] = useState(defaultValueClinic);

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  const handleOnChangeInput = (event, name) => {
    let _clinicData = _.cloneDeep(valueClinic);
    _clinicData[name] = event.target.value;

    setValueClinic(_clinicData);
  };

  // Sửa lại tương tự như hàm handleOnChangeInput, thêm 1 cái name vào
  const handleEditorChange = ({ html, text }) => {
    setValueClinic({
      ...valueClinic,
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
      setValueClinic({ ...valueClinic, imageBase64: base64 });
    }
  };

  const handleSaveNewClinic = async () => {
    let res = await createNewClinicService(valueClinic);
    if (res && res.errCode === 0) {
      toast.success(res.message);
      setValueClinic(defaultValueClinic);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="container manage-clinic-container">
      <div className="manage-clinic-title">
        <FormattedMessage id="manage-clinic.title" />
      </div>
      <div className="add-new-clinic row g-3">
        <div className="col-6">
          <label htmlFor="name" className="form-label">
            <FormattedMessage id="manage-clinic.name" />
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={valueClinic.name}
            onChange={(e) => handleOnChangeInput(e, "name")}
          />
        </div>
        <div className="col-6">
          <label htmlFor="" className="form-label">
            <FormattedMessage id="manage-clinic.image" />
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleOnChangeImage(e)}
          />
        </div>
        <div className="address-clinic col-6">
          <label htmlFor="address" className="form-label">
            <FormattedMessage id="manage-clinic.address" />
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={valueClinic.address}
            onChange={(e) => handleOnChangeInput(e, "address")}
          />
        </div>
        <div className="md-editor-child">
          <label className="form-label">
            <FormattedMessage id="manage-clinic.description" />
          </label>
          <MdEditor
            style={{ height: "400px", width: "100%" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={valueClinic.descriptionMarkdown}
          />
        </div>
        <div className="">
          <button
            className="btn-save-clinic"
            onClick={() => handleSaveNewClinic()}
          >
            <FormattedMessage id="manage-clinic.btn-save" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageClinic;
