import classNames from 'classnames';

import type { TIngredientDetails } from '@/models/burger-ingredients';
import type { TIngredient } from '@/models/ingredient';

import styles from './ingredient-details.module.css';

export type IngredientDetailsProps = {
  ingredient: TIngredient;
};

const CaloricContent = ({ description, value, className }: TIngredientDetails) => {
  const classList = (classNames as unknown)(className, styles.detail);

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

export const IngredientDetails = ({ ingredient }: IngredientDetailsProps) => {
  return (
    <div className={styles.container} data-testid="detailsIngredient">
      <img className={styles.preview} src={ingredient.image} alt="Превью ингредиента" />
      <div
        className={`${styles.name} text text_type_main-medium mt-4 mb-8`}
        data-testid="ingredientName"
      >
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
