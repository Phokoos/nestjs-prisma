import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import type { Request, Response } from 'express';

@Controller({
  path: 'movie',
  host: 'localhost',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('users')
  getAvailableUsers(): any {
    return this.movieService.getAvailableUsers();
  }

  @Get()
  findAll(@Query() query: any): any {
    return this.movieService.getAll(query);
  }

  @Get('headers')
  getHeaders(@Headers() headers: any): any {
    return headers;
  }

  @Get('request')
  getRequestDetails(@Req() req: Request): any {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      params: req.params,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response): any {
    return res.status(301).json({
      message: 'This is a custom response with status code 301',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.movieService.findOne(+id);
  }

  @Post()
  create(@Body() dto: MovieDto): any {
    return this.movieService.create(dto);
  }
}
