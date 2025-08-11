import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ingredientPropTypes } from '@utils/PropTypes/ingredient.js';

import styles from './ingredient-details.module.css';

const CaloricContent = ({ description, value, className }) => {
  const classList = classNames(className, styles.detail);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <div className={classList}>
      <div className="text text_type_main-default text_color_inactive">
        {description}
      </div>
      <div className="text text_type_digits-default text_color_inactive mt-2">
        {value}
      </div>
    </div>
  );
};

export const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.container}>
      <img className={styles.preview} src={ingredient.image} alt="Превью ингредиента" />
      <div className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>
        {ingredient.name}
      </div>
      <div className={`${styles.details} mb-15`}>
        <CaloricContent
          className="mr-5"
          description="Калории,ккал"
          value={ingredient.calories}
        />
        <CaloricContent
          className="mr-5"
          description="Белки, г"
          value={ingredient.proteins}
        />
        <CaloricContent className="mr-5" description="Жиры, г" value={ingredient.fat} />
        <CaloricContent description="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};
CaloricContent.propTypes = {
  description: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
};
