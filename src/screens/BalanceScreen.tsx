import React from 'react';
import {
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BuildIcon from '@mui/icons-material/Build';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // ✅ Added icon
import Header from '../components/header';

const benefits = [
    {
        icon: <ShoppingCartIcon />,
        title: 'Agri-Input Discounts',
        subtitle: 'Get up to 15% off on fertilizers and pesticides',
        reward: '1000 points = ₹100 off',
    },
    {
        icon: <MonetizationOnIcon />,
        title: 'FarMart Fee Discount',
        subtitle: 'Reduce your platform fees',
        reward: '2000 points = 20% off fees',
    },
    {
        icon: <BuildIcon />,
        title: 'Machinery & Tools',
        subtitle: 'Discounts on equipment rentals',
        reward: '5000 points = 25% off rentals',
    },
];

const BalanceScreen = () => {
    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
            <Header showBack={true} />

            {/* ✅ Balance Card with Gold Icon */}
            <Box
                sx={{
                    bgcolor: '#008B72',
                    color: 'white',
                    m: 2,
                    p: 3,
                    borderRadius: 2,
                    textAlign: 'left',
                }}
            >
                <Typography variant="body2">Available Balance</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <EmojiEventsIcon sx={{ fontSize: '2rem', mr: 1, color: 'gold' }} />
                    <Typography variant="h4" fontWeight="bold">
                        10,000
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'white',
                        color: '#008B72',
                        fontWeight: 'bold',
                        mt: 2,
                        textTransform: 'none',
                        borderRadius: 2,
                    }}
                >
                    Cashout
                </Button>
            </Box>

            {/* Benefits Section */}
            <Box px={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Redeem for Benefits
                </Typography>

                {benefits.map((item, index) => (
                    <Card
                        key={index}
                        variant="outlined"
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            '&:hover': { cursor: 'pointer' },
                        }}
                    >
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Box
                                        sx={{
                                            bgcolor: '#EAF6F3',
                                            color: '#007F6D',
                                            p: 1.2,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.subtitle}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#008B72', fontWeight: 500 }}>
                                        {item.reward}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ fontSize: '1.5rem', color: '#999' }}>{'>'}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default BalanceScreen;
