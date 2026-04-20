// src/components/Header.tsx
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import WorkIcon from '@mui/icons-material/Work';
import { NavLink } from 'react-router-dom';
import type { JSX } from 'react';

type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: 'Home', to: '/', icon: <HomeOutlinedIcon fontSize="small" /> },
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardOutlinedIcon fontSize="small" /> },
  { label: 'Companies', to: '/companies', icon: <BusinessOutlinedIcon fontSize="small" /> },
  { label: 'Applications', to: '/applications', icon: <WorkIcon fontSize="small" /> },
];

export default function Header(): JSX.Element {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'rgba(18, 18, 18, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            mr: 2,
            color: 'text.primary',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          Job Tracker
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              startIcon={item.icon}
              color="inherit"
              sx={{
                color: 'text.secondary',
                px: 1.5,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&.active': {
                  color: 'primary.main',
                  bgcolor: 'action.selected',
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}