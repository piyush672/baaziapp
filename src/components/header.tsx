import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // Gold-like icon


const Header = ({ showBack = false }) => {
    const navigate = useNavigate();
    const isBalancePage = location.pathname === '/balance';

    return (
        <AppBar position="static" sx={{ bgcolor: '#007F6D' }}>
            <Toolbar>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    {showBack && (
                        <IconButton onClick={() => navigate(-1)} sx={{ color: 'white', mr: 1 }}>
                            <ArrowBackIosNewIcon fontSize="small" />
                        </IconButton>
                    )}

                    <Box
                        sx={{
                            width: 80,
                            height: 50,
                            mr: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src="/app_logo.svg" // make sure this is in your `public` folder
                            alt="KhetiBazi"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                </Box>

                {!isBalancePage && (
                    <Box
                        onClick={() => navigate('/balance')}
                        sx={{
                            bgcolor: 'black',
                            color: 'white',
                            px: 1.5,
                            py: 0.25,
                            borderRadius: 12,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            '&:hover': { opacity: 0.8 },
                        }}
                    >
                        <EmojiEventsIcon sx={{ color: 'gold', fontSize: '1rem', mr: 0.5 }} />
                        10K
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header

