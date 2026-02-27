import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { MovieDto } from './dto/movie.dto';
import * as fs from 'fs';
import * as path from 'path';

const MOVIES_FILE_PATH = path.join(
  process.cwd(),
  'src',
  'movie',
  'data',
  'movies.json',
);

interface Movie {
  id: number;
  title: string;
  director: string;
  genre: 'horror' | 'comedy';
  year: number;
}

@Injectable()
export class MovieService {
  constructor(private readonly userService: UserService) {}

  private readMovies(): Movie[] {
    const data = fs.readFileSync(MOVIES_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Movie[];
  }

  private writeMovies(movies: Movie[]): void {
    fs.writeFileSync(
      MOVIES_FILE_PATH,
      JSON.stringify(movies, null, 2),
      'utf-8',
    );
  }

  async getAvailableUsers(): Promise<any> {
    return this.userService.getAll();
  }

  public getAll(query: any): Movie[] {
    const { genre = undefined, year = undefined } = query;
    const movies = this.readMovies();

    if (!year && !genre) {
      return movies;
    }

    let filteredMovies = movies;

    if (year) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.year === Number(year),
      );
    }

    if (genre) {
      filteredMovies = filteredMovies.filter((movie) => movie.genre === genre);
    }

    return filteredMovies;
  }

  public findOne(id: number): Movie {
    const movie = this.readMovies().filter((movie) => movie.id === id)[0];

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  public create(dto: MovieDto): Movie {
    const { title, director, genre = 'horror', year } = dto;
    const movies = this.readMovies();

    const newMovie: Movie = {
      id: movies.length + 1,
      title,
      director,
      genre,
      year,
    };

    movies.push(newMovie);
    this.writeMovies(movies);

    return newMovie;
  }
}
