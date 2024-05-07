import { useFormik } from "formik";
import * as yup from "yup";
import { getSocketInstance } from "../../server/instance/socket";
import { CHANGE_ROOM_LIST } from "../../utils/serverConstants";

const socket = getSocketInstance();

interface interfaceMyFormik {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMyFormik = ({ onClick }: interfaceMyFormik) => {
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
    onSubmit: (values) => {
      const room = { ...values, id: socket.id };
      console.log('chamei a função');
      

      socket.emit(CHANGE_ROOM_LIST, room, () => {onClick(false)
        console.log('chamei o callback');
        
      });
    },
  });

  return formik;
};
