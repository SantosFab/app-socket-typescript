import { useFormik } from "formik";
import * as yup from "yup";
import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_INIT_GAME } from "../../utils/serverConstants";
import { Room } from "../../use/RoomList/useGetRoomList";
import { useNavigate } from "react-router-dom";

const socket = getSocketInstance();

interface interfaceMyFormik {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  room: Room;
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
      const newRoom: Room = { ...values, ...room, idPlayerTwo: socket.id };

      console.log(newRoom);

      socket.emit(CHANGE_INIT_GAME, newRoom, newRoom.index, () => {
        onClick(false);
        resetForm();
        navigate(
          `/GameRoom/${newRoom.id}/${newRoom.pieceTwo}/${newRoom.index}`
        );
      });
    },
  });

  return formik;
};

export function whatIsThePiece(params: string): string {
  return params === "X" ? "0" : "X";
}
