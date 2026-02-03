import { notifications } from "@mantine/notifications";
import { useWriteContract } from "wagmi";
import { Text } from "@mantine/core";
import { compousedNotification } from "@/widgets/compoused-notification";
import { colors } from "@/shared/config/colors";
import { getErrorMessage, getReferralFromURL } from "@/shared/lib/utils";
import { MINER_ABI } from "@/shared/web3/miner-abi";

export const useReBuy = ({
  address,
}: {
  address: `0x${string}` | undefined;
}) => {
  const {
    writeContract,
    isSuccess: isReBuySuccess,
    isPending: isReBuyLoading,
  } = useWriteContract({
    mutation: {
      onSuccess: async (result) => {
        const notificationId = notifications.show(
          compousedNotification({
            titleText: "RE-BUY",
            onClose: () => notifications.hide(notificationId),
            bodyText: (
              <Text span c="white" fz={12}>
                You have successfully compounded your{" "}
                <Text component="span" fz={12} fw="700" c={colors.text.accent2}>
                  MNR
                </Text>
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

  const reBuy = () => {
    if (!address) {
      return;
    }
    const referralAddress = getReferralFromURL();
    const defaultRef =
      process.env.NEXT_PUBLIC_MAIN_REFERRAL ||
      "0x0000000000000000000000000000000000000000";
    writeContract({
      address: process.env.NEXT_PUBLIC_BASE_CONTRACT_ADDRESS as `0x${string}`,
      abi: MINER_ABI,
      args: [referralAddress || defaultRef],
      functionName: "compoundUnits",
    });
  };

  return { reBuy, isReBuySuccess, isReBuyLoading };
};
