import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import {
  ADD_BUN,
  ADD_INGREDIENT,
  CLEAR_INGREDIENT,
} from '../../services/actions/burgerConstructor.js';
import { CLEAR_ORDER, sendOrder } from '../../services/actions/order.js';
import { Ingredient } from '@components/burger-contructor/ingredient/ingredient.jsx';
import { Modal } from '@components/modal/modal.jsx';
import { OrderDetails } from '@components/order-details/order-details.jsx';

import styles from './burger-constructor.module.css';
export const BurgerConstructor = () => {
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [, dropBunUp] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch({ type: ADD_BUN, item });
    },
  });
  const [, dropBunDown] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch({ type: ADD_BUN, item });
    },
  });
  const [, dropIngredient] = useDrop({
    accept: 'main',
    drop(item) {
      dispatch({ type: ADD_INGREDIENT, item });
    },
  });
  const amount = useMemo(() => {
    const ingredientsAmount = ingredients.reduce(
      (amount, ingredient) => amount + ingredient.price,
      0
    );
    const bunAmount = bun ? bun.price * 2 : 0;

    return ingredientsAmount + bunAmount;
  }, [bun, ingredients, dispatch]);
  const createOrder = () => {
    dispatch(sendOrder([...ingredients, bun, bun]));
  };
  const handleCloseModal = () => {
    dispatch({ type: CLEAR_ORDER });
    dispatch({ type: CLEAR_INGREDIENT });
  };

  return (
    <section className={`${styles.burgerConstructor} ml-10 pr-4 mb-10`}>
      <div ref={dropBunUp}>
        {bun ? (
          <ConstructorElement
            extraClass="mb-2 ml-8"
            type="top"
            key={bun._id}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            isLocked={true}
          ></ConstructorElement>
        ) : (
          <div className={`constructor-element constructor-element_pos_top ml-8`}>
            <div className={`text text_type_main-default`}>Добавьте верхнюю булку</div>
          </div>
        )}
      </div>
      <div className={`${styles.burgerConstructor_list}`} ref={dropIngredient}>
        {ingredients?.length ? (
          ingredients
            .filter((ingredient) => ingredient.type !== 'bun')
            .map((ingredient, i) => (
              <Ingredient
                className={styles.item}
                ingredient={ingredient}
                index={i}
                key={ingredient._id}
              />
            ))
        ) : (
          <div className={`${styles.emptyIngredient} constructor-element ml-8`}>
            <div className={`text text_type_main-default`}>Перетащите ингридиенты</div>
          </div>
        )}
      </div>
      <div ref={dropBunDown}>
        {bun ? (
          <ConstructorElement
            extraClass="mt-2 ml-8"
            type="bottom"
            key={bun._id}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            isLocked={true}
          ></ConstructorElement>
        ) : (
          <div className={`constructor-element constructor-element_pos_down ml-8`}>
            <div className={`text text_type_main-default`}>Добавьте нижнюю булку</div>
          </div>
        )}
      </div>
      <div className={`${styles.order} mt-10 pr-4`}>
        <div className={`${styles.price} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{amount}</p>
          <CurrencyIcon type="primary"></CurrencyIcon>
        </div>
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          disabled={!bun}
          onClick={createOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {order && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
