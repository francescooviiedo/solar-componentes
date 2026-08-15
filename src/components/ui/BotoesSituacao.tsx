"use client";

import React, { useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { TrendingUp } from "@mui/icons-material";

type ButtonType<T> = {
  status: T;
  title: string;
  Icon: React.ElementType;
  color: string;
};

type Props<TPayload, TStatus> = {
  count: number;
  setPayload: React.Dispatch<React.SetStateAction<TPayload>>;
  loading: boolean;
  payload: TPayload;
  inicial: TStatus;
  buttons: ButtonType<TStatus>[];
  defaultTitle?: string;
  defaultSubtitle?: string;
  defaultPayload?: Partial<TPayload>;
  title?: string;
  subtitle?: string;
  isFullWidth?: boolean;
};

function getTitleVariant(isMobile: boolean, isFullWidth: boolean) {
  if (isMobile) {
    return "subtitle1" as const;
  }
  if (isFullWidth) {
    return "h4" as const;
  }
  return "h5" as const;
}

function getIconSize(isMobile: boolean, isFullWidth: boolean) {
  if (isMobile) {
    return 18;
  }
  if (isFullWidth) {
    return 30;
  }
  return 25;
}

function getDesktopWidth(isMobile: boolean, isFullWidth: boolean) {
  if (isMobile || isFullWidth) {
    return "100%";
  }
  return 830;
}

function getDesktopMinWidth(isMobile: boolean, isFullWidth: boolean) {
  if (isMobile || isFullWidth) {
    return "auto";
  }
  return 770;
}

function getDisplayTitle(title?: string, defaultTitle?: string) {
  return title || defaultTitle || "";
}

function getDisplaySubtitle(
  subtitle?: string,
  selectedTitle?: string,
  defaultSubtitle?: string,
) {
  return subtitle || selectedTitle || defaultSubtitle || "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPagePayload(defaultPayload?: any) {
  return defaultPayload || {};
}

function getLayoutValues(isMobile: boolean) {
  if (isMobile) {
    return {
      containerMaxHeight: "auto",
      containerBorder: "none",
      containerBottomBorder: "1px solid rgba(0, 0, 0, 0.06)",
      headerAlignItems: "flex-start",
      headerDirection: "column",
      headerGap: 2,
      titleGap: 1.5,
      actionsGap: 1.5,
      actionsWidth: "100%",
      actionsJustify: "space-between",
    } as const;
  }

  return {
    containerMaxHeight: 500,
    containerBorder: "1px solid rgba(0, 0, 0, 0.06)",
    containerBottomBorder: "none",
    headerAlignItems: "center",
    headerDirection: "row",
    headerGap: 0,
    titleGap: 2,
    actionsGap: 2,
    actionsWidth: "auto",
    actionsJustify: "flex-end",
  } as const;
}

type DesktopCountBadgeProps = {
  loading: boolean;
  count: number;
  isFullWidth: boolean;
  selectedColor: string;
};

function DesktopCountBadge({
  loading,
  count,
  isFullWidth,
  selectedColor,
}: Readonly<DesktopCountBadgeProps>) {
  return (
    <Box
      sx={{
        px: 2.5,
        p: 1.2,
        borderRadius: 20,
        bgcolor: `${selectedColor}20`,
        border: `1px solid ${selectedColor}35`,
        display: "flex",
        alignItems: "center",
        gap: 1,
        transition: "all 0.25s",
      }}
    >
      {loading ? (
        <Skeleton width={40} height={24} sx={{ borderRadius: 20 }} />
      ) : (
        <>
          <TrendingUp
            sx={{
              fontSize: 16,
              color: selectedColor,
              opacity: 0.8,
            }}
          />
          <Typography
            variant="subtitle2"
            fontWeight="700"
            fontSize={isFullWidth ? 17 : 14}
            color={selectedColor}
          >
            {count}
          </Typography>
        </>
      )}
    </Box>
  );
}

type MobileCountBadgeProps = {
  loading: boolean;
  count: number;
};

function MobileCountBadge({ loading, count }: Readonly<MobileCountBadgeProps>) {
  return (
    <Box
      sx={{
        px: 2,
        p: 0.8,
        borderRadius: 20,
        bgcolor: "rgba(25, 118, 210, 0.06)",
        border: "1px solid rgba(25, 118, 210, 0.15)",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {loading ? (
        <Skeleton width={40} height={24} sx={{ borderRadius: 20 }} />
      ) : (
        <>
          <TrendingUp sx={{ fontSize: 14, color: "#1976d2", opacity: 0.8 }} />
          <Typography variant="caption" fontWeight="600" color="#1976d2">
            {count}
          </Typography>
        </>
      )}
    </Box>
  );
}

type ActionButtonsProps<TStatus> = {
  buttons: ButtonType<TStatus>[];
  selected: TStatus;
  isFullWidth: boolean;
  isMobile: boolean;
  iconSize: number;
  onCardSelection: (situacao: TStatus) => void;
};

function ActionButtons<TStatus>({
  buttons,
  selected,
  isFullWidth,
  isMobile,
  iconSize,
  onCardSelection,
}: Readonly<ActionButtonsProps<TStatus>>) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: isMobile ? 0.5 : 1,
      }}
    >
      {buttons.map((b) => (
        <Tooltip key={b.title} title={b.title}>
          <IconButton
            onClick={() => onCardSelection(b.status)}
            sx={{
              width: isFullWidth ? 36 : 40,
              height: isFullWidth ? 36 : 40,
              borderRadius: 2,
              bgcolor: selected === b.status ? `${b.color}15` : "transparent",
              border:
                selected === b.status
                  ? `1px solid ${b.color}30`
                  : "1px solid transparent",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: `${b.color}08`,
                border: `1px solid ${b.color}20`,
              },
            }}
          >
            <b.Icon
              sx={{
                color: b.color,
                opacity: selected === b.status ? 1 : 0.5,
                transition: "color 0.2s, opacity 0.2s",
                fontSize: iconSize,
              }}
            />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}

export default function BotoesSituacao<TPayload, TStatus>({
  loading,
  count,
  setPayload,
  payload,
  inicial,
  buttons,
  title,
  subtitle,
  defaultTitle,
  defaultSubtitle,
  defaultPayload,
  isFullWidth = false,
}: Readonly<Props<TPayload, TStatus>>) {
  const [selected, setSelected] = useState<TStatus>(inicial);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const titleVariant = getTitleVariant(isMobile, isFullWidth);
  const iconSize = getIconSize(isMobile, isFullWidth);
  const desktopWidth = getDesktopWidth(isMobile, isFullWidth);
  const desktopMinWidth = getDesktopMinWidth(isMobile, isFullWidth);
  const headerPadding = isMobile ? 2 : "24px";
  const layoutValues = getLayoutValues(isMobile);

  const displayTitle = getDisplayTitle(title, defaultTitle);
  const selectedButton = buttons.find((b) => b.status === selected);
  const displaySubtitle = getDisplaySubtitle(
    subtitle,
    selectedButton?.title,
    defaultSubtitle,
  );

  function onCardSelection(situacao: TStatus) {
    setSelected(situacao);
    const pagePayload = getPagePayload(defaultPayload);
    const newPayload = {
      ...payload,
      situacao: String(situacao),
      ...pagePayload,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPayload(newPayload as any);
  }

  const subtitleFontSize = isFullWidth ? 16 : 14;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: layoutValues.containerMaxHeight,
        width: "100%",
        maxWidth: desktopWidth,
        minWidth: desktopMinWidth,
        overflow: "hidden",
        border: layoutValues.containerBorder,
        borderBottom: layoutValues.containerBottomBorder,
      }}
    >
      <Box
        sx={{
          p: headerPadding,
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: layoutValues.headerAlignItems,
            justifyContent: "space-between",
            flexDirection: layoutValues.headerDirection,
            gap: layoutValues.headerGap,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: layoutValues.titleGap,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant={titleVariant}
                  fontWeight="700"
                  color="text.primary"
                  mr="24px"
                >
                  {displayTitle}
                </Typography>
                {!isMobile && (
                  <DesktopCountBadge
                    loading={loading}
                    count={count}
                    isFullWidth={isFullWidth}
                    selectedColor={selectedButton?.color ?? "primary.main"}
                  />
                )}
              </Box>

              {!isMobile && (
                <Chip
                  label={displaySubtitle}
                  size="small"
                  sx={{
                    mt: "10px",
                    p: '12px',
                    height: 30,
                    fontSize: subtitleFontSize,
                    fontWeight: 600,
                    letterSpacing: 0.3,
                    bgcolor: selectedButton
                      ? `${selectedButton.color}14`
                      : "rgba(0,0,0,0.05)",
                    color: selectedButton
                      ? selectedButton.color
                      : "text.secondary",
                    border: `1px solid ${selectedButton
                        ? `${selectedButton.color}35`
                        : "rgba(0,0,0,0.1)"
                      }`,
                    "& .MuiChip-label": { px: 1 },
                    transition: "all 0.25s",
                  }}
                />
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: layoutValues.actionsGap,
              width: layoutValues.actionsWidth,
              justifyContent: layoutValues.actionsJustify,
            }}
          >
            {isMobile && <MobileCountBadge loading={loading} count={count} />}

            <ActionButtons
              buttons={buttons}
              selected={selected}
              isFullWidth={isFullWidth}
              isMobile={isMobile}
              iconSize={iconSize}
              onCardSelection={onCardSelection}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
