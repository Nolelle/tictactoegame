export type Player = "X" | "O";
export type CellValue = Player | "";
export type Board = CellValue[];

export interface GameStatus {
  status: "win" | "draw" | "ongoing";
  winner?: Player;
}

let scores: Record<Player, number> = { X: 0, O: 0 };

export function checkGameStatus(board: Board): GameStatus {
  const winner = detectWinner(board);
  if (winner) {
    scores[winner] += 1;
    return { status: "win", winner };
  } else if (isBoardFull(board)) {
    return { status: "draw" };
  } else {
    return { status: "ongoing" };
  }
}

export function resetScores(): void {
  scores = { X: 0, O: 0 };
}

export function detectWinner(board: Board): Player | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }
  return null;
}

function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== "");
}

export function getScores(): Record<Player, number> {
  return scores;
}
