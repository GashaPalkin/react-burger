import { useState, useEffect } from "react";
import feedInfoStyles from "./feed-info.module.css";
import { useAppSelector } from "../../hooks/useStore";

export const FeedInfo = () => {
  // данные из store
  const { orders, total, totalToday } = useAppSelector(
    (store) => store.wsOrderReducer
  );
  const [stateOrdersNumbers, setStateOrdersNumbers] = useState<{
    ordersDone: number[];
    ordersPending: number[];
  }>({ ordersDone: [], ordersPending: [] });

  useEffect(() => {
    const ordersNumber: { ordersDone: number[]; ordersPending: number[] } = {
      ordersDone: [],
      ordersPending: [],
    };
    // перебираем все заказы и разбиваем на две группы
    for (const order of orders) {
      if (order.status === "done") {
        ordersNumber.ordersDone.push(order.number);
      } else if (order.status === "pending") {
        ordersNumber.ordersPending.push(order.number);
      }
    }
    setStateOrdersNumbers(ordersNumber);
  }, [orders]);

  return (
    <>
      <div className={`${feedInfoStyles.feedInfoWrapper} `}>
        <div className={`${feedInfoStyles.ordersDoneSection} `}>
          <span className="text text_type_main-medium">Готовы:</span>
          <div className={`${feedInfoStyles.ordersNumbersWrapper} `}>
            <div
              className={`${feedInfoStyles.ordersDone} text text_type_digits-default pt-3`}
            >
              {stateOrdersNumbers.ordersDone.length > 0 &&
                stateOrdersNumbers.ordersDone
                  .slice(0, 10)
                  .map((num, i) => <span key={i}>{num}</span>)}
            </div>
          </div>
        </div>
        <div className={`${feedInfoStyles.ordersPendingSection} `}>
          <span className="text text_type_main-medium">В работе:</span>
          <div className={`${feedInfoStyles.ordersNumbersWrapper} `}>
            <div
              className={`${feedInfoStyles.ordersPending} text text_type_digits-default pt-3`}
            >
              {stateOrdersNumbers.ordersPending.length > 0 &&
                stateOrdersNumbers.ordersPending
                  .slice(0, 10)
                  .map((num, i) => <span key={i}>{num}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="text text_type_main-medium dBlock mt-8">
          Выполнено за все время:
        </span>
        <span className="text text_type_digits-large dBlock">{total}</span>
      </div>

      <div>
        <span
          className={`${feedInfoStyles.ordersNumbersWrapper} text text_type_main-medium dBlock mt-8`}
        >
          Выполнено за сегодня:
        </span>
        <span
          className={`${feedInfoStyles.ordersNumbersWrapper} text text_type_digits-large dBlock `}
        >
          {totalToday}
        </span>
      </div>
    </>
  );
};
