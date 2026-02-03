import { cx } from "@/shared/lib/utils";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;

export const BaseContainer: FC<Props> = ({ children, className, style }) => {
  return (
    <div
      className={cx(
        "p-6 border-[0.5px] border-border-main bg-white relative z-[2]",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
