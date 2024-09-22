import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormattedMessage } from "react-intl";
import "./ModalDelete.scss";

const ModalDelete = ({
  type = "",
  title = "",
  show = "",
  question = "",
  handleClose = () => {},
  confirmDelete = () => {},
  dataModal,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <span className="header-close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </span>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {question}
          {type === "user" ? `"${dataModal.email}"` : `"${dataModal.name}"`}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <FormattedMessage id="modal.close" />
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            <FormattedMessage id="modal.delete" />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
