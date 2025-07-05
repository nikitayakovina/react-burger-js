import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const firstElement = ingredients[0];
  const lastElement = ingredients[ingredients.length - 1];

  return (
    <section className={`${styles.constructor}`}>
      {firstElement ? (
        <ConstructorElement
          extraClass="mb-2"
          type="top"
          key={firstElement._id}
          text={`${firstElement.name} (верх)`}
          price={firstElement.price}
          thumbnail={firstElement.image}
          isLocked={true}
        ></ConstructorElement>
      ) : null}
      <div className={styles.constructor_list}>
        {ingredients
          .filter((ingredient) => ingredient.type !== 'bun')
          .map((ingredient) => (
            <ConstructorElement
              extraClass="mt-2 mb-2"
              key={ingredient._id}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            ></ConstructorElement>
          ))}
      </div>
      {lastElement ? (
        <ConstructorElement
          extraClass="mt-2"
          type="bottom"
          key={lastElement._id}
          text={`${lastElement.name} (низ)`}
          price={lastElement.price}
          thumbnail={lastElement.image}
          isLocked={true}
        ></ConstructorElement>
      ) : null}
      <div className={`${styles.order} mt-5`}>
        <div className={`${styles.price} mr-5`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary"></CurrencyIcon>
        </div>
        <Button type="primary" size="small">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
