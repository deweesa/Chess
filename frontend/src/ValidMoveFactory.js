import { getByAltText } from "@testing-library/react";
import * as constants from "./Pieces";

export function GenerateValidMoves(piece, coords, board) {
  const validMoves = [];
  for (let i = 0; i < 8; i++) {
    const row = new Array(8).fill(0);
    validMoves.push(row);
  }

  switch (piece) {
    case constants.W_KING:
    case constants.B_KING:
      return KingsMoves(coords, board, validMoves);
    case constants.W_QUEEN:
    case constants.B_QUEEN:
      return QueensMoves(coords, board, validMoves);
    case constants.W_BISHOP:
    case constants.B_BISHOP:
      return BishopsMoves(coords, board, validMoves);
    case constants.W_KNIGHT:
    case constants.B_KNIGHT:
      return KnightsMoves(coords, board, validMoves);
    case constants.W_ROOK:
    case constants.B_ROOK:
      return RooksMoves(coords, board, validMoves);
    default:
      return PawnMoves(coords, board, validMoves);
  }
}

function KingsMoves(coords, board, validMoves) {
  for (let rowRunner = coords[0] - 1; rowRunner <= coords[0] + 1; rowRunner++) {
    for (let colRunner = coords[1] - 1; colRunner <= coords[1] + 1; colRunner++) {
      if (
        rowRunner >= 0 &&
        colRunner >= 0 &&
        rowRunner < 8 &&
        colRunner < 8 
      ) {
        if(board[rowRunner][colRunner] === constants.EMPTY)
          validMoves[rowRunner][colRunner] = 1;
        else if(IsOpponent(board[coords[0]][coords[1]], board[rowRunner][colRunner])) {
          validMoves[rowRunner][colRunner] = 2;
          break;
        }
      }
    }
  }

  return validMoves;
}

function QueensMoves(coords, board, validMoves) {
  validMoves = RooksMoves(coords, board, validMoves);
  validMoves = BishopsMoves(coords, board, validMoves);
  return validMoves;
}

function BishopsMoves(coords, board, validMoves) {
  let dirs = [-1, 1];
  let currPiece = board[coords[0]][coords[1]];
  let rowMove, colMove

  for(let i in dirs) {
    rowMove = dirs[i];
    for(let j in dirs) {
      colMove = dirs[j];

      let rowRunner = coords[0];
      let colRunner = coords[1];

      rowRunner += rowMove;
      colRunner += colMove;

      while(OnBoard(rowRunner, colRunner)) {
        let position = board[rowRunner][colRunner]
        if(position === constants.EMPTY)
          validMoves[rowRunner][colRunner] = 1;
        else if (IsOpponent(currPiece, position)) {
          validMoves[rowRunner][colRunner] = 2;
          break
        } else {
          break
        }

        rowRunner += rowMove
        colRunner += colMove
      }
    }
  }

  return validMoves;
}

function KnightsMoves(coords, board, validMoves) {
  let rowDirs = [-1, 1, 2, 2, 1, -1, -2, -2]
  let colDirs = [2, 2, 1, -1, -2, -2, -1, 1]

  let currPiece = board[coords[0]][coords[1]];
  let rowMove, colMove;

  for(let i in rowDirs) {
    rowMove = rowDirs[i]
    colMove = colDirs[i]

    let rowRunner = coords[0];
    let colRunner = coords[1];

    rowRunner += rowMove;
    colRunner += colMove;
    if(OnBoard(rowRunner, colRunner)) {
      let position = board[rowRunner][colRunner]
      if(position === constants.EMPTY)
        validMoves[rowRunner][colRunner] = 1;
      else {
        if(IsOpponent(currPiece, position))
          validMoves[rowRunner][colRunner] = 2;

        continue;
      }
    }
  }

  return validMoves;
}

function RooksMoves(coords, board, validMoves) {
  let rowDirs = [1, 0, -1, 0]
  let colDirs = [0, 1, 0, -1]
  let currPiece = board[coords[0]][coords[1]];
  let rowMove, colMove;

  for(let i in rowDirs) {
    rowMove = rowDirs[i]
    colMove = colDirs[i]

    let rowRunner = coords[0];
    let colRunner = coords[1];

    rowRunner += rowMove;
    colRunner += colMove;

    while(OnBoard(rowRunner, colRunner)) {
      let position = board[rowRunner][colRunner]
      if(position === constants.EMPTY)
        validMoves[rowRunner][colRunner] = 1;
      else if (IsOpponent(currPiece, position)) {
        validMoves[rowRunner][colRunner] = 2;
        break
      } else {
        break
      }

      rowRunner += rowMove
      colRunner += colMove
    }
  }

  return validMoves;
}

function PawnMoves(coords, board, validMoves) {
  let piece = board[coords[0]][coords[1]];
  let direction = IsWhitePiece(piece) ? -1 : 1;
  let rowRunner = coords[0] + direction;

  if (board[rowRunner][coords[1]] === constants.EMPTY)
    validMoves[rowRunner][coords[1]] = 1;

  return validMoves;
}

function IsOpponent(currPiece, otherPiece) {
  let currIsWhite = IsWhitePiece(currPiece)
  let otherIsWhite = IsWhitePiece(otherPiece)

  return currIsWhite !== otherIsWhite
}

function OnBoard(rowRunner, colRunner) {
  return (rowRunner >= 0 && rowRunner < 8) && (colRunner >= 0 && colRunner < 8)
}

export function IsWhitePiece(piece) {
  return piece <= "\u2659" ? true : false;
}