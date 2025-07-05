import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { Ingredient } from '@components/burger-ingredients/ingredient/ingredient.jsx';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');

  return (
    <section className={`${styles.burger_ingredients} mb-10`}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <main className={`${styles.ingredients}`}>
        <div className={styles.ingredients_buns}>
          <h2>Булки</h2>
          <div className={`${styles.ingredients_cards} mt-6 ml-4 mr-4 mb-10`}>
            {buns.map((bun) => (
              <Ingredient key={bun._id} ingredient={bun}></Ingredient>
            ))}
          </div>
        </div>
        <div className={styles.ingredients_mains}>
          <h2>Соусы</h2>
          <div className={`${styles.ingredients_cards} mt-6 ml-4 mr-4`}>
            {mains.map((main) => (
              <Ingredient className="mb-8" key={main._id} ingredient={main}></Ingredient>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};
