import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Fade,
  Backdrop,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { ImageRecord } from "../types";
import { theme } from "../themes";

interface ComparisonLightboxDialogProps {
  imageLeft: ImageRecord | null;
  imageRight: ImageRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonLightboxDialog: React.FC<ComparisonLightboxDialogProps> = ({
  imageLeft,
  imageRight,
  isOpen,
  onClose,
}) => {
  if (!imageLeft || !imageRight) return null;

  const handleDownload = (image: ImageRecord) => {
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
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(12px)",
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
          maxWidth: "100vw",
          maxHeight: "100vh",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          backgroundColor: "#000",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          width: "98vw",
          height: "95vh",
          p: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Box
          sx={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontWeight: 700, letterSpacing: -0.5 }}
          >
            Side-by-Side Comparison
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => handleDownload(imageLeft)}
                size="small"
                sx={{ color: "rgba(255,255,255,0.6)", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
                title="Download Left Image"
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => handleDownload(imageRight)}
                size="small"
                sx={{ color: "rgba(255,255,255,0.6)", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
                title="Download Right Image"
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Stack>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{ color: "rgba(255,255,255,0.6)", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
              title="Close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Comparison Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            gap: 2,
            minHeight: 0,
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.03)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={imageLeft.imageData}
                alt="Source Image"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  bgcolor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Source
              </Box>
            </Box>
          </Box>

          {/* Right Panel */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255,255,255,0.03)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={imageRight.imageData}
                alt="Result Image"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  bgcolor: theme.colors.accent,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "6px",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                Result
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
