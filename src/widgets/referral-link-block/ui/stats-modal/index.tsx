"use client";
import { ResponsiveModal, TabsGroup } from "@/shared/ui";
import { FC, useState } from "react";
import { Table } from "@mantine/core";
import { ReferralTable } from "../referral-table";

type Props = {
  isOpened: boolean;
  onClose: () => void;
};

const TABS_VALUE = [
  { value: "referral", label: "Referral" },
  { value: "deposit", label: "Deposit" },
];

const referralTableData = [
  { address: "0x3..s211", amount: "5000", reward: "650" },
  { address: "0x3..s212", amount: "5000", reward: "650" },
  { address: "0x3..s213", amount: "5000", reward: "650" },
  { address: "0x3..s214", amount: "5000", reward: "650" },
  { address: "0x3..s215", amount: "5000", reward: "650" },
  { address: "0x3..s216", amount: "5000", reward: "650" },
  { address: "0x3..s217", amount: "5000", reward: "650" },
  { address: "0x3..s218", amount: "5000", reward: "650" },
  { address: "0x3..s219", amount: "5000", reward: "650" },
  { address: "0x3..s21q", amount: "5000", reward: "650" },
  { address: "0x3..s21w", amount: "5000", reward: "650" },
  { address: "0x3..s21e", amount: "5000", reward: "650" },
  { address: "0x3..s21r", amount: "5000", reward: "650" },
];

export const StatsModal: FC<Props> = ({ isOpened, onClose }) => {
  const [tab, setTab] = useState("referral");
  return (
    <ResponsiveModal
      opened={isOpened}
      onClose={onClose}
      title="HISTORICAL DASHBOARD"
      size={450}
    >
      <div className="flex w-full justify-center">
        <TabsGroup
          tabs={TABS_VALUE}
          onChange={(value) => setTab(value)}
          value={tab}
        />
      </div>
      {tab === "referral" && <ReferralTable tableData={referralTableData} />}
    </ResponsiveModal>
  );
};
