import React from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { useMyFormik } from "./script";

interface NewRoomModalProps {
  setShowNewRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

const NewRoomModal: React.FunctionComponent<NewRoomModalProps> = ({
  setShowNewRoomModal,
  showModal,
}) => {
  const formik = useMyFormik({ onClick: setShowNewRoomModal });

  return (
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Criando nova sala
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-2">
            <Form.Group as={Col} md="4" controlId="formRoomName">
              <Form.Label>Nome da sala</Form.Label>
              <Form.Control
                type="text"
                name="roomName"
                value={formik.values.roomName}
                onChange={formik.handleChange}
                isValid={
                  formik.touched.roomName &&
                  !formik.errors.roomName &&
                  formik.values.roomName.length > 3
                }
              />
              {formik.touched.roomName && formik.errors.roomName ? (
                <Form.Text className="text-danger">
                  {formik.errors.roomName}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formNickNameOne">
              <Form.Label>Apelido</Form.Label>
              <Form.Control
                type="text"
                name="nickNameOne"
                value={formik.values.nickNameOne}
                onChange={formik.handleChange}
                isValid={
                  formik.touched.nickNameOne &&
                  !formik.errors.nickNameOne &&
                  formik.values.nickNameOne.length > 3
                }
              />
              {formik.touched.nickNameOne && formik.errors.nickNameOne ? (
                <Form.Text className="text-danger">
                  {formik.errors.nickNameOne}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group as={Col} controlId="formPieceOne">
              <Form.Label>Peça</Form.Label>
              <Form.Control
                as="select"
                name="pieceOne"
                value={formik.values.pieceOne}
                onChange={formik.handleChange}
                isValid={formik.touched.pieceOne && !formik.errors.pieceOne}
              >
                <option value="" disabled>
                  ---Selecionar peça---
                </option>
                <option value="X">X</option>
                <option value="O">O</option>
              </Form.Control>
              {formik.touched.pieceOne && formik.errors.pieceOne ? (
                <Form.Text className="text-danger">
                  {formik.errors.pieceOne}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Row>
          <div className="text-end">
            <Button type="submit" className="me-2">
              Criar
            </Button>
            <Button onClick={() => setShowNewRoomModal(false)}>Fechar</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewRoomModal;
