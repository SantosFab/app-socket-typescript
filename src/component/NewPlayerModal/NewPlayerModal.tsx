import React from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { useMyFormik } from "./script";
import { RoomList } from "../../use/getRoomList/interfaceGetRoomList";


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
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {room.roomName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-2">
            <Form.Group as={Col} md="4" controlId="formNickNameTwo">
              <Form.Label>Apelido</Form.Label>
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
              />
              {formik.touched.nickNameTwo && formik.errors.nickNameTwo ? (
                <Form.Text className="text-danger">
                  {formik.errors.nickNameTwo}
                </Form.Text>
              ) : null}
            </Form.Group>
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
