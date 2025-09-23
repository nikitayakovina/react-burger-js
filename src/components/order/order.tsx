import { useAppSelector } from '@/hooks/selector.ts';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TIngredient } from '@/models/ingredient.ts';
import type { TWSOrder } from '@/models/order.ts';

import styles from './order.module.css';

type OrderProps = {
  order: TWSOrder;
  isProfile?: boolean;
};

export const Order = ({ order, isProfile = false }: OrderProps) => {
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const [data, setData] = useState<TIngredient[]>([]);
  const currency = useMemo(() => {
    if (!data || data.length === 0) {
      return 0;
    }

    return data.reduce((amount: number, elem?: TIngredient) => {
      return amount + (elem?.price ?? 0);
    }, 0);
  }, [data]);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = () => {
    navigate(!isProfile ? `/feed/${order.number}` : `/profile/orders/${order.number}`, {
      state: { backgroundLocation: location },
    });
  };

  useEffect(() => {
    if (order && order.ingredients) {
      const items = order.ingredients
        .map((item) => ingredients.find((ingredient) => ingredient._id === item))
        .filter((item) => item !== undefined);

      setData(items);
    }
  }, [ingredients, order]);

  return (
    <main onClick={handleNavigate}>
      <div className={`${styles.card}`}>
        <section className={`${styles.cardHeader}`}>
          <p className="text text_type_digits-default">#{order.number}</p>
          {order!.createdAt && (
            <p className="text text_type_digits-default">
              {
                <FormattedDate
                  date={new Date(order!.createdAt)}
                  className="text text_type_main-default text_color_inactive"
                />
              }
            </p>
          )}
        </section>
        <p className={`text text_type_main-medium mt-10 mb-3`}>{order.name}</p>
        {data.length > 0 && (
          <section className={`${styles.ingredients}`}>
            <div className={styles.ingredientsList}>
              {data?.slice(0, 5).map((item, index) => (
                <div className={styles.ingredient} key={index}>
                  <img src={item.image} alt="Превью ингредиента" />
                </div>
              ))}

              {data && data.length > 5 && (
                <div className={`${styles.ingredient} ${styles.overflow}`} key="last">
                  <img src={data[data.length - 1].image} alt="Превью ингредиента" />
                  <span className={styles.overflowText}>+{data.length - 5}</span>
                </div>
              )}
            </div>
            <div className={`${styles.currency}`}>
              <span className={`text text_type_digits-default mr-2`}>{currency}</span>
              <CurrencyIcon type="primary"></CurrencyIcon>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
