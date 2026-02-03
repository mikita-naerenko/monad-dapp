import { FC } from "react";
import { Table, Text } from "@mantine/core";
import styles from "./styles.module.scss";
import { colors } from "@/shared/config/colors";

type Props = {
  tableData?: any;
};

export const ReferralTable: FC<Props> = ({ tableData }) => {
  const totalReferrals = tableData.length;

  return (
    <Table.ScrollContainer
      minWidth={338}
      maxHeight={290}
      mt={16}
      classNames={{ scrollContainer: styles.container }}
    >
      <Table
        stickyHeader
        classNames={{
          table: styles.table,
          thead: styles.thead,
          tbody: styles.tbody,
          tfoot: styles.tfoot,
          tr: styles.tr,
          th: styles.th,
          td: styles.td,
          caption: styles.caption,
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              Wallet(
              <Text component="span" fz={12} fw={500} c={colors.text.accent}>
                {totalReferrals}
              </Text>
              )
            </Table.Th>
            <Table.Th>Buy Amount</Table.Th>
            <Table.Th>Estimated Reward</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {tableData.map(({ address, amount, reward }) => (
            <Table.Tr key={address} h={31}>
              <Table.Td fz={12} fw={500}>
                {address}
              </Table.Td>
              <Table.Td fz={12} fw={500}>
                {amount}{" "}
                <Text component="span" fz={12} fw={700} c={colors.text.accent}>
                  MON
                </Text>
              </Table.Td>
              <Table.Td fz={12} fw={400}>
                ~{reward}{" "}
                <Text component="span" fz={12} fw={700} c={colors.text.accent}>
                  MON
                </Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
