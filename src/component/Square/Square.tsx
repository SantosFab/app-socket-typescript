import { FunctionComponent } from "react";
import "./Square.css";

interface SquareProps {
  index: number;
  value: string;
  onClick: () => void;
}

const Square: FunctionComponent<SquareProps> = ({ value, index, onClick }) => {
  return (
    <div className={`Square Square-${index}`} onClick={onClick}>
      {value}
    </div>
  );
};

export default Square;
