import { useCallback } from "react";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import { DatePicker } from "../../../components/Input";
import { getAllPatientForDoctorService } from "../../../services/userService";

const ManagePatient = (props) => {
  const language = useSelector((state) => state.app.language);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [dataPatient, setDataPatient] = useState([]);

  useEffect(() => {
    // Logic when language changes if needed
  }, [language]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let formatedDate = new Date(
      new Date(currentDate).setHours(0, 0, 0, 0)
    ).getTime();
    getDataPatient(userInfo, formatedDate);
  };

  const getDataPatient = async (userInfo, formatedDate) => {
    let res = await getAllPatientForDoctorService({
      doctorId: userInfo.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      setDataPatient(res.data);
    }
    console.log("res", res);
  };

  const handleOnChangeDatePicker = useCallback(
    (date) => {
      setCurrentDate(date[0]);
      let formatedDate = new Date(
        new Date(date[0]).setHours(0, 0, 0, 0)
      ).getTime();
      getDataPatient(userInfo, formatedDate);
    },
    [userInfo]
  );

  const handleConfirm = () => {};

  const handleSendInvoice = () => {};

  return (
    <div className="manage-patient-container">
      <div className="manage-patient-title">
        <FormattedMessage id="manage-patient.title" />
      </div>
      <div className="container manage-patient-body">
        <div className="row g-3">
          <div className="col-4">
            <label htmlFor="" className="form-label">
              <FormattedMessage id="manage-patient.select-date" />
            </label>
            <DatePicker
              onChange={handleOnChangeDatePicker}
              className="form-control date-picker"
              value={currentDate}
            />
          </div>
          <div className="mt-3 mb-5 table-manage-patient">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th>
                    <FormattedMessage id="manage-user.email" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-patient.time" />
                  </th>
                  <th>
                    <FormattedMessage id="manage-patient.fullname" />
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
                    <FormattedMessage id="manage-user.actions" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    return (
                      <tr key={`patient-${index}`}>
                        <th scope="row">{item.id}</th>
                        <td>{item?.patientData.email}</td>
                        <td>
                          {language === LANGUAGES.VI
                            ? item?.timeTypeDataPatient.valueVi
                            : item?.timeTypeDataPatient.valueEn}
                        </td>
                        <td>{item?.patientData.firstName}</td>
                        <td>{item?.patientData.address}</td>
                        <td>
                          {language === LANGUAGES.VI
                            ? item?.patientData?.genderData.valueVi
                            : item?.patientData.genderData.valueEn}
                        </td>
                        <td>{item?.patientData.phoneNumber}</td>
                        <td>
                          <button
                            className="btn-confirm"
                            onClick={() => handleConfirm(item)}
                          >
                            <FormattedMessage id="manage-patient.confirm" />
                          </button>
                          <button
                            type="submit"
                            className="btn-send-invoice"
                            onClick={() => handleSendInvoice(item)}
                          >
                            <FormattedMessage id="manage-patient.send" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan={9} className="text-center">
                        <FormattedMessage id="manage-patient.not-found-patient" />
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

export default ManagePatient;
