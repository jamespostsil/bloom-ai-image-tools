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
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          gap: 0,
          backgroundColor: theme.colors.surface,
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          border: `1px solid rgba(255,255,255,0.1)`,
          maxWidth: "95vw",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            flex: "1 1 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            backgroundColor: "#000",
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src={image.imageData}
            alt={image.promptUsed || "Generated image"}
            sx={{
              maxWidth: "100%",
              maxHeight: "80vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </Box>

        {image.promptUsed && (
          <Box
            sx={{
              width: { xs: "100%", md: "525px" },
              flexShrink: 0,
              backgroundColor: theme.colors.surfaceAlt,
              borderLeft: `1px solid ${theme.colors.border}`,
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography
                variant="caption"
                sx={{
                  color: theme.colors.accent,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Generation Prompt
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  onClick={handleDownload}
                  size="small"
                  sx={{ color: theme.colors.textMuted, "&:hover": { color: "#fff" } }}
                  title="Download Image"
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={onClose}
                  size="small"
                  sx={{ color: theme.colors.textMuted, "&:hover": { color: "#fff" } }}
                  title="Close"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
              <Typography
                variant="body1"
                sx={{
                  color: theme.colors.textPrimary,
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  fontSize: "0.95rem",
                }}
              >
                {image.promptUsed}
              </Typography>
            </Box>

            {image.model && (
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.colors.border}` }}>
                <Typography variant="caption" sx={{ color: theme.colors.textMuted }}>
                  AI Model: <Box component="span" sx={{ color: theme.colors.textPrimary, fontWeight: 600 }}>{image.model}</Box>
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Dialog>
  );
};
