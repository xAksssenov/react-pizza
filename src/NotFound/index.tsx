import styles from "./NotFound.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.main}>
      <h2>Ничего не найдено</h2>
      <p className={styles.description}>К сожалению страница отсутсвует</p>
    </div>
  );
};

export default NotFoundBlock;
