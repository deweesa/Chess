import "./Board.css";
import { useEffect, useState } from "react";
import * as constants from './Pieces';
import GenerateValidMoves from "./ValidMoveFactory";

export default function Board() {
  const rows = 8;
  const cols = 8;

  const [chessBoard, setChessBoard] = useState([]);
  const [counter, setCounter] = useState(0);
  const [inHand, setInHand] = useState(false);
  const [coords, setCoords] = useState([0, 0]);
  const [isWhiteTurn, setTurn] = useState(true);
  const [validMoves, setValidMoves] = useState([]);

//  validMoves.add({row: 3, col: 3})
  useEffect(() => {
    const result = [];

    result.push(constants.B_KING_ROW);
    for(let i = 1; i < rows-1; i++) {
      const row = Array.from(constants.EMPTY.repeat(8));
      result.push(row);
    }
    result.push(constants.W_KING_ROW);
    setChessBoard(result);

    const initValidMoves = GenerateEmptyBoard();
    setValidMoves(initValidMoves);
  }, [])

  const handleClick = (r, c) => {
    let clickedLocation = chessBoard[r][c]
    if(clickedLocation === constants.EMPTY && !inHand) return;

    if(inHand) {
      chessBoard[r][c] = chessBoard[coords[0]][coords[1]];
      chessBoard[coords[0]][coords[1]] = constants.EMPTY;

      setChessBoard(chessBoard);
      setValidMoves(GenerateEmptyBoard());
      setCoords([0,0])
    } else {
      setValidMoves(GenerateValidMoves(clickedLocation, [r,c], chessBoard));
      setCoords([r,c])
    }

    setInHand(!inHand)
  }

  const GenerateEmptyBoard = () => {
    const board = []
    for(let i = 0; i < rows; i++) {
      const row = new Array(cols).fill(0);
      board.push(row);
    } 

    return board;
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
                  >
                    <div>{rIndex}, {cIndex}: {chessBoard[rIndex][cIndex]}</div>
                    {validMoves[rIndex][cIndex]? <div className="circle"/> : ""}
                  </div>
                )
              })}
            </div>)
          })}
      </div>
      <div>
        Player Turn: {isWhiteTurn? "White" : "Black"}
      </div>
    </>
  )
}