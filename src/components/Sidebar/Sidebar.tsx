"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
} from "@mui/material";
import type { IconName } from "lucide-react/dynamic";

import { Icon } from "@components/Icon/Icon";

import { useAuth } from "@hooks/useAuth";

import {
  StyledDrawer,
  LogoContainer,
  SectionTitle,
  StyledListItemButton,
  Logo,
} from "./style";
import Image from "next/image";
import { CustomImage } from "@components/CustomImage/CustomImage";
import { Text } from "@components/Text/Text";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const drawerContent = (
    <>
      <LogoContainer>
        <Box
          sx={{
            width: 24,
            height: 24,
            bgcolor: "text.primary",
            color: "background.paper",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo>
            <CustomImage
              src={user?.logo!}
              alt="logo"
              height={32}
              width={32}
              rounded
            />
          </Logo>
        </Box>
        <Text variant="body1">
          {user?.socialName || `${user?.name} ${user?.lastName}`}
        </Text>
      </LogoContainer>

      <Box sx={{ overflowY: "auto", flex: 1, py: 2 }}>
        <SectionTitle>Principal</SectionTitle>
        <List disablePadding>
          <NavItem
            href="/dashboard"
            iconName="layout-dashboard"
            label="Dashboard"
            currentPath={pathname}
            onClick={onClose}
          />
          <NavItem
            href="/rents"
            iconName="shopping-cart"
            label="Alugueis"
            currentPath={pathname}
            onClick={onClose}
          />
          <NavItem
            href="/products"
            iconName="package"
            label="Produtos"
            currentPath={pathname}
            onClick={onClose}
          />
          <NavItem
            href="/costumers"
            iconName="users"
            label="Clientes"
            currentPath={pathname}
            onClick={onClose}
          />
          <NavItem
            href="/contracts"
            iconName="file-text"
            label="Contratos"
            currentPath={pathname}
            onClick={onClose}
          />
        </List>

        <SectionTitle>Sistema</SectionTitle>
        <List disablePadding>
          <NavItem
            href="/settings"
            iconName="settings"
            label="Configurações"
            currentPath={pathname}
            onClick={onClose}
          />
        </List>
      </Box>
    </>
  );

  return (
    <Box component="nav">
      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {drawerContent}
      </StyledDrawer>

      <StyledDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {drawerContent}
      </StyledDrawer>
    </Box>
  );
}

function NavItem({
  href,
  iconName,
  label,
  currentPath,
  onClick,
}: {
  href: string;
  iconName: IconName;
  label: string;
  currentPath: string;
  onClick: () => void;
}) {
  const isActive = currentPath === href;

  return (
    <ListItem disablePadding>
      <StyledListItemButton
        component={Link}
        href={href}
        $active={isActive}
        onClick={onClick}
      >
        <ListItemIcon>
          <Icon name={iconName} size={20} />
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }}
        />
      </StyledListItemButton>
    </ListItem>
  );
}
