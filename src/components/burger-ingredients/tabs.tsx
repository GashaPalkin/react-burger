import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { CategoryType } from "../../utils/types";
import { FC } from "react";

interface TabsProps {
  tabs: CategoryType[];
  value: string;
  onClick: (value: string) => void;
}

export const Tabs: FC<TabsProps> = ({ value, tabs, onClick }) => {
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

  return <>{tabsList}</>;
};
