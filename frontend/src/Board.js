import "./Board.css";
import { useEffect, useState } from "react";
import * as constants from './Pieces';

export default function Board() {
  const rows = 8;
  const cols = 8;

  const [chessBoard, setChessBoard] = useState([]);
  useEffect(() => {
    const result = [];

    result.push(constants.B_KING_ROW);
    result.push(constants.B_PAWN_ROW);
    for(let i = 2; i < rows-2; i++) {
      const row = Array.from({ length: cols});
      result.push(row);
    }
    result.push(constants.W_PAWN_ROW);
    result.push(constants.W_KING_ROW);

    setChessBoard(result);
  }, [])

  return (
    <div className="board">
      {chessBoard.length > 0 &&
        chessBoard.map((row, rIndex) => {
          return (<div className="row" key={rIndex}>
            {row.map((_, cIndex) => {
              return (
                <div
                  className={`box ${
                    (rIndex + cIndex) % 2 === 1
                      ? "black" : "white"
                  }`}
                  key={cIndex}
                >
                  {rIndex}, {cIndex}: {chessBoard[rIndex][cIndex]}
                </div>
              )
            })}
          </div>)
        })}
    </div>
  )
}