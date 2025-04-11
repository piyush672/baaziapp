import {
    AppBar, Box, Typography, Button, Grid, IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PRIMARY_COLOR = "#008B72";

const Header = ({ showBack = false }) => {
    const navigate = useNavigate();
    const isBalancePage = location.pathname === '/balance';

    return (
        <AppBar position="static" sx={{ bgcolor: '#007F6D', px: 2 }}>
            <Box sx={{ py: 1.5 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid display="flex" alignItems="center">
                        {showBack && (
                            <IconButton
                                onClick={() => navigate(-1)}
                                sx={{ color: "white", mr: 1 }}
                                size="small"
                            >
                                <ArrowBackIosNewIcon fontSize="small" />
                            </IconButton>
                        )}
                        <Box
                            sx={{ bgcolor: "white", p: "4px 8px", borderRadius: 1, mr: 1.5 }}
                        >
                            <Typography
                                sx={{
                                    color: PRIMARY_COLOR,
                                    fontWeight: "bold",
                                    fontSize: "0.8rem",
                                }}
                            >
                                खेती बाज़ी
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                fontSize="1.1rem"
                                lineHeight={1.2}
                            >
                                KhetiBaazi
                            </Typography>
                            <Typography
                                variant="caption"
                                display="block"
                                sx={{ opacity: 0.9 }}
                            >
                                Kisaan Ka Market Analyst
                            </Typography>
                        </Box>
                    </Grid>

                    {!isBalancePage && (
                        <Grid>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => navigate('/balance')}
                                sx={{
                                    bgcolor: "rgba(0,0,0,0.2)",
                                    color: "white",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontSize: "0.75rem",
                                    boxShadow: "none",
                                    fontWeight: 500,
                                    px: 1.5,
                                    py: 0.5,
                                    "&:hover": {
                                        bgcolor: "rgba(0,0,0,0.3)",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                <img
                                    src="/gold-coin-rupee-icon.svg"
                                    alt="Coin"
                                    style={{ width: "1rem", height: "1rem", marginRight: "0.4rem" }}
                                />
                                10k
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </AppBar>
    );
};

export default Header;
