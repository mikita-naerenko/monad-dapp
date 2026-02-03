"use client";

import { useState, useCallback } from "react";

/**
 * Хук для управления состоянием ResponsiveModal
 * @returns Объект с состоянием и методами управления модальным окном
 */
export const useResponsiveModal = (initialOpened = false) => {
  const [opened, setOpened] = useState(initialOpened);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const toggle = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  return {
    opened,
    open,
    close,
    toggle,
    setOpened,
  };
};

