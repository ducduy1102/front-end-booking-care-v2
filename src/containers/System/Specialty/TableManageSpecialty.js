import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { fetchAllSpecialty } from "../../../store/actions";
import { deleteSpecialtyService } from "../../../services/userService";
import { toast } from "react-toastify";
import "./TableManageSpecialty.scss";
import ReactPaginate from "react-paginate";
import { getAllSpecialtiesPagination } from "../../../services/userService";
import ModalDelete from "../../../components/Modal/ModalDelete";

const TableManageSpecialty = (props) => {
  const dispatch = useDispatch();
  const [arrSpecialties, setSpecialties] = useState([]);
  const specialtyRedux = useSelector((state) => state.admin.allSpecialties);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  // Modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  // useEffect(() => {
  //   dispatch(fetchAllSpecialty());
  // }, []);

  useEffect(() => {
    getSpecialtiesPagination();
    // setSpecialties(specialtyRedux);
  }, [currentPage, specialtyRedux]);

  const getSpecialtiesPagination = async () => {
    let res = await getAllSpecialtiesPagination(currentPage, currentLimit);

    if (res && res.errCode === 0) {
      setTotalPages(res.data.totalPages);
      setSpecialties(res.data.specialties);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(Number(event.selected) + 1);
  };

  const handleEditSpecialty = (specialty) => {
    props.handleEditSpecialtyFromParentKey(specialty);
  };

  const handleDeleteSpecialty = async (specialty) => {
    setDataModal(specialty);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const confirmDeleteSpecialty = async () => {
    let res = await deleteSpecialtyService(dataModal.id);
    if (res && res.errCode === 0) {
      toast.success(res.message);
      dispatch(fetchAllSpecialty());
    } else {
      toast.error(res.message);
    }
    setIsShowModalDelete(false);
  };

  return (
    <>
      <div className="mt-3 table-specialty">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th>
                <FormattedMessage id="manage-specialty.name" />
              </th>
              <th>
                <FormattedMessage id="manage-specialty.actions" />
              </th>
            </tr>
          </thead>
          <tbody>
            {arrSpecialties && arrSpecialties.length > 0 ? (
              arrSpecialties.map((item, index) => {
                return (
                  <tr key={`specialty-${index}`}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEditSpecialty(item)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        type="submit"
                        className="btn-delete"
                        onClick={() => handleDeleteSpecialty(item)}
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
                  <td colSpan={3} className="text-center">
                    <FormattedMessage id="manage-specialty.not-found" />
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
      </div>
      <ModalDelete
        type="specialty"
        title={<FormattedMessage id="modal.title-delete-specialty" />}
        question={<FormattedMessage id="modal.question-delete-specialty" />}
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDelete={confirmDeleteSpecialty}
        dataModal={dataModal}
      />
    </>
  );
};

export default TableManageSpecialty;
