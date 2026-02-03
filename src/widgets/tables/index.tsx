"use client";
import { TabsGroup } from "@/shared/ui";
import { FC, useState } from "react";

const TABS_VALUE = [
  { value: "referral", label: "REFERRAL" },
  { value: "history", label: "HISTORY" },
  { value: "leaderboard", label: "LEADERBOARD" },
];

export const Tables: FC = () => {
  const [tab, setTab] = useState("referral");
  return (
    <div className="flex w-full justify-center">
      <TabsGroup
        tabs={TABS_VALUE}
        onChange={(value) => setTab(value)}
        value={tab}
      />
    </div>
  );
};
