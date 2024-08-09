import React, { useState, useEffect, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "./ManageDoctor.scss";
import {
  fetchAllDoctors,
  saveDetailDoctor,
  getRequiredDoctorInfor,
} from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforDoctorService } from "../../../services/userService";

const ManageDoctor = (props) => {
  // Initialize a markdown parser
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language);
  const allDoctorsRedux = useSelector((state) => state.admin.allDoctors);
  const allRequiredDoctorInforRedux = useSelector(
    (state) => state.admin.allRequiredDoctorInfor
  );
  const saveDetailDoctorRedux = (data) => dispatch(saveDetailDoctor(data));

  // save to markdown table
  const defaultInforMarkdown = {
    contentMarkdown: "",
    contentHTML: "",
    description: "",
    listDoctor: [],
  };

  // save to doctor_infor table
  const defaultInforDoctor = {
    listPrice: [],
    listPayment: [],
    listProvince: [],
    nameClinic: "",
    addressClinic: "",
    note: "",
  };

  const [valueMarkdown, setValueMarkdown] = useState(defaultInforMarkdown);
  const [valueInforDoctor, setValueInforDoctor] = useState(defaultInforDoctor);
  const [listDoctors, setListDoctors] = useState([]);
  const [listPrices, setListPrices] = useState([]);
  const [listPayments, setListPayments] = useState([]);
  const [listProvinces, setListProvinces] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const [hasOldData, sethasOldData] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(getRequiredDoctorInfor());
  }, []);

  const buildDataInputSelect = useCallback(
    (inputData, type) => {
      let result = [];
      if (inputData && inputData.length > 0) {
        inputData.forEach((item) => {
          let object = {};
          let labelVi =
            type === "USERS"
              ? `${item.lastName} ${item.firstName}`
              : item.valueVi;
          let labelEn =
            type === "USERS"
              ? `${item.firstName} ${item.lastName}`
              : item.valueEn;

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
      let dataSelect = buildDataInputSelect(allDoctorsRedux, "USERS");
      setValueMarkdown({
        ...valueMarkdown,
        listDoctor: dataSelect,
        selectedDoctor: selectedDoctor,
      });
      setListDoctors(dataSelect);
    }
  }, [allDoctorsRedux, language]);

  useEffect(() => {
    console.log(allRequiredDoctorInforRedux);
    if (allRequiredDoctorInforRedux || language) {
      let { resPayment, resPrice, resProvince } = allRequiredDoctorInforRedux;
      let dataSelectPrice = buildDataInputSelect(resPrice);
      let dataSelectPayment = buildDataInputSelect(resPayment);
      let dataSelectProvince = buildDataInputSelect(resProvince);
      console.log(dataSelectPrice, dataSelectPayment, dataSelectProvince);
      setListPrices(dataSelectPrice);
      setListPayments(dataSelectPayment);
      setListProvinces(dataSelectProvince);
    }
  }, [allRequiredDoctorInforRedux, language]);

  const handleOnChangeDesc = (event) => {
    setValueMarkdown({
      ...valueMarkdown,
      description: event.target.value,
    });
  };

  const handleEditorChange = ({ html, text }) => {
    setValueMarkdown({
      ...valueMarkdown,
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  const handleSaveContentMarkdown = () => {
    saveDetailDoctorRedux({
      contentHTML: valueMarkdown.contentHTML,
      contentMarkdown: valueMarkdown.contentMarkdown,
      description: valueMarkdown.description,
      doctorId: valueMarkdown.selectedDoctor.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  const handleChangeSelected = async (selectedDoctor) => {
    setSelectedDoctor(selectedDoctor);
    const dataSelect = buildDataInputSelect(allDoctorsRedux);
    let res = await getDetailInforDoctorService(selectedDoctor.value);
    if (res && res.errCode === 0 && res?.data?.Markdown) {
      let markdown = res.data.Markdown;
      setValueMarkdown({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        selectedDoctor: selectedDoctor,
        listDoctor: dataSelect,
      });
      sethasOldData(true);
    } else {
      setValueMarkdown({
        ...defaultInforMarkdown,
        listDoctor: dataSelect,
        selectedDoctor: selectedDoctor,
      });
      sethasOldData(false);
    }
  };

  return (
    <div className="manage-doctor-container">
      <div className="container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="intro-infor">
          <div className="content-left">
            <label className="label">
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              placeholder="Chọn bác sĩ"
              defaultValue={selectedDoctor}
              onChange={handleChangeSelected}
              options={listDoctors}
            />
          </div>
          <div className="content-right">
            <label className="label" htmlFor="content-right">
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              rows={4}
              name=""
              id="content-right"
              onChange={(e) => handleOnChangeDesc(e)}
              value={valueMarkdown.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra">
          <div className="row">
            <div className="col-4 infor-child-block">
              <label className="label">Chọn giá</label>
              <Select
                placeholder="Chọn giá"
                // defaultValue={selectedDoctor}
                // onChange={handleChangeSelected}
                options={listPrices}
              />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label">Chọn phương thức thanh toán</label>
              <Select
                placeholder="Chọn phương thức thanh toán"
                // defaultValue={selectedDoctor}
                // onChange={handleChangeSelected}
                options={listPayments}
              />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label">Chọn tỉnh/thành</label>
              <Select
                placeholder="Chọn tỉnh/thành"
                // defaultValue={selectedDoctor}
                // onChange={handleChangeSelected}
                options={listProvinces}
              />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label" htmlFor="">
                Tên phòng khám
              </label>
              <input type="text" className="form-control" name="" id="" />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label" htmlFor="">
                Địa chỉ phòng khám
              </label>
              <input type="text" className="form-control" name="" id="" />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label" htmlFor="">
                Note
              </label>
              <input type="text" className="form-control" name="" id="" />
            </div>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={valueMarkdown.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData ? "save-content-doctor" : "create-content-doctor"
          }
          onClick={() => handleSaveContentMarkdown()}
        >
          {hasOldData ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ManageDoctor;
