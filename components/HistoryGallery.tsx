import React, { useMemo, useState } from "react";
import {
    Box,
    Typography,
    Slider,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
    styled,
} from "@mui/material";
import { ImageRecord } from "../types";
import { ImageSlot } from "./ImageSlot";
import { theme } from "../themes";
import { Icon, Icons } from "./Icons";

interface HistoryGalleryProps {
    history: ImageRecord[];
    onToggleStar: (id: string) => void;
    onRemove: (id: string) => void;
    onSelect: (id: string) => void;
}

const StyledFormControl = styled(FormControl)(({ theme: muiTheme }) => ({
    '& .MuiInputLabel-root': {
        color: theme.colors.textMuted,
    },
    '& .MuiOutlinedInput-root': {
        color: theme.colors.textPrimary,
        '& fieldset': {
            borderColor: theme.colors.border,
        },
        '&:hover fieldset': {
            borderColor: theme.colors.accent,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.colors.accent,
        },
    },
    '& .MuiSelect-icon': {
        color: theme.colors.textMuted,
    },
}));

export const HistoryGallery: React.FC<HistoryGalleryProps> = ({
    history,
    onToggleStar,
    onRemove,
    onSelect,
}) => {
    const [modelFilter, setModelFilter] = useState<string>("all");
    const [ethnicityFilter, setEthnicityFilter] = useState<string>("all");
    const [imageSize, setImageSize] = useState<number>(240);

    const filteredHistory = useMemo(() => {
        // History is newest first in state usually, but let's ensure it here
        const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

        return sortedHistory.filter((item) => {
            // Basic filtering
            const matchesModel = modelFilter === "all" || item.model === modelFilter;

            // Ethnicity parameter extraction
            const ethnicity = item.parameters?.ethnicity;
            const matchesEthnicity =
                ethnicityFilter === "all" || ethnicity === ethnicityFilter;

            return matchesModel && matchesEthnicity;
        });
    }, [history, modelFilter, ethnicityFilter]);

    const uniqueModels = useMemo(() => {
        const models = new Set<string>();
        history.forEach((item) => {
            if (item.model) models.add(item.model);
        });
        return Array.from(models).sort();
    }, [history]);

    const uniqueEthnicities = useMemo(() => {
        const ethnicities = new Set<string>();
        history.forEach((item) => {
            const ethnicity = item.parameters?.ethnicity;
            if (ethnicity) ethnicities.add(ethnicity);
        });
        return Array.from(ethnicities).sort();
    }, [history]);

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                bgcolor: theme.colors.appBackground,
                p: { xs: 2, md: 4 }
            }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                alignItems="center"
                sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: "20px",
                    bgcolor: theme.colors.surface,
                    boxShadow: theme.colors.panelShadow,
                    border: `1px solid ${theme.colors.border}`,
                    width: "100%",
                }}
            >
                <StyledFormControl size="small" sx={{ minWidth: { xs: "100%", sm: 200 } }}>
                    <InputLabel id="model-filter-label">AI Model</InputLabel>
                    <Select
                        labelId="model-filter-label"
                        value={modelFilter}
                        label="AI Model"
                        onChange={(e) => setModelFilter(e.target.value)}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: theme.colors.surfaceRaised,
                                    color: theme.colors.textPrimary,
                                    border: `1px solid ${theme.colors.border}`,
                                }
                            }
                        }}
                    >
                        <MenuItem value="all">All Models</MenuItem>
                        {uniqueModels.map((m) => (
                            <MenuItem key={m} value={m}>
                                {m}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>

                <StyledFormControl size="small" sx={{ minWidth: { xs: "100%", sm: 200 } }}>
                    <InputLabel id="ethnicity-filter-label">Ethnicity</InputLabel>
                    <Select
                        labelId="ethnicity-filter-label"
                        value={ethnicityFilter}
                        label="Ethnicity"
                        onChange={(e) => setEthnicityFilter(e.target.value)}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: theme.colors.surfaceRaised,
                                    color: theme.colors.textPrimary,
                                    border: `1px solid ${theme.colors.border}`,
                                }
                            }
                        }}
                    >
                        <MenuItem value="all">All Ethnicities</MenuItem>
                        {uniqueEthnicities.map((e) => (
                            <MenuItem key={e} value={e}>
                                {e}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>

                <Box sx={{ flex: 1, px: 2, width: "100%" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="caption" sx={{ color: theme.colors.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Resize Thumbnails
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.colors.accent, fontWeight: 700 }}>
                            {imageSize}px
                        </Typography>
                    </Stack>
                    <Slider
                        value={imageSize}
                        min={120}
                        max={600}
                        step={10}
                        onChange={(_, value) => setImageSize(value as number)}
                        sx={{
                            color: theme.colors.accent,
                            '& .MuiSlider-thumb': {
                                width: 16,
                                height: 16,
                                backgroundColor: '#fff',
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: `0px 0px 0px 8px ${theme.colors.accentSubtle}`,
                                },
                            },
                            '& .MuiSlider-rail': {
                                opacity: 0.3,
                                backgroundColor: theme.colors.border,
                            }
                        }}
                    />
                </Box>

                <Box sx={{ textAlign: { xs: "center", sm: "right" }, minWidth: 100 }}>
                    <Typography variant="h6" sx={{ color: theme.colors.textPrimary, fontWeight: 700, lineHeight: 1 }}>
                        {filteredHistory.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.colors.textMuted, fontWeight: 500 }}>
                        Matches
                    </Typography>
                </Box>
            </Stack>

            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    pr: 1,
                    pb: 8,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: theme.colors.border,
                        borderRadius: '10px',
                        '&:hover': {
                            background: theme.colors.textMuted,
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: `repeat(auto-fill, minmax(${imageSize}px, 1fr))`,
                        gap: 3,
                        justifyItems: "center",
                    }}
                >
                    {filteredHistory.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                width: imageSize,
                                height: imageSize,
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: theme.colors.panelShadow,
                                border: `1px solid ${theme.colors.border}`,
                                transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                                position: "relative",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: theme.colors.accentShadow,
                                    borderColor: theme.colors.accent,
                                },
                            }}
                        >
                            <ImageSlot
                                variant="tile"
                                image={item}
                                starState={{
                                    isStarred: !!item.isStarred,
                                    onToggle: () => onToggleStar(item.id),
                                }}
                                onRemove={() => onRemove(item.id)}
                                onClick={() => onSelect(item.id)}
                                controls={{
                                    download: true,
                                    copy: true,
                                    remove: true,
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                {filteredHistory.length === 0 && (
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            py: 12,
                            opacity: 0.6,
                        }}
                    >
                        <Box sx={{
                            p: 3,
                            borderRadius: "50%",
                            bgcolor: theme.colors.surface,
                            mb: 2,
                            border: `1px solid ${theme.colors.border}`
                        }}>
                            <Icon path={Icons.History} width={48} height={48} color={theme.colors.textMuted} />
                        </Box>
                        <Typography variant="h5" sx={{ color: theme.colors.textPrimary, fontWeight: 600, mb: 1 }}>
                            No images found
                        </Typography>
                        <Typography sx={{ color: theme.colors.textMuted }}>
                            Try adjusting your filters to find what you're looking for.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
