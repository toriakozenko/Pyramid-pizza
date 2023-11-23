function Categories({ value, onClickCategory }) {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Seafood', 'Sweet'];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
