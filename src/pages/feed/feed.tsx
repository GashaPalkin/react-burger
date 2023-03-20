import { FeedOrders } from "../../components/feed-orders/feed-orders";
import { FeedInfo } from "../../components/feed-info/feed-info";
import feedPageStyles from "./feed.module.css";

export const FeedPage = () => {
  return (
    <>
      <div className="container centerBlock">
        <h2 className="text_type_main-large mt-10 mb-5">Лента заказов</h2>
      </div>
      <main className={`${feedPageStyles.contentWrap} container `}>
        <div className={`${feedPageStyles.leftSide} `}>
          <FeedOrders />
        </div>
        <div className={`${feedPageStyles.rightSide} `}>
          <FeedInfo />
        </div>
      </main>
    </>
  );
};
