import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Assuming LiveItem is defined elsewhere or passed in
// If not, define it here matching the one in HomeScreen.tsx
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

interface PredictionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (submission: {
    cardTitle: string | undefined;
    bet: string;
    prediction: string | null;
    odds?: number;
  }) => void;
  cardData: LiveItem | null;
}

const PRIMARY_COLOR = "#008B72"; // Match primary color

const PredictionModal: React.FC<PredictionModalProps> = ({
  open,
  onClose,
  onSubmit,
  cardData,
}) => {
  // Internal state for the modal
  const [predictionValue, setPredictionValue] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [potentialWinnings, setPotentialWinnings] = useState<number | null>(
    null
  );

  // Reset internal state when cardData changes or modal opens/closes
  useEffect(() => {
    if (open && cardData) {
      setPredictionValue("");
      setSelectedChoice(null);
      setBetAmount("");
      setPotentialWinnings(null);
    } else if (!open) {
      // Optionally clear state on close too if desired
      setPredictionValue("");
      setSelectedChoice(null);
      setBetAmount("");
      setPotentialWinnings(null);
    }
  }, [open, cardData]);

  // Calculate potential winnings (moved from HomeScreen)
  useEffect(() => {
    const bet = parseFloat(betAmount);
    let winnings: number | null = null;
    if (!isNaN(bet) && bet > 0 && cardData) {
      if (cardData.type === "number" && predictionValue) {
        const multiplierMatch = cardData.returns?.match(/(\d+(\.\d+)?)/);
        const multiplier = multiplierMatch ? parseFloat(multiplierMatch[0]) : 1;
        winnings = bet * multiplier;
      } else if (
        (cardData.type === "binary" || cardData.type === "ternary") &&
        selectedChoice &&
        cardData.odds
      ) {
        const odd = cardData.odds[selectedChoice];
        if (odd) {
          winnings = bet * odd;
        }
      }
    }
    setPotentialWinnings(winnings);
  }, [betAmount, predictionValue, selectedChoice, cardData]);

  const handleBetAmountPreset = (amount: string) => {
    setBetAmount(amount);
  };

  // Handle internal submission and pass data to onSubmit prop
  const handleInternalSubmit = () => {
    let finalPrediction: string | null = null;
    let oddApplied: number | undefined;

    if (cardData?.type === "number") {
      finalPrediction = predictionValue;
    } else if (
      (cardData?.type === "binary" || cardData?.type === "ternary") &&
      selectedChoice
    ) {
      finalPrediction = selectedChoice;
      oddApplied = cardData?.odds?.[selectedChoice];
    }

    const submissionData = {
      cardTitle: cardData?.title,
      bet: betAmount,
      prediction: finalPrediction,
      ...(oddApplied !== undefined && { odds: oddApplied }),
    };

    // Call the onSubmit function passed from the parent
    onSubmit(submissionData);
    onClose(); // Close the modal after submit
  };

  // Don't render if no card data
  if (!cardData) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose} // Use the onClose prop
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
        {/* Header for Potential Winnings */}
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
            ₹{potentialWinnings !== null ? potentialWinnings.toFixed(0) : "--"}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            {cardData.type === "number" &&
              `${cardData.returns || "-"} returns on accurate prediction`}
            {(cardData.type === "binary" || cardData.type === "ternary") &&
              selectedChoice &&
              cardData.odds &&
              cardData.odds[selectedChoice] &&
              `${cardData.odds[selectedChoice]}x returns on accurate prediction`}
            {(cardData.type === "binary" || cardData.type === "ternary") &&
              !selectedChoice &&
              `Select an option to see potential returns`}
          </Typography>
        </Box>

        {/* Scrollable Content Area */}
        <Box
          sx={{ p: 2.5, overflowY: "auto", maxHeight: "calc(90vh - 100px)" }}
        >
          {/* Modal Title and Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6" component="h2" fontWeight="bold">
              Predict {cardData.title}
            </Typography>
            <IconButton
              onClick={onClose} // Use onClose prop
              size="small"
              sx={{ p: 0.2 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Current Price / Info Text */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 1.5 }}
          >
            {cardData.type === "number"
              ? `Current Price: ${cardData.price || "—"}`
              : cardData.price || "—"}
          </Typography>

          {/* Conditional Input: Number Type */}
          {cardData.type === "number" && (
            <Box mb={2}>
              {/* ... Number input field ... */}
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
                Range: {cardData.range || "—"} | Returns{" "}
                {cardData.returns || "—"}
              </Typography>
            </Box>
          )}

          {/* Conditional Input: Binary Type */}
          {cardData.type === "binary" && cardData.odds && (
            <Box mb={2}>
              {/* ... Binary toggle button group ... */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
                {Object.entries(cardData.odds).map(([key, oddValue]) => (
                  <ToggleButton key={key} value={key} aria-label={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} ({oddValue}x)
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          )}

          {/* Conditional Input: Ternary Type */}
          {cardData.type === "ternary" && cardData.odds && (
            <Box mb={2}>
              {/* ... Ternary toggle button group ... */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
                  Before 25 Aug ({cardData.odds.before}x)
                </ToggleButton>
                <ToggleButton value="on" aria-label="On 25 Aug">
                  On 25 Aug ({cardData.odds.on}x)
                </ToggleButton>
                <ToggleButton value="after" aria-label="After 25 Aug">
                  After 25 Aug ({cardData.odds.after}x)
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}

          {/* Bet Amount Section */}
          <Box sx={{ bgcolor: "#f7f7f7", p: 2, borderRadius: 2, mb: 2 }}>
            {/* ... Bet amount inputs ... */}
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

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleInternalSubmit} // Call internal submit handler
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
  );
};

export default PredictionModal;
