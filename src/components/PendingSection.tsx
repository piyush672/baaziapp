import React from 'react';
import { Typography } from '@mui/material';

const PendingSection = ({ items }) => {
    return (
        <>
            {items.length === 0 ? (
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                    No pending predictions.
                </Typography>
            ) : (
                items.map((item, index) => (
                    <Typography key={index} variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Pending item: {item.title} {/* Add more details as needed */}
                    </Typography>
                ))
            )}
        </>
    );
};

export default PendingSection;