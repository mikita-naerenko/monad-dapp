"use client";

import { FC } from "react";
import { useAccount } from "wagmi";
import { ReferralLinkBlock } from "@/widgets/referral-link-block";
import { MinerForm } from "@/widgets/miner-form";
import { Benefits } from "@/widgets/benefits";
import { Chart } from "@/widgets/chart";

export const MinerPage: FC = () => {
  const { address } = useAccount();

  return (
    <main className="flex items-center justify-center h-full pt-[120px] pb-[10]">
      <div className="flex flex-col gap-6">
        <Benefits />
        <div className="flex">
          <div className="max-w-[470px] flex flex-col gap-6">
            <MinerForm />
          </div>
          <div className="flex flex-col">
            <ReferralLinkBlock address={address} />
            <Chart />
          </div>
        </div>
      </div>
    </main>
  );
};
