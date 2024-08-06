import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(Object);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://f1bcf432b4787299.mokky.dev/pizza/` + id
        );
        setPizza(data);
      } catch (error) {
        console.log("Ошибка подключения", error);
        navigate("*");
      }
    };
    fetchPizza();
  }, []);

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
