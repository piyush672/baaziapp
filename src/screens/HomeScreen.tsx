import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Tabs,
    Tab,
    Box,
    Grid,
    Modal,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import Header from '../components/header';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LiveSection from '../components/LiveSection';
import PendingSection from '../components/PendingSection';

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
            actual: '₹2,205/Qtl',
            amount: '₹2,000',
            reward: '₹5,000',
            date: '21/02/2025',
        },
    ],
};

const TABS = ['Live', 'Pending', 'Completed'];

const HomePage = () => {
    const [selectedTab, setSelectedTab] = useState('Live');
    const [modalOpen, setModalOpen] = useState(false);
    const [winModalOpen, setWinModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [predictionValue, setPredictionValue] = useState('');
    const [selectedResult, setSelectedResult] = useState(null);

    const handleChange = (event, newValue) => {
        if (newValue) setSelectedTab(newValue);
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

    const handleWinModalOpen = (result) => {
        setSelectedResult(result);
        setWinModalOpen(true);
    };

    const handleWinModalClose = () => {
        setSelectedResult(null);
        setWinModalOpen(false);
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
                    variant="outlined"
                />
            );
        }
    };

    const renderSection = () => {
        switch (selectedTab) {
            case 'Live':
                return <LiveSection items={dummyData.live} onPredictClick={handlePredictClick} />;
            case 'Pending':
                return <PendingSection items={dummyData.pending} />;
            case 'Completed':
                return (
                    <Box>
                        {dummyData.completed.map((item, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    border: '1px solid #ddd',
                                    borderRadius: 2,
                                    p: 2,
                                    mb: 2,
                                }}
                            >
                                <Typography fontWeight="bold">{item.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>Prediction: {item.prediction}</Typography>
                                <Typography variant="body2">Reward: {item.reward}</Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => handleWinModalOpen(item)}
                                >
                                    View Result
                                </Button>
                            </Box>
                        ))}
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', width: 400, mx: 'auto' }}>
            <Header sx={{ position: 'sticky', top: 0, zIndex: 2 }} />

            <Box sx={{ px: 1, pt: 2 }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    sx={{ bgcolor: '#007F6D', height: 32, alignItems: 'center' }}
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
                                height: 32,
                                minHeight: 32,
                                padding: '4px 8px',
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                '&.Mui-selected': {
                                    bgcolor: 'white',
                                    color: '#007F6D',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    ))}
                </Tabs>

                <Box
                    sx={{
                        mt: 2,
                        maxHeight: 'calc(100vh - 32px - 16px - 64px)',
                        overflowY: 'auto',
                    }}
                >
                    {renderSection()}
                </Box>
            </Box>

            {/* Win Modal */}
            <Modal
                open={winModalOpen}
                onClose={handleWinModalClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box
                    sx={{
                        width: 380,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 2,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: '4rem', color: '#2E7D32', mb: 2 }} />
                    <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                        आपने जीता!
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {selectedResult?.title || '—'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        {selectedResult?.date || '—'}
                    </Typography>

                    <Box sx={{ bgcolor: '#F5F5F5', p: 2, borderRadius: 2, mb: 4, width: '80%', maxWidth: 300 }}>
                        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                            <Typography variant="body2">वास्तविक मूल्य</Typography>
                            <Typography variant="body2">आपका अनुमान</Typography>
                        </Grid>
                        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                            <Typography variant="body1" fontWeight="bold">
                                {selectedResult?.actual || '—'}
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {selectedResult?.prediction || '—'}
                            </Typography>
                        </Grid>
                        <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                            ✓ बहुत ही सटीक अनुमान!
                        </Typography>
                    </Box>

                    <Box sx={{ width: '80%', maxWidth: 300, mb: 4 }}>
                        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                            <Typography variant="body2">आपका दाव</Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {selectedResult?.amount || '—'}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="space-between">
                            <Typography variant="body2">कुल जीत</Typography>
                            <Typography variant="body1" fontWeight="bold" color="success.main">
                                {selectedResult?.reward || '—'}
                            </Typography>
                        </Grid>
                    </Box>

                    <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 'auto', bgcolor: '#2E7D32', width: '80%', maxWidth: 300 }}
                        onClick={handleWinModalClose}
                    >
                        वापस जाओ
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default HomePage;
