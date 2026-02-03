import { Slider } from "@mantine/core";
import { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
  marks?: {
    value: number;
    label: string;
  }[];
  max?: number;
  min?: number;
  step?: number;
  rangeValue: number;
  handleSliderChange: (value: number) => void;
};

export const FormSlider: FC<Props> = ({
  marks,
  rangeValue,
  max,
  min,
  step = 25,
  handleSliderChange,
}) => {
  return (
    <Slider
      value={rangeValue}
      onChange={handleSliderChange}
      step={step}
      mt={15}
      size={20}
      mr={18}
      marks={marks}
      max={max}
      min={min}
      classNames={{
        track: styles.track,
        trackContainer: styles.trackContainer,
        thumb: styles.thumb,
        mark: styles.mark,
        markWrapper: styles.markWrapper,
        bar: styles.bar,
        markLabel: styles.markLable,
        label: styles.label,
      }}
    />
  );
};
