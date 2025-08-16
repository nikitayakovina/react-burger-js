import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

import { ingredientPropTypes } from '@utils/PropTypes/ingredient.js';

import styles from './ingredient.module.css';

export const Ingredient = ({ ingredient, className, count }) => {
  const classList = classNames(className, styles.ingredient);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { backgroundLocation: location },
    });
  };
  const [, ref] = useDrag({
    type: ingredient.type,
    item: ingredient,
  });

  return (
    <div className={classList} ref={ref} onClick={handleNavigate}>
      <div className={`${styles.ingredient_preview} ml-4 mr-4`}>
        <img src={ingredient.image} alt="Превью ингредиента" />
      </div>
      <div className={`${styles.ingredient_price} mt-1 mb-1`}>
        <p className="mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary"></CurrencyIcon>
      </div>
      <p>{ingredient.name}</p>
      {count && <Counter count={count} size="default" extraClass={styles.count} />}
    </div>
  );
};

Ingredient.PropTypes = {
  ingredient: ingredientPropTypes,
  className: PropTypes.string,
  count: PropTypes.number,
};
