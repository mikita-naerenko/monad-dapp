import { Button } from "@/shared/ui";
import { FC } from "react";

type Props = {
  isLoading: boolean;
  mt?: number;
  h?: number;
  text?: string;
  onClick: () => void;
};

export const ByuUnitsBtn: FC<Props> = ({
  onClick,
  isLoading,
  mt = 12,
  text = "BUY MINERS",
  h = 35,
}) => {
  return (
    <Button
      mt={mt}
      h={h}
      radius={15}
      fz={16}
      fw={500}
      style={{ border: "none" }}
      onClick={onClick}
      loading={isLoading}
      variant="primary"
    >
      {text}
    </Button>
  );
};
