import BigNumber from "bignumber.js";

export const defaultBigNumberFormat = {
  decimalSeparator: ".",
  groupSeparator: " ",
  groupSize: 3
};

interface FormattedAmountOptions {
  digitsSeparator?: string;
  precision?: number;
  preserve?: boolean;
  roundingMode?: BigNumber.RoundingMode;
  roundOn?: boolean | number;
  truncate?: number;
}
export function formattedAmount(
  value: number | string,
  decimals?: number,
  options?: FormattedAmountOptions
) {
  let amount = BigNumber(value ?? 0);
  const opts = {
    digitsSeparator: defaultBigNumberFormat.groupSeparator,
    roundOn: true,
    ...options
  };
  const roundingMode = options?.roundingMode ?? BigNumber.ROUND_DOWN;
  if (decimals !== undefined && decimals >= 0) {
    amount =
      (amount.decimalPlaces() ?? 0) > 0
        ? amount.dp(decimals, roundingMode)
        : amount.shiftedBy(-decimals);
  }
  const roundOn =
    typeof opts?.roundOn === "boolean"
      ? opts.roundOn && 1e3
      : (opts?.roundOn ?? 1e3);
  if (opts?.preserve) {
    if (roundOn && amount.gte(roundOn)) {
      return amount.toFormat(0, roundingMode, {
        ...defaultBigNumberFormat,
        groupSeparator: opts.digitsSeparator
      });
    }
    const decimalPlaces =
      amount
        .dp(decimals ?? amount.decimalPlaces() ?? 0, roundingMode)
        .decimalPlaces() ?? 0;
    return amount.toFormat(decimalPlaces, roundingMode, {
      ...defaultBigNumberFormat,
      groupSeparator: opts.digitsSeparator
    });
  }
  if (opts?.truncate !== undefined) {
    if (roundOn && amount.gte(roundOn)) {
      return amount.toFormat(0, roundingMode, {
        ...defaultBigNumberFormat,
        groupSeparator: opts.digitsSeparator
      });
    }
    const decimalPlaces =
      amount.dp(opts?.truncate ?? 0, roundingMode).decimalPlaces() ?? 0;
    return amount.toFormat(decimalPlaces, roundingMode, {
      ...defaultBigNumberFormat,
      groupSeparator: opts.digitsSeparator
    });
  }
  if (roundOn && amount.gte(roundOn)) {
    return amount.toFormat(0, roundingMode, {
      ...defaultBigNumberFormat,
      groupSeparator: opts.digitsSeparator
    });
  }
  switch (true) {
    case amount.lte(1e-3):
      return amount.precision(opts.precision ?? 4, roundingMode).toFormat({
        ...defaultBigNumberFormat,
        groupSeparator: opts.digitsSeparator
      });
    case amount.lte(1e-2):
      return amount.precision(3, roundingMode).toFormat({
        ...defaultBigNumberFormat,
        groupSeparator: opts.digitsSeparator
      });
    case amount.gte(1) && roundOn && amount.lt(roundOn): {
      const decimalPlaces = amount.dp(2, roundingMode).decimalPlaces() ?? 2;
      return amount.toFormat(decimalPlaces, roundingMode, {
        ...defaultBigNumberFormat,
        groupSeparator: opts.digitsSeparator
      });
    }
    default: {
      const decimalPlaces = amount.dp(4, roundingMode).decimalPlaces() ?? 4;
      return amount.toFormat(decimalPlaces, roundingMode, {
        ...defaultBigNumberFormat,
        groupSeparator: opts.digitsSeparator
      });
    }
  }
}
