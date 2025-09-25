import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import classNames from 'classnames';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TBurgerIngredientsProps } from '@/models/burger-ingredients';
import type { TIngredient } from '@/models/ingredient';

import styles from './ingredient.module.css';

export const Ingredient = ({
  ingredient,
  className,
  count,
}: TBurgerIngredientsProps) => {
  const classList = (classNames as unknown)(className, styles.ingredient);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = () => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { backgroundLocation: location },
    });
  };
  const [, ref] = useDrag<TIngredient, void, unknown>({
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
