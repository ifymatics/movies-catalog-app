import styles from "@/styles/Layout.module.scss";
interface Props {
  children: React.ReactNode;
  classStyle?: string;
}
const Layout: React.FC<Props> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Layout;
