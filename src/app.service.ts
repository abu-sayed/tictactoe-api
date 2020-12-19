import { Injectable } from '@nestjs/common';
import GameResponse from './game.response';

const X: string = 'X';
const O: string = 'O';

@Injectable()
export class AppService {
  private board: string[][] = [];
  private whoseTurn: number;
  private turns: number;

  getHello(): string {
    return 'Hello World!';
  }

  initialize(): GameResponse {
    this.board = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ];
    this.whoseTurn = 1;
    this.turns = 9;
    return new GameResponse(this.board, this.whoseTurn, false, -1);
  }

  validate(rowIndex: number, columnIndex: number): Error | void {
    if (this.board.length === 0) {
      throw new Error('Game is not yet initialized.');
    }

    if (this.isGameOver()) {
      throw new Error('Game is already over.');
    }

    if (rowIndex < 0 || rowIndex > 2 || columnIndex < 0 || columnIndex > 2) {
      throw new Error('Invalid input.');
    }

    if ([X, O].includes(this.board[rowIndex][columnIndex])) {
      throw new Error(`Already filled with ${this.board[rowIndex][columnIndex]}`);
    }
  }

  play(rowIndex: number, columnIndex: number): GameResponse {
    this.validate(rowIndex, columnIndex);
    this.board[rowIndex][columnIndex] = this.whoseTurn === 1 ? X : O;
    this.whoseTurn = this.whoseTurn === 1 ? 2 : 1;
    this.turns = this.turns - 1;
    return new GameResponse(this.board, this.whoseTurn, this.isGameOver(), this.getResult());
  }

  rowCrossed(): boolean {
    return (this.board[0][0] == this.board[0][1] && this.board[0][1] == this.board[0][2])
      || (this.board[1][0] == this.board[1][1] && this.board[1][1] == this.board[1][2])
      || (this.board[2][0] == this.board[2][1] && this.board[2][1] == this.board[2][2]);
  }

  columnCrossed(): boolean {
    return (this.board[0][0] == this.board[1][0] && this.board[1][0] == this.board[2][0])
      || (this.board[0][1] == this.board[1][1] && this.board[1][1] == this.board[2][1])
      || (this.board[0][2] == this.board[1][2] && this.board[1][2] == this.board[2][2]);
  }

  diagonalCrossed(): boolean {
    return (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2])
      || (this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0]);
  }

  isCrossed(): boolean {
    return this.rowCrossed() || this.columnCrossed() || this.diagonalCrossed();
  }

  drawn(): boolean {
    return this.turns === 0;
  }

  isGameOver(): boolean {
    return this.turns < 9 && this.isCrossed() || this.drawn();
  }

  getResult(): number {
    return this.isCrossed() ? this.whoseTurn : (this.drawn() ? 0 : -1);
  }
}
