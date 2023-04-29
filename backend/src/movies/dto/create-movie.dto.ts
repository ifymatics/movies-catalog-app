/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt, Min, Max, IsDateString, IsString } from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    genre: string;

    @IsNotEmpty()
    @IsInt()
    year: string;

    @IsInt()
    @Min(1)
    @Max(10)
    rating: number;

    // @IsDateString()
    createdAt: string;

    //@IsDateString()
    updatedAt: string;
}
