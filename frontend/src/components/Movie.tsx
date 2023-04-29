import { useRouter } from "next/router";
import Card from "./Card";
import styles from "@/styles/Movie.module.scss";
interface Props {
  children?: React.ReactNode;
  classStyle?: string;
  id: number;
  title: string;
  genre: string;
  onDelete: (id: number) => void;
}
const Movie: React.FC<Props> = ({ id, title, genre, onDelete }) => {
  const router = useRouter();
  const handleDelete = () => {
    if (confirm("Are you sure?")) {
      onDelete(id);
    }
  };
  const handleEdit = () => {
    router.push(`/movies/edit/${id}`);
  };
  return (
    <Card classStyle={styles.movie}>
      <li>
        <a href={`/movies/${id}`}>
          <h2>{title}</h2>
          <p>Genre:{genre}</p>
        </a>
      </li>
      <div className={styles.action}>
        <button className={styles.edit} onClick={handleEdit}>
          edit
        </button>
        <button className={styles.delete} onClick={handleDelete}>
          delete
        </button>
      </div>
    </Card>
  );
};

export default Movie;
