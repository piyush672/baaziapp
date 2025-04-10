import { Outlet } from 'react-router-dom';
import BottomTabBar from './components/Bottomtab';
import { Box, Container } from '@mui/material';

const Layout = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Full viewport height
                maxWidth: 400,
                mx: 'auto',
                bgcolor: 'white',
                position: 'relative',
            }}
        >
            <Container
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 56px)', // Adjust to leave space for the tab bar
                }}
                disableGutters
            >
                <Outlet />
            </Container>

            <BottomTabBar />
        </Box>
    );
};

export default Layout;