import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { OrderDetails } from '@components/order-details/order-details.jsx';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const firstElement = ingredients[0];
  const lastElement = ingredients[ingredients.length - 1];
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <section className={`${styles.burgerConstructor} ml-10 pr-4 mb-10`}>
      {firstElement ? (
        <ConstructorElement
          extraClass="mb-2 ml-8"
          type="top"
          key={firstElement._id}
          text={`${firstElement.name} (верх)`}
          price={firstElement.price}
          thumbnail={firstElement.image}
          isLocked={true}
        ></ConstructorElement>
      ) : null}
      <div className={`${styles.burgerConstructor_list}`}>
        {ingredients
          .filter((ingredient) => ingredient.type !== 'bun')
          .map((ingredient) => (
            <div className={styles.item} key={ingredient._id}>
              <DragIcon type="primary" className="mr-2" />
              <ConstructorElement
                extraClass="mt-2 mb-2"
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              ></ConstructorElement>
            </div>
          ))}
      </div>
      {lastElement ? (
        <ConstructorElement
          extraClass="mt-2 ml-8"
          type="bottom"
          key={lastElement._id}
          text={`${lastElement.name} (низ)`}
          price={lastElement.price}
          thumbnail={lastElement.image}
          isLocked={true}
        ></ConstructorElement>
      ) : null}
      <div className={`${styles.order} mt-10 pr-4`}>
        <div className={`${styles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary"></CurrencyIcon>
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={() => setOpenModal(true)}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal && <OrderDetails onClose={() => setOpenModal(false)} />}
    </section>
  );
};
