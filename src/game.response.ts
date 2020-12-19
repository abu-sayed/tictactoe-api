export default class GameResponse {
  private board: string[][];
  private whoseTurn: number;
  private isGameOver: boolean;
  private result: number;

  constructor(board: string[][], whoseTurn: number, isGameOver: boolean, result: number) {
    this.board = board;
    this.whoseTurn = whoseTurn;
    this.isGameOver = isGameOver;
    this.result = result;
  }
}
