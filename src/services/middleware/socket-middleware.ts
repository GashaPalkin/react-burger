import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../reducers';

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsSendMessage?: ActionCreatorWithPayload<any>,
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<any>,
  // 
  wsConnectUser: ActionCreatorWithPayload<string>,
  wsDisconnectUser: ActionCreatorWithoutPayload,
  wsConnectingUser: ActionCreatorWithoutPayload,
  onOpenUser: ActionCreatorWithoutPayload,
  onCloseUser: ActionCreatorWithoutPayload,
  onErrorUser: ActionCreatorWithPayload<string>,
  onMessageUser: ActionCreatorWithPayload<any>,

}

export const createSocketMiddleware: any = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let socketUser: WebSocket | null = null;

    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return next => action => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        // 
        wsConnectUser,
        wsDisconnectUser,
        onOpenUser,
        onCloseUser,
        onErrorUser,
        onMessageUser,
        wsConnectingUser,

      } = wsActions;

      if (wsConnect.match(action)) {
        console.log('connect')
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = err => {
          console.log('error')
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            console.log('error')
            dispatch(onError(event.code.toString()));
          }
          console.log('close')
          dispatch(onCloseUser());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnectUser(url));
            }, 3000)
          }
        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          console.log('send')
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.match(action)) {
          console.log('disconnect')
          clearTimeout(reconnectTimer)
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose());
        }
      }

      if (wsConnectUser.match(action)) {
        console.log('connect')
        url = action.payload;
        socketUser = new WebSocket(url);
        isConnected = true;
        dispatch(wsConnectingUser());
      }

      if (socketUser) {
        socketUser.onopen = () => {
          dispatch(onOpenUser());
        };

        socketUser.onerror = err => {
          console.log('error')
        };

        socketUser.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessageUser(parsedData));
        };

        socketUser.onclose = event => {
          if (event.code !== 1000) {
            console.log('error')
            dispatch(onErrorUser(event.code.toString()));
          }
          console.log('close')
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000)
          }
        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          console.log('send')
          socketUser.send(JSON.stringify(action.payload));
        }

        if (wsDisconnectUser.match(action)) {
          console.log('disconnect')
          clearTimeout(reconnectTimer)
          isConnected = false;
          reconnectTimer = 0;
          socketUser.close();
          dispatch(onClose());
        }
      }

      next(action);
    };
  };
};

