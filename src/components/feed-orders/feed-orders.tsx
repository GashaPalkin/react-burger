import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { OrderCard } from "../order-card/order-card";
import { ALL_FEED_ORDERS } from "../../utils/constants";
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

  return (
    <div className="container">
      {/* перебираем карточки заказов */}
      {orders.map((element, _id) => (
        <OrderCard
          key={_id}
          element={element}       
        />
      ))}
    </div>
  );
};
