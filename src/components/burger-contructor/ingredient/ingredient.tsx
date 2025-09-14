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
type TDragItem = {
  index: number;
};
export const Ingredient = ({ ingredient, index }: TIngredientBurgerProps) => {
  const dispatch = useAppDispatch();
  const ingredientRef = useRef<HTMLDivElement | null>(null);
  const handleClose = () => {
    dispatch({ type: REMOVE_INGREDIENT, index });
  };
  const [, drag] = useDrag<TDragItem, void, unknown>({
    type: 'sort',
    item: { index },
  });
  const [, drop] = useDrop<TDragItem, void, unknown>({
    accept: 'sort',
    drop(item: TDragItem) {
      if (index !== item.index) {
        dispatch({ type: SORT_INGREDIENT, toIndex: index, fromIndex: item.index });
      }
    },
  });
  drag(drop(ingredientRef.current));

  return (
    <div ref={(node) => drag(drop(node))}>
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
