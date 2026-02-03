import { Flex } from "@mantine/core";
import { FC } from "react";
import { Button } from "@/shared/ui";
import CrossIcon from "../assets/cross.svg";
import StopIcon from "../assets/circleStop.svg";

type Props = {
  reBuyFn: () => void;
  claimRewardFn: () => void;
  isClaimRewardLoading: boolean;
  isReBuyLoading: boolean;
};

export const FooterBtnGroup: FC<Props> = ({
  reBuyFn,
  claimRewardFn,
  isReBuyLoading,
  isClaimRewardLoading,
}) => {
  return (
    <Flex justify={"space-between"} mt={20}>
      <Button
        radius={15}
        fz={16}
        fw={400}
        w={{ base: 124, sm: 156 }}
        h={35}
        style={{ border: "none" }}
        onClick={reBuyFn}
        loading={isReBuyLoading}
        variant="secondary"
      >
        <div className="flex gap-1">
          <CrossIcon className="w-4 h-4" /> COMPOUND
        </div>
      </Button>
      <Button
        radius={15}
        fz={16}
        fw={400}
        h={35}
        w={156}
        style={{ border: "none" }}
        onClick={claimRewardFn}
        loading={isClaimRewardLoading}
        variant="primary"
      >
        <div className="flex gap-1">
          <StopIcon className="w-4 h-4" /> CLAIM
        </div>
      </Button>
    </Flex>
  );
};
