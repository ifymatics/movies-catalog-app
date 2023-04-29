
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './../src/movies/dto/create-movie.dto';
import { MoviesService } from './../src/movies/movies.service';
import { MoviesController } from './../src/movies/movies.controller';
import { Movie } from './../src/movies/movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = <{ movies: Movie[], count: number }>{ count: 2, movies: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }] };
      jest.spyOn(service, 'find').mockResolvedValue(result);
      const query = <any>{ page: 1, limit: 10, sort: 'createdAt', order: 'DESC', title: 'Movie', genre: 'Action', year: 2020 };
      expect(await controller.findAll(query)).toEqual({ count: 2, data: result.movies });
    });
  });

  describe('findOne', () => {
    it('should return a single movie', async () => {
      const result = <Partial<Movie>>[{ id: 1, title: 'Movie 1' }];
      jest.spyOn(service, 'findOne').mockResolvedValue(result as Movie[]);
      expect(await controller.findOne('1')).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const movieData: CreateMovieDto = <any>{ title: 'New Movie', genre: 'Action', year: 2021, rating: 9 };
      const createdMovie: Movie = <any>{ id: 1, ...movieData, createdAt: new Date(), updatedAt: new Date() };
      jest.spyOn(service, 'create').mockResolvedValue(createdMovie);
      expect(await controller.create(movieData)).toEqual(createdMovie);
    });
  });

  describe('delete', () => {
    it('should delete a movie', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);
      expect(await controller.delete('1')).toBeUndefined();
    });
  });
});

