import { useAppSelector } from '@/hooks/selector.ts';
import { useMemo } from 'react';

import styles from './order-board.module.css';

export const OrderBoard = () => {
  const { orders, total, totalToday } = useAppSelector((state) => state.wsReducer);
  const ordersDone = useMemo(
    () => orders.filter((order) => order.status === 'done'),
    [orders]
  );
  const ordersWork = useMemo(
    () => orders.filter((order) => order.status !== 'done'),
    [orders]
  );

  return (
    <div className={styles.board}>
      <div className={styles.status}>
        <div className={`${styles.statusDone} mr-9`}>
          <h1 className="text text_type_main-medium mb-6">Готовы:</h1>
          {ordersDone.length ? (
            <div className={styles.numberListWrap}>
              {Array.from({ length: Math.ceil(ordersDone.length / 10) }).map(
                (_, chunkIndex) => (
                  <div key={chunkIndex} className={styles.numberList}>
                    {ordersDone
                      .slice(chunkIndex * 10, chunkIndex * 10 + 10)
                      .map((order, index) => (
                        <span className="text text_type_digits-default" key={index}>
                          {order.number}
                        </span>
                      ))}
                  </div>
                )
              )}
            </div>
          ) : (
            <span className="text text_type_main-medium">Заказов нет</span>
          )}
        </div>

        <div className={styles.statusWork}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          {ordersWork.length ? (
            <div className={styles.numberList}>
              {ordersWork.slice(0, 10).map((order, index) => (
                <span className="text text_type_digits-default" key={index}>
                  {order.number}
                </span>
              ))}
            </div>
          ) : (
            <span className="text text_type_main-medium">Заказов нет</span>
          )}
        </div>
      </div>

      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className={`text text_type_digits-large`}>{total}</p>
      </div>

      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={`text text_type_digits-large`}>{totalToday}</p>
      </div>
    </div>
  );
};
