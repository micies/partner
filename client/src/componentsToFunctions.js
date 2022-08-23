import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";

export function Input({ value, id,onChange, name, disabled }) {
  return (
    <div className="form-group">
      <input
        className="form-control"
        value={value}
        id={id}
        onChange={onChange}
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
          <Modal.Title> delete id </Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{confirmFunc(); handleClose()}}>
            delete 
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
