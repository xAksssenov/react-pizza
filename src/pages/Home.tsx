import { useEffect, useRef, useState } from "react";
import qs from "qs";

import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../redux/slices/filterSlice";
import { setItems } from "../redux/slices/pizzaSlice";

export type PizzaItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
  types: string[];
  sizes: number[];
};

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { items } = useSelector((state: any) => state.pizza.items);

  const { categoryId, sort, pageCount, searchValue } = useSelector(
    (state: RootState) => state.filter
  );
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isMounted.current = true;
    }
  }, [dispatch]);

  const fetchPizzas = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&title=${searchValue}` : "";

    try {
      const { data } = await axios.get(
        `https://f1bcf432b4787299.mokky.dev/pizza?page=${pageCount}&limit=4${category}&sortBy=${sort.sortProperty}${search}`
      );
      dispatch(setItems(data));
    } catch (error) {
      console.log("Ошибка подключения:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, pageCount]);

  useEffect(() => {
    if (isMounted.current) {
      const querySrt = qs.stringify({
        pageCount,
        categoryId,
        sortProperty: sort.sortProperty,
      });
      navigate(`?${querySrt}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, pageCount]);

  const pizzas = Array.isArray(items)
    ? items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
    : [];
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
