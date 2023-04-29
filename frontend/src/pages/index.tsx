//======END OF CODE ONE(WORKING WELL BUT NOT OPTIMIZED AND NOT PAGINATED )====//

// import { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "@/styles/HomePage.module.scss";
// import Nav from "@/components/Nav";
// import Layout from "@/components/Layout";
// import Search from "@/components/Search";
// import Card from "@/components/Card";

// type SearchData = {
//   data: string;
//   type: string;
// };

// const Home = () => {
//   const [movies, setMovies] = useState<any[]>([]);
//   const [searchTitle, setSearchTitle] = useState<string>("");
//   const [searchGenre, setSearchGenre] = useState<string>("");

//   const fetchMovies = async () => {
//     const { data } = await axios.get("http://localhost:5000/movies");
//     setMovies(data?.data || []);
//   };

//   const searchMovies = async () => {
//     const { data } = await axios.get(
//       `http://localhost:5000/movies?title=${searchTitle}&genre=${searchGenre}`
//     );
//     setMovies(data?.data || []);
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     searchMovies();
//   }, [searchTitle, searchGenre]);

//   const handleSubmitSearch = ({ data, type }: SearchData) => {
//     if (type === "title") {
//       setSearchGenre("");
//       setSearchTitle(data);
//     } else if (type === "genre") {
//       setSearchTitle("");
//       setSearchGenre(data);
//     }
//   };

//   return (
//     <Layout>
//       <main className={styles.movieList}>
//         <div className={styles.searchNav}>
//           <div className="MovieList">
//             <h2>Movie List</h2>
//           </div>
//           <Search onSubmitSearch={handleSubmitSearch} />
//         </div>

//         <ul>
//           {movies.map((movie) => (
//             <Card key={movie.id}>
//               <li>
//                 <a href={`/movies/${movie.id}`}>
//                   <h2>{movie.title}</h2>
//                   <p>Genre: {movie.genre}</p>
//                 </a>
//               </li>
//             </Card>
//           ))}
//         </ul>
//       </main>
//     </Layout>
//   );
// };

// export default Home;
//=====CODE 2(OPTIMIZED BUT NOT PAGINATED)---=======-----//

import { useState, useEffect } from "react";

import axios from "axios";
import styles from "@/styles/HomePage.module.scss";

import Layout from "@/components/Layout";
import Search from "@/components/Search";

import { MovieType } from "@/types/movieType";
import Movie from "@/components/Movie";
import Paginate from "@/components/Paginate";

type SearchData = {
  data: string;
  type: string;
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [totalItems, setTotalItems] = useState(0);
  const [movieId, setMovieId] = useState<number | null>(null);
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const {
        data: { data: movies, count },
      } = await axios.get("http://localhost:5000/movies", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      setMovies(movies);
      setTotalItems(count);
    };
    fetchMovies();
  }, [currentPage, itemsPerPage, isCleared]);

  useEffect(() => {
    const searchMovies = async () => {
      const {
        data: { data: movies, count },
      } = await axios.get(`http://localhost:5000/movies`, {
        params: {
          title: searchTitle,
          genre: searchGenre,
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      setMovies(movies);
      setTotalItems(count);
    };
    searchMovies();
  }, [searchTitle, searchGenre, currentPage, itemsPerPage]);

  useEffect(() => {
    const deleteMovie = async () => {
      try {
        const deleted = await axios.delete(
          `http://localhost:5000/movies/${movieId}`
        );

        setMovies(movies.filter((movie: MovieType) => movie.id !== movieId));
      } catch (error) {
        console.log(error);
      }
    };
    if (typeof movieId === "number") {
      deleteMovie();
    }
  }, [movieId]);

  const handleOnDelete = (id: number) => {
    if (id) {
      setMovieId(id);
    }
  };

  const handleSubmitSearch = ({ data, type }: SearchData) => {
    if (type === "title") {
      setSearchGenre("");
      setSearchTitle(data);
    } else if (type === "genre") {
      setSearchTitle("");
      setSearchGenre(data);
    }
    setIsCleared(!isCleared);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Layout>
      <main className={styles.movieList}>
        <div className={styles.searchNav}>
          <div className="MovieList">
            <h2>Movie List</h2>
          </div>
          <Search
            onSubmitSearch={handleSubmitSearch}
            isCleared={isCleared}
            setIsCleared={setIsCleared}
          />
        </div>

        <ul>
          {movies.map((movie: MovieType) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genre={movie.genre}
              onDelete={handleOnDelete}
            />
          ))}
        </ul>

        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </main>
    </Layout>
  );
};

export default Home;
