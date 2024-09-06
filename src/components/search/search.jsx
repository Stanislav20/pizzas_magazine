import { useState, useContext, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';
import styles from './search.module.scss';

export const Search = () => {
	const [value, setValue] = useState('');
	const { setSearchValue } = useContext(SearchContext);
	const inputRef = useRef();

	const onClickClear = () => {
		setSearchValue('');
		setValue('');
		inputRef.current.focus(); //здесь получаем сам input и фокусируемся на нем после очистки поиска
	};

	const updateSearchValue = useCallback(
		debounce((str) => { //debouns аналог setTimeout, в данном случае изменяет state через 0.2с
			setSearchValue(str)
		}, 250),[]
	);

	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg className={styles.search} height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg">
				<path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"/>
			</svg>
			<input 
				ref={inputRef} //здесь вытаскиваем ссылку на input
				className={styles.input} 
				placeholder='Поиск пицц...'
				onChange={onChangeInput}
				value={value}
			/>
			{value &&
				<svg onClick={onClickClear} className={styles.clearIcon} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
			}
		</div>
	)
};