import { FunctionComponent } from "react";
import "./Square.css";
import { TypePiece } from "../../interface/Type/typePiece";

interface SquareProps {
  piece?: string;
  WhoPlays: TypePiece;
  index: number;
  value: string;
  onClick: () => void;
}

const Square: FunctionComponent<SquareProps> = ({
  piece,
  value,
  index,
  WhoPlays,
  onClick,
}) => {
  return (
    <div
      className={`Square Square-${index} ${value} whoPlays-${WhoPlays} piece-${
        piece === WhoPlays
      }`}
      onClick={onClick}
    ></div>
  );
};

export default Square;
