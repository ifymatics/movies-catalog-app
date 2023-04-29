import styles from "@/styles/Nav.module.scss";
import Link from "next/link";

const Nav = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Movie catalog</Link>
      </div>

      <div className={styles.headerContainer}>
        <ul>
          <li>
            <Link href="/movies/new">Add Movie</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
