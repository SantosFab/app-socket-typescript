import React from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { useMyFormik } from "./script";
import { RoomList } from "../../use/getRoomList/interfaceGetRoomList";
import "./NewPlayerModal.css";

interface NewPlayerModalProps {
  setShowNewPlayerModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  room: RoomList;
}

const NewPlayerModal: React.FunctionComponent<NewPlayerModalProps> = ({
  setShowNewPlayerModal,
  showModal,
  room,
}) => {
  const formik = useMyFormik({ onClick: setShowNewPlayerModal });

  return (
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="d-flex justify-content-center align-items-center"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {room.roomName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div className="inputContainer">
            <Row>
              <Form.Group as={Col} controlId="formRoomName">
                <Form.Label className="w-100">Nome da sala</Form.Label>
                <Form.Control
                  type="text"
                  name="roomName"
                  value={formik.values.nickNameTwo}
                  onChange={formik.handleChange}
                  isValid={
                    formik.touched.nickNameTwo &&
                    !formik.errors.nickNameTwo &&
                    formik.values.nickNameTwo.length > 3
                  }
                  className="w-100"
                />
                {formik.touched.nickNameTwo && formik.errors.nickNameTwo ? (
                  <Form.Text className="text-danger">
                    {formik.errors.nickNameTwo}
                  </Form.Text>
                ) : null}
              </Form.Group>
            </Row>
            <Row className="mb-2 inputPiece">
              <Form.Group as={Col} controlId="formPieceTwo">
                <Form.Label>Peça</Form.Label>
                <Form.Control
                  as="select"
                  name="pieceTwo"
                  value={formik.values.pieceTwo}
                  onChange={formik.handleChange}
                  isValid={formik.touched.pieceTwo && !formik.errors.pieceTwo}
                >
                  <option value="" disabled>
                    ---Selecionar peça---
                  </option>
                  <option value="X">X</option>
                  <option value="O">O</option>
                </Form.Control>
                {formik.touched.pieceTwo && formik.errors.pieceTwo ? (
                  <Form.Text className="text-danger">
                    {formik.errors.pieceTwo}
                  </Form.Text>
                ) : null}
              </Form.Group>
            </Row>
          </div>
          <div className="text-end">
            <Button type="submit" className="me-2">
              Criar
            </Button>
            <Button onClick={() => setShowNewPlayerModal(false)}>Fechar</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewPlayerModal;
