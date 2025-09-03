import { useAppDispatch } from '@/hooks/dispatch';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  ADD_BUN,
  addIngredient,
  CLEAR_INGREDIENT,
} from '../../services/actions/burgerConstructor.js';
import { CLEAR_ORDER, sendOrder } from '../../services/actions/order.js';
import { Ingredient } from '@components/burger-contructor/ingredient/ingredient.js';
import { Modal } from '@components/modal/modal.js';
import { OrderDetails } from '@components/order-details/order-details.js';

import type { FC } from 'react';

import styles from './burger-constructor.module.css';
export const BurgerConstructor: FC = () => {
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { user } = useSelector((state) => state.auth);
  const { order, loading } = useSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      dispatch(addIngredient(item));
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
  const createOrder = (): void => {
    if (!user) {
      navigate('/login', { replace: true });
    } else {
      dispatch(sendOrder([...ingredients, bun, bun]));
    }
  };
  const handleCloseModal = (): void => {
    dispatch({ type: CLEAR_ORDER });
    dispatch({ type: CLEAR_INGREDIENT });
  };

  return (
    <section className={`${styles.burgerConstructor} ml-10 pr-4 mb-10`}>
      {loading ? (
        <Preloader />
      ) : (
        <>
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
                <div className={`text text_type_main-default`}>
                  Добавьте верхнюю булку
                </div>
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
                    key={ingredient.uniqueId}
                  />
                ))
            ) : (
              <div className={`${styles.emptyIngredient} constructor-element ml-8`}>
                <div className={`text text_type_main-default`}>
                  Перетащите ингридиенты
                </div>
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
                <div className={`text text_type_main-default`}>
                  Добавьте нижнюю булку
                </div>
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
        </>
      )}
    </section>
  );
};
