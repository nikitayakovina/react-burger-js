import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import classNames from 'classnames';

import styles from './ingredient.module.css';

export const Ingredient = ({ ingredient, className, onClick }) => {
  const classList = classNames(className, styles.ingredient);

  return (
    <div className={classList} onClick={() => onClick?.()}>
      <div className={`${styles.ingredient_preview} ml-4 mr-4`}>
        <img src={ingredient.image} alt="Превью ингредиента" />
      </div>
      <div className={`${styles.ingredient_price} mt-1 mb-1`}>
        <p style={{ marginRight: '8px' }}>{ingredient.price}</p>
        <CurrencyIcon type="primary"></CurrencyIcon>
      </div>
      <p>{ingredient.name}</p>
    </div>
  );
};
