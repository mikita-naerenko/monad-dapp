import { CloseButton, Flex, Text } from "@mantine/core";
import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = {
  text?: string | ReactNode;
  status: "successful" | "error";
  onClose: () => void;
};

export const NotificationTitle: FC<Props> = ({ text, status, onClose }) => {
  return (
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      <Text fz={14} fw={600} c={status === "error" ? "#FF5B45" : "#6E54FF"}>
        {text}
      </Text>
      <CloseButton
        onClick={() => onClose()}
        c={status === "error" ? "#FF5B45" : "#6E54FF"}
        classNames={{ root: styles.no_hover }}
      />
    </Flex>
  );
};
