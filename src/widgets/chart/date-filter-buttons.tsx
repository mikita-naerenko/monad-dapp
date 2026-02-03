"use client";

import { FC } from "react";
import { Flex } from "@mantine/core";
import { DATE_FILTERS } from "@/entities/tvl/lib";
import type { DateFilter } from "@/entities/tvl/model";
import { Button } from "@/shared/ui";
import { colors } from "@/shared/config/colors";

interface DateFilterButtonsProps {
  selectedFilter: DateFilter;
  onFilterChange: (filter: DateFilter) => void;
}

export const DateFilterButtons: FC<DateFilterButtonsProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <Flex gap={8} wrap="wrap">
      {DATE_FILTERS.map((filter) => (
        <Button
          key={filter.value}
          variant={selectedFilter === filter.value ? "primary" : "outline"}
          size="xs"
          h={20}
          fz={16}
          fw={600}
          onClick={() => onFilterChange(filter.value)}
          style={{
            borderColor:
              selectedFilter === filter.value
                ? colors.gradient.start
                : "rgba(255, 255, 255, 0.2)",
            backgroundColor:
              selectedFilter === filter.value
                ? `linear-gradient(135deg, ${colors.gradient.start} 0%, ${colors.gradient.end} 100%)`
                : "transparent",
            color: "white",
          }}
          disableAnimation
        >
          {filter.label}
        </Button>
      ))}
    </Flex>
  );
};
