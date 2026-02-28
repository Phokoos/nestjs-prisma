import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @UsePipes(StringToLowercasePipe)
  // @Post('create')
  // create(@Body('title') title: string): any {
  //   return `Hello ${title}`;
  // }
  //
  // @UseGuards(AuthGuard)
  // @Get('me')
  // getProfile(@UserAgent() userAgent: string): object {
  //   return {
  //     id: '1',
  //     name: 'John Doe',
  //     age: 22,
  //     userAgent,
  //   };
  // }
}
