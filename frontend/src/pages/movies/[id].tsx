import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { MovieType } from "@/types/movieType";
import styles from "@/styles/MovieDetail.module.scss";
import Card from "@/components/Card";

const MovieDetail = () => {
  const router = useRouter();
  const [movie, setMovie] = useState<MovieType>({} as MovieType);

  useEffect(() => {
    const fetchMovies = async () => {
      const { id } = router.query;
      if (id) {
        const { data } = await axios.get(`http://localhost:5000/movies/${id}`);

        setMovie(data[0]);
      }
    };
    fetchMovies();
  }, [router.query]);

  return (
    <>
      {movie && (
        <Card classStyle={styles.container}>
          <div className={styles.details}>
            <div className={styles.header}>
              <h1 className={styles.title}>{movie.title}</h1>
            </div>

            <div>
              <div className={styles.info}>
                <div className={styles.genreDetail}>
                  <span className={styles.genreSpan}>Genre:</span>
                  <div className={styles.genre}>{movie.genre}</div>
                </div>
                <div className="yearDetails">
                  <span className={styles.yearSpan}>Released Year: </span>
                  <div className={styles.year}>{movie.year}</div>
                </div>
                <div className="ratingDetail">
                  <span className={styles.ratingSpan}>Rating: </span>
                  <div className={styles.rating}>{movie.rating}/10</div>
                </div>
              </div>

              <button
                className={styles.backButton}
                onClick={() => router.back()}
              >
                Back to search results
              </button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default MovieDetail;
