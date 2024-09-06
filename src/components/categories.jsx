const arrCategories = ['все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = ({ activeIndexCategory, onClickCategory }) => {

	return (
		<div className="categories">
			<ul>
				{
					arrCategories.map((value, index) => 
					  (<li key={index} 
							onClick={() => onClickCategory(index)} 
							className={activeIndexCategory === index ? 'active' : ''}>{value}</li>))
				}
      </ul>
    </div>
	)
};