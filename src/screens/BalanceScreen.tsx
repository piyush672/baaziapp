import React from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BuildIcon from "@mui/icons-material/Build";// ✅ Added icoin
import SmsIcon from "@mui/icons-material/Sms";
import Header from "../components/header";


const benefits = [
  {
    icon: <ShoppingCartIcon />,
    title: "Agri-Input Discounts",
    subtitle: "Get up to 15% off on fertilizers and pesticides",
    reward: "1000 points = ₹100 off",
  },
  {
    icon: <MonetizationOnIcon />,
    title: "FarMart Fee Discount",
    subtitle: "Reduce your platform fees",
    reward: "2000 points = 20% off fees",
  },
  {
    icon: <BuildIcon />,
    title: "Machinery & Tools",
    subtitle: "Discounts on equipment rentals",
    reward: "5000 points = 25% off rentals",
  },
  {
    icon: <SmsIcon />,
    title: "Buy shop promotion balance",
    subtitle: "Recharge your shop promotion balance",
    reward: "200 points = 300 SMS",
  },
];

const BalanceScreen = () => {
  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh" }}>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 2 }} >
        <Header showBack={true} />
      </Box> {/* Make Header sticky */}

      {/* ✅ Balance Card with Gold Icon */}
      <Box
        sx={{
          bgcolor: "#008B72",
          color: "white",
          m: 2,
          p: 3,
          borderRadius: 2,
          textAlign: "left",
        }}
      >
        <Typography variant="body2">Available Coins</Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <img src={"/gold-coin-rupee-icon.svg"} alt="Trophy" style={{ width: "2rem", marginRight: "0.5rem" }} />
          <Typography variant="h4" fontWeight="bold">
            10,000
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "white",
            color: "#008B72",
            fontWeight: "bold",
            mt: 2,
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Cashout
        </Button>
      </Box>

      {/* Benefits Section */}
      <Box px={2}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Redeem for Benefits
        </Typography>

        {benefits.map((item, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 2,
              "&:hover": { cursor: "pointer" },
            }}
          >
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    sx={{
                      bgcolor: "#EAF6F3",
                      color: "#007F6D",
                      p: 1.2,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.subtitle}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#008B72", fontWeight: 500 }}
                  >
                    {item.reward}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BalanceScreen;
