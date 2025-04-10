import React from "react";
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
import { ArrowBack } from "@mui/icons-material"; // Assuming MUI icons are installed
// Import hook from react-router-dom
import { useLocation, useNavigate } from "react-router-dom";
// Import navigation hooks if using React Navigation
// import { useNavigation, useRoute } from '@react-navigation/native';

// Define types (consider sharing from HomeScreen or a types file)
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

// Dummy Weather Data
const dummyWeatherData = [
  { date: "Aug 23", day: "Thu", high: 31, low: 24, icon: "partly-cloudy" },
  { date: "Aug 24", day: "Fri", high: 30, low: 23, icon: "rainy" },
  { date: "Aug 25", day: "Sat", high: 29, low: 23, icon: "rainy" },
  { date: "Aug 26", day: "Sun", high: 32, low: 24, icon: "sunny" },
  { date: "Aug 27", day: "Mon", high: 33, low: 25, icon: "sunny" },
];

// Dummy Icon mapping (replace with actual icons later)
const weatherIconMap: Record<string, string> = {
  sunny: "☀️",
  rainy: "🌧️",
  cloudy: "☁️",
  "partly-cloudy": "⛅",
};

const PRIMARY_COLOR = "#008B72"; // Consistent primary color

const MonsoonDetailScreen = () => {
  // --- Navigation & Data Retrieval ---
  const navigate = useNavigate();
  const location = useLocation();
  // Access data passed via state
  const cardData = (location.state?.cardData as LiveItem) || null;

  // Use dummy data if navigation is not set up yet
  /*
  const cardData: LiveItem = {
    title:
      "Kya iss monsoon ki pehli baarish 25 August ke pehle hogi ya baad me?",
    description: "Khandwa MP",
    price: "Before / On / After 25 Aug",
    poolSize: "₹1.2L",
    timeLeft: "~37d left",
    type: "ternary",
    recommended: false,
    image:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2017-07/12/full/1499802986-8868.jpg?im=FeatureCrop,size=(826,465)",
    odds: { before: 1.9, on: 5.0, after: 1.4 },
  };
  */

  const handlePredictClick = () => {
    console.log("Predict button clicked for:", cardData?.title);
    // Later: Open prediction modal, potentially passing cardData
    // Example: navigation.navigate('PredictionModal', { cardData });
    alert("Prediction Modal integration needed!");
  };

  const handleGoBack = () => {
    console.log("Go back clicked");
    // Use react-router-dom navigate
    navigate(-1); // Go back to the previous page in history
  };

  if (!cardData) {
    // Handle case where card data is missing, maybe navigate back or show error
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Error: Card data not found.</Typography>
        <Button onClick={handleGoBack}>Go Back</Button>
      </Box>
    );
  }

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
          <IconButton
            onClick={handleGoBack}
            sx={{ mr: 1, ml: -1 /* Adjust alignment */ }}
          >
            <ArrowBack />
          </IconButton>
          <Box sx={{ minWidth: 0 }}>
            {" "}
            {/* Allow text to truncate */}
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
        {/* Weather Forecast Section */}
        <Typography
          variant="h6"
          sx={{ mb: 1, fontWeight: "bold", fontSize: "1rem" }}
        >
          Weather Forecast (Khandwa MP)
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            pb: 1,
            mb: 2,
            gap: 1.5,
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {dummyWeatherData.map((day) => (
            <Card
              key={day.date}
              variant="outlined"
              sx={{
                minWidth: 90,
                textAlign: "center",
                borderRadius: 2,
                borderColor: "#eee",
              }}
            >
              <CardContent sx={{ p: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  {day.day}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {day.date}
                </Typography>
                <Typography variant="h5" sx={{ my: 0.5 }}>
                  {weatherIconMap[day.icon] || "❓"}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {day.high}°
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {day.low}°
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

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
            <Grid container spacing={1} textAlign="center" sx={{ mb: 1.5 }}>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  Before 25 Aug
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: PRIMARY_COLOR, fontWeight: "bold" }}
                >
                  {cardData.odds?.before || "-"}x
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  On 25 Aug
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: PRIMARY_COLOR, fontWeight: "bold" }}
                >
                  {cardData.odds?.on || "-"}x
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  After 25 Aug
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: PRIMARY_COLOR, fontWeight: "bold" }}
                >
                  {cardData.odds?.after || "-"}x
                </Typography>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Current Bets: Before: 45% | On: 15% | After: 40% (Dummy Data)
            </Typography>
          </CardContent>
        </Card>

        {/* Promotional Banner */}
        <Card
          sx={{
            mb: 2,
            borderRadius: 2,
            bgcolor: "#E0F2F1" /* Light teal */,
            border: `1px solid ${PRIMARY_COLOR}`,
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              p: "12px !important" /* Adjust padding */,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: PRIMARY_COLOR,
                fontWeight: "bold",
                mb: 0.5,
                fontSize: "1.1rem",
              }}
            >
              🎯 Predict the Exact Date!
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#004D40" /* Darker teal */ }}
            >
              Win up to{" "}
              <Typography component="span" fontWeight="bold">
                5x
              </Typography>{" "}
              your bet by predicting the monsoon's arrival on August 25th!
            </Typography>
          </CardContent>
        </Card>
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
    </Box>
  );
};

export default MonsoonDetailScreen;
