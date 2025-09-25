import { request } from '@utils/request.ts';

import type { TWSOrder } from '@/models/order.ts';

export const fetchOrder = (id: string | number) => {
  return request<{ orders: TWSOrder[]; success: boolean }>(`/api/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
