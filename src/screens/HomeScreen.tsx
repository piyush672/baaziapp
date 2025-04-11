import React, { useState } from "react";
import {
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Grid,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LiveSection from "../components/LiveSection";
import PendingSection from "../components/PendingSection";
import PredictionModal from "../components/PredictionModal";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

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
  image?: string; // Add optional image field
}

interface PendingItem {
  title: string;
  description: string;
  prediction: string;
  betAmount: string;
  resultDate: string;
  image?: string;
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
  pending: [
    {
      title: "Wheat Price Prediction",
      description: "Globus Corp. Grade A (Rajasthan)",
      prediction: "₹2500/Qtl",
      betAmount: "₹500",
      resultDate: "12 Apr",
      image: "https://d2n0idf0n5xz1f.cloudfront.net/others/1670582892093",
    },
  ],
  completed: [
    {
      title: "Rice MSP Prediction",
      description: "Government Announcement",
      prediction: "₹2,200/Qtl",
      actual: "₹2,205/Qtl",
      amount: "₹2,000",
      reward: "₹5,000",
      date: "21/02/2025",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/033/107/729/small_2x/rice-on-the-table-web-banner-with-copy-space-generative-ai-photo.jpg",
    },
    {
      title: "Who will win the gram panchayat election?",
      description: "Khandwa (MP)",
      prediction: "Raju Singh",
      actual: "Suresh Patel", // Prediction was incorrect
      amount: "₹100",
      reward: "-₹500", // Update to show loss amount
      date: "15/03/2024",
      image: "https://iili.io/3cFBWPV.md.png", // Add image URL
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
  const [selectedResult, setSelectedResult] = useState<CompletedItem | null>(
    null
  );
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue) setSelectedTab(newValue);
  };

  const handlePredictClick = (card: LiveItem) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePredictionSubmit = (submission: {
    cardTitle: string | undefined;
    bet: string;
    prediction: string | null;
    odds?: number;
  }) => {
    console.log("Prediction Submitted from HomePage:", submission);
    alert("Bet placed successfully! (From HomePage)");
  };

  const handleWinModalOpen = (result: CompletedItem) => {
    setSelectedResult(result);
    setWinModalOpen(true);
  };

  const handleWinModalClose = () => {
    setSelectedResult(null);
    setWinModalOpen(false);
  };

  const handleCompletedCardClick = (item: CompletedItem) => {
    if (item.title === "Who will win the gram panchayat election?") {
      navigate("/election-detail", { state: item });
    }
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
        return <PendingSection items={dummyData.pending} />;
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
                  cursor:
                    item.title === "Who will win the gram panchayat election?"
                      ? "pointer"
                      : "default",
                  "&:hover":
                    item.title === "Who will win the gram panchayat election?"
                      ? {
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          borderColor: "#ccc",
                        }
                      : {},
                }}
                onClick={() => handleCompletedCardClick(item)}
              >
                <CardContent sx={{ position: "relative", p: 1.5 }}>
                  <Box
                    component="img"
                    src={
                      item.image ||
                      `/placeholder-image-completed-${(idx % 2) + 1}.png`
                    }
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
                      color={
                        item.reward.startsWith("-")
                          ? "error.main"
                          : "success.main"
                      }
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
      <Header />

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

      <PredictionModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handlePredictionSubmit}
        cardData={selectedCard}
      />

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
                color={
                  selectedResult?.reward.startsWith("-")
                    ? "error.main"
                    : "success.main"
                }
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
