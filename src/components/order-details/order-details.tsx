import { useAppSelector } from '@/hooks/selector.ts';

import doneImage from '../../../public/done.svg';

import styles from './order-details.module.css';

export const OrderDetails = () => {
  const { order } = useAppSelector((state) => state.order);

  return (
    <div className={styles.orderContainer} data-testid="createdOrder">
      <p className="text text_type_digits-large mt-20 mb-8">{order?.number}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneImage} className={`${styles.preview} mb-15`} alt="Заказ оформлен" />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
