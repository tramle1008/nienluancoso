import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
    Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, CssBaseline,
    Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Button,
    Collapse
} from '@mui/material';

import { MdOutlineMenu, MdExpandLess, MdExpandMore } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { MdDashboard, MdOutlineDescription, MdInventory } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { FaListAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";

import { Link } from 'react-router-dom';
import { green, yellow } from '@mui/material/colors';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function AdminSidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openProductMenu, setOpenProductMenu] = React.useState(false);
    const [auth, setAuth] = React.useState(null);
    React.useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            try {
                const parsedAuth = JSON.parse(storedAuth);
                setAuth(parsedAuth);
            } catch (error) {
                console.error("Error parsing auth:", error);
            }
        }
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleProductClick = (e) => {
        e.preventDefault();
        setOpenProductMenu(!openProductMenu);
        if (!open) setOpen(true); // Tự động mở sidebar nếu đang thu nhỏ
    };

    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Left side: menu + title */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 2,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MdOutlineMenu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {auth?.userName || "Admin"}
                        </Typography>
                    </Box>


                    <Button
                        component={Link}
                        to="/logout"
                        variant="outlined"
                        color="inherit"
                        startIcon={<IoIosLogOut />}
                        // sx={{ color: "white", borderColor: "white" }}
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            fontSize: '1rem',
                            textTransform: 'none',
                            backgroundColor: '#f87171',
                            '&:hover': {
                                color: 'white',
                                backgroundColor: '#ef4444',
                                borderColor: 'white',
                            },
                        }}
                    >
                        Đăng xuất
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#1F2937',
                        color: '#fff',
                        borderRight: 'none',
                    },
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <FaChevronRight /> : <FaChevronLeft color="white" />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{
                    '& .MuiListItemText-root .MuiTypography-root': {
                        color: 'white',
                        fontSize: '1rem',
                        transition: 'all 0.05s ease',
                    },
                    '& .MuiListItemText-root .MuiTypography-root:hover': {
                        color: '#FACC15',
                        fontSize: '1.1rem',
                    },
                }}>
                    <ListItem disablePadding
                        sx={{
                            display: 'block'
                        }}>
                        <ListItemButton
                            component={Link}
                            to="/admin"
                        >
                            <ListItemIcon ><MdDashboard color="white" /></ListItemIcon >
                            <ListItemText primary="Tổng quan" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={handleProductClick}>
                            <ListItemIcon ><LuShoppingBag color="white" /></ListItemIcon>
                            <ListItemText primary="Sản phẩm" />
                            {openProductMenu ? <MdExpandLess color="white" /> : <MdExpandMore color="white" />}
                        </ListItemButton>
                    </ListItem>

                    <Collapse in={openProductMenu && open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton component={Link} to="/admin/products" sx={{ pl: 4 }}>
                                <ListItemIcon><FaListAlt color="white" /></ListItemIcon>
                                <ListItemText primary="Danh sách" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/admin/products/proposal" sx={{ pl: 4 }}>
                                <ListItemIcon><MdOutlineDescription color="white" /></ListItemIcon>
                                <ListItemText primary="Duyệt nhập" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/admin/products/inventory" sx={{ pl: 4 }}>
                                <ListItemIcon><MdInventory color="white" /></ListItemIcon>
                                <ListItemText primary="Kho hàng" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton component={Link} to="/admin/orders">
                            <ListItemIcon><LuClipboardList color="white" /></ListItemIcon>
                            <ListItemText primary="Đơn chờ xác nhận" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton component={Link} to="/admin/detail">
                            <ListItemIcon><FaListAlt color="white" /></ListItemIcon>
                            <ListItemText primary="Toàn bộ đơn hàng" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton component={Link} to="/admin/about">
                            <ListItemIcon><FiMapPin color="white" /></ListItemIcon>
                            <ListItemText primary="Dia chi co so" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                </List>
            </Drawer>
        </Box>

    );
}
