import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { NotificationData } from "@mantine/notifications";
import { NotificationTitle } from "./notification-title";
import { NotificationItem } from "./notification-item";

type CompousedNotification = {
  titleText: string | ReactNode;
  onClose: () => void;
  bodyText: string | ReactNode;
  details: string;
  status: "successful" | "error";
};

export const compousedNotification = ({
  titleText,
  onClose,
  bodyText,
  details,
  status,
}: CompousedNotification): NotificationData => ({
  title: (
    <NotificationTitle text={titleText} onClose={onClose} status={status} />
  ),
  message: (
    <NotificationItem text={bodyText} details={details} status={status} />
  ),
  autoClose: 10000,
  position: "top-right",
  withCloseButton: false,
  classNames: styles,
  styles: {
    root: {
      border:
        status === "error" ? "0.5px solid #FF5B45" : "0.5px solid #6855EF",
    },
  },
});
