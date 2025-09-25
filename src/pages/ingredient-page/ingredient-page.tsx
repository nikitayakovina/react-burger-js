import { useAppSelector } from '@/hooks/selector.ts';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';

import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
  const { id } = useParams();
  const { items } = useAppSelector((state) => state.ingredients);
  const ingredient = items.find((item) => item._id === id);

  return (
    <section className={styles.pageContainer}>
      {ingredient ? <IngredientDetails ingredient={ingredient} /> : <Preloader />}
    </section>
  );
};
