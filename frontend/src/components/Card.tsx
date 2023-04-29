import styles from "@/styles/Card.module.scss";
interface Props {
  children: React.ReactNode;
  classStyle?: string;
}
const Card: React.FC<Props> = ({ children, classStyle }) => {
  return (
    <div className={classStyle ? `${styles.card} ${classStyle}` : styles.card}>
      {children}
    </div>
  );
};

export default Card;
