import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";

export function GetInput({ value, name, disabled }) {
  return (
    <div className="form-group">
      <input
        className="form-control"
        value={value}
        type="text"
        name={name}
        disabled={disabled}
      />
    </div>
  );
}

export function ModalDelete({ confirmFunc, text }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <Button
        className="button-33"
        variant="primary"
        onClick={handleShow}
      >
        <BsTrashFill />
      </Button>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header>
          <Modal.Title> מחיקת id </Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmFunc}>
            מחק 
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            יציאה
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
