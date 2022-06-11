import React from 'react';
// import InfoHeader from '../infoheader/InfoHeader';
// import Footer from '../footer/Footer';
// import Competition from '../CompetionBattle/Competion';
// import Battle from '../CompetionBattle/Battle';
// import { Col, Row, Container } from 'react-bootstrap';
// import classes from './adminPage.module.css';
// import SideNavMenu from '../parent/SideNavMenu';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

// function AdminPage() {
//     return (
//         <React.Fragment>
//             <InfoHeader />
//             <Container fluid className={`${classes.gBg} px-0`} style={{ backgroundColor: '#f2f3f8' }}>
//                 <Row className="gx-0" style={{ minHeight: "85vh" }}>
//                     <Col lg={2} className={`${classes.lefNav} p-2`}>
//                         <SideNavMenu prefix={"/admin"} role="ADMIN" />
//                     </Col>
//                     <Col lg={10} className="p-3">
//                         <Outlet />
//                     </Col>
//                 </Row>
//             </Container>
//             <Footer />
//         </React.Fragment>
//     );
// }
// import { styled, alpha } from '@mui/material/styles';
import {
    // MdAccountCircle,
    MdMarkEmailRead,
    MdMenu,
    MdMoreVert,
    MdNotifications
} from "react-icons/md";
import { stringAvatar } from '../../helper/common';
import { Avatar } from '@mui/material';
import logo from "../../images/logo.png";
import { RiAccountBoxFill, RiDashboard2Fill, RiFileChartFill, RiFileUploadFill, RiQuestionAnswerFill, RiQuestionnaireFill, RiSwordFill, RiUserFollowFill } from 'react-icons/ri';
import { AiOutlineTrophy } from 'react-icons/ai';
import { logoutUser } from '../../redux/actions/UserActions';
import { useDispatch } from 'react-redux';
import { MdLibraryAdd } from 'react-icons/md';

function AdminHeader() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => {
                handleMenuClose();
                dispatch(logoutUser()).then(() => navigate("/"));
            }}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <MdNotifications />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {/* <AccountCircle /> */}
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={
                {
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    // backgroundColor: '#659dbd',
                    backgroundColor: '#fff',
                    color: '#000',
                }
            }>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MdMenu />
                    </IconButton>

                    <img src={logo} alt="Logo" style={{ maxHeight: '60px' }} />

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <MdNotifications />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar {...stringAvatar('Amar K')} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MdMoreVert />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

const drawerWidth = 250;
const ADMIN_MENUS = [
    {
        title: "Dashboard",
        icon: <RiDashboard2Fill />,
        to: "/dashboard",
    },
    {
        title: "Customer Account Management",
        icon: <RiUserFollowFill />,
        to: "/account/customer",
    },
    {
        title: "Listing",
        icon: <MdLibraryAdd />,
        to: "/information",
    },
    {
        title: "Questions",
        icon: <RiQuestionnaireFill />,
        to: "/question/list",
    },
    {
        title: "Bulk Upload",
        icon: <RiFileUploadFill />,
        to: "/upload",
    },
    {
        title: "Competitions",
        icon: <AiOutlineTrophy />,
        to: "/competitions",
    },
    {
        title: "Battles",
        icon: <RiSwordFill />,
        to: "/battles",
    },
    {
        title: "User Reports",
        icon: <RiFileChartFill />,
        to: "/reports",
    },
    {
        title: "Promo Reports",
        icon: <RiFileChartFill />,
        to: "/reports/promo",
    },
    {
        title: "Account & Role Management",
        icon: <RiAccountBoxFill />,
        to: "/account/manage",
    },
    {
        title: "Download",
        icon: <RiQuestionAnswerFill />,
        to: "/download",
    },
    {
        title: "Queries",
        icon: <RiQuestionAnswerFill />,
        to: "/queries",
    },
    {
        title: "Email Templates",
        icon: <MdMarkEmailRead />,
        to: "/email/template",
    },
];


function AdminSideDrawer() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {ADMIN_MENUS.map((ele, index) => (
                    <ListItem button key={ele.to} component={Link} to={`/admin${ele.to}`}>
                        <ListItemIcon>{ele.icon}</ListItemIcon>
                        <ListItemText primary={ele.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

function AdminPage() {
    return (
        <div>
            <CssBaseline />
            <AdminHeader />
            <div className='d-flex'>
                <AdminSideDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
                    <Toolbar />
                    <Outlet />
                </Box>
            </div>
        </div>
    );
}

export default AdminPage;