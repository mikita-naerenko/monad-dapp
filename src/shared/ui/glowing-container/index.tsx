import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { cx } from "@/shared/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export const GlowingContainer: FC<Props> = ({ children, className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.border_animation}></div>
      <div className={styles.blured} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
