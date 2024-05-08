import { useFormik } from "formik";
import * as yup from "yup";
import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_ROOM_LIST } from "../../utils/serverConstants";
import { RoomList } from "../../use/getRoomList/useSocketGetRoomList";

const socket = getSocketInstance();

interface interfaceMyFormik {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  room: RoomList;
}

export const useMyFormik = ({ onClick, room }: interfaceMyFormik) => {
  const schema = yup.object().shape({
    pieceTwo: yup.string().required("Por favor, selecione uma peça"),
    nickNameTwo: yup.string().required("Por favor, digite um apelido"),
  });

  const formik = useFormik({
    initialValues: {
      pieceTwo: "",
      nickNameTwo: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      const newRoom = { ...values, ...room };
      console.log(newRoom);
      //resetForm();
    },
  });

  return formik;
};

export function whatIsThePiece(params: string): string {
  return params === "X" ? "0" : "X";
}
