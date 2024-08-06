import React from "react";
import { useSelector } from "react-redux";
import HomeHeader from "../../Home/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { useEffect } from "react";
import { useState } from "react";

const DetailDoctor = (props) => {
  const language = useSelector((state) => state.app.language);

  const [detailDoctor, setDetailDoctor] = useState({});
  console.log(props.match.params.id);

  let nameVi = "";
  let nameEn = "";

  useEffect(() => {
    getDetailInforDoctor();
  }, []);

  const getDetailInforDoctor = async () => {
    if (props.match?.params?.id) {
      let id = props.match.params.id;
      let res = await getDetailInforDoctorService(id);
      if (res && res.errCode === 0) {
        setDetailDoctor(res.data);
      }
      // console.log(detailDoctor);
    }
  };

  if (detailDoctor?.positionData) {
    nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
  }

  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className="doctor-detail-container">
        <div className="container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor?.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="content-right-title">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="content-right-desc">
                {detailDoctor?.Markdown?.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor"></div>
          <div className="detail-info-doctor">
            {detailDoctor?.Markdown?.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </div>
    </>
  );
};

export default DetailDoctor;
