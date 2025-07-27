import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchIngredients } from '../../services/actions/ingredients.js';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const App = () => {
  const { items } = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {items?.length && (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </div>
  );
};
