import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { SET_INGREDIENT_DETAILS } from '../../../services/actions/ingredientDetails.js';
import { ingredientPropTypes } from '@utils/PropTypes/ingredient.js';

import styles from './ingredient.module.css';

export const Ingredient = ({ ingredient, className, count }) => {
  const dispatch = useDispatch();
  const classList = classNames(className, styles.ingredient);
  const hideModal = () => {
    dispatch({ type: SET_INGREDIENT_DETAILS, ingredient });
  };
  const [, ref] = useDrag({
    type: ingredient.type,
    item: ingredient,
  });

  return (
    <div className={classList} onClick={hideModal} ref={ref}>
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
