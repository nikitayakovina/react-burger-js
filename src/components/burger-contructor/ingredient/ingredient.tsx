import { useAppDispatch } from '@/hooks/dispatch';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  REMOVE_INGREDIENT,
  SORT_INGREDIENT,
} from '../../../services/actions/burgerConstructor.js';

import type { TIngredientBurgerProps } from '@/models/burger-constructor';
import type { FC } from 'react';

export const Ingredient: FC<TIngredientBurgerProps> = ({ ingredient, index }) => {
  const dispatch = useAppDispatch();
  const ingredientRef = useRef(null);
  const handleClose = (): void => {
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
        handleClose={handleClose}
        extraClass="mt-2 mb-2"
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      ></ConstructorElement>
    </div>
  );
};
