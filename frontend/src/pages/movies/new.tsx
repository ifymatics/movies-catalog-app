import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/AddMovie.module.scss";
import Card from "@/components/Card";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    rating: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    genre: "",
    year: "",
    rating: "",
  });
  const [apiError, setApiError] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || formData.title.length <= 3) {
      setErrors({ ...errors, title: "Title must be more than 4 characters" });
      return;
    }
    if (!formData.genre || formData.genre.length <= 2) {
      setErrors({ ...errors, genre: "Genre must be more than 2 characters" });
      return;
    }

    if (!formData.year || formData.year.length <= 3 || isNaN(+formData.year)) {
      setErrors({
        ...errors,
        year: "Year must be more than 3 characters and must be a number",
      });
      return;
    }

    if (!formData.rating || +formData.rating <= 0 || isNaN(+formData.rating)) {
      setErrors({
        ...errors,
        title: "Rating must be a number and must be from 1-10",
      });
      return;
    }

    const transFormedData = {
      ...formData,
      year: +formData.year,
      rating: +formData.rating,
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
    setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
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
            value={formData.title}
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
            value={formData.genre}
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
            value={formData.year}
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
            value={formData.rating}
            onChange={handleInputChange}
          />
          {errors.rating && (
            <span className={styles.error}>{errors.rating}</span>
          )}
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </Card>
  );
};

export default AddMovie;
