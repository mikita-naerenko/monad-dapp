"use client";

import { FloatingIndicator, Tabs } from "@mantine/core";
import { FC, ReactNode, useState } from "react";

import classes from "./styles.module.scss";
import { cx } from "@/shared/lib/utils";

type TabValue = string;

interface TabItem {
  value: TabValue;
  label: ReactNode;
}

interface TabsGroupProps {
  value: TabValue;
  onChange: (value: TabValue) => void;
  tabs: TabItem[];
  className?: string;
}

export const TabsGroup: FC<TabsGroupProps> = ({ value, onChange, tabs }) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  const handleChange = (nextValue: string | null) => {
    if (!nextValue) return;
    onChange(nextValue);
  };

  const first = tabs[0]?.value;
  const last = tabs[tabs.length - 1]?.value;

  const indicatorRadiusClass =
    value === first
      ? classes.indicatorLeft
      : value === last
      ? classes.indicatorRight
      : classes.indicatorMiddle;

  return (
    <Tabs variant="none" value={value} onChange={handleChange} h={38}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        {tabs.map((t) => (
          <Tabs.Tab
            key={t.value}
            value={t.value}
            ref={setControlRef(t.value)}
            className={classes.tab}
          >
            {t.label}
          </Tabs.Tab>
        ))}

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={cx(classes.indicator, indicatorRadiusClass)}
        />
      </Tabs.List>
    </Tabs>
  );
};
