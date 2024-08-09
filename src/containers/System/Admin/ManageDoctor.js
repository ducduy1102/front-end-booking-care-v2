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
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  const [hasOldData, sethasOldData] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDoctors());
    dispatch(getRequiredDoctorInfor());
  }, []);

  const buildDataInputSelect = useCallback(
    (inputData, type) => {
      let result = [];
      if (inputData && inputData.length > 0) {
        if (type === "USERS") {
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
        if (type === "PRICE") {
          inputData.forEach((item, index) => {
            let object = {};
            let labelVi = `${item.valueVi} VND`;
            let labelEn = `${item.valueEn} USD`;
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.keyMap;
            result.push(object);
          });
        }
        if (type === "PAYMENT" || type === "PROVINCE") {
          inputData.forEach((item, index) => {
            let object = {};
            let labelVi = item.valueVi;
            let labelEn = item.valueEn;
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.keyMap;
            result.push(object);
          });
        }
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
    if (allRequiredDoctorInforRedux || language) {
      let { resPayment, resPrice, resProvince } = allRequiredDoctorInforRedux;
      let dataSelectPrice = buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = buildDataInputSelect(resProvince, "PROVINCE");
      setValueInforDoctor({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }, [allRequiredDoctorInforRedux, language]);

  const handleOnChangeText = (event, id) => {
    let valueMarkdownCopy = { ...valueMarkdown };
    valueMarkdownCopy[id] = event.target.value;
    setValueMarkdown({
      ...valueMarkdownCopy,
    });

    let valueInforDoctorCopy = { ...valueInforDoctor };
    valueInforDoctorCopy[id] = event.target.value;
    setValueInforDoctor({
      ...valueInforDoctorCopy,
    });
  };

  const handleEditorChange = ({ html, text }) => {
    setValueMarkdown({
      ...valueMarkdown,
      contentMarkdown: text,
      contentHTML: html,
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

  const handleChangeSelectDoctorInfor = useCallback(
    (selectedOption, { name }) => {
      const setterMap = {
        selectedPrice: setSelectedPrice,
        selectedPayment: setSelectedPayment,
        selectedProvince: setSelectedProvince,
      };

      const setter = setterMap[name];
      if (setter) {
        // console.log("name", name);
        // console.log("selectedOption", selectedOption);
        setter(selectedOption);
      }
    },
    []
  );

  const handleSaveDetailDoctorInfor = () => {
    console.log(selectedPayment, selectedPrice, selectedProvince);
    saveDetailDoctorRedux({
      contentHTML: valueMarkdown.contentHTML,
      contentMarkdown: valueMarkdown.contentMarkdown,
      description: valueMarkdown.description,
      doctorId: valueMarkdown.selectedDoctor.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      priceId: selectedPrice.value,
      paymentId: selectedPayment.value,
      provinceId: selectedProvince.value,
      nameClinic: valueInforDoctor.nameClinic || "",
      addressClinic: valueInforDoctor.addressClinic || "",
      note: valueInforDoctor.note || "",
    });
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
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
              defaultValue={selectedDoctor}
              onChange={handleChangeSelected}
              options={listDoctors}
            />
          </div>
          <div className="content-right">
            <label className="label" htmlFor="description">
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              rows={4}
              id="description"
              onChange={(e) => handleOnChangeText(e, "description")}
              value={valueMarkdown.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra">
          <div className="row">
            <div className="col-4 infor-child-block">
              <label className="label">
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.price" />
                }
                defaultValue={selectedPrice}
                onChange={handleChangeSelectDoctorInfor}
                options={valueInforDoctor.listPrice}
                name="selectedPrice"
              />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label">
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.payment" />
                }
                defaultValue={selectedPayment}
                onChange={handleChangeSelectDoctorInfor}
                options={valueInforDoctor.listPayment}
                name="selectedPayment"
              />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label">
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.province" />
                }
                defaultValue={selectedProvince}
                onChange={handleChangeSelectDoctorInfor}
                options={valueInforDoctor.listProvince}
                name="selectedProvince"
              />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label" htmlFor="nameClinic">
                <FormattedMessage id="admin.manage-doctor.name-clinic" />
              </label>
              <input
                id="nameClinic"
                type="text"
                className="form-control"
                onChange={(e) => handleOnChangeText(e, "nameClinic")}
                value={valueInforDoctor.nameClinic}
              />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label" htmlFor="addressClinic">
                <FormattedMessage id="admin.manage-doctor.address-clinic" />
              </label>
              <input
                id="addressClinic"
                type="text"
                className="form-control"
                onChange={(e) => handleOnChangeText(e, "addressClinic")}
                value={valueInforDoctor.addressClinic}
              />
            </div>
            <div className="col-4 infor-child-block">
              <label className="label" htmlFor="note">
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                type="text"
                className="form-control"
                id="note"
                onChange={(e) => handleOnChangeText(e, "note")}
                value={valueInforDoctor.note}
              />
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
          onClick={() => handleSaveDetailDoctorInfor()}
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
