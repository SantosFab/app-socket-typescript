import { Button } from "react-bootstrap";
import { FunctionComponent } from "react";
import "./InputButton.css";

interface InputButtonProps {
  text: string;
  backGroundRed?: boolean;
  backGroundGreen?: boolean;
}

const InputButton: FunctionComponent<InputButtonProps> = ({
  text,
  backGroundRed = false,
  backGroundGreen = false,
}) => {
  const red = backGroundRed ? "red" : "";
  const green = backGroundGreen ? "green" : "";

  return <Button className={`${red} ${green}`}>{text}</Button>;
};

export default InputButton;
