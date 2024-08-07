import React, { useState, useEffect, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "./ManageDoctor.scss";
import { fetchAllDoctors, saveDetailDoctor } from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforDoctorService } from "../../../services/userService";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

const ManageDoctor = (props) => {
  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const allDoctorsRedux = useSelector((state) => state.admin.allDoctors);
  const saveDetailDoctorRedux = (data) => dispatch(saveDetailDoctor(data));

  // const [listDoctors, setListDoctors] = useState([]);
  const defaultInforDoctor = {
    contentMarkdown: "",
    contentHTML: "",
    description: "",
    listDoctor: [],
    // selectedDoctor: null,
  };
  const [valueDoctor, setValueDoctor] = useState(defaultInforDoctor);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [hasOldData, sethasOldData] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  const buildDataInputSelect = useCallback(
    (inputData) => {
      let result = [];
      if (inputData && inputData.length > 0) {
        inputData.forEach((item) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      return result;
    },
    [language]
  );

  useEffect(() => {
    if (allDoctorsRedux || language) {
      const dataSelect = buildDataInputSelect(allDoctorsRedux);
      setValueDoctor({
        ...valueDoctor,
        listDoctor: dataSelect,
        selectedDoctor: selectedDoctor,
      });
    }
  }, [allDoctorsRedux, language, selectedDoctor, buildDataInputSelect]);

  const handleOnChangeDesc = (event) => {
    setValueDoctor({
      ...valueDoctor,
      description: event.target.value,
    });
  };

  const handleEditorChange = ({ html, text }) => {
    setValueDoctor({
      ...valueDoctor,
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  const handleSaveContentMarkdown = () => {
    saveDetailDoctorRedux({
      contentHTML: valueDoctor.contentHTML,
      contentMarkdown: valueDoctor.contentMarkdown,
      description: valueDoctor.description,
      doctorId: valueDoctor.selectedDoctor.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  const handleChangeSelected = async (selectedDoctor) => {
    setSelectedDoctor(selectedDoctor);
    const dataSelect = buildDataInputSelect(allDoctorsRedux);
    let res = await getDetailInforDoctorService(selectedDoctor.value);
    // console.log(`Option selected:`, res);
    if (res && res.errCode === 0 && res?.data?.Markdown) {
      let markdown = res.data.Markdown;
      setValueDoctor({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        selectedDoctor: selectedDoctor,
        listDoctor: dataSelect,
      });
      sethasOldData(true);
    } else {
      setValueDoctor({
        ...defaultInforDoctor,
        listDoctor: dataSelect,
        selectedDoctor: selectedDoctor,
      });
      sethasOldData(false);
    }
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
              onChange={handleChangeSelected}
              options={valueDoctor.listDoctor}
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
            value={valueDoctor.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData ? "save-content-doctor" : "create-content-doctor"
          }
          onClick={() => handleSaveContentMarkdown()}
        >
          {hasOldData ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>}
        </button>
      </div>
    </div>
  );
};

export default ManageDoctor;
