import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/AddMovie.module.scss";
import Card from "@/components/Card";
import { MovieType } from "@/types/movieType";

const EditMovie = () => {
  const [errors, setErrors] = useState({
    title: "",
    genre: "",
    year: "",
    rating: "",
  });
  const [apiError, setApiError] = useState([]);
  const [movie, setMovie] = useState<MovieType>({} as MovieType);
  const router = useRouter();
  useEffect(() => {
    const getMovie = async () => {
      const { edit } = router.query;

      if (edit) {
        const { data } = await axios.get(
          `http://localhost:5000/movies/${edit}`
        );

        setMovie(data[0]);
      }
    };
    getMovie();
  }, [router.query]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!movie.title || movie.title.length <= 3) {
      setErrors({ ...errors, title: "Title must be more than 4 characters" });
      return;
    }
    if (!movie.genre || movie.genre.length <= 2) {
      setErrors({ ...errors, genre: "Genre must be more than 2 characters" });
      return;
    }

    if (!movie.year || movie.year.length <= 3 || isNaN(+movie.year)) {
      setErrors({
        ...errors,
        year: "Year must be more than 3 characters and must be a number",
      });
      return;
    }

    if (!movie.rating || +movie.rating <= 0 || isNaN(+movie.rating)) {
      setErrors({
        ...errors,
        title: "Rating must be a number and must be from 1-10",
      });
      return;
    }

    const transFormedData = {
      ...movie,
      year: +movie.year,
      rating: +movie.rating,
    };

    try {
      await axios.post("http://localhost:5000/movies", transFormedData);
      router.push("/");
    } catch (error: any) {
      if (error.response) {
        const { message } = error.response.data;
        setApiError(message);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie((prevData) => ({ ...prevData, [name]: value.trim() }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return (
    <Card classStyle={styles.addMovie}>
      <h1>Add a new movie</h1>
      {apiError.length > 0 && (
        <ul>
          {apiError.map((err: string) => (
            <li key={err} className={styles.error}>
              {err}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleInputChange}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleInputChange}
          />
          {errors.genre && <span className={styles.error}>{errors.genre}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            value={movie.year}
            onChange={handleInputChange}
          />
          {errors.year && <span className={styles.error}>{errors.year}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={movie.rating}
            onChange={handleInputChange}
          />
          {errors.rating && (
            <span className={styles.error}>{errors.rating}</span>
          )}
        </div>
        <button type="submit">Update Movie</button>
      </form>
    </Card>
  );
};

export default EditMovie;
