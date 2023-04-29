import styles from "@/styles/Search.module.scss";
import Card from "./Card";
import { useState } from "react";
interface Props {
  children?: React.ReactNode;
  classStyle?: string;
  onSubmitSearch: (data: { data: string; type: string }) => void;
  setIsCleared: (arg: boolean) => void;
  isCleared: boolean;
}
const Search: React.FC<Props> = ({
  onSubmitSearch,
  isCleared,
  setIsCleared,
}) => {
  const [searchData, setSearchData] = useState({ data: "", type: "" });
  const [error, setError] = useState("");

  const handleClick = () => {
    if (!searchData.data) {
      setError("Please the search input must not be empty!");
      return;
    }
    if (!searchData.type) {
      setError("Please select a search type!");
      return;
    }
    // setIsCleared(!isCleared);
    onSubmitSearch(searchData);
  };
  const handleClearSearch = () => {
    setIsCleared(false);
    setSearchData((prev) => ({ ...prev, data: "", type: "" }));
  };
  const handleSearchChange = (e: any) => {
    setError("");

    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };
  return (
    <Card classStyle={styles.searchWrapper}>
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <input
            type="text"
            name="data"
            className={styles.searchInput}
            onChange={handleSearchChange}
            value={searchData.data}
            placeholder="movie title or genre"
          />

          {!isCleared && (
            <div className={styles.searchButton} onClick={handleClick}>
              &#128270;
            </div>
          )}
          {isCleared && (
            <div className={styles.clearButton} onClick={handleClearSearch}>
              x
            </div>
          )}
        </div>
        <div className={styles.searchOption}>
          <select
            name="type"
            id=""
            onChange={handleSearchChange}
            value={searchData.type}
          >
            <option value="">select Type</option>
            <option value="title">title</option>
            <option value="genre">genre</option>
          </select>
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </Card>
  );
};

export default Search;
