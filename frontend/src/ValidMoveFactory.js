import * as constants from './Pieces';

export default function GenerateValidMoves(piece, coords, board) {
    const validMoves = []
    for(let i = 0; i < 8; i++) {
      const row = new Array(8).fill(0);
      validMoves.push(row);
    } 

    switch(piece) {
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
    }
}

function KingsMoves(coords, board, validMoves) {

}

function QueensMoves(coords, board, validMoves) {

}

function BishopsMoves(coords, board, validMoves) {

}

function KnightsMoves(coords, board, validMoves) {
   //North
   //South
   //East
   //West 
}

function RooksMoves (coords, board, validMoves) {
    let runner;
    //North
    runner = coords[0]-1;
    while(runner >= 0) {
        if(board[runner][coords[1]] === constants.EMPTY)
            validMoves[runner][coords[1]] = 1;
        else
            break;
        runner -= 1;
    }
    //todo: Handle if last piece is enemy

    //South
    runner = coords[0]+1;
    while(runner < 8) {
        console.log(runner)
        if(board[runner][coords[1]] === constants.EMPTY)
            validMoves[runner][coords[1]] = 1;
        else
            break;
        runner += 1;
    }
    //todo: Handle if last piece is enemy

    //East
    runner = coords[1]+1;
    while(runner < 8) {
        if(board[coords[0]][runner])
            validMoves[coords[0]][runner] = 1;
        else
            break;
        runner += 1;
    }
    //todo: Handle if last piece is enemy

    //West
    runner = coords[1]-1
    while(runner >= 0) {
        if(board[coords[0]][runner])
            validMoves[coords[0]][runner] = 1;
        else
            break;
        runner -= 1;
    }
    //todo: Handle if last piece is enemy

    return validMoves;
}