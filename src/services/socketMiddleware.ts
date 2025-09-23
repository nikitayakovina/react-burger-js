import type { Middleware, MiddlewareAPI } from 'redux';

import type {
  TWSActions,
  TWSActionTypes,
  TWSProfileActions,
} from '@services/actions/ws.ts';

import type { AppDispatch, RootState } from '../services/store.ts';

export const socketMiddleware = (wsUrl: string, wsActions: TWSActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (wsActionsTypes: TWSActionTypes | TWSProfileActions) => {
      const { dispatch } = store;
      const { type, payload } = wsActionsTypes;

      if (type === wsActions.wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: wsActions.onOpen });
        };

        socket.onerror = (event: Event) => {
          dispatch({
            type: wsActions.onError,
            payload: { message: JSON.parse(JSON.stringify(event)) },
          });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;

          dispatch({ type: wsActions.onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({
            type: wsActions.onClose,
            payload: {
              code: event.code,
              reason: event.reason,
              wasClean: event.wasClean,
            },
          });
        };

        if (type === wsActions.onClose && socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      }

      next(wsActionsTypes);
    };
  }) as Middleware;
};
