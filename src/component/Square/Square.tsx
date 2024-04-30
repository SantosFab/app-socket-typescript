import { FunctionComponent } from "react";
import './Square.css'


interface SquareProps {
  value: string;
  onClick: () => void;
}

const Square: FunctionComponent<SquareProps> = ({value, onClick}) => {
  return <div className="square" onClick={onClick}>{value}</div>;
  
};

export default Square;
