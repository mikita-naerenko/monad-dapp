"use client";

import { Flex, Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { colors } from "@/shared/config/colors";
import { useTotalValueLocked } from "@/shared/api/hooks/use-total-value-locked";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
  loading: () => 0,
});

export const Benefits: FC = () => {
  const [value, setValue] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { data: totalValueLocked, isLoading } = useTotalValueLocked();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const deposits = Number(totalValueLocked?.totalDeposited ?? 0);
    if (Number.isNaN(deposits)) return;
    requestAnimationFrame(() => setValue(deposits));
  }, [totalValueLocked?.totalDeposited]);
  return (
    <Flex bg={"#FBFAF9"} style={{ position: "relative", zIndex: 2 }}>
      <div className="w-[50%] flex flex-col items-center justify-center py-2 px-6 border-[0.5px] border-r-[0px] border-border-main">
        <div className="flex gap-1 items-center">
          {!mounted || isLoading ? (
            <span style={{ fontSize: 18, fontWeight: 400 }}>0</span>
          ) : (
            <AnimatedNumbers
              animateToNumber={value}
              useThousandsSeparator
              fontStyle={{ fontSize: 18, fontWeight: 400 }}
              transitions={(index) => ({
                type: "tween",
                ease: "easeInOut",
                duration: index + 0.01,
              })}
            />
          )}
          <Text fz={20} fw={600} c={colors.text.accent}>
            MON
          </Text>
        </div>
        <Text fz={14} fw={500} lh="16px" c={colors.text.secondary}>
          Total Value Locked
        </Text>
      </div>
      <div className="w-[50%] flex border-[0.5px] border-border-main">
        <div className="w-full flex-col flex items-center justify-center py-2 px-6 border-r-[0.5px] border-border-main">
          <Text fz={20} fw={600} c={colors.text.accent}>
            2920%
          </Text>
          <Text fz={14} fw={500} lh="16px" c={colors.text.secondary}>
            Basic APR Rate
          </Text>
        </div>
        <div className="w-full flex flex-col items-center justify-center py-2 px-6">
          <Text fz={20} fw={600} c={colors.text.accent}>
            13%
          </Text>
          <Text fz={14} fw={500} lh="16px" c={colors.text.secondary}>
            Referral Program
          </Text>
        </div>
      </div>
    </Flex>
  );
};
