import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

const typeNames = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  imageUrl,
  price,
  types,
  sizes,
}) => {
  const initialType = types.find((type) => type !== 0) || 0;
  const [activeType, setActiveType] = useState(initialType);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();

  const countItem = useSelector((state: any) =>
    state.cart.items.find((obj: { id: string }) => obj.id === id)
  );

  const addedItem = countItem ? countItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      imageUrl,
      price,
      types: typeNames[activeType],
      sizes: sizes[activeSize],
    };

    dispatch(addItem(item));
  };

  return (
    <div key={id} className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((id) => (
            <li
              key={id}
              onClick={() => setActiveType(id)}
              className={activeType === id ? "active" : ""}
            >
              {typeNames[id]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, id) => (
            <li
              key={id}
              onClick={() => setActiveSize(id)}
              className={activeSize === id ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div onClick={onClickAdd} className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedItem > 0 && <i>{addedItem}</i>}
        </button>
      </div>
    </div>
  );
};
