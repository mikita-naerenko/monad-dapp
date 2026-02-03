import { Flex, Title, Text } from "@mantine/core";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/shared/ui";
import { cutStringWithSeparator, cx } from "@/shared/lib/utils";
import { useOpenConnectModal } from "@/shared/web3";
import { BaseContainer } from "@/shared/ui/baseContainer";
import ClipboardIcon from "./assets/clipboard.svg";
import CopyIcon from "./assets/circleArrowOutUpRight.svg";
import CheckmarkIcon from "./assets/checkmark.svg";
import { colors } from "@/shared/config/colors";
import { StatsModal } from "./ui/stats-modal";

type Props = {
  address: `0x${string}` | undefined;
};

export const ReferralLinkBlock: FC<Props> = ({ address }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const openConnectModal = useOpenConnectModal();
  const mounted = typeof window !== "undefined";

  const referralLink = address ? `https://Monminer.fun/?ref=${address}` : "";
  const referralLinkSliced = address
    ? `Monminer.fun/?ref=${cutStringWithSeparator({
        str: address,
        takeFirst: 6,
        takeLast: 4,
      })}`
    : "";

  const handleCopy = () => {
    if (!address) {
      openConnectModal?.();
    } else {
      navigator.clipboard.writeText(referralLink).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };
  return (
    <>
      <BaseContainer className="border-l-[0]">
        <Flex w={{ base: 300, sm: 392 }} direction="column">
          <Title fz={20} fw={600} ta="center">
            REFERRAL LINK
          </Title>
          <div
            role="button"
            className={cx(styles.ref_root, {
              "hover:cursor-pointer": !address || !mounted,
              "!justify-between !px-3 text-[#A1A1A1]": address && mounted,
            })}
            onClick={() => {
              if (address) return;
              openConnectModal?.();
            }}
          >
            {address && mounted ? (
              <span className="font-semibold text-[14px]">
                {referralLinkSliced}
              </span>
            ) : (
              "CONNECT WALLET"
            )}
            {address && mounted && (
              <Button
                h={24}
                radius={15}
                fz={14}
                fw={500}
                onClick={handleCopy}
                variant="primary"
              >
                <div className="flex gap-1">
                  {isCopied ? <CheckmarkIcon /> : <CopyIcon />}
                  {isCopied ? "COPIED" : "COPY"}
                </div>
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            h={35}
            fw={400}
            radius={16}
            onClick={() => setIsOpened(true)}
          >
            {" "}
            <div className="flex gap-3">
              <ClipboardIcon className="w-4 h-4" /> DASHBOARD
            </div>
          </Button>
          <Text c={colors.text.secondary} fz={12} mt={20} lh="14px">
            <b>Invite</b> your friends using your link and earn <b>~13%</b> of
            any <b>MNR</b> they BUY. Referral Rewards are additional and are not
            deducted from your friend’s <b>MNR.</b>
          </Text>
        </Flex>
      </BaseContainer>
      <StatsModal isOpened={isOpened} onClose={() => setIsOpened(false)} />
    </>
  );
};
