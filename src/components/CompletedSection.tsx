import React from 'react';
import { Card, CardContent, Grid, Typography, Box, Button, Chip } from '@mui/material';

const CompletedSection = ({ items, onWinModalOpen }) => {
    return (
        <>
            {items.map((item, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2, width: '100%' }}>
                    <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" sx={{ fontSize: '1rem' }}>{item.title}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={'./gold-coin-rupee-icon.svg'} // Use the imported image
                                    alt="Gold Coin"
                                    style={{ width: '2rem', marginRight: '0.5rem', color: 'gold' }}
                                />
                                <Chip label={item.result} color="success" size="small" />
                            </Box>
                        </Grid>
                        <Typography variant="body2" color="text.secondary" textAlign="left">
                            {item.description}
                        </Typography>
                        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                            <Box>
                                <Typography variant="caption">Your Prediction:</Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {item.prediction}
                                </Typography>
                            </Box>
                            <Typography color="success.main" fontWeight="bold">
                                {item.reward}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                            <Typography variant="body2">
                                Bet Amount: <strong>{item.amount}</strong>
                            </Typography>
                            <Button variant="contained" size="small" color="primary" onClick={onWinModalOpen}>
                                View Results
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default CompletedSection;