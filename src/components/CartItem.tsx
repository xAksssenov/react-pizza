import { useDispatch } from "react-redux";
import { minusItem, removeItem, addItem } from "../redux/slices/cartSlice";

type CartItemProps = {
    id: string;
    title: string;
    types: string[];
    sizes: number[];
    price: number;
    count: number;
    imageUrl: string;
  };
const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  types,
  sizes,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({id}));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Действительно хотите удалить данный товар?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div key={id} className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {types}, {sizes} см
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          -
        </div>
        <b>{count}</b>
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          +
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          X
        </div>
      </div>
    </div>
  );
};

export default CartItem;
