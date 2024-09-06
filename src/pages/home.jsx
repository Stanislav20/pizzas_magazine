import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// useSelector вытаскивает данные из хранилища
// useDispatch вполняет действия, в данном случает меняет категорию пицц и меняет сортировку пиицц

import { Categories } from '../components/categories';
import { Sort } from '../components/sort';
import { PizzaBlock } from '../components/pizzaBlock/pizzaBlock';
import { PizzaLoader } from '../components/pizzaBlock/pizzaLoader';
import { SearchContext } from '../App';
import { setActiveIndexCategory, setSelectedSort } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { getActiveIndexCategory, getSelectedSort } from '../redux/selectors/filterSelectors';

export const Home = () => {
	const dispatch = useDispatch();
	const { searchValue } = useContext(SearchContext);
	const { items, status } = useSelector((state) => state.pizzasReducer);

	const pizzas = items
		.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((obj) => (<PizzaBlock key={obj.id} {...obj} />));
	const loaderPizzas = [...new Array(6)].map((_, i) => <PizzaLoader key={i} />);
	const activeIndexCategory = useSelector(getActiveIndexCategory);
	const selectedSort = useSelector(getSelectedSort);
	
	const getPizzas = () => {
		const sortBy = selectedSort.sortProperty.replace('-', '');
		const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = activeIndexCategory > 0 ? `category=${activeIndexCategory}` : '';

		dispatch(fetchPizzas({
			sortBy,
			order,
			category,
		}));
		window.scroll(0, 0);
	};
	
	const onClickCategory = (index) => {
		dispatch(setActiveIndexCategory(index))
	};

	const onClickSort = (obj) => {
		dispatch(setSelectedSort(obj))
	};

	useEffect(() => {
		getPizzas()
	}, [activeIndexCategory, selectedSort]);
  
	return (
		<div className="container">
			<div className="content__top">
				<Categories 
				  activeIndexCategory={activeIndexCategory} 
					onClickCategory={onClickCategory} />
				<Sort  
				  selectedSort={selectedSort} 
					onClickSort={onClickSort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === 'error'
				? (<div className='content__error'>
						<h2>Произошла ошибка 😕</h2>
						<p>К сожалению не удалось загрузить пиццы. Повторите попытку позже</p>
					</div>) 
				: (<div className="content__items">{status === 'loading' ? loaderPizzas : pizzas}</div>)
			}   
		</div>
	)
};