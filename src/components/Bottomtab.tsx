import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomTabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (event, newValue) => {
        navigate(newValue);
    };

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                maxWidth: 380, // Match the container width
                zIndex: 10,
                height: '56px'
            }}
            elevation={3}
        >
            <BottomNavigation value={location.pathname} onChange={handleChange} showLabels>
                <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
                <BottomNavigationAction label="Balance" value="/balance" icon={<AccountBalanceWalletIcon />} />
                <BottomNavigationAction label="Games" value="/games" icon={<CasinoRoundedIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomTabBar;