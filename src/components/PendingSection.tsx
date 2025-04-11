import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
} from "@mui/material";

// Update interface to match HomeScreen.tsx
interface PendingItem {
  title: string;
  description: string;
  prediction: string;
  betAmount: string;
  resultDate: string;
  image?: string; // Add optional image field
}

interface PendingSectionProps {
  items: PendingItem[];
}

const PendingSection: React.FC<PendingSectionProps> = ({ items }) => {
  return (
    <>
      {items.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 4 }}
        >
          No pending predictions.
        </Typography>
      ) : (
        items.map((item: PendingItem, index: number) => (
          <Card
            key={index}
            variant="outlined"
            sx={{ mb: 2, borderRadius: 2, width: "100%", borderColor: "#eee" }}
          >
            <CardContent
              sx={{
                p: 2,
                position: "relative",
                pb: 8 /* Add padding-bottom to avoid overlap */,
              }}
            >
              {/* Add Image if available */}
              {item.image && (
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: "100px", // Adjust height as needed
                    objectFit: "cover",
                    borderRadius: 1,
                    mb: 1.5, // Margin below image
                    backgroundColor: "#f0f4f8",
                  }}
                />
              )}

              {/* Top Row: Title and Result Date */}
              <Grid
                container
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ mb: 0.5 }}
              >
                <Grid item xs>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    {item.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}
                  >
                    Results on {item.resultDate}
                  </Typography>
                </Grid>
              </Grid>

              {/* Description Row */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.8rem", mb: 1.5 }}
              >
                {item.description}
              </Typography>

              {/* Prediction and Bet Amount (Simpler Layout) */}
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="span"
                  sx={{ mr: 0.5 }}
                >
                  Your Prediction:
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.prediction}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="span"
                  sx={{ mr: 0.5 }}
                >
                  Bet Amount:
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ fontWeight: "bold" }}
                >
                  {item.betAmount}
                </Typography>
              </Box>

              {/* Positioned Button */}
              <Button
                variant="contained"
                size="small"
                disabled // Button is disabled for pending items
                sx={(theme) => ({
                  position: "absolute",
                  bottom: theme.spacing(2), // Position from bottom
                  right: theme.spacing(2), // Position from right
                  bgcolor: "#e0e0e0",
                  color: "rgba(0, 0, 0, 0.26)",
                  textTransform: "none",
                  borderRadius: 1.5,
                  fontSize: "0.8rem",
                  px: 2.5,
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#e0e0e0", boxShadow: "none" },
                })}
              >
                Predict
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default PendingSection;
