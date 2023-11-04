import "./Board.css";
import { useEffect, useState } from "react";
import * as constants from './Pieces';

export default function Board() {
  const rows = 8;
  const cols = 8;

  const [chessBoard, setChessBoard] = useState([]);
  const [counter, setCounter] = useState(0);
  const [inHand, setInHand] = useState(false);
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    const result = [];

    result.push(constants.B_KING_ROW);
    result.push(constants.B_PAWN_ROW);
    for(let i = 2; i < rows-2; i++) {
      const row = Array.from(constants.EMPTY.repeat(8));
      result.push(row);
    }
    result.push(constants.W_PAWN_ROW);
    result.push(constants.W_KING_ROW);

    setChessBoard(result);
  }, [])

  const handleClick = (r, c) => {
    //todo: this wokrs perfectly as long as you only click a piece, it's location
    //      and then another piece. If you start clicking "out of order" it's borked
    if(chessBoard[r][c] === constants.EMPTY && !inHand) return;

    if(inHand) {
      chessBoard[r][c] = chessBoard[coords[0]][coords[1]];
      chessBoard[coords[0]][coords[1]] = constants.EMPTY;

      setChessBoard(chessBoard);
      setCoords([0,0])
    } else {
      setCoords([r,c])
    }

    setInHand(!inHand)
  }

  return (
    <>
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
                    onClick={() => handleClick(rIndex, cIndex)}
                    rIndex={rIndex}
                    cIndex={cIndex}
                  >
                    {rIndex}, {cIndex}: {chessBoard[rIndex][cIndex]}
                  </div>
                )
              })}
            </div>)
          })}
      </div>
      
    </>
  )
}