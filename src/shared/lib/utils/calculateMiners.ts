import { EGGS_TO_HATCH_1MINERS } from "@/widgets/miner-form";
import numeral from "numeral";

export const formatWithThousandsSeparator = (value: bigint) => {
  return numeral(value.toString()).format("0,0");
};

export const calculateMiners = (eggs: bigint) => {
  if (!eggs) {
    return "0";
  }
  const miners = eggs / BigInt(EGGS_TO_HATCH_1MINERS);
  const withSeparator = formatWithThousandsSeparator(miners);
  return withSeparator ?? "0";
};
