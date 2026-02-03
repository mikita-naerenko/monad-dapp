"use client";

import { FC, ReactNode } from "react";
import { Flex } from "@mantine/core";
import { BaseContainer } from "@/shared/ui/baseContainer";

interface ChartContainerProps {
  children: ReactNode;
}

export const ChartContainer: FC<ChartContainerProps> = ({ children }) => {
  return (
    <BaseContainer className="border-l-[0] border-t-[0] p-6 h-[431px]">
      <Flex direction="column" gap={20} h="100%">
        {children}
      </Flex>
    </BaseContainer>
  );
};
