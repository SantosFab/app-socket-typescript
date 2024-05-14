import { FunctionComponent } from "react";
import "./Square.css";
import { TypePiece } from "../../interface/Type/typePiece";

interface SquareProps {
  WhoPlays: TypePiece;
  index: number;
  value: string;
  onClick: () => void;
}

const Square: FunctionComponent<SquareProps> = ({
  value,
  index,
  WhoPlays,
  onClick,
}) => {
  return (
    <div
      className={`Square Square-${index} ${value} whoPlays-${WhoPlays}`}
      onClick={onClick}
    ></div>
  );
};

export default Square;
