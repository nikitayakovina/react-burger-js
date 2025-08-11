import { IngredientDetails } from '@components/ingredient-details/ingredient-details.jsx';

import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
  return (
    <section className={styles.main}>
      <IngredientDetails />
    </section>
  );
};
