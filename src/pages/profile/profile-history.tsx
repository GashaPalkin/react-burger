import { OrderCard } from "../../components/order-card/order-card";
import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { useEffect, useCallback } from "react";
import { ALL_FEED_ORDERS } from "../../utils/constants";
import profilePageStyles from "./profile.module.css";
import { connect as connectUser } from "../../services/actions/ws-user-order-actions";
import { setOrderDetails } from "../../services/reducers/order-details-reducer";
import { Order } from "../../utils/types";
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
    }
  }, [dispatch]);

  // для деталей ордера
  const openOrdertDetails = useCallback(
    (value: Order) => {
      dispatch(setOrderDetails(value));
    },
    [dispatch]
  );

  return (
    <>
      <div className={`${profilePageStyles.scrollSection} container`}>
        {/* перебираем карточки заказов */}
        {userOrders
          .map((element, idx) => (
            <OrderCard
              key={idx}
              element={element}
              onClick={() => openOrdertDetails(element)}
            />
          ))
          .reverse()}
      </div>
    </>
  );
};
