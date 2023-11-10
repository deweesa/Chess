import * as constants from "./Pieces";

export default function GenerateValidMoves(piece, coords, board) {
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
    for (
      let colRunner = coords[1] - 1;
      colRunner <= coords[1] + 1;
      colRunner++
    ) {
      if (
        rowRunner >= 0 &&
        colRunner >= 0 &&
        rowRunner < 8 &&
        colRunner < 8 &&
        board[rowRunner][colRunner] === constants.EMPTY
      ) {
        console.log(`%d,%d`, rowRunner, colRunner);
        validMoves[rowRunner][colRunner] = 1;
      }
    }
  }

  return validMoves;
}

function QueensMoves(coords, board, validMoves) {
  validMoves = RooksMoves(coords, board, validMoves);
  return (validMoves = BishopsMoves(coords, board, validMoves));
}

function BishopsMoves(coords, board, validMoves) {
  let rowRunner, colRunner;

  //Northwest
  rowRunner = coords[0] - 1;
  colRunner = coords[1] - 1;
  while (rowRunner >= 0 && colRunner >= 0) {
    if (board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;
    else break;

    rowRunner -= 1;
    colRunner -= 1;
  }

  //Southwest
  rowRunner = coords[0] + 1;
  colRunner = coords[1] - 1;
  while (rowRunner < 8 && colRunner >= 0) {
    if (board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;
    else break;

    rowRunner += 1;
    colRunner -= 1;
  }

  //Southeast
  rowRunner = coords[0] + 1;
  colRunner = coords[1] + 1;
  while (rowRunner < 8 && colRunner < 8) {
    if (board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;
    else break;

    rowRunner += 1;
    colRunner += 1;
  }

  //Northeast
  rowRunner = coords[0] - 1;
  colRunner = coords[1] + 1;
  while (rowRunner >= 0 && colRunner - 8) {
    if (board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;
    else break;

    rowRunner -= 1;
    colRunner += 1;
  }

  return validMoves;
}

function KnightsMoves(coords, board, validMoves) {
  let rowRunner, colRunner;
  //North
  rowRunner = coords[0] - 2;
  if (rowRunner >= 0) {
    colRunner = coords[1] - 1;
    if (colRunner >= 0 && board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;

    colRunner += 2;
    if (colRunner < 8 && board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;
  }

  //South
  rowRunner = coords[0] + 2;
  if (rowRunner < 8) {
    colRunner = coords[1] - 1;
    if (colRunner >= 0 && board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;

    colRunner += 2;
    if (colRunner < 8 && board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;
  }

  //East
  colRunner = coords[1] + 2;
  if (colRunner >= 0) {
    rowRunner = coords[0] - 1;
    if (rowRunner >= 0 && board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;

    rowRunner += 2;
    if (rowRunner < 8 && board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;
  }

  //West
  colRunner = coords[1] - 2;
  if (colRunner >= 0) {
    rowRunner = coords[0] - 1;
    if (rowRunner >= 0 && board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;

    rowRunner += 2;
    if (rowRunner < 8 && board[rowRunner][colRunner] === constants.EMPTY)
      validMoves[rowRunner][colRunner] = 1;
  }

  return validMoves;
}

function RooksMoves(coords, board, validMoves) {
  let runner;
  //North
  runner = coords[0] - 1;
  while (runner >= 0) {
    if (board[runner][coords[1]] === constants.EMPTY)
      validMoves[runner][coords[1]] = 1;
    else break;
    runner -= 1;
  }
  //todo: Handle if last piece is enemy

  //South
  runner = coords[0] + 1;
  while (runner < 8) {
    console.log(runner);
    if (board[runner][coords[1]] === constants.EMPTY)
      validMoves[runner][coords[1]] = 1;
    else break;
    runner += 1;
  }
  //todo: Handle if last piece is enemy

  //East
  runner = coords[1] + 1;
  while (runner < 8) {
    if (board[coords[0]][runner] === constants.EMPTY)
      validMoves[coords[0]][runner] = 1;
    else break;
    runner += 1;
  }
  //todo: Handle if last piece is enemy

  //West
  runner = coords[1] - 1;
  while (runner >= 0) {
    if (board[coords[0]][runner] === constants.EMPTY)
      validMoves[coords[0]][runner] = 1;
    else break;
    runner -= 1;
  }
  //todo: Handle if last piece is enemy

  return validMoves;
}

function PawnMoves(coords, board, validMoves) {
  let piece = board[coords[0]][coords[1]];
  let direction = IsWhite(piece) ? -1 : 1;
  console.log(direction);
  let rowRunner = coords[0] + direction;

  if (board[rowRunner][coords[1]] === constants.EMPTY)
    validMoves[rowRunner][coords[1]] = 1;

  return validMoves;
}

function IsWhite(piece) {
  return piece <= "\u2659" ? true : false;
}
