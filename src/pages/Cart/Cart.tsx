import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { JSX } from "react/jsx-runtime";
import { PizzaItem } from "../Home";
import { clearItem } from "../../redux/slices/cartSlice";
import CartEmpty from "./CartEmpty";

const Cart = () => {
  const { totalCount, totalPrice } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.cart.items);

  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(clearItem(items));
    }
  };

  if (!totalCount) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title"> Корзина</h2>
          <div className="cart__clear">
            <span onClick={onClickClear}>Очистить корзину</span>
          </div>
        </div>
        <div className="props__item">
          {items.map((item: JSX.IntrinsicAttributes & PizzaItem) => (
            <CartItem {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {" "}
              Всего пицц: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              {" "}
              Сумма заказа: <b>{totalPrice}</b>{" "}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
