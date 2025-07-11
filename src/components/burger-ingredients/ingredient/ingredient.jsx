import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { ingredientPropTypes } from '@utils/PropTypes/ingredient.js';

import styles from './ingredient.module.css';

export const Ingredient = ({ ingredient, className }) => {
  const classList = classNames(className, styles.ingredient);
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <div className={classList} onClick={() => setOpenModal(true)}>
      <div className={`${styles.ingredient_preview} ml-4 mr-4`}>
        <img src={ingredient.image} alt="Превью ингредиента" />
      </div>
      <div className={`${styles.ingredient_price} mt-1 mb-1`}>
        <p className="mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary"></CurrencyIcon>
      </div>
      <p>{ingredient.name}</p>
      {isOpenModal && (
        <Modal header="Детали ингридиента" onClose={() => setOpenModal(false)}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
};

Ingredient.PropTypes = {
  ingredient: ingredientPropTypes,
  className: PropTypes.string,
};
