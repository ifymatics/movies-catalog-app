import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
type QueryObj = {
  page?: number;
  take?: number;
  skip?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
  title?: string;
  year?: number;
  genre?: string;
};
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {
    /** */
  }
  async create(movieData: Movie) {

    movieData.createdAt = new Date();
    movieData.updatedAt = new Date();
    const movie = this.moviesRepository.create(movieData)

    return this.moviesRepository.save(movie);


  }
  async find({ page, skip, take, sort, order, title, genre, year,
  }: QueryObj): Promise<{ count: number; movies: Movie[] }> {

    const queryBuilder = this.moviesRepository.createQueryBuilder('movie');

    if (title) {

      queryBuilder.andWhere('LOWER(movie.title) ILIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }

    if (genre) {
      queryBuilder.andWhere('LOWER(movie.genre) ILIKE LOWER(:genre)', {
        genre: `%${genre}%`,
      });
    }

    if (year) {
      queryBuilder.andWhere('movie.year = :year', { year });
    }

    const count = await queryBuilder.getCount();

    const movies = await queryBuilder
      .orderBy(`movie.${sort}`, order)
      .skip(skip)
      .take(take)
      .getMany();

    return <any>{ count, movies };
  }
  async findOne(id: number) {
    return this.moviesRepository.find({ where: { id: id } });
  }
  async delete(id: number) {
    return this.moviesRepository.delete(id);
  }
}
