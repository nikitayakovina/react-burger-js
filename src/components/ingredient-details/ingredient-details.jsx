import classNames from 'classnames';

import { Modal } from '@components/modal/modal.jsx';

import styles from './ingredient-details.module.css';

const Kbzhu = ({ description, value, className }) => {
  const classList = classNames(className, styles.detail);

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

export const IngredientDetails = ({ ingredient, onClose }) => {
  return (
    <Modal header="Детали ингридиента" onClose={onClose}>
      <div className={styles.container}>
        <img
          className={styles.preview}
          src={ingredient.image}
          alt="Превью ингредиента"
        />
        <div className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>
          {ingredient.name}
        </div>
        <div className={`${styles.details} mb-15`}>
          <Kbzhu
            className="mr-5"
            description="Калории,ккал"
            value={ingredient.calories}
          />
          <Kbzhu className="mr-5" description="Белки, г" value={ingredient.proteins} />
          <Kbzhu className="mr-5" description="Жиры, г" value={ingredient.fat} />
          <Kbzhu description="Углеводы, г" value={ingredient.carbohydrates} />
        </div>
      </div>
    </Modal>
  );
};
