import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';

import type { FC } from 'react';

import styles from './ingredient-page.module.css';

export const IngredientPage: FC = () => {
  const { id } = useParams();
  const { items } = useSelector((state) => state.ingredients);
  const ingredient = items.find((item) => item._id === id);

  return (
    <section className={styles.pageContainer}>
      {ingredient ? <IngredientDetails ingredient={ingredient} /> : <Preloader />}
    </section>
  );
};
