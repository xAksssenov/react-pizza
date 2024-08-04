import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setPageCount } from "../../redux/slices/filterSlice";

const Pagination = () => {
  const { pageCount } = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={pageCount - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
