import { useAppDispatch } from '@/hooks/dispatch.ts';
import { useAppSelector } from '@/hooks/selector.ts';
import { useEffect } from 'react';

import {
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_CONNECTION_START,
} from '../../services/actions/ws.ts';
import { Order } from '@components/order/order.tsx';
import { getCookie } from '@utils/cookie.ts';

import styles from './profile-orders-page.module.css';

export const ProfileOrdersPage = () => {
  const { profileOrders } = useAppSelector((state) => state.wsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie('accessToken');

    dispatch({ type: WS_PROFILE_CONNECTION_START, payload: `/orders?token=${token}` });

    return () => {
      dispatch({ type: WS_PROFILE_CONNECTION_CLOSED, payload: { message: 'ERROR' } });
    };
  }, [dispatch]);

  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <div className={`${styles.orders}`}>
        {profileOrders?.length ? (
          profileOrders.map((order, index) => (
            <Order order={order} isProfile={true} key={index} />
          ))
        ) : (
          <span className={'text text_type_digits-default mb-10'}>Заказов нет</span>
        )}
      </div>
    </main>
  );
};
