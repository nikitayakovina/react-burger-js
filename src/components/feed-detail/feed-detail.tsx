import { useAppDispatch } from '@/hooks/dispatch.ts';
import { useAppSelector } from '@/hooks/selector.ts';
import {
  CurrencyIcon,
  FormattedDate,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchOrderAction } from '../../services/actions/order.ts';

import type { TIngredient } from '@/models/ingredient.ts';
import type { TWSOrder } from '@/models/order.ts';

import styles from './feed-detail.module.css';

type TIngredientWithCount = TIngredient & {
  count: number;
  totalPrice: number;
};

type TFeedDetailProps = {
  isModal?: boolean;
};

export const FeedDetail = ({ isModal = false }: TFeedDetailProps) => {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.wsReducer);
  const orderAction = useAppSelector((state) => state.order.order) as TWSOrder;
  const { items } = useAppSelector((state) => state.ingredients);
  const [order, setOrder] = useState<TWSOrder | null>(null);
  const orderIngredients = order
    ? order.ingredients
        .map((id) => items.find((item) => item._id === id))
        .filter(Boolean)
    : [];
  const ingredientMap = orderIngredients.reduce<Record<string, TIngredientWithCount>>(
    (acc, item) => {
      if (item && acc[item._id]) {
        acc[item._id].count += 1;
        acc[item._id].totalPrice = acc[item._id].price * acc[item._id].count;
      } else if (item) {
        acc[item._id] = {
          ...item,
          count: 1,
          totalPrice: item.price,
        };
      }
      return acc;
    },
    {}
  );
  const ingredientsData: TIngredientWithCount[] = Object.values(ingredientMap);
  const totalPrice = Object.values(ingredientMap).reduce(
    (sum, ing) => sum + ing.price * ing.count,
    0
  );

  useEffect(() => {
    const foundOrder = orders.find((o) => Number(o.number) === Number(number));

    if (isModal && foundOrder) {
      setOrder(foundOrder);
    } else if (number) {
      void dispatch(fetchOrderAction(number));
    }
  }, [number, orders, isModal, dispatch]);

  useEffect(() => {
    if (orderAction) {
      setOrder(orderAction);
    }
  }, [orderAction, isModal]);

  return (
    <main className={styles.pageContainer}>
      {order ? (
        <div className={styles.containerWrapper}>
          <span className={'text text_type_digits-default mb-10'}>#{order.number}</span>
          <span className={`${styles.orderName} text text_type_main-medium mb-3`}>
            {order.name}
          </span>
          <p className={`text text_type_main-default mb-15 ${styles.statusDone}`}>
            {order?.status === 'done' ? 'Выполнен' : 'В работе'}
          </p>
          <p className={`text text_type_main-medium mb-3`}>Состав:</p>
          {ingredientsData.length > 0 && (
            <section className={styles.ingredientsList}>
              {ingredientsData.map((ingredient, index) => (
                <div key={index} className="mt-4 mr-6">
                  <div className={styles.ingredientsWrapper}>
                    <div className={styles.ingredientsDetails}>
                      <div className={styles.ingredientsImage}>
                        <img src={ingredient!.image_mobile} alt={ingredient!.name} />
                      </div>
                      <p
                        className={`text text_type_main-default ml-4 ${styles.ingredientsName}`}
                      >
                        {ingredient!.name}
                      </p>
                    </div>
                    <div className={styles.ingredientsPrice}>
                      <span className="text text_type_digits-default mr-2">{`${ingredient!.count} x ${ingredient!.totalPrice}`}</span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}
          <section
            className={`text text_type_main-default mt-10 mb-6 ${styles.ingredientsFooter}`}
          >
            {order!.createdAt && (
              <p className="text text_type_main-default text_color_inactive">
                <FormattedDate
                  date={new Date(order!.createdAt)}
                  className="text text_type_main-default text_color_inactive"
                />
              </p>
            )}

            <div className={styles.ingredientsPrice}>
              <span className={`text text_type_digits-default mr-2`}>{totalPrice}</span>
              <CurrencyIcon type="primary" />
            </div>
          </section>
        </div>
      ) : (
        <Preloader />
      )}
    </main>
  );
};
