
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

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

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = {
        count: 1,
        movies: [
          {
            id: 1,
            title: 'Example Movie',
            genre: 'Action',
            year: 2021,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      } as any;
      jest.spyOn(service, 'find').mockImplementation(async () => [...result.movies] as any);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a movie with a given id', async () => {
      const result = [
        {
          id: 1,
          title: 'Example Movie',
          genre: 'Action',
          year: 2021,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findOne').mockImplementation(async () => result as any);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const movieData = {
        title: 'Example Movie',
        genre: 'Action',
        year: 2021,
      };
      const movie = new Movie();
      Object.assign(movie, movieData);
      jest.spyOn(service, 'create').mockImplementation(async () => movie);

      expect(await controller.create(movieData as any)).toBe(movie);
    });
  });

  describe('delete', () => {
    it('should delete a movie with a given id', async () => {
      const result = undefined;
      jest.spyOn(service, 'delete').mockImplementation(async () => result);

      expect(await controller.delete('1')).toBe(result);
    });
  });
});

