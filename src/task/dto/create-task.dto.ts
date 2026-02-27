import {
  IsString,
  IsNotEmpty,
  Length,
  IsInt,
  IsPositive,
  IsOptional,
  IsArray,
  IsEnum,
} from 'class-validator';
import { StartWith } from '../decorators/start-with.decorator';

export enum Tags {
  WORK = 'work',
  STUDY = 'study',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartWith('Task: ')
  @Length(2, 10)
  title: string;

  @IsInt({ message: 'Priority must be an integer' })
  @IsPositive()
  @IsOptional()
  priority: number;

  @IsArray()
  @IsEnum(Tags, { each: true })
  tags: Tags[];

  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak',
  // })
  // password: string;
  //
  // @IsUrl(
  //   {},
  //   {
  //     message: 'WebSiteUrl must be a valid URL',
  //   },
  // )
  // webSiteUrl: string;
}
