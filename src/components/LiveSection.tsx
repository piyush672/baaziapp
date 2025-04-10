import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
// Import hook from react-router-dom
import { useNavigate } from "react-router-dom";

// Define interface for Live items (should match HomeScreen.tsx)
interface LiveItem {
  title: string;
  description: string;
  price: string;
  poolSize: string;
  timeLeft: string;
  type: "number" | "binary" | "ternary";
  recommended?: boolean;
  image?: string;
  odds?: Record<string, number>;
}

interface LiveSectionProps {
  items: LiveItem[];
  onPredictClick: (item: LiveItem) => void;
  primaryColor: string;
}

const LiveSection: React.FC<LiveSectionProps> = ({
  items,
  onPredictClick,
  primaryColor,
}) => {
  // Get navigate function from react-router-dom
  const navigate = useNavigate();

  // Handle clicks on the card itself or a specific button/area
  const handleCardClick = (item: LiveItem) => {
    if (item.type === "ternary") {
      // Navigate using react-router-dom, passing data via state
      // Ensure the path '/monsoon-detail' matches your Route setup
      navigate("/monsoon-detail", { state: { cardData: item } });
    } else {
      onPredictClick(item); // Call original function to open modal
    }
  };

  return (
    <>
      {items.map((item: LiveItem, index: number) => (
        <Card
          key={index}
          variant="outlined"
          onClick={() => handleCardClick(item)}
          sx={{
            mb: 2,
            borderRadius: 2,
            width: "100%",
            borderColor: "#eee",
            cursor: "pointer",
            "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
          }}
        >
          <CardContent sx={{ position: "relative", p: 1.5 }}>
            <Box
              component="img"
              src={item.image || `/placeholder-image-${(index % 3) + 1}.png`}
              alt={item.title}
              sx={{
                width: "100%",
                height: "100px",
                objectFit: "cover",
                borderRadius: 1,
                mb: 1,
                backgroundColor: "#f0f4f8",
              }}
            />
            <Grid
              container
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ mb: 0.5 }}
            >
              <Grid item xs component="div">
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item component="div">
                <Typography variant="caption" color="text.secondary">
                  {item.timeLeft}
                </Typography>
              </Grid>
            </Grid>
            {item.recommended && (
              <Chip
                label="Recommended"
                size="small"
                sx={{
                  bgcolor: primaryColor,
                  color: "white",
                  fontSize: "0.65rem",
                  height: "18px",
                  mb: 1,
                }}
              />
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1.5, fontSize: "0.8rem" }}
            >
              {item.description}
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6} component="div">
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  {item.title === "MSP Policy Change"
                    ? "Current MSP"
                    : "Current Price"}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {item.price}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="center" component="div">
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Pool Size
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ color: primaryColor }}
                >
                  {item.poolSize}
                </Typography>
              </Grid>
              <Grid item xs={3} textAlign="right" component="div">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: primaryColor,
                    color: "white",
                    textTransform: "none",
                    borderRadius: 1.5,
                    fontSize: "0.8rem",
                    px: 2.5,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#006F5C", boxShadow: "none" },
                  }}
                >
                  Predict
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default LiveSection;
