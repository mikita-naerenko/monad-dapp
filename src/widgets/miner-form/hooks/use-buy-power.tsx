import { readContract } from "@wagmi/core";
import { SetStateAction } from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
import { compousedNotification } from "@/widgets/compoused-notification";
import { DEV_FEE_PERCENT } from "..";
import { MINER_ABI } from "@/shared/web3/miner-abi";
import { colors } from "@/shared/config/colors";
import { useOpenConnectModal, wagmiConfig } from "@/shared/web3";
import {
  calculateMiners,
  getErrorMessage,
  getReferralFromURL,
} from "@/shared/lib/utils";

type Props = {
  value: string | number;
  address: `0x${string}` | undefined;
  reBuyData: bigint;
  setValue: (value: SetStateAction<string | number>) => void;
  setRangeValue: (value: SetStateAction<number>) => void;
};

export const useBuyPower = ({
  value,
  address,
  reBuyData,
  setValue,
  setRangeValue,
}: Props) => {
  const openConnectModal = useOpenConnectModal();
  const {
    writeContract,
    isSuccess: isBuyPowerSuccess,
    isPending: isBuyPowerLoading,
  } = useWriteContract({
    mutation: {
      onSuccess: async (result) => {
        try {
          const boughtPwr = await readContract(wagmiConfig, {
            abi: MINER_ABI,
            address: process.env
              .NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
            functionName: "estimatePurchaseSimple",
            args: [parseEther(value.toString())],
          });
          const fee =
            (BigInt(boughtPwr as bigint) * BigInt(DEV_FEE_PERCENT)) /
            BigInt(100);
          const finalBoughtPwr = BigInt(boughtPwr as bigint) - fee;
          const fotmattedBoughtPwr = calculateMiners(finalBoughtPwr as bigint);
          const notificationId = notifications.show(
            compousedNotification({
              titleText: "BUY",
              onClose: () => notifications.hide(notificationId),
              bodyText: (
                <Text span c={colors.text.primary} fz={12}>
                  You have successfully bought {fotmattedBoughtPwr}{" "}
                  <Text
                    component="span"
                    fz={12}
                    fw="700"
                    c={colors.text.accent2}
                  >
                    MNR
                  </Text>{" "}
                  {Number(reBuyData as bigint) ? (
                    <Text span c={colors.text.primary} fz={12}>
                      & Re-buy{" "}
                      <Text
                        component="span"
                        fz={12}
                        fw="700"
                        c={colors.text.accent2}
                      >
                        MNR
                      </Text>{" "}
                    </Text>
                  ) : (
                    ""
                  )}
                </Text>
              ),
              details: result,
              status: "successful",
            })
          );
          setValue("");
          setRangeValue(0);
        } catch (e) {}
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

  const buyPower = () => {
    if (!address) {
      openConnectModal?.();
      return;
    }

    if (!Boolean(value)) {
      return;
    }
    const referralAddress = getReferralFromURL();
    const defaultRef =
      process.env.NEXT_PUBLIC_MAIN_REFERRAL ||
      "0x0000000000000000000000000000000000000000";
    writeContract({
      address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
      abi: MINER_ABI,
      functionName: "buyUnits",
      args: [referralAddress || defaultRef],
      value: parseEther(value.toString()),
    });
  };

  return { buyPower, isBuyPowerSuccess, isBuyPowerLoading };
};
