import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCategoryId } from "../redux/slices/filterSlice";

const Categories = () => {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useDispatch();
  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <>
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
