"use client";

import { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/shared/ui";
import { cutStringWithSeparator } from "@/shared/lib/utils";

interface ConnectWalletProps {
  style?: React.CSSProperties;
}

export const ConnectWallet: FC<ConnectWalletProps> = ({ style }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (!connected) {
          return (
            <Button
              variant="primary"
              radius={16}
              style={style}
              onClick={openConnectModal}
            >
              Connect Wallet
            </Button>
          );
        }

        const displayAddress = cutStringWithSeparator({
          str: account.address,
          takeFirst: 6,
          takeLast: 4,
        });

        return (
          <Button
            variant="outline"
            radius={16}
            style={style}
            onClick={openAccountModal}
          >
            {displayAddress}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
