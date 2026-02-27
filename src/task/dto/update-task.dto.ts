import { IsString, IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty({
    message: 'Title is required',
  })
  @Length(2, 10)
  title: string;
  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;
}
