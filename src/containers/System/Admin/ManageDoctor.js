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
import _ from "lodash";

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
  };

  // save to doctor_infor table
  const defaultInforDoctor = {
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
  const [listClinics, setListClinics] = useState([]);
  const [listSpecialties, setListSpecialties] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

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
        if (type === "SPECIALTY") {
          inputData.forEach((item, index) => {
            let object = {};
            object.label = item.name;
            object.value = item.id;
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
        selectedDoctor: selectedDoctor,
      });
      // setSelectedDoctor(selectedDoctor);
      setListDoctors(dataSelect);
    }
  }, [allDoctorsRedux, language]);

  useEffect(() => {
    if (allRequiredDoctorInforRedux || language) {
      let { resPayment, resPrice, resProvince, resSpecialty } =
        allRequiredDoctorInforRedux;
      let dataSelectPrice = buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = buildDataInputSelect(resProvince, "PROVINCE");
      let dataSelectSpecialty = buildDataInputSelect(resSpecialty, "SPECIALTY");

      setValueInforDoctor({
        ...valueInforDoctor,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
      });
      setListPrices(dataSelectPrice);
      setListPayments(dataSelectPayment);
      setListProvinces(dataSelectProvince);
      setListSpecialties(dataSelectSpecialty);
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
      selectedPrice: selectedPrice.value,
      selectedPayment: selectedPayment.value,
      selectedProvince: selectedProvince.value,
      selectedSpecialty: selectedSpecialty.value,
    });
    console.log("valueMarkdownCopy", valueMarkdownCopy);
    console.log("valueInforDoctorCopy", valueInforDoctorCopy);
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
    // const dataSelect = buildDataInputSelect(allDoctorsRedux, "USERS");
    let res = await getDetailInforDoctorService(selectedDoctor.value);
    if (res && res.errCode === 0 && res?.data?.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        priceId = "",
        provinceId = "",
        paymentId = "",
        specialtyId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty = "";

      if (res?.data?.Doctor_Infor) {
        let doctor_infor = res.data.Doctor_Infor;
        addressClinic = doctor_infor.addressClinic;
        nameClinic = doctor_infor.nameClinic;
        note = doctor_infor.note;
        priceId = doctor_infor.priceId;
        paymentId = doctor_infor.paymentId;
        provinceId = doctor_infor.provinceId;
        specialtyId = doctor_infor.specialtyId;

        selectedPrice = listPrices.find((item) => item.value === priceId);
        selectedPayment = listPayments.find((item) => item.value === paymentId);
        selectedProvince = listProvinces.find(
          (item) => item.value === provinceId
        );
        selectedSpecialty = listSpecialties.find(
          (item) => item.value === specialtyId
        );
      }

      setValueMarkdown({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        selectedDoctor: selectedDoctor,
      });
      setValueInforDoctor({
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
      });
      // console.log(valueMarkdown);
      // console.log(valueInforDoctor);
      // console.log("selecteddoctor1", selectedDoctor);
      // console.log("selectedPrice1", selectedPrice);
      // console.log("selectedPayment1", selectedPayment);
      // console.log("selectedProvince1", selectedProvince);
      sethasOldData(true);
    } else {
      setValueMarkdown({
        ...defaultInforMarkdown,
        // listDoctor: dataSelect,
        // selectedDoctor: selectedDoctor,
      });
      setValueInforDoctor({
        ...defaultInforDoctor,
      });
      sethasOldData(false);
    }
  };

  // console.log("selecteddoctor3", selectedDoctor);
  // console.log("selectedPrice3", selectedPrice);
  // console.log("selectedPayment3", selectedPayment);
  // console.log("selectedProvince3", selectedProvince);

  const handleChangeSelectDoctorInfor = (selectedOption, { name }) => {
    // let stateCopy = {
    //   ...valueInforDoctor,
    //   // selectedPrice: selectedPrice,
    //   // selectedPayment: selectedPayment,
    //   // selectedProvince: selectedProvince,
    // };
    // stateCopy[name] = selectedOption;
    // setValueInforDoctor({ ...stateCopy });

    // console.log(valueInforDoctor);

    // let _userDoctorInfor = _.cloneDeep(valueInforDoctor);
    // _userDoctorInfor[name] = selectedOption;

    // setValueInforDoctor(_userDoctorInfor);
    // console.log(valueInforDoctor);
    // console.log(_userDoctorInfor[name]);
    // console.log(selectedOption);

    const setterMap = {
      selectedPrice: setSelectedPrice,
      selectedPayment: setSelectedPayment,
      selectedProvince: setSelectedProvince,
      selectedSpecialty: setSelectedSpecialty,
    };

    const setter = setterMap[name];
    if (setter) {
      setter(selectedOption);
    }
    console.log(valueInforDoctor);

    // switch (name) {
    //   case "selectedPrice":
    //     setSelectedPrice(selectedOption);
    //     break;
    //   case "selectedPayment":
    //     setSelectedPayment(selectedOption);
    //     break;
    //   case "selectedProvince":
    //     setSelectedProvince(selectedOption);
    //     break;
    //   default:
    //     break;
    // }
  };

  const handleSaveDetailDoctorInfor = () => {
    console.log(valueInforDoctor);
    console.log(valueMarkdown);
    saveDetailDoctorRedux({
      contentHTML: valueMarkdown.contentHTML,
      contentMarkdown: valueMarkdown.contentMarkdown,
      description: valueMarkdown.description,
      // doctorId: valueMarkdown.selectedDoctor.value,
      doctorId: selectedDoctor.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      // priceId: valueInforDoctor.selectedPrice.value,
      // paymentId: valueInforDoctor.selectedPayment.value,
      // provinceId: valueInforDoctor.selectedProvince.value,
      // priceId: valueInforDoctor
      //   ? valueInforDoctor.selectedPrice.value
      //   : selectedPrice.value,
      priceId: selectedPrice.value,
      paymentId: selectedPayment.value,
      provinceId: selectedProvince.value,
      nameClinic: valueInforDoctor.nameClinic || "",
      addressClinic: valueInforDoctor.addressClinic || "",
      note: valueInforDoctor.note || "",
      clinicId: selectedClinic?.value ? selectedClinic.value : "",
      specialtyId: selectedSpecialty.value,
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
            <label className="form-label">
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
            <label className="form-label" htmlFor="description">
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
          <div className="row g-3">
            <div className="col-4">
              <label className="form-label">
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.price" />
                }
                defaultValue={selectedPrice}
                onChange={handleChangeSelectDoctorInfor}
                options={listPrices}
                name="selectedPrice"
              />
            </div>
            <div className="col-4">
              <label className="form-label">
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.payment" />
                }
                defaultValue={selectedPayment}
                onChange={handleChangeSelectDoctorInfor}
                options={listPayments}
                name="selectedPayment"
              />
            </div>
            <div className="col-4">
              <label className="form-label">
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.province" />
                }
                defaultValue={selectedProvince}
                onChange={handleChangeSelectDoctorInfor}
                options={listProvinces}
                name="selectedProvince"
              />
            </div>
            <div className="col-4">
              <label className="form-label" htmlFor="nameClinic">
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
            <div className="col-4">
              <label className="form-label" htmlFor="addressClinic">
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
            <div className="col-4">
              <label className="form-label" htmlFor="note">
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
            <div className="col-4">
              <label className="form-label">
                <FormattedMessage id="admin.manage-doctor.select-specialty" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-specialty" />
                }
                value={selectedSpecialty}
                onChange={handleChangeSelectDoctorInfor}
                options={listSpecialties}
                name="selectedSpecialty"
              />
            </div>
            <div className="col-4">
              <label className="form-label">
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-clinic" />
                }
                value={selectedClinic}
                onChange={handleChangeSelectDoctorInfor}
                options={listClinics}
                name="selectedClinic"
              />
            </div>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
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
