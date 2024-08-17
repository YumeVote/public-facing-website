import React from 'react';
import { AppShell, Avatar, Burger, NavLink, Menu, rem, Button } from '@mantine/core';
import { IconChartBar, IconHistory, IconChevronRight, IconLogout } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '../AuthContext.jsx';

const nav = [
  { 
    icon: IconChartBar, 
    label: 'Results',
    href: '/',
  },
  { 
    icon: IconHistory, 
    label: 'History',
    href: '/history',
  }
]

const user = {
  name: 'Joseph Joestar',
  email: 'jojo@mail.com',
  avatar: "JJ"
};

const Layout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const auth = useAuth();
  const isLoggedIn = auth ? auth.isLoggedIn : false;
  const setIsLoggedIn = auth ? auth.setIsLoggedIn : () => {};

  const handleNavLinkClick = (href) => {
    setActive(href);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <AuthProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header style={{ backgroundColor: "#1c2d5c", color: "#fff"}}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px'}}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Avatar color="white" radius="xl" size="md" mr="sm">YV</Avatar>
            <span style={{ fontSize: '1.24rem', fontWeight: 'bold'}}>Yume Vote</span>
          </div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <div style={{ flex: 1 }}>
            {nav.map((item) => (
              <NavLink 
                key={item.label}
                href={item.href}
                label={item.label}
                leftSection={<item.icon />}
                active={active == item.href}
                onClick={() => handleNavLinkClick(item.href)}
                color="#1c2d5c"
                variant="filled"
                styles={{
                  label: {
                    fontWeight: 700,
                  },
                  root: {
                    borderRadius: '5px',
                  }
                }}
              />
            ))}
          </div>
          <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '10px'}}>
            {isLoggedIn ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <NavLink 
                    label={user.name}
                    description={user.email}
                    leftSection={
                      <Avatar color="blue" radius="xl">
                        {user.avatar}
                      </Avatar>
                    }
                    rightSection={<IconChevronRight color="gray" />}
                    variant="subtle"
                  />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Profile</Menu.Label>
                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }}/>}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button
                  variant="filled"
                  color="#1c2d5c"
                  onClick={handleLogin}
                  fullWidth
                  mt="md"
              >
                Login
              </Button>
            )}
          </div>
        </AppShell.Navbar>
        <AppShell.Main>{ children }</AppShell.Main>
      </AppShell>
    </AuthProvider>
  );
}

export default Layout;
