"use client";

import {
  Paper,
  Flex,
  Group,
  Burger,
  Divider,
  Drawer,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { FC } from "react";
import Image from "next/image";
import logo from "./assets/logo.png";
import TgIcon from "./assets/tg.svg";
import TwitterIcon from "./assets/twitter.svg";
import { ConnectWallet } from "@/features/index";
import Link from "next/link";
import { ColoredLink } from "@/shared/ui/colored-link";

export const Header: FC = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const isTablet = useMediaQuery(`(max-width: 1227px)`);
  const isMobile = useMediaQuery(`(max-width: 500px)`);
  const theme = useMantineTheme();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <>
      <Paper
        shadow="md"
        display="flex"
        bg="transparent"
        pos="fixed"
        top={0}
        w="100%"
        h={64}
        radius={0}
        px={{ base: 16, sm: 32, md: 64, lg: 55, xl: 145 }}
        style={{
          zIndex: 20,
          backdropFilter: "blur(5px)",
          alignItems: "center",
          borderBottom: "0.5px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Flex
          gap="md"
          w="100%"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Group align="center">
            <Image src={logo} alt="MINER Logo" width={42} height={42} />
            {!isMobile && (
              <Title order={2} m="auto">
                <Text
                  component="span"
                  fz="xl"
                  fw="600"
                  c={theme.other.textAccent}
                >
                  MON
                </Text>
                <Text
                  component="span"
                  fz="xl"
                  fw="600"
                  c={theme.other.textPrimary}
                >
                  MINER
                </Text>
              </Title>
            )}
          </Group>

          <Flex align="center" style={{ gap: 37 }} h={35}>
            {!isTablet && (
              <>
                <Flex align="center" gap="lg">
                  <Link
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TgIcon
                      width={24}
                      height={24}
                      className="text-text-primary hover:text-brand-main transition-colors transition-transform duration-200 hover:scale-110"
                    />
                  </Link>
                  <Link
                    href="https://x.com/omni_sonic"
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TwitterIcon
                      width={22}
                      height={22}
                      className="text-text-primary hover:text-brand-main transition-colors transition-transform duration-200 hover:scale-110"
                    />
                  </Link>
                </Flex>
                <Divider
                  size="xs"
                  orientation="vertical"
                  color={theme.other.textPrimary}
                />

                <Flex visibleFrom="sm" gap="sm">
                  <ColoredLink
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                    fw={400}
                    fz={16}
                  >
                    LEADERBOARD
                  </ColoredLink>
                  <ColoredLink
                    href="https://omni-miner.gitbook.io/docs/audit"
                    rel="noopener noreferrer"
                    target="_blank"
                    fw={400}
                    fz={16}
                  >
                    AUDIT
                  </ColoredLink>
                  <ColoredLink
                    href="https://omni-miner.gitbook.io"
                    rel="noopener noreferrer"
                    target="_blank"
                    fw={400}
                    fz={16}
                  >
                    DOCUMENTATION
                  </ColoredLink>
                  <ColoredLink
                    href="https://omni-miner.gitbook.io/docs/disclaimer"
                    rel="noopener noreferrer"
                    target="_blank"
                    fw={400}
                    fz={16}
                  >
                    DISCLAIMER
                  </ColoredLink>
                </Flex>
              </>
            )}
            <Flex display="flex" gap="lg" align="center">
              <ConnectWallet
                style={{
                  pointerEvents: opened ? "none" : "auto",
                  visibility: opened ? "hidden" : "visible",
                }}
              />
              {isTablet && (
                <Burger
                  lineSize={2}
                  size="md"
                  opened={opened}
                  style={{
                    pointerEvents: opened ? "none" : "auto",
                    visibility: opened ? "hidden" : "visible",
                  }}
                  onClick={toggle}
                  color={theme.other.textPrimary}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Paper>
      <Drawer
        position="right"
        size="100%"
        opened={opened}
        onClose={toggle}
        closeButtonProps={{ size: 47, autoFocus: false }}
        trapFocus={false}
        styles={{
          content: { background: "rgba(0, 0, 0, 0.5)" },
          header: {
            background: "rgba(255, 255, 255, 0.00)",
            padding: "0 24px 0 0",
          },
          close: {
            color: theme.other.textWhite,
            opacity: 0.5,
            "&:hover": { backgroundColor: "transparent" },
          },
        }}
      >
        <Flex
          direction="column"
          gap={15}
          h="100%"
          align="center"
          justify="center"
        >
          <ColoredLink
            href="/"
            isActive={currentPath === "/"}
            size="nav"
            fw={600}
            lh="40px"
            ta="center"
          >
            <Title order={2} m="auto">
              <Text
                component="span"
                fz="xl"
                fw="600"
                c={theme.other.textAccent}
              >
                MON
              </Text>
              <Text component="span" fz="xl" fw="600" c={theme.other.textWhite}>
                MINER
              </Text>
            </Title>
          </ColoredLink>
          <ColoredLink
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            size="nav"
            fw={600}
            lh="40px"
            ta="center"
            c={theme.other.textWhite}
          >
            LEADERBOARD
          </ColoredLink>
          <ColoredLink
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            size="nav"
            fw={600}
            lh="40px"
            ta="center"
            c={theme.other.textWhite}
          >
            AUDIT
          </ColoredLink>
          <ColoredLink
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            size="nav"
            fw={600}
            lh="40px"
            ta="center"
            c={theme.other.textWhite}
          >
            DOCS
          </ColoredLink>
          <ColoredLink
            href="#"
            rel="noopener noreferrer"
            target="_blank"
            size="nav"
            fw={600}
            lh="40px"
            ta="center"
            c={theme.other.textWhite}
          >
            DISCLAIMER
          </ColoredLink>
          <Flex gap={60} w="100%" justify="center" mt={18}>
            <Link
              href="#"
              rel="noopener noreferrer"
              target="_blank"
              style={{ display: "flex", alignItems: "center" }}
            >
              <TgIcon
                width={52}
                height={52}
                className="text-white hover:text-brand-main transition-colors transition-transform duration-200 hover:scale-110"
              />
            </Link>
            <Link
              href="#"
              rel="noopener noreferrer"
              target="_blank"
              style={{ display: "flex", alignItems: "center" }}
            >
              <TwitterIcon
                width={52}
                height={52}
                className="text-white hover:text-brand-main transition-colors transition-transform duration-200 hover:scale-110"
              />
            </Link>
          </Flex>
        </Flex>
      </Drawer>
    </>
  );
};
