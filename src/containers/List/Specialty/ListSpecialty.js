import React from "react";
import BookMark from "../../Home/BookMark";
import HomeHeader from "../../Home/HomeHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import "../../List/List.scss";
import { getAllSpecialtyService } from "../../../services/userService";
import HomeFooter from "../../Home/HomeFooter";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import { useVideo } from "../../../context/VideoContext";
import VideoPlayerContext from "../../../components/VideoPlayer/VideoPlayerContext";

const ListSpecialty = () => {
  const history = useHistory();
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const language = useSelector((state) => state.app.language);
  const intl = useIntl();

  // Redux
  // const isPiP = useSelector((state) => state.admin.isPiP);

  // Context
  const { state } = useVideo();
  const isPiP = state.isPiP;

  useEffect(() => {
    fetchAllSpecialty();
  }, []);

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "list.title.specialty-popular",
    });
  }, [language]);

  const fetchAllSpecialty = async () => {
    let res = await getAllSpecialtyService();
    if (res && res.errCode === 0) {
      setDataSpecialty(res.data ? res.data : []);
    }
  };

  const handleViewDetailSpecialty = (specialty) => {
    history.push(`/detail-specialty/${specialty.id}`);
  };

  return (
    <div>
      <HomeHeader />
      <BookMark name={<FormattedMessage id="list.specialty-popular" />} />
      <div className="container mt-4">
        <div className="list-container">
          <div className="list-header">
            <span className="title-list">
              <FormattedMessage id="list.specialty-popular" />
            </span>
            {/* <button className="btn-list">
              <FormattedMessage id="homepage.more-infor" />
            </button> */}
          </div>
          <div className="list-body">
            {dataSpecialty &&
              dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => {
                return (
                  <div
                    className="list-custom specialty-child"
                    key={`specialty-${index}`}
                    onClick={() => handleViewDetailSpecialty(item)}
                  >
                    <div
                      className="bg-img list-specialty"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="text-center list-title">
                      {language === LANGUAGES.VI ? item.name : item.nameEn}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <hr />
      {/* Redux */}
      {/* <VideoPlayer
        display={isPiP ? "block" : "none"}
        position={isPiP ? "fixed" : ""}
        bottom={isPiP ? "1rem" : ""}
        right={isPiP ? "1rem" : ""}
        width={isPiP ? "300px" : "100%"}
      /> */}

      {/* Context */}
      <VideoPlayerContext
        display={isPiP ? "block" : "none"}
        position={isPiP ? "fixed" : ""}
        bottom={isPiP ? "1rem" : ""}
        right={isPiP ? "1rem" : ""}
        width={isPiP ? "300px" : "100%"}
      />
      <HomeFooter className="p-0" />
    </div>
  );
};

export default ListSpecialty;
