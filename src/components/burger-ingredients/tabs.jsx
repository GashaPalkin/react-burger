import PropTypes from "prop-types";
import React from "react";
import { categoriesPropType } from "../../utils/types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";

export const Tabs = ({ value, tabs, onClick }) => {
  const tabsList = useMemo(
    () =>
      tabs.map((tab, index) => (
        <Tab
          value={tab.value}
          active={value === tab.value}
          key={index}
          onClick={onClick}
        >
          {tab.text}
        </Tab>
      )),
    [tabs, value, onClick]
  );

  return <React.Fragment>{tabsList}</React.Fragment>;
};

// Типизация
Tabs.propTypes = {
  tabs: categoriesPropType.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
