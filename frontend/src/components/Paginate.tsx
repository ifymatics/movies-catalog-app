import styles from "@/styles/Paginate.module.scss";
import { SetStateAction } from "react";
import Card from "./Card";
interface Props {
  children?: React.ReactNode;
  classStyle?: string;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: SetStateAction<number>) => void;
}
const Paginate: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className={styles.pagination}>
      <Card classStyle={styles.previous}>
        <button
          onClick={() => setCurrentPage((prev: any) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </Card>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Card classStyle={styles.next}>
        <button
          onClick={() =>
            setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </Card>
    </div>
  );
};

export default Paginate;
