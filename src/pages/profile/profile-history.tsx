import { OrderCard } from "../../components/order-card/order-card";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { useEffect } from "react";
import { ALL_FEED_ORDERS } from "../../utils/constants";
import profilePageStyles from "./profile.module.css";
import {
  connect as connectUser,
  disconnect,
} from "../../services/actions/ws-user-order-actions";
import { getCookie } from "../../utils/utils";

export const ProfileHistory = () => {
  const { userOrders } = useAppSelector((store) => store.wsUserOrderReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let accessToken = getCookie("accessToken");
    if (accessToken) {
      // убираем Bearer
      let token = accessToken.split(" ");
      dispatch(connectUser(`${ALL_FEED_ORDERS}?token=${token[1]}`));
      return () => {
        dispatch(disconnect());
      };
    }
  }, [dispatch]);

  return (
    <div className={`${profilePageStyles.scrollSection} container`}>
      {/* перебираем карточки заказов */}
      {userOrders
        .map((element, idx) => (
          <OrderCard
            key={idx}
            element={element}        
          />
        ))
        .reverse()}
    </div>
  );
};
