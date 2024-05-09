import { useFormik } from "formik";
import * as yup from "yup";
import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_START_GAMER } from "../../utils/serverConstants";
import { RoomList } from "../../use/getRoomList/useSocketGetRoomList";
import { useNavigate } from "react-router-dom";

const socket = getSocketInstance();

interface interfaceMyFormik {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  room: RoomList;
}

export const useMyFormik = ({ onClick, room }: interfaceMyFormik) => {
  const navigate = useNavigate();
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
      const newRoom: RoomList = { ...values, ...room, idPlayerTwo: socket.id };

      console.log(newRoom);

      socket.emit(CHANGE_START_GAMER, newRoom, newRoom.index, () => {
        onClick(false);
        resetForm();
        navigate(`/GameRoom/${newRoom.id}/${newRoom.pieceTwo}`);
      });
    },
  });

  return formik;
};

export function whatIsThePiece(params: string): string {
  return params === "X" ? "0" : "X";
}
