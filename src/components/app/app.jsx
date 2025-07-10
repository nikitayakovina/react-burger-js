import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ingredientsApi } from '@utils/Api/ingredientsApi.js';

import styles from './app.module.css';

export const App = () => {
  const [ingredients, setIngredients] = useState(null);

  useEffect(() => {
    ingredientsApi()
      .then((data) => {
        setIngredients(data.data);
      })
      .catch(() => setIngredients(null));
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {ingredients?.length && (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      )}
    </div>
  );
};
