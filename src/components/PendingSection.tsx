import React from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";

// Define interface (can be imported if global)
interface PendingItem {
  title?: string;
  description?: string;
}

interface PendingSectionProps {
  items: PendingItem[];
  primaryColor: string; // Added primaryColor prop
}

const PendingSection: React.FC<PendingSectionProps> = ({
  items,
  primaryColor,
}) => {
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
            <CardContent sx={{ position: "relative", p: 1.5 }}>
              {/* Image Placeholder */}
              <Box
                component="img"
                src={`/placeholder-image-pending-${(index % 2) + 1}.png`}
                alt={item.title || "Pending"}
                sx={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: "#f0f4f8",
                }}
              />
              {/* Assuming pending items have similar structure */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
                gutterBottom
              >
                {item.title || "Pending Prediction"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="left"
                sx={{ fontSize: "0.8rem", mb: 1 }}
              >
                {item.description || "Waiting for results..."}
              </Typography>
              {/* Add other relevant pending details if available */}
              <Typography
                variant="body2"
                sx={{
                  color: primaryColor,
                  fontStyle: "italic",
                  fontSize: "0.8rem",
                }}
              >
                Result Pending
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default PendingSection;
