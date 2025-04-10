import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Tabs,
    Tab,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Modal,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import Header from '../components/header';

const dummyData = {
    live: [
        {
            title: 'Wheat Price Prediction',
            description: 'Globus Corp. Grade A (Rajasthan)',
            price: '₹2,450/Qtl',
            poolSize: '₹2.8L',
            timeLeft: '5h 30m left',
            type: 'number',
        },
        {
            title: 'MSP Policy Change',
            description: 'March-April 2024',
            price: '₹2,275/Qtl',
            poolSize: '₹3.2L',
            timeLeft: '12h 20m left',
            type: 'binary',
        },
    ],
    pending: [],
    completed: [
        {
            title: 'Rice MSP Prediction',
            description: 'Government Announcement',
            prediction: '₹2,200/Qtl',
            amount: '₹2,000',
            reward: '₹5,000',
            result: 'Won',
        },
    ],
};

const TABS = ['Live', 'Pending', 'Completed'];

const HomePage = () => {
    const [selectedTab, setSelectedTab] = useState('Live');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [predictionValue, setPredictionValue] = useState('');

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handlePredictClick = (card) => {
        setSelectedCard(card);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setPredictionValue('');
        setSelectedCard(null);
    };

    const renderPredictionInput = () => {
        if (!selectedCard) return null;
        if (selectedCard.type === 'binary') {
            return (
                <ToggleButtonGroup
                    value={predictionValue}
                    exclusive
                    onChange={(e, val) => val && setPredictionValue(val)}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    <ToggleButton value="yes">Yes</ToggleButton>
                    <ToggleButton value="no">No</ToggleButton>
                </ToggleButtonGroup>
            );
        } else {
            return (
                <TextField
                    label="Enter your prediction"
                    type="number"
                    fullWidth
                    value={predictionValue}
                    onChange={(e) => setPredictionValue(e.target.value)}
                    sx={{ mt: 2 }}
                />
            );
        }
    };

    const renderCard = (item, index) => {
        if (selectedTab === 'Completed') {
            return (
                <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">{item.title}</Typography>
                            <Chip label={item.result} color="success" size="small" />
                        </Grid>
                        <Typography variant="body2" color="text.secondary" textAlign={'left'}>
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
                            <Button variant="contained" size="small" color="primary">
                                View Results
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            );
        } else {
            return (
                <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    <CardContent>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{item.title}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {item.timeLeft}
                            </Typography>
                        </Grid>
                        <Typography variant="body2" color="text.secondary" align={'left'}>
                            {item.description}
                        </Typography>
                        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                            <Typography variant="body2">
                                Current Price:{' '}
                                <Typography fontWeight="bold" color="text.primary">
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
                                onClick={() => handlePredictClick(item)}
                            >
                                Predict
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            );
        }
    };

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', width: '100%' }}>
            <Header />

            <Box sx={{ px: 2, pt: 2 }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { display: 'none' } }} // hide default indicator
                    sx={{ bgcolor: '#007F6D', maxHeight: 32, alignItems: 'center' }} // Reduced from 40 to 32
                >
                    {TABS.map((tab) => (
                        <Tab
                            label={tab}
                            value={tab}
                            key={tab}
                            sx={{
                                bgcolor: '#007F6D',
                                color: 'white',
                                borderRadius: 1,
                                mx: 0.5,
                                minHeight: 32, // Ensure Tab height matches Tabs container
                                padding: '6px 6px', // Reduce padding to fit content
                                fontSize: '0.75rem', // Optional: smaller font size if needed
                                '&.Mui-selected': {
                                    bgcolor: 'white',
                                    color: '#007F6D',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    ))}
                </Tabs>

                <Box mt={2}>
                    {dummyData[selectedTab.toLowerCase()].map((item, index) => renderCard(item, index))}
                </Box>
            </Box>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 2,
                    }}
                >
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            sx={{ flexShrink: 0, color: "black" }}
                        >
                            Predict {selectedCard?.title}
                        </Typography>
                        <Button onClick={handleModalClose} size="small" sx={{ px: 0 }}>
                            ✕
                        </Button>
                    </Grid>


                    <Box mt={1}>
                        <Typography variant="body2" color="text.secondary">
                            Current Price
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" gutterBottom color="text.secondary">
                            {selectedCard?.price}
                        </Typography>
                    </Box>

                    <Box mt={1}>
                        <Typography variant="body2" gutterBottom color="text.secondary">
                            Your Prediction
                        </Typography>
                        {renderPredictionInput()}
                    </Box>

                    <Box mt={1}>
                        <Typography variant="body2" gutterBottom>
                            Bet Amount (tokens)
                        </Typography>
                        <TextField
                            placeholder="Enter amount"
                            type="number"
                            fullWidth
                            sx={{ mt: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary" mt={1} display="block">
                            Min: 1 Tk | Max: 10Tk
                        </Typography>
                    </Box>

                    <Grid container justifyContent="space-between" spacing={2} mt={4}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={!predictionValue}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </Box>
    );
};

export default HomePage;