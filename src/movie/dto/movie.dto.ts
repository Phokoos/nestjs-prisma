import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

enum Genre {
  HORROR = 'horror',
  COMEDY = 'comedy',
}

export class MovieDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  director: string;
  genre: Genre;
  @IsNotEmpty()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(1900)
  @Max(2023)
  year: number;
}
