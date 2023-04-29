
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const movieData = {
        title: 'The Matrix',
        year: 1999,
        genre: 'Action',
      };

      const createdMovie = new Movie();
      createdMovie.id = 1;
      createdMovie.title = movieData.title;
      createdMovie.year = movieData.year;
      createdMovie.genre = movieData.genre;
      createdMovie.createdAt = expect.any(Date);
      createdMovie.updatedAt = expect.any(Date);

      jest.spyOn(repository, 'create').mockReturnValue(createdMovie);
      jest.spyOn(repository, 'save').mockResolvedValue(createdMovie);

      const result = await service.create(movieData as Movie);

      expect(result).toEqual(createdMovie);
      expect(repository.create).toHaveBeenCalledWith(movieData);
      expect(repository.save).toHaveBeenCalledWith(createdMovie);
    });
  });

  describe('find', () => {
    it('should find movies', async () => {
      const movies = [new Movie(), new Movie()];
      const count = movies.length;

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        andWhere: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(count),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(movies),
      } as any);

      const result = await service.find({});

      expect(result).toEqual({ count, movies });
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('movie');
    });
  });

  describe('findOne', () => {
    it('should find a movie by id', async () => {
      const movie = new Movie();
      const id = 1;

      jest.spyOn(repository, 'find').mockResolvedValue(movie as any);

      const result = await service.findOne(id);

      expect(result).toEqual(movie);
      expect(repository.find).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('delete', () => {
    it('should delete a movie by id', async () => {
      const id = 1;

      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      const result = await service.delete(id);

      expect(result).toEqual({ affected: 1 });
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
