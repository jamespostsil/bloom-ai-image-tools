import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { theme } from "../themes";

export interface ImageSlotOverlayStarProps {
  isVisible: boolean;
  isStarred: boolean;
  onToggle: () => void;
  isHovered: boolean;
  disabled: boolean;
  cornerOffset: number;
  buttonPadding: number;
}

export const ImageSlotOverlayStar: React.FC<ImageSlotOverlayStarProps> = ({
  isVisible,
  isStarred,
  onToggle,
  isHovered,
  disabled,
  cornerOffset,
  buttonPadding,
}) => {
  const [isInternalHover, setIsInternalHover] = React.useState(false);

  if (!isVisible) return null;

  const showBackground = isStarred ? isInternalHover : true;
  const currentBg = isStarred
    ? isInternalHover
      ? theme.colors.overlaySoft
      : "transparent"
    : isInternalHover
      ? theme.colors.overlayStrong
      : theme.colors.overlay;

  return (
    <button
      type="button"
      onMouseEnter={() => setIsInternalHover(true)}
      onMouseLeave={() => setIsInternalHover(false)}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      aria-pressed={isStarred}
      title={isStarred ? "Unstar image" : "Star image"}
      style={{
        position: "absolute",
        top: cornerOffset,
        left: cornerOffset,
        padding: isStarred ? 3 : buttonPadding,
        borderRadius: isStarred ? 0 : 999,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: currentBg,
        color: isStarred ? theme.colors.accent : theme.colors.textPrimary,
        opacity: isStarred ? 1 : isHovered ? 1 : 0,
        transition:
          "opacity 120ms ease, background-color 140ms ease, color 120ms ease, transform 70ms ease",
        boxShadow: isInternalHover ? theme.colors.panelShadow : "none",
        backdropFilter: showBackground ? "blur(8px)" : "none",
        zIndex: 25,
        pointerEvents: disabled || (!isStarred && !isHovered) ? "none" : "auto",
        cursor: "pointer",
        transform: isInternalHover ? "scale(1.05)" : "scale(1)",
      }}
    >
      {isStarred ? (
        <StarIcon
          sx={{
            fontSize: 18,
            filter: isInternalHover
              ? "none"
              : `drop-shadow(${theme.colors.panelShadow})`,
            transition: "filter 120ms ease",
          }}
        />
      ) : (
        <StarBorderIcon sx={{ fontSize: 16 }} />
      )}
    </button>
  );
};
