import React from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { useMyFormik, whatIsThePiece } from "./script";
import { Room } from "../../interface/Room/Room";

interface NewPlayerModalProps {
  setShowNewPlayerModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  room: Room;
}

const NewPlayerModal: React.FunctionComponent<NewPlayerModalProps> = ({
  setShowNewPlayerModal,
  showModal,
  room,
}) => {
  const formik = useMyFormik({ onClick: setShowNewPlayerModal, room });

  const piece = whatIsThePiece(room.pieceOne);

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
          <Row>
            <Form.Group as={Col} controlId="formRoomName">
              <Form.Label className="w-100">Apelido</Form.Label>
              <Form.Control
                type="text"
                name="nickNameTwo"
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
              <Form.Label>peça</Form.Label>
              <Form.Control
                as="select"
                name="pieceTwo"
                value={formik.values.pieceTwo}
                onChange={formik.handleChange}
                isValid={formik.touched.pieceTwo && !formik.errors.pieceTwo}
              >
                <option disabled value="">
                  ---SELECIONAR PEÇA---
                </option>
                <option value={piece}>{piece}</option>
              </Form.Control>
              {formik.touched.pieceTwo && formik.errors.pieceTwo ? (
                <Form.Text className="text-danger">
                  {formik.errors.pieceTwo}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Row>
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
