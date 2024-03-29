import { useCallback, useEffect, useRef } from 'react';

import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import errorPage from '../assets/img/error-page.jpg';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import SortPopup, { sortList } from '../components/SortPopup';
import { selectFilter } from '../redux/filter/selector';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selector';
import { SearchPizzaParams } from '../redux/pizza/types';
import { useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);


  const pizzas = items
    ?.filter((obj: any) => obj.name && obj.name.toLowerCase().includes(searchValue.toLowerCase()))
    ?.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        category,
        sortBy,
        order,
        search,
      }),
    );

    window.scroll(0, 0);
  };

  // перевірка чи був перший рендер, якщо вже був, тоді можна вшивати параметри в url
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzaParams));
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //якщо був перший рендер, то перевіряємо url параметри і сохраняємо в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //якщо був перший рендер, то відправляєм запит для отримання піц
  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">ffff</h2>
      {status === 'loading' || items?.length === 0 ? (
        skeletons
      ) : status === 'error' || items?.length === 0 ? (
        <div className="content__error-info">
          <h2>
            There was an error <span>😕</span>
          </h2>
          <p>Unfortunately, we couldn't get pizza. Try again later.</p>
        </div>
      ) : pizzas?.length === 0 ? (
        <div className="content__error-info">
          <img src={errorPage} alt="error-page" />
        </div>
      ) : (
        <>
          <div className="content__items">{pizzas}</div>
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
      )}
    </div>
  );
};

export default Home;
