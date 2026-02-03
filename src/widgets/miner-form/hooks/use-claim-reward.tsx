import { useWriteContract } from "wagmi";
import { readContract } from "@wagmi/core";
import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
import { useState } from "react";
import { compousedNotification } from "@/widgets/compoused-notification";
import { colors } from "@/shared/config/colors";
import { getErrorMessage } from "@/shared/lib/utils";
import { wagmiConfig } from "@/shared/web3";
import { MINER_ABI } from "@/shared/web3/miner-abi";
import { DEV_FEE_PERCENT, parseFormattedAmount } from "..";

export const useClaimReward = ({
  address,
}: {
  address: `0x${string}` | undefined;
}) => {
  const [rewardToClaim, setRewardToClaim] = useState("");
  const {
    writeContract,
    isSuccess: isClaimRewardSuccess,
    isPending: isClaimRewardLoading,
  } = useWriteContract({
    mutation: {
      onSuccess: async (result) => {
        const notificationId = notifications.show(
          compousedNotification({
            titleText: "CLAIM",
            onClose: () => notifications.hide(notificationId),
            bodyText: (
              <Text span c={colors.text.primary} fz={12}>
                You have successfully claimed {rewardToClaim}{" "}
                <Text component="span" fz={12} fw="700" c={colors.text.accent}>
                  MON
                </Text>{" "}
              </Text>
            ),
            details: result,
            status: "successful",
          })
        );
      },
      onError: (error) => {
        const parsedError = getErrorMessage(error);
        const notificationId = notifications.show(
          compousedNotification({
            titleText: "ERROR",
            onClose: () => notifications.hide(notificationId),
            bodyText: "Transaction failed!",
            details: parsedError,
            status: "error",
          })
        );
      },
    },
  });

  const claimReward = async () => {
    if (!address) {
      return;
    }
    try {
      const eggsToClaim = await readContract(wagmiConfig, {
        address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
        abi: MINER_ABI,
        functionName: "balanceOf",
        args: [address],
      });

      if (typeof eggsToClaim === "bigint" && eggsToClaim === BigInt(0)) {
        const notificationId = notifications.show(
          compousedNotification({
            titleText: "ERROR",
            bodyText: "No reward available to claim!",
            onClose: () => notifications.hide(notificationId),
            details: "Your reward balance is 0.",
            status: "error",
          })
        );
        return;
      }

      const eggValue = await readContract(wagmiConfig, {
        address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
        abi: MINER_ABI,
        functionName: "estimateRedemption",
        args: [eggsToClaim],
      });

      const fee =
        (BigInt(eggValue as bigint) * BigInt(DEV_FEE_PERCENT)) / BigInt(100);
      const finalClaimedAmount = BigInt(eggValue as bigint) - fee;
      const formattedClaimedAmmount = parseFormattedAmount(
        finalClaimedAmount,
        18,
        3
      );
      setRewardToClaim(formattedClaimedAmmount);

      writeContract({
        address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
        abi: MINER_ABI,
        functionName: "sellUnits",
      });
    } catch (error) {
      const parsedError = getErrorMessage(error);
      const notificationId = notifications.show(
        compousedNotification({
          titleText: "ERROR",
          onClose: () => notifications.hide(notificationId),
          bodyText: "Transaction failed!",
          details: parsedError,
          status: "error",
        })
      );
    }
  };

  return { claimReward, isClaimRewardSuccess, isClaimRewardLoading };
};
