import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Fade,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { ImageRecord } from "../types";
import { theme } from "../themes";

interface ImageLightboxDialogProps {
  image: ImageRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightboxDialog: React.FC<ImageLightboxDialogProps> = ({
  image,
  isOpen,
  onClose,
}) => {
  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.imageData;
    link.download = `bloom-ai-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          m: 0,
          p: 0,
          width: "auto",
          maxWidth: "95vw",
          maxHeight: "95vh",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Controls Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            display: "flex",
            gap: 1,
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={handleDownload}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(4px)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
            title="Download Image"
          >
            <DownloadIcon />
          </IconButton>
          <IconButton
            onClick={onClose}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(4px)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
            title="Close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          component="img"
          src={image.imageData}
          alt={image.promptUsed || "Generated image"}
          sx={{
            maxWidth: "100%",
            maxHeight: "85vh",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            border: `1px solid rgba(255,255,255,0.1)`,
          }}
        />

        {image.promptUsed && (
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: "50px",
              px: 3,
              py: 1,
              maxWidth: "80%",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#fff",
                textAlign: "center",
                opacity: 0.9,
                fontWeight: 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {image.promptUsed}
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};
