import { useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { OrderCard } from "../order-card/order-card";
import { ALL_FEED_ORDERS } from "../../utils/constants";
import { setOrderDetails } from "../../services/reducers/order-details-reducer";
import { Order } from "../../utils/types";
import {
  connect as connectAll,
  disconnect,
} from "../../services/actions/ws-orders-actions";

export const FeedOrders = () => {
  // данные всех ордеров из store
  const { orders } = useAppSelector((store) => store.wsOrderReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connectAll(`${ALL_FEED_ORDERS}/all`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  // для деталей ордера
  const openOrdertDetails = useCallback(
    (value: Order) => {
      dispatch(setOrderDetails(value));
    },
    [dispatch]
  );

  return (
    <div className="container">
      {/* перебираем карточки заказов */}
      {orders.map((element, _id) => (
        <OrderCard
          key={_id}
          element={element}
          onClick={() => openOrdertDetails(element)}
        />
      ))}
    </div>
  );
};
