//White Pieces
export const W_PAWN = "\u2659";
export const W_KNIGHT = "\u2658";
export const W_BISHOP = "\u2657";
export const W_ROOK = "\u2656";
export const W_QUEEN = "\u2655";
export const W_KING = "\u2654";

export const W_PAWN_ROW = Array.from(W_PAWN.repeat(8));
export const W_KING_ROW = [
  W_ROOK,
  W_KNIGHT,
  W_BISHOP,
  W_QUEEN,
  W_KING,
  W_BISHOP,
  W_KNIGHT,
  W_ROOK,
];

//Black Pieces
export const B_PAWN = "\u265f";
export const B_KNIGHT = "\u265e";
export const B_BISHOP = "\u265d";
export const B_ROOK = "\u265c";
export const B_QUEEN = "\u265b";
export const B_KING = "\u265a";

export const B_PAWN_ROW = Array.from(B_PAWN.repeat(8));
export const B_KING_ROW = [
  B_ROOK,
  B_KNIGHT,
  B_BISHOP,
  B_KING,
  B_QUEEN,
  B_BISHOP,
  B_KNIGHT,
  B_ROOK,
];

//Special Pieces
export const EMPTY = "_";

//Empty Board
