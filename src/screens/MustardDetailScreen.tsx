import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  IconButton,
} from "@mui/material";
import { ArrowBack, TrendingUp, TrendingDown } from "@mui/icons-material"; // Assuming MUI icons are installed
import { useLocation, useNavigate } from "react-router-dom";
// Import Recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
// Import PredictionModal
import PredictionModal from "../components/PredictionModal";

// Define types (consider sharing)
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
  range?: string;
  returns?: string;
}

// Dummy Price Trend Data
const priceTrendData = [
  { day: "D-4", price: 2950 },
  { day: "D-3", price: 3000 },
  { day: "D-2", price: 2980 },
  { day: "D-1", price: 3050 },
  { day: "Today", price: 3050 }, // Can also get this from cardData.price if needed
];
const targetPrice = 3200; // The price point in the question

// Dummy News Items
const dummyNews = [
  {
    id: 1,
    headline: "Global edible oil prices surge affecting local mustard rates.",
    snippet: "Experts predict continued volatility...",
  },
  {
    id: 2,
    headline: "Government considers policy changes for oilseed imports.",
    snippet: "Potential impact on domestic prices remains uncertain...",
  },
  {
    id: 3,
    headline: "Favorable weather boosts mustard crop outlook in Rajasthan.",
    snippet: "Increased supply could potentially stabilize prices later...",
  },
];

const PRIMARY_COLOR = "#008B72";
const RED_COLOR = "#D32F2F"; // For 'Down' odds/stats

const MustardDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardData = (location.state?.cardData as LiveItem) || null;

  // Add state for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePredictClick = () => {
    // Open the modal instead of logging/alerting
    setIsModalOpen(true);
    // console.log("Predict button clicked for:", cardData?.title);
    // alert("Prediction Modal integration needed!");
  };

  // Add handler to close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Define submit handler for the modal
  const handlePredictionSubmit = (submission: {
    cardTitle: string | undefined;
    bet: string;
    prediction: string | null;
    odds?: number;
  }) => {
    console.log("Prediction Submitted from MustardDetailScreen:", submission);
    // Add logic here to actually save the prediction (e.g., API call)
    alert("Bet placed successfully! (From DetailScreen)");
    // Modal closes itself via its own onSubmit prop
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!cardData || cardData.type !== "binary") {
    // Ensure we have the right card type
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Error: Mustard card data not found or invalid.</Typography>
        <Button onClick={handleGoBack}>Go Back</Button>
      </Box>
    );
  }

  // Extract odds safely
  const oddsUp = cardData.odds?.up;
  const oddsDown = cardData.odds?.down;

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Paper
        square
        elevation={1}
        sx={{
          p: "12px 16px",
          bgcolor: "white",
          borderBottom: "1px solid #eee",
        }}
      >
        <Grid container alignItems="center" wrap="nowrap">
          <IconButton onClick={handleGoBack} sx={{ mr: 1, ml: -1 }}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              noWrap
              variant="h6"
              component="h1"
              sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              {cardData.title}
            </Typography>
            <Typography noWrap variant="caption" color="text.secondary">
              {cardData.description} - {cardData.timeLeft}
            </Typography>
          </Box>
        </Grid>
      </Paper>

      {/* Scrollable Content */}
      <Box sx={{ overflowY: "auto", p: 2 }}>
        {/* Price Trend Chart Section */}
        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: "bold", fontSize: "1rem" }}
        >
          Recent Price Trend (Last 5 Days)
        </Typography>
        <Card
          variant="outlined"
          sx={{
            mb: 2,
            borderRadius: 2,
            borderColor: "#eee",
            p: 2,
            height: 250,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={priceTrendData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" fontSize={12} />
              <YAxis
                domain={[2800, 3300]}
                fontSize={12}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                formatter={(value: number | string | Array<number | string>) =>
                  `₹${value}`
                }
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={PRIMARY_COLOR}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <ReferenceLine
                y={targetPrice}
                label={{
                  value: `₹${targetPrice}`,
                  position: "insideTopRight",
                  fill: "#666",
                  fontSize: 10,
                }}
                stroke="#aaa"
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Betting Statistics Section */}
        <Card
          variant="outlined"
          sx={{ mb: 2, borderRadius: 2, borderColor: "#eee" }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "1rem", mb: 1.5 }}
            >
              Prediction Options & Odds
            </Typography>
            <Grid container spacing={2} textAlign="center" sx={{ mb: 1.5 }} justifyContent={'space-between'}>
              <Grid item xs={6}>
                {" "}
                {/* Up Option */}
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  Price Up{" "}
                  <TrendingUp
                    sx={{
                      fontSize: "1rem",
                      verticalAlign: "middle",
                      color: PRIMARY_COLOR,
                    }}
                  />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: PRIMARY_COLOR, fontWeight: "bold", mb: 0.5 }}
                >
                  {oddsUp || "-"}x
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  60% Bets
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {" "}
                {/* Down Option */}
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  Price Down{" "}
                  <TrendingDown
                    sx={{
                      fontSize: "1rem",
                      verticalAlign: "middle",
                      color: RED_COLOR,
                    }}
                  />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: RED_COLOR, fontWeight: "bold", mb: 0.5 }}
                >
                  {oddsDown || "-"}x
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  40% Bets
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* News Section */}
        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: "bold", fontSize: "1rem" }}
        >
          Related News
        </Typography>
        <Box sx={{ mb: 2 }}>
          {dummyNews.map((news) => (
            <Card
              key={news.id}
              variant="outlined"
              sx={{ mb: 1.5, borderRadius: 2, borderColor: "#eee" }}
            >
              <CardContent sx={{ p: "12px !important" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  {news.headline}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {news.snippet}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Bottom Predict Button Area */}
      <Paper square elevation={3} sx={{ p: 2, mt: "auto", bgcolor: "white" }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handlePredictClick}
          sx={{
            bgcolor: PRIMARY_COLOR,
            textTransform: "none",
            borderRadius: 2,
            boxShadow: "none",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#006F5C" },
          }}
        >
          Place Your Bet
        </Button>
      </Paper>

      {/* Render the PredictionModal */}
      <PredictionModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handlePredictionSubmit}
        cardData={cardData}
      />
    </Box>
  );
};

export default MustardDetailScreen;
