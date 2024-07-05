import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { Diversity1 } from '@mui/icons-material';
import useWindowSize from '../../../useWindowSize';

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
    children?: JSX.Element
}

export default function ResponsiveDrawer(props: Props) {
    const { window, children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <div style={{ backgroundColor: '#1976d2', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Toolbar style={{
                    backgroundImage: 'url(https://vestibular.sc.senac.br/img/brand/logo-ext-white.png)',
                    backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '12.5em', margin: '0.5em'
                }} />
            </div>
            <Divider />
            <List style={{ color: '#f2f2f2', height: '100%' }}>
                {[{ texto: 'Home', Icon: HomeIcon, route: '/admin/home'}, { texto: 'Agendamentos', Icon: CalendarMonthIcon, route: '/admin/agendamento'}, { texto: 'Pacientes', Icon: GroupIcon, route: '/admin/paciente'}, { texto: 'Podólogos', Icon: Diversity1, route: '/admin/podologo'}, { texto: 'Perfil', Icon: AccountCircleIcon, route: '/admin/perfil'}].map((item, index) => (
                    <ListItem key={item.texto} disablePadding>
                        <Link to={item.route} style={{ textDecoration: 'none', color: '#f2f2f2', width: '100%'}}>
                            <ListItemButton style={{ border: '1px solid #f2f2f2', margin: '0.2em', borderRadius: '0.3em' }}>
                                <ListItemIcon style={{ color: '#f2f2f2' }}>
                                    <item.Icon />
                                </ListItemIcon>
                                <ListItemText primary={item.texto} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    const { width } = useWindowSize();
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#eb8f33',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 'drawerWidth', backgroundColor: '#2e2f47' },
                    }}
                >
                    {drawer}
                </Drawer>
                
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#2e2f47', },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}