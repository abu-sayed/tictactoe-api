import { Controller, Get, Post, Param, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import GameResponse from './game.response';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/init')
  initializeGame(): GameResponse {
    return this.appService.initialize();
  }

  @Post('/play/:rowIndex/:columnIndex')
  play(@Param('rowIndex') rowIndex: number, @Param('columnIndex') columnIndex: number, @Res() res: Response) {
    try {
      res.json(this.appService.play(rowIndex, rowIndex));
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error.message);
    }
  }
}
