import { useFormik } from "formik";
import * as yup from "yup";
import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_ROOM_LIST } from "../../utils/serverConstants";

const socket = getSocketInstance();

interface interfaceMyFormik {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

export const useMyFormik = ({ onClick, index }: interfaceMyFormik) => {
  const schema = yup.object().shape({
    pieceOne: yup.string().required("Por favor, selecione uma peça"),
    roomName: yup.string().required("Por favor, digite o nome da sala"),
    nickNameOne: yup.string().required("Por favor, digite um apelido"),
  });

  const formik = useFormik({
    initialValues: {
      pieceOne: "",
      roomName: "",
      nickNameOne: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      const id = `${socket.id}${index}`;

      const room = { ...values, id, index };

      socket.emit(CHANGE_ROOM_LIST, room, () => {
        onClick(false);
        resetForm();
      });
    },
  });

  return formik;
};
