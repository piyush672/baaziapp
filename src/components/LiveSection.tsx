import React from 'react';
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';

const LiveSection = ({ items, onPredictClick }) => {
    return (
        <>
            {items.map((item, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2, width: '100%' }}>
                    <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                {item.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {item.timeLeft}
                            </Typography>
                        </Grid>
                        <Typography variant="body2" color="text.secondary" align="left">
                            {item.description}
                        </Typography>
                        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                            <Typography variant="body2">
                                Current Price:{' '}
                                <Typography component="span" fontWeight="bold" color="text.primary">
                                    {item.price}
                                </Typography>
                            </Typography>
                            <Typography variant="body2">
                                Pool Size:{' '}
                                <Typography component="span" fontWeight="bold" color="text.primary">
                                    {item.poolSize}
                                </Typography>
                            </Typography>
                        </Grid>
                        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => onPredictClick(item)}
                            >
                                Predict
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

export default LiveSection;