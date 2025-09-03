import { useAppDispatch } from '@/hooks/dispatch';
import { Preloader, Tab } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { SET_TAB } from '../../services/actions/tabs.js';
import { Ingredient } from '@components/burger-ingredients/ingredient/ingredient.js';

import type { FC } from 'react';

import styles from './burger-ingredients.module.css';

type TTabs = {
  value: string;
  active: boolean;
  text: string;
  onClick: () => void;
};

export const BurgerIngredients: FC = () => {
  const { items, loading } = useSelector((state) => state.ingredients);
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { tab } = useSelector((state) => state.tabs);
  const buns = items.filter((ingredient) => ingredient.type === 'bun');
  const mains = items.filter((ingredient) => ingredient.type === 'main');
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLHeadingElement>(null!);
  const bunRef = useRef<HTMLHeadingElement>(null!);
  const mainRef = useRef<HTMLHeadingElement>(null!);
  const tabs: TTabs[] = [
    {
      value: 'bun',
      active: tab === 'bun',
      text: 'Булки',
      onClick: () => {
        selectTab('bun');
      },
    },
    {
      value: 'main',
      active: tab === 'main',
      text: 'Начинки',
      onClick: () => {
        selectTab('main');
      },
    },
    {
      value: 'sauce',
      active: tab === 'sauce',
      text: 'Соусы',
      onClick: () => {
        selectTab('sauce');
      },
    },
  ];
  const selectTab = (tab) => {
    dispatch({ type: SET_TAB, tab });

    if (tab === 'bun') {
      bunRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'main') {
      mainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const onScroll = () => {
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const bunTop = bunRef.current.getBoundingClientRect().top;
    const mainTop = mainRef.current.getBoundingClientRect().top;
    const bunDistance = Math.abs(bunTop - containerTop);
    const mainDistance = Math.abs(mainTop - containerTop);
    const minDistance = Math.min(bunDistance, mainDistance);

    dispatch({ type: SET_TAB, tab: minDistance === bunDistance ? 'bun' : 'main' });
  };
  const count = useMemo(() => {
    return ingredients.reduce(
      (acc, ingredient) => {
        acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
        return acc;
      },
      bun ? { [bun._id]: 2 } : {}
    );
  }, [bun, ingredients]);

  return (
    <section className={`${styles.burger_ingredients} mb-10`}>
      <nav>
        <ul className={styles.menu}>
          {tabs.map((tab, index) => (
            <Tab key={index} value={tab.value} active={tab.active} onClick={tab.onClick}>
              {tab.text}
            </Tab>
          ))}
        </ul>
      </nav>
      {loading ? (
        <Preloader />
      ) : (
        <main className={`${styles.ingredients}`} onScroll={onScroll} ref={containerRef}>
          <div className={styles.ingredients_buns}>
            <h2 ref={bunRef}>Булки</h2>
            <div className={`${styles.ingredients_cards} mt-6 ml-4 mr-4 mb-10`}>
              {buns.map((bun) => (
                <Ingredient
                  key={bun._id}
                  ingredient={bun}
                  count={count[bun._id]}
                ></Ingredient>
              ))}
            </div>
          </div>
          <div className={styles.ingredients_mains}>
            <h2 ref={mainRef}>Соусы</h2>
            <div className={`${styles.ingredients_cards} mt-6 ml-4 mr-4`}>
              {mains.map((main) => (
                <Ingredient
                  className="mb-8"
                  key={main._id}
                  ingredient={main}
                  count={count[main._id]}
                ></Ingredient>
              ))}
            </div>
          </div>
        </main>
      )}
    </section>
  );
};
