import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'; /* Подружим приложение и Redux с помощью библиотеки react-redux */
import './index.css';
import { App } from './App';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <BrowserRouter>
	<HashRouter>
		<Provider store={store}> 
			<App />
		</Provider>
	</HashRouter>
	// </BrowserRouter>
);