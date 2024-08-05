import { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const clickSvg = () => {
    dispatch(setSearchValue(""));
    inputRef.current.focus();
    setValue("");
  };

  const updateValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 750),
    []
  );

  const onChangeInput = (event: { target: { value: any } }) => {
    setValue(event.target.value);
    updateValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={clickSvg}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
