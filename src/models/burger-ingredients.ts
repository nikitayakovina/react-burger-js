import type { TIngredient } from '@/models/ingredient';

export type TBurgerIngredientsProps = {
  ingredient: TIngredient;
  className: string[] | string;
  count: number;
};

export type TIngredientDetails = {
  description: string;
  value: number;
  className?: string | string[];
};
