import { Button, Collapse, ScrollArea, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = {
  text: string | ReactNode;
  details?: string | ReactNode;
  status: "error" | "successful";
};

export const NotificationItem: FC<Props> = ({ text, details, status }) => {
  const [opened, { toggle }] = useDisclosure(false);
  if (status === "successful") {
    return (
      <>
        <Text>{text}</Text>
        <a
          href={`https://monadscan.com/tx/${details}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Text fz={10} c="#6E54FF" td="underline">
            Monadscan
          </Text>
        </a>
      </>
    );
  }
  return (
    <>
      <Text c="white" fz={12}>
        {text}
      </Text>
      <Button
        onClick={toggle}
        variant="subtle"
        classNames={{ root: styles.hide_btn }}
      >
        <Text
          fz={12}
          c={opened ? "rgb(156 65 65 / 79%)" : "#FF5B45"}
          td="underline"
        >
          {opened ? "Hide details" : "Show details"}
        </Text>
      </Button>

      <Collapse in={opened}>
        <ScrollArea scrollbars="y" w={{ base: 280, sm: 180 }} h={30}>
          <Text w={{ base: 280, sm: 180 }} c="white" fz={10}>
            {details}
          </Text>
        </ScrollArea>
      </Collapse>
    </>
  );
};
