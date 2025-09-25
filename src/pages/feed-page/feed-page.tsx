import { useAppDispatch } from '@/hooks/dispatch';
import { useAppSelector } from '@/hooks/selector.ts';
import { useEffect } from 'react';

import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/ws.ts';
import { OrderBoard } from '@components/order-board/order-board.tsx';
import { Order } from '@components/order/order.tsx';

import styles from './feed-page.module.css';

export const FeedPage = () => {
  const { orders } = useAppSelector((state) => state.wsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/orders/all' });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: { message: 'ERROR' } });
    };
  }, [dispatch]);

  return (
    <section className={`${styles.feed} mb-10`}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Лента заказов
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <div className={`${styles.orders} mr-15`}>
          {orders.map((order, index) => (
            <Order order={order} key={index} />
          ))}
        </div>
        <OrderBoard />
      </main>
    </section>
  );
};
