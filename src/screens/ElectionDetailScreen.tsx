import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PieChartIcon from "@mui/icons-material/PieChart";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/header"; // Assuming a shared Header component exists

// Dummy data for charts
const actualVotingData = [
  { name: "Suresh Patel", votes: 5500, fill: "#8884d8" },
  { name: "Raju Singh", votes: 4200, fill: "#82ca9d" },
  { name: "Other", votes: 300, fill: "#ffc658" },
];

const appPredictionPool = [
  { name: "Suresh Patel", amount: 58000, fill: "#8884d8" },
  { name: "Raju Singh", amount: 40000, fill: "#82ca9d" },
  { name: "Other", amount: 2000, fill: "#ffc658" },
];

// Dummy data for odds
const finalOdds = {
  "Suresh Patel": 1.3,
  "Raju Singh": 2.8,
};

// Dummy data for Hall of Fame
const topWinner = {
  name: "Farmer_Amit",
  amountWon: "₹12,500",
  avatar: "/path/to/amit-avatar.png", // Replace with actual or placeholder path
};

// Dummy data for news
const relatedNews = [
  {
    id: 1,
    title: "Suresh Patel wins Khandwa election in close contest",
    source: "Local News Network",
    date: "16 Mar 2024",
  },
  {
    id: 2,
    title: "Voter turnout analysis for MP local elections released",
    source: "State Election Commission",
    date: "17 Mar 2024",
  },
  {
    id: 3,
    title: "App predictions closely mirrored election results",
    source: "Tech Chronicle",
    date: "18 Mar 2024",
  },
];

const ElectionDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Explicitly type the state
  const { state } = location as {
    state: { title: string; date: string; description: string } | null;
  };

  const cardData = state;

  if (!cardData) {
    // Handle case where state is not passed correctly
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Error: Card data not found.</Typography>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon /> Back
        </IconButton>
      </Box>
    );
  }

  // Define interface for label props
  interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index?: number; // Added optional index
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: CustomizedLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="0.8rem"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box
      sx={{ bgcolor: "white", minHeight: "100vh", maxWidth: 600, mx: "auto" }}
    >
      <Header /> {/* Or a specific header for detail screens */}
      <Box sx={{ p: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 1 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {cardData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Result Announced: {cardData.date} ({cardData.description})
        </Typography>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Actual Voting Chart */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HowToVoteIcon sx={{ mr: 1, color: "primary.main" }} /> Actual
              Voting Results
            </Typography>
            <Box sx={{ height: 250, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={actualVotingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="votes"
                    nameKey="name"
                  >
                    {actualVotingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} votes`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* App Prediction Pool Chart */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <PieChartIcon sx={{ mr: 1, color: "secondary.main" }} /> App
              Prediction Pool
            </Typography>
            <Box sx={{ height: 250, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appPredictionPool}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="name"
                  >
                    {appPredictionPool.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>

        {/* Final Odds Section */}
        <Typography variant="h6" gutterBottom>
          Final Betting Odds
        </Typography>
        <Card variant="outlined" sx={{ mb: 4, bgcolor: "#f9f9f9" }}>
          <CardContent>
            {Object.entries(finalOdds).map(([name, odd]) => (
              <Box
                key={name}
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>{name}</Typography>
                <Typography fontWeight="bold">{odd}x</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Hall of Fame Section */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          <EmojiEventsIcon sx={{ mr: 1, color: "gold" }} /> Hall of Fame (Top
          Winner)
        </Typography>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={topWinner.avatar || "/default-avatar.png"}
              sx={{ mr: 2, bgcolor: "primary.light" }}
            >
              {topWinner.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography fontWeight="bold">{topWinner.name}</Typography>
              <Typography color="success.main">
                Won: {topWinner.amountWon}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Related News Section */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          <NewspaperIcon sx={{ mr: 1 }} /> Related News
        </Typography>
        <List sx={{ width: "100%" }}>
          {relatedNews.map((news) => (
            <ListItem key={news.id} divider sx={{ alignItems: "flex-start" }}>
              <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}>
                <NewspaperIcon fontSize="small" color="action" />
              </ListItemIcon>
              <ListItemText
                primary={news.title}
                secondary={`${news.source} - ${news.date}`}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  mb: 0.5,
                }}
                secondaryTypographyProps={{ fontSize: "0.8rem" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ElectionDetailScreen;
