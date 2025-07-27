import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import {
  REMOVE_INGREDIENT,
  SORT_INGREDIENT,
} from '../../../services/actions/burgerConstructor.js';
import { ingredientPropTypes } from '@utils/PropTypes/ingredient.js';

export const Ingredient = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const ingredientRef = useRef(null);
  const handleClose = () => {
    dispatch({ type: REMOVE_INGREDIENT, index });
  };
  const [, drag] = useDrag({
    type: 'sort',
    item: { index },
  });
  const [, drop] = useDrop({
    accept: 'sort',
    drop(item) {
      if (index !== item.index) {
        dispatch({ type: SORT_INGREDIENT, toIndex: index, fromIndex: item.index });
      }
    },
  });
  drag(drop(ingredientRef));

  return (
    <div ref={ingredientRef}>
      <DragIcon type="primary" className="mr-2" />
      <ConstructorElement
        handleClose={() => handleClose(ingredient)}
        extraClass="mt-2 mb-2"
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      ></ConstructorElement>
    </div>
  );
};
Ingredient.propTypes = {
  ingredient: ingredientPropTypes,
  index: PropTypes.number,
};
