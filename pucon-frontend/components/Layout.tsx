import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(isMobile ? false : true);
  const router = useRouter();
  const pathname = router.pathname;
  console.log(pathname);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ background: "white" }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#101827",
            color: "white",
            paddingX: "10px",
            paddingTop: "5px",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
          <Image src="/icons/logo.svg" alt="logo" width="32" height="32" />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ color: "white" }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className="ml-2 mt-3">
          <p
            className="text-[#818cf8] uppercase font-bold text-xs"
            style={{ letterSpacing: "1px" }}
          >
            Dashboard
          </p>
          <p className="text-[11px] text-[#9ca3af] font-semibold mt-0.5">
            Explore tools to make life easier
          </p>
        </div>
        <List>
          <Link href="/feed">
            <ListItem key={"Feed"} disablePadding>
              <ListItemButton
                sx={{
                  background:
                    pathname == "/feed" &&
                    "rgba(255, 255, 255, 0.1) !important",
                }}
              >
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  {<FeedOutlinedIcon sx={{ color: "white" }} />}
                </ListItemIcon>
                <p className="text-sm font-medium ml-4">Feed</p>
              </ListItemButton>
            </ListItem>
          </Link>
          <Link href="/calendar">
            <ListItem key={"Calendar"} disablePadding>
              <ListItemButton
                sx={{
                  background:
                    pathname == "/calendar" &&
                    "rgba(255, 255, 255, 0.1) !important",
                }}
              >
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  {<FeedOutlinedIcon sx={{ color: "white" }} />}
                </ListItemIcon>

                <p className="text-sm font-medium ml-4">Calendar</p>
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
