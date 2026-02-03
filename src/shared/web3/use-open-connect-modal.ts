import { useConnectModal } from "@rainbow-me/rainbowkit";

/**
 * Хук для открытия модалки подключения кошелька
 * @returns Функция для открытия модалки подключения кошелька
 */
export const useOpenConnectModal = () => {
  const { openConnectModal } = useConnectModal();

  return openConnectModal;
};

