import { useState, useMemo, useRef, RefObject } from "react";
import ingredientsStyles from "./burger-ingredients.module.css";
import { Tabs } from "./tabs";
import { Category } from "./category";

interface Tab {
  text: string;
  value: string;
  ref: RefObject<HTMLDivElement>;
}

function BurgerIngredients() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tabs: Tab[] = [
    { text: "Булки", value: "bun", ref: useRef<HTMLDivElement>(null) },
    { text: "Соусы", value: "sauce", ref: useRef<HTMLDivElement>(null) },
    { text: "Начинки", value: "main", ref: useRef<HTMLDivElement>(null) },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const categoryRef = useRef<HTMLDivElement>(null);

  const tabsSwitch = (value: string) => {
    for (const tab of tabs) {
      if (tab.value === value) {
        tab.ref.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const tabsScroll = () => {
    const distance = (value: Tab) =>
      value.ref.current === null || categoryRef.current === null
        ? 0
        : Math.abs(
            value.ref.current.getBoundingClientRect().y -
              categoryRef.current.getBoundingClientRect().y
          );
    const tab = tabs.reduce((acc, value) => {
      return distance(acc) > distance(value) ? value : acc;
    }, tabs[0]);
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
        data-testid='ingredients'
      >
        {categories}
      </div>
    </>
  );
}

export default BurgerIngredients;
