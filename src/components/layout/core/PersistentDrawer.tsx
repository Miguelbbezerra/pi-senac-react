import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Diversity1 } from '@mui/icons-material';
import ImagemLogo from '../../../images/logo-ext-white.png';
import { Button } from '@mui/material';
import { DeleteItemLocalStorage } from '../../../helper/localStorage';
import { useNavigate } from 'react-router-dom';
interface Props {
    window?: () => Window;
    children?: JSX.Element
}

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
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
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props: Props) {
    const { children } = props;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    async function logOut() {
        try {
            await DeleteItemLocalStorage('token')
            navigate('/');
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} >
                <Toolbar sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img style={{ width: '12em', ...(open && { display: 'none' }) }} src={ImagemLogo} alt="..." />
                </Toolbar>
            </AppBar>
            <Drawer
                onMouseLeave={() => setOpen(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader style={{ backgroundColor: '#1976d2', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Toolbar style={{
                        backgroundImage: `url(${ImagemLogo})`,
                        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '12.5em', margin: '0.5em'
                    }} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List style={{ color: '#f2f2f2', height: '100%', backgroundColor: '#2e2f47' }}>
                    {[{ texto: 'Home', Icon: HomeIcon, route: '/admin/home' }, { texto: 'Agendamentos', Icon: CalendarMonthIcon, route: '/admin/agendamento' }, { texto: 'Pacientes', Icon: GroupIcon, route: '/admin/paciente' }, { texto: 'Podólogos', Icon: Diversity1, route: '/admin/podologo' }, { texto: 'Perfil', Icon: AccountCircleIcon, route: '/admin/perfil' }].map((item, index) => (
                        <ListItem key={item.texto} disablePadding>
                            <Link to={item.route} style={{ textDecoration: 'none', color: '#f2f2f2', width: '100%' }}>
                                <ListItemButton style={{ border: '1px solid #f2f2f2', margin: '0.2em', borderRadius: '0.3em' }}>
                                    <ListItemIcon style={{ color: '#f2f2f2' }}>
                                        <item.Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.texto} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                    <Divider sx={{ margin: '1em 0.5em', background: '#FFF' }} />
                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                        <Button type='button' onClick={logOut} sx={{ color: '#fff' }}><LogoutIcon sx={{ margin: '0 0.5em' }} /> Log Out</Button>
                    </div>
                </List>
                <Divider />
            </Drawer>
            <Main open={open} onClick={() => setOpen(false)}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}