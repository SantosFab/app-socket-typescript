import { Button } from "react-bootstrap";
import { FunctionComponent } from "react";
import "./InputButton.css";

interface InputButtonProps {
  text: string;
  backGroundRed?: boolean;
  backGroundGreen?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const InputButton: FunctionComponent<InputButtonProps> = ({
  text,
  backGroundRed = false,
  backGroundGreen = false,
  disabled = false,
  onClick,
}) => {
  const red = backGroundRed ? "red" : "";
  const green = backGroundGreen ? "green" : "";

  return (
    <Button
      className={`${red} ${green}`}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {text}
    </Button>
  );
};

export default InputButton;
