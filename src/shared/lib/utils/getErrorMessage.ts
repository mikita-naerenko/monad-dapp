import { getMessageFromCode } from "@metamask/rpc-errors";

export const getErrorMessage = (error: unknown): string => {
  if (!error) return "An unknown error occurred.";

  if (typeof error === "string") return error;

  if (error instanceof Error) {
    if ("code" in error) {
      return getMessageFromCode(error.code as number, "Unknown MetaMask error");
    }

    if (error?.message.includes("Details")) {
      const detailsText = error.message.split("Details:")[1]?.trim();
      const cleanedMessage = detailsText.replace(/Version:.*$/, "").trim();
      return cleanedMessage;
    }

    if ("shortMessage" in error) {
      return (error as any).shortMessage || "Transaction reverted by contract.";
    }

    if ("reason" in error) {
      return (error as any).reason || "Transaction failed.";
    }

    return error.message;
  }

  return "Unknown error.";
};
