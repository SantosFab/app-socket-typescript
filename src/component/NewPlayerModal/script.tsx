import { useFormik } from "formik";
import * as yup from "yup";
import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_INIT_GAME } from "../../utils/serverConstants";
import { useNavigate } from "react-router-dom";
import { Room } from "../../interface/Room/Room";

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

interface InterfaceWhatIsThePiece {
  pieceOne: string | undefined;
  pieceTwo: string | undefined;
}

export function whatIsThePiece({
  pieceOne,
  pieceTwo,
}: InterfaceWhatIsThePiece): string {
  if (pieceOne !== undefined && (pieceOne === "X" || pieceOne === "O")) {
    return pieceOne === "X" ? "O" : "X";
  } else if (pieceTwo !== undefined && (pieceTwo === "X" || pieceTwo === "O")) {
    return pieceTwo === "X" ? "O" : "X";
  }
  return "Ocorreu um erro!";
}
