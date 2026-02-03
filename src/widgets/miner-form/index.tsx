"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { PageTitle } from "./page-title";
import { Divider, Flex, Text } from "@mantine/core";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { UserStats } from "./user-stats";
import { FormInput } from "@/shared/ui/form-input";
import { useOpenConnectModal } from "@/shared/web3";
import { FormSlider } from "@/shared/ui/form-slider";
import { ByuUnitsBtn } from "./buy-pwr-btn";
import { GameStats } from "./power-stats";
import { FooterBtnGroup } from "./footer-btn-group";
import { BaseContainer } from "@/shared/ui/baseContainer";
import { EstimatedDailyReward } from "./estimatedDailyReward";
import { colors } from "@/shared/config/colors";
import { useBuyPower } from "./hooks/use-buy-power";
import { MINER_ABI } from "@/shared/web3/miner-abi";
import { calculateMiners } from "@/shared/lib/utils";
import { formatWithThousandsSeparator } from "@/shared/lib/utils/calculateMiners";
import { useClaimReward } from "./hooks/use-claim-reward";
import { useReBuy } from "./hooks/use-re-buy";

export const MARKS = [
  { value: 0, label: "0%" },
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "MAX" },
];

export const parseFormattedAmount = (
  amount: bigint | string | number | undefined | null,
  decimals: number,
  toFixed = 3
): string => {
  if (amount === undefined || amount === null) return "0";

  const bigIntAmount = BigInt(amount);

  const formatted = formatUnits(bigIntAmount, decimals);

  return Number(formatted).toFixed(toFixed);
};

export const GAS_FEE = 0.001;
export const DEV_FEE_PERCENT = 8;
export const EGGS_TO_HATCH_1MINERS = 1_080_000;
export const UPDATE_INTERVAL = 5000;

export const MinerForm: FC = () => {
  const [value, setValue] = useState<string | number>("");
  const [rangeValue, setRangeValue] = useState(MARKS[0].value);
  const { address } = useAccount();
  const openConnectModal = useOpenConnectModal();

  const { data: userBalance, refetch: refetchBalance } = useBalance({
    address,
    unit: "ether",
  });
  const formattedBalance = parseFormattedAmount(userBalance?.value, 18);
  const maxAvailableBalance = useMemo(() => {
    const balance = parseFloat(formattedBalance);
    return Math.max(balance - GAS_FEE, 0);
  }, [formattedBalance]);

  const handleInputChange = (inputValue: string | number) => {
    if (!address) {
      openConnectModal?.();
      return;
    }

    const numericValue = parseFloat(inputValue.toString());

    if (isNaN(numericValue) || numericValue <= 0) {
      setValue("");
      return;
    }

    setValue(Math.min(numericValue, maxAvailableBalance).toFixed(3));
  };

  const handleSliderChange = (sliderValue: number) => {
    if (!address) {
      openConnectModal?.();
      return;
    }

    const calculatedValue = (maxAvailableBalance * sliderValue) / 100;
    setRangeValue(sliderValue);
    setValue(calculatedValue.toFixed(3));
  };

  const { data: contractBalance = 0n, refetch: refetchContractBalance } =
    useReadContract({
      abi: MINER_ABI,
      address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
      functionName: "getBalance",
    });

  const { data: power, refetch: refetchPower } = useReadContract({
    abi: MINER_ABI,
    address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "minersOf",
    args: [address],
  });

  const { data: reBuyData, refetch: refetchReBuyData } = useReadContract({
    abi: MINER_ABI,
    address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: reward, refetch: refetchReward } = useReadContract({
    abi: MINER_ABI,
    address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "pendingRewardsOf",
    args: [address],
  });

  const rewardBigInt = typeof reward === "bigint" ? reward : 0n;
  const fee = (rewardBigInt * BigInt(DEV_FEE_PERCENT)) / 100n;

  const netReward = rewardBigInt - fee;

  const formattedReward = parseFormattedAmount(
    typeof netReward === "bigint" ? netReward : BigInt(0),
    18
  );

  const formattedPower = power
    ? formatWithThousandsSeparator(power as bigint)
    : "0";
  const formattedReBuy = calculateMiners(reBuyData as bigint);

  const { claimReward, isClaimRewardSuccess, isClaimRewardLoading } =
    useClaimReward({ address });
  const { reBuy, isReBuySuccess, isReBuyLoading } = useReBuy({ address });
  const { buyPower, isBuyPowerSuccess, isBuyPowerLoading } = useBuyPower({
    value,
    address,
    reBuyData: reBuyData as bigint,
    setValue,
    setRangeValue,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetchPower();
      refetchReward();
      refetchReBuyData();
      refetchContractBalance();
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isBuyPowerSuccess || isClaimRewardSuccess || isReBuySuccess) {
      refetchPower();
      refetchReward();
      refetchReBuyData();
      refetchBalance();
    }
  }, [isBuyPowerSuccess, isClaimRewardSuccess, isReBuySuccess]);

  const dailyReward = value ? (Number(value) * 0.08).toFixed(3) : "0";

  return (
    <BaseContainer>
      <Flex w={{ base: 300, sm: 392 }} direction="column">
        <PageTitle />
        <UserStats balance={formattedBalance} miners={formattedPower} />
        <FormInput
          value={value}
          max={maxAvailableBalance}
          setValue={handleInputChange}
        />
        <FormSlider
          rangeValue={rangeValue}
          handleSliderChange={handleSliderChange}
          marks={MARKS}
        />
        <EstimatedDailyReward value={dailyReward} />
        <ByuUnitsBtn onClick={buyPower} isLoading={isBuyPowerLoading} />
        <GameStats reward={formattedReward} reBuy={formattedReBuy} />
        <FooterBtnGroup
          reBuyFn={reBuy}
          claimRewardFn={claimReward}
          isClaimRewardLoading={isClaimRewardLoading}
          isReBuyLoading={isReBuyLoading}
        />
        <Divider size="xs" mt={24} mb={16} color="#00000033" />
        <Text fz={12} fw={400} c={colors.text.secondary}>
          <b>COMPOUND</b> will increase your power without additional BUY. It
          will create a compound interest & <b>boost your reward</b> accrual. If
          you will only claim so you reward will be less day by day!
        </Text>
      </Flex>
    </BaseContainer>
  );
};
