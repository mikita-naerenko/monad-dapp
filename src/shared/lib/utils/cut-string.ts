interface CutStringParams {
  str: string;
  takeFirst: number;
  takeLast: number;
  separator?: string;
}

export const cutStringWithSeparator = ({
  str,
  takeFirst,
  takeLast,
  separator = "...",
}: CutStringParams): string => {
  if (!str || str.length <= takeFirst + takeLast) {
    return str;
  }

  return str.slice(0, takeFirst) + separator + str.slice(-takeLast);
};

