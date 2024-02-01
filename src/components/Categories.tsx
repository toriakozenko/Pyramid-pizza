type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};
const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Seafood', 'Sweet'];


const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
