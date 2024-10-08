import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { fetchAllClinic } from "../../../store/actions";
import { deleteClinicService } from "../../../services/userService";
import { toast } from "react-toastify";
import "./TableManageClinic.scss";
import ReactPaginate from "react-paginate";
import { getAllClinicsPagination } from "../../../services/userService";
import ModalDelete from "../../../components/Modal/ModalDelete";

const TableManageClinic = (props) => {
  const dispatch = useDispatch();
  const [arrClinics, setClinics] = useState([]);
  const clinicRedux = useSelector((state) => state.admin.allClinics);
  const language = useSelector((state) => state.app.language);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  // Modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    dispatch(fetchAllClinic());
  }, []);

  useEffect(() => {
    getClinicsPagination();
    // setClinics(clinicRedux);
  }, [currentPage, clinicRedux]);

  const getClinicsPagination = async () => {
    let res = await getAllClinicsPagination(currentPage, currentLimit);

    if (res && res.errCode === 0) {
      setTotalPages(res.data.totalPages);
      setClinics(res.data.clinics);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(Number(event.selected) + 1);
  };

  const handleEditClinic = (clinic) => {
    props.handleEditClinicFromParentKey(clinic);
  };

  const handleDeleteClinic = async (clinic) => {
    setDataModal(clinic);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const confirmDeleteClinic = async () => {
    let res = await deleteClinicService(dataModal.id);
    if (res && res.errCode === 0) {
      toast.success(res.message);
      dispatch(fetchAllClinic());
    } else {
      toast.error(res.message);
    }
    setIsShowModalDelete(false);
  };

  return (
    <div className="mt-3 table-clinic">
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th>
              <FormattedMessage id="manage-clinic.name" />
            </th>
            <th>
              <FormattedMessage id="manage-clinic.address" />
            </th>
            <th>
              <FormattedMessage id="manage-clinic.actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {arrClinics && arrClinics.length > 0 ? (
            arrClinics.map((item, index) => {
              return (
                <tr key={`clinic-${index}`}>
                  <th scope="row">{item.id}</th>
                  <td>{language === LANGUAGES.VI ? item.name : item.nameEn}</td>
                  <td>{item.address}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditClinic(item)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      type="submit"
                      className="btn-delete"
                      onClick={() => handleDeleteClinic(item)}
                      disabled
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <>
              <tr>
                <td colSpan={4} className="text-center">
                  <FormattedMessage id="manage-clinic.not-found" />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {totalPages > 0 && (
        <ReactPaginate
          nextLabel="&raquo;"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={4}
          pageCount={totalPages}
          previousLabel="&laquo;"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      )}
      <ModalDelete
        type="clinic"
        title={<FormattedMessage id="modal.title-delete-clinic" />}
        question={<FormattedMessage id="modal.question-delete-clinic" />}
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDelete={confirmDeleteClinic}
        dataModal={dataModal}
      />
    </div>
  );
};

export default TableManageClinic;
