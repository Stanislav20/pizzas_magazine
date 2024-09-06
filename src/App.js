import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import './styles/app.scss';
import { Header } from './components/header';
import { Home } from './pages/home';
import { Cart } from './pages/cart';
import { NotFound } from './pages/notFound';

export const SearchContext = createContext();

export const App = () => {
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className="wrapper">
			<SearchContext.Provider value={{ searchValue, setSearchValue }} >
				<Header />
				<div className="content">
						<Routes>
							<Route path="/" element={<Home />}/>
							<Route path="/cart" element={<Cart/>}/>
							<Route path="*" element={<NotFound/>}/>
						</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	)
};
