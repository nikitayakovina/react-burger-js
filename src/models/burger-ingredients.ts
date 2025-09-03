import type { TIngredient } from '@/models/ingredient';

export type TBurgerIngredientsProps = TIngredient & {
  className: string[] | string;
  count: number;
};

export type TIngredientDetails = {
  description: string;
  value: number;
  className: string | string[];
};
