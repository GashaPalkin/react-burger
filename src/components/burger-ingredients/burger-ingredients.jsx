import React from "react";
import { useState, useMemo, useRef, createRef } from "react";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tabs } from "./tabs";
import { Category } from "./category";

function BurgerIngredients() { 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tabs = [
    { text: "Булки", value: "bun", ref: useRef(null) },
    { text: "Соусы", value: "sauce", ref: useRef(null) },
    { text: "Начинки", value: "main", ref: useRef(null) },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const categoryRef = useRef(null);

  const tabsSwitch = (value) => {
    tabs
      .find((tab) => tab.value === value)
      .ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const tabsScroll = () => {
    const distance = (value) =>
      Math.abs(
        value.ref.current.getBoundingClientRect().y -
          categoryRef.current.getBoundingClientRect().y
      );
    const tab = tabs.reduce(
      (acc, value) => (!acc || distance(acc) > distance(value) ? value : acc),
      null
    );
    setActiveTab(tab.value);
  };

  const categories = useMemo(
    () =>
      tabs.map((tab, index) => (
        <Category type={tab} key={index} ref={tab.ref} />
      )),
    [tabs]
  );

  return (
    <>      
      <div className={`${ingredientsStyles.ingredientsTabs} `}>
        <Tabs value={activeTab} tabs={tabs} onClick={tabsSwitch} />
      </div>
      {/* карточки ингдедиентов по категориям */}
      <div
        className={`${ingredientsStyles.ingredientCards} `}
        ref={categoryRef}
        onScroll={tabsScroll}
      >
        {categories}
      </div>
    </>
  );
}

// Типизация
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
};

export default BurgerIngredients;
