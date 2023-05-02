import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';

import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(

    private moviesService: MoviesService,
  ) {
    /**/
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'createdAt',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    @Query('title') title?: string,
    @Query('genre') genre?: string,
    @Query('year') year?: number,
  ): Promise<Movie[]> {
    const skip = (page - 1) * limit;
    const take = limit;
    try {
      const { movies, count } = await this.moviesService.find({
        page, take, skip, sort, order, title, genre, year,
      });
      return <any>{ count, data: movies };
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Movie[]> {
    try {
      return await this.moviesService.findOne(+id);
    } catch (error) {
      console.log(error.message)
    }

  }

  @Post()
  async create(@Body() movieData: CreateMovieDto): Promise<Movie> {
    try {
      return await this.moviesService.create(movieData as any);
    } catch (error) {
      console.log(error.message)
    }

  }
  @Post("/update")
  async update(@Body() movieData: UpdateMovieDto): Promise<Movie> {
    try {
      return await this.moviesService.update(movieData as any);
    } catch (error) {
      console.log(error.message)
    }

  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.moviesService.delete(+id);

    } catch (error) {
      return error.message
    }
  }
}
