import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
  Modal,
  TextField,
  Card,
  CardContent,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import LiveSection from "../components/LiveSection";
import PendingSection from "../components/PendingSection";

// Define interfaces for the data structures
interface LiveItem {
  title: string;
  description: string;
  price: string; // Describes options for binary/ternary, price for number
  poolSize: string;
  timeLeft: string;
  type: "number" | "binary" | "ternary"; // Allow ternary type
  recommended?: boolean;
  image?: string; // Banner image URL
  odds?: Record<string, number>; // Flexible odds structure (e.g., { up: 1.5, down: 2.0 } or { before: 1.9, on: 5.0, after: 1.4 })
  range?: string;
  returns?: string;
}

interface CompletedItem {
  title: string;
  description: string;
  prediction: string;
  actual: string;
  amount: string;
  reward: string;
  date: string;
}

interface PendingItem {
  title?: string;
  description?: string;
  // Add other pending item properties if they exist
}

interface DummyData {
  live: LiveItem[];
  pending: PendingItem[];
  completed: CompletedItem[];
}

const dummyData: DummyData = {
  live: [
    {
      title: "Wheat Price Prediction",
      description: "Globus Corp. Grade A (Rajasthan)",
      price: "₹2,450/Qtl",
      poolSize: "₹2.8L",
      timeLeft: "5h 30m left",
      type: "number",
      recommended: true,
      image: "https://d2n0idf0n5xz1f.cloudfront.net/others/1670582892093",
      range: "₹2,300 - ₹2,600",
      returns: "up to 3x",
    },
    {
      title: "MSP Policy Change",
      description: "March-April 2024",
      price: "Yes/No",
      poolSize: "₹3.2L",
      timeLeft: "12h 20m left",
      type: "binary",
      image:
        "https://img-cdn.thepublive.com/fit-in/640x430/filters:format(webp)/newsdrum-in/media/media_files/Hn3PDnBcK50BWa4kRUsi.jpg",
      odds: { up: 2.5, down: 1.4 },
    },
    {
      title: "Will mustard price be higher than ₹3,200/Qtl in one week?",
      description: "Rajkot APMC Market Trend",
      price: "₹3,050/Qtl", // Current price displayed for context
      poolSize: "₹1.5L",
      timeLeft: "4d 6h left",
      type: "binary", // Keep as binary for this example
      recommended: false,
      image: "https://d2n0idf0n5xz1f.cloudfront.net/others/1672340302645",
      odds: { up: 1.9, down: 1.6 },
    },
    {
      title:
        "Kya iss monsoon ki pehli baarish 25 August ke pehle hogi ya baad me?",
      description: "Khandwa MP",
      price: "Before / On / After 25 Aug", // Describe options
      poolSize: "₹1.2L", // Dummy value
      timeLeft: "~37d left", // Approx time left
      type: "ternary",
      recommended: false,
      // Update image URL for monsoon card
      image:
        "https://bsmedia.business-standard.com/_media/bs/img/article/2017-07/12/full/1499802986-8868.jpg?im=FeatureCrop,size=(826,465)",
      odds: { before: 1.9, on: 5.0, after: 1.4 },
    },
  ],
  pending: [],
  completed: [
    {
      title: "Rice MSP Prediction",
      description: "Government Announcement",
      prediction: "₹2,200/Qtl",
      actual: "₹2,205/Qtl",
      amount: "₹2,000",
      reward: "₹5,000",
      date: "21/02/2025",
    },
  ],
};

const TABS = ["Live", "Pending", "Completed"];
const PRIMARY_COLOR = "#008B72"; // Define primary color

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("Live");
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<LiveItem | null>(null);
  const [predictionValue, setPredictionValue] = useState(""); // For number type
  const [betAmount, setBetAmount] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null); // Handles 'Up', 'Down', 'before', 'on', 'after'
  const [potentialWinnings, setPotentialWinnings] = useState<number | null>(
    null
  );
  const [selectedResult, setSelectedResult] = useState<CompletedItem | null>(
    null
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue) setSelectedTab(newValue);
  };

  const handlePredictClick = (card: LiveItem) => {
    setSelectedCard(card);
    setPredictionValue(""); // Reset numeric prediction
    setSelectedChoice(null); // Reset choice prediction
    setBetAmount("");
    setPotentialWinnings(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCard(null);
    setPredictionValue("");
    setBetAmount("");
    setSelectedChoice(null); // Reset choice prediction
    setPotentialWinnings(null);
  };

  useEffect(() => {
    const bet = parseFloat(betAmount);
    let winnings: number | null = null;
    if (!isNaN(bet) && bet > 0 && selectedCard) {
      if (selectedCard.type === "number" && predictionValue) {
        const multiplierMatch = selectedCard.returns?.match(/(\d+(\.\d+)?)/);
        const multiplier = multiplierMatch ? parseFloat(multiplierMatch[0]) : 1;
        winnings = bet * multiplier;
      } else if (
        (selectedCard.type === "binary" || selectedCard.type === "ternary") &&
        selectedChoice &&
        selectedCard.odds
      ) {
        const odd = selectedCard.odds[selectedChoice]; // Get odd based on selected choice key
        if (odd) {
          winnings = bet * odd;
        }
      }
    }
    setPotentialWinnings(winnings);
  }, [betAmount, predictionValue, selectedChoice, selectedCard]); // Add selectedChoice to dependencies

  const handleBetAmountPreset = (amount: string) => {
    setBetAmount(amount);
  };

  const handleSubmitPrediction = () => {
    let predictionData: string | null = null;
    let oddApplied: number | undefined;

    if (selectedCard?.type === "number") {
      predictionData = predictionValue;
    } else if (
      (selectedCard?.type === "binary" || selectedCard?.type === "ternary") &&
      selectedChoice
    ) {
      predictionData = selectedChoice;
      oddApplied = selectedCard?.odds?.[selectedChoice];
    }

    const submissionData = {
      cardTitle: selectedCard?.title,
      bet: betAmount,
      prediction: predictionData,
      ...(oddApplied !== undefined && { odds: oddApplied }),
    };
    console.log("Prediction Submitted:", submissionData);
    handleModalClose();
    alert("Bet placed successfully!");
  };

  const handleWinModalOpen = (result: CompletedItem) => {
    setSelectedResult(result);
    setWinModalOpen(true);
  };

  const handleWinModalClose = () => {
    setSelectedResult(null);
    setWinModalOpen(false);
  };

  const renderSection = () => {
    switch (selectedTab) {
      case "Live":
        return (
          <LiveSection
            items={dummyData.live}
            onPredictClick={handlePredictClick}
            primaryColor={PRIMARY_COLOR}
          />
        );
      case "Pending":
        return (
          <PendingSection
            items={dummyData.pending}
            primaryColor={PRIMARY_COLOR}
          />
        );
      case "Completed":
        return (
          <Box>
            {dummyData.completed.map((item, idx) => (
              <Card
                key={idx}
                variant="outlined"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  width: "100%",
                  borderColor: "#eee",
                }}
              >
                <CardContent sx={{ position: "relative", p: 1.5 }}>
                  <Box
                    component="img"
                    src={`/placeholder-image-completed-${(idx % 2) + 1}.png`}
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
                  <Typography fontWeight="bold" fontSize="0.9rem" gutterBottom>
                    {item.title}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      Prediction
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Reward Won
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight="500">
                      {item.prediction}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {item.reward}
                    </Typography>
                  </Box>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      p: 0,
                      textTransform: "none",
                      color: PRIMARY_COLOR,
                      fontSize: "0.8rem",
                    }}
                    onClick={() => handleWinModalOpen(item)}
                  >
                    View Result
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{ bgcolor: "white", minHeight: "100vh", maxWidth: 500, mx: "auto" }}
    >
      <Box sx={{ bgcolor: PRIMARY_COLOR, color: "white", p: "12px 16px" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid display="flex" alignItems="center">
            <Box
              sx={{ bgcolor: "white", p: "4px 8px", borderRadius: 1, mr: 1.5 }}
            >
              <Typography
                sx={{
                  color: PRIMARY_COLOR,
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                खेती बाज़ी
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                fontSize="1.1rem"
                lineHeight={1.2}
              >
                KhetiBaazi
              </Typography>
              <Typography
                variant="caption"
                display="block"
                sx={{ opacity: 0.9 }}
              >
                Kisaan Ka Market Analyst
              </Typography>
            </Box>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "rgba(0,0,0,0.2)",
                color: "white",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "0.75rem",
                boxShadow: "none",
                fontWeight: 500,
                px: 1.5,
                py: 0.5,
                "&:hover": { bgcolor: "rgba(0,0,0,0.3)", boxShadow: "none" },
              }}
            >
              Balance: ₹10,000
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: "16px 12px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1.5, color: "#333" }}
        >
          Market Challenges
        </Typography>

        <Box sx={{ bgcolor: "#f0f0f0", borderRadius: "16px", p: 0.5, mb: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="fullWidth"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{ minHeight: "36px" }}
          >
            {TABS.map((tab) => (
              <Tab
                label={tab}
                value={tab}
                key={tab}
                disableRipple
                sx={{
                  color: "#555",
                  minHeight: "36px",
                  height: "36px",
                  padding: "6px 12px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  borderRadius: "14px",
                  textTransform: "none",
                  zIndex: 1,
                  "&.Mui-selected": {
                    bgcolor: PRIMARY_COLOR,
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Box
          sx={{
            maxHeight: "calc(100vh - 60px - 48px - 48px - 32px)",
            overflowY: "auto",
            pr: 0.5,
          }}
        >
          {renderSection()}
        </Box>
      </Box>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            boxShadow: "0 -5px 15px rgba(0,0,0,0.1)",
            outline: "none",
            maxHeight: "90vh",
          }}
        >
          <Box
            sx={{
              bgcolor: PRIMARY_COLOR,
              color: "white",
              p: 2,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Potential Winnings
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              ₹
              {potentialWinnings !== null ? potentialWinnings.toFixed(0) : "--"}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {selectedCard?.type === "number" &&
                `${
                  selectedCard?.returns || "-"
                } returns on accurate prediction`}
              {(selectedCard?.type === "binary" ||
                selectedCard?.type === "ternary") &&
                selectedChoice &&
                selectedCard.odds &&
                selectedCard.odds[selectedChoice] &&
                `${selectedCard.odds[selectedChoice]}x returns on accurate prediction`}
              {(selectedCard?.type === "binary" ||
                selectedCard?.type === "ternary") &&
                !selectedChoice &&
                `Select an option to see potential returns`}
            </Typography>
          </Box>

          <Box
            sx={{ p: 2.5, overflowY: "auto", maxHeight: "calc(90vh - 100px)" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="h6" component="h2" fontWeight="bold">
                Predict {selectedCard?.title || "Price"}
              </Typography>
              <IconButton
                onClick={handleModalClose}
                size="small"
                sx={{ p: 0.2 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 1.5 }}
            >
              {selectedCard?.type === "number"
                ? `Current Price: ${selectedCard?.price || "—"}`
                : selectedCard?.price || "—"}
            </Typography>

            {selectedCard?.type === "number" && (
              <Box mb={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Your Prediction
                </Typography>
                <TextField
                  placeholder="Enter predicted price"
                  type="number"
                  fullWidth
                  value={predictionValue}
                  onChange={(e) => setPredictionValue(e.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">₹/Qtl</InputAdornment>
                    ),
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mt: 0.5 }}
                >
                  Range: {selectedCard?.range || "—"} | Returns{" "}
                  {selectedCard?.returns || "—"}
                </Typography>
              </Box>
            )}

            {selectedCard?.type === "binary" && selectedCard.odds && (
              <Box mb={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Your Prediction
                </Typography>
                <ToggleButtonGroup
                  value={selectedChoice}
                  exclusive
                  onChange={(e, newValue) => {
                    if (newValue !== null) {
                      setSelectedChoice(newValue);
                    }
                  }}
                  aria-label="Binary Prediction Type"
                  fullWidth
                  sx={{
                    gap: 1,
                    "& .MuiToggleButtonGroup-grouped": {
                      borderRadius: "8px !important",
                      border: `1px solid ${PRIMARY_COLOR} !important`,
                      color: PRIMARY_COLOR,
                      flex: 1,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 500,
                    },
                    "& .Mui-selected": {
                      bgcolor: `${PRIMARY_COLOR} !important`,
                      color: "white !important",
                      fontWeight: "bold",
                    },
                  }}
                >
                  {Object.entries(selectedCard.odds).map(([key, oddValue]) => (
                    <ToggleButton key={key} value={key} aria-label={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} ({oddValue}x)
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            )}

            {selectedCard?.type === "ternary" && selectedCard.odds && (
              <Box mb={2}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Your Prediction
                </Typography>
                <ToggleButtonGroup
                  value={selectedChoice}
                  exclusive
                  onChange={(e, newValue) => {
                    if (newValue !== null) {
                      setSelectedChoice(newValue);
                    }
                  }}
                  aria-label="Ternary Prediction Type"
                  fullWidth
                  sx={{
                    gap: 1,
                    "& .MuiToggleButtonGroup-grouped": {
                      borderRadius: "8px !important",
                      border: `1px solid ${PRIMARY_COLOR} !important`,
                      color: PRIMARY_COLOR,
                      flex: 1,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 500,
                    },
                    "& .Mui-selected": {
                      bgcolor: `${PRIMARY_COLOR} !important`,
                      color: "white !important",
                      fontWeight: "bold",
                    },
                  }}
                >
                  <ToggleButton value="before" aria-label="Before 25 Aug">
                    Before 25 Aug ({selectedCard.odds.before}x)
                  </ToggleButton>
                  <ToggleButton value="on" aria-label="On 25 Aug">
                    On 25 Aug ({selectedCard.odds.on}x)
                  </ToggleButton>
                  <ToggleButton value="after" aria-label="After 25 Aug">
                    After 25 Aug ({selectedCard.odds.after}x)
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}

            <Box sx={{ bgcolor: "#f7f7f7", p: 2, borderRadius: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Bet Amount
              </Typography>
              <ToggleButtonGroup
                value={betAmount}
                exclusive
                onChange={(e, val) => val && handleBetAmountPreset(val)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                  gap: 1,
                  "& .MuiToggleButtonGroup-grouped": {
                    borderRadius: "8px !important",
                    border: `1px solid #ccc !important`,
                    color: PRIMARY_COLOR,
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.5,
                    fontSize: "0.8rem",
                    flex: "1 1 auto",
                  },
                  "& .Mui-selected": {
                    bgcolor: PRIMARY_COLOR,
                    color: "white !important",
                    borderColor: `${PRIMARY_COLOR} !important`,
                  },
                }}
              >
                <ToggleButton value="100">₹100</ToggleButton>
                <ToggleButton value="500">₹500</ToggleButton>
                <ToggleButton value="1000">₹1000</ToggleButton>
              </ToggleButtonGroup>

              <TextField
                placeholder="Enter custom amount"
                type="number"
                fullWidth
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "white",
                  },
                }}
                variant="outlined"
                size="small"
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmitPrediction}
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
              Submit Prediction
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={winModalOpen}
        onClose={handleWinModalClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 380,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 2,
            maxHeight: "80vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: "4rem", color: "#2E7D32", mb: 2 }} />
          <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
            आपने जीता!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {selectedResult?.title || "—"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {selectedResult?.date || "—"}
          </Typography>

          <Box
            sx={{
              bgcolor: "#F5F5F5",
              p: 2,
              borderRadius: 2,
              mb: 4,
              width: "80%",
              maxWidth: 300,
            }}
          >
            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2">वास्तविक मूल्य</Typography>
              <Typography variant="body2">आपका अनुमान</Typography>
            </Grid>
            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body1" fontWeight="bold">
                {selectedResult?.actual || "—"}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {selectedResult?.prediction || "—"}
              </Typography>
            </Grid>
            <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
              ✓ बहुत ही सटीक अनुमान!
            </Typography>
          </Box>

          <Box sx={{ width: "80%", maxWidth: 300, mb: 4 }}>
            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2">आपका दाव</Typography>
              <Typography variant="body1" fontWeight="bold">
                {selectedResult?.amount || "—"}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography variant="body2">कुल जीत</Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="success.main"
              >
                {selectedResult?.reward || "—"}
              </Typography>
            </Grid>
          </Box>

          <Button
            variant="contained"
            color="success"
            sx={{ mt: "auto", bgcolor: "#2E7D32", width: "80%", maxWidth: 300 }}
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
