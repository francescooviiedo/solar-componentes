import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Skeleton } from "@mui/material";

export type SituacaoCardProps = {
  title: string;
  count: number | string;
  color: string;
  titleColor: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  isPending: boolean;
  isMobile?: boolean;
  countFontSize?: string | number;
  titleFontSize?: string | number;
};

export const SituacaoCard: React.FC<Readonly<SituacaoCardProps>> = ({
  title,
  count,
  color,
  titleColor,
  icon,
  selected,
  onClick,
  isPending,
  isMobile = false,
  countFontSize,
  titleFontSize: customTitleFontSize,
}) => {
  const cardHeight = isMobile ? 100 : 120;
  const cardWidth = isMobile ? 140 : "100%";
  const cardPadding = isMobile ? 0 : "0px";
  const cardMargin = isMobile ? "0 auto" : undefined;
  const cardClassName = isMobile
    ? "flex-1 min-w-[120px] max-w-40 mx-auto"
    : "flex-1 min-w-[200px]";
  const countVariant = isMobile ? "subtitle1" : "h5";
  const textFontSize = isMobile ? 12 : "22px";


  let countContent: React.ReactNode = <Skeleton width={60} height={18} />;
  if (!isPending) {
    countContent = (
      <Typography
        variant={countVariant}
        component="div"
        color={titleColor}
        pb={"10px"}
        sx={{ fontSize: textFontSize }}
      >
        {count}
      </Typography>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: color,
        height: cardHeight,
        width: cardWidth,
        display: "flex",
        p: cardPadding,
        alignItems: "center",
        margin: cardMargin,
        borderRadius: "10px",
        boxShadow: selected ? "0 6px 16px rgba(0, 0, 0, 0.12)" : "none",
        opacity: selected ? 1 : 0.6,
        transform: selected ? "scale(1.03)" : "scale(0.97)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        border: selected ? "none" : "1px solid rgba(0, 0, 0, 0.03)",
        "&:hover": {
          opacity: 0.9,
          transform: selected ? "scale(1.03)" : "scale(0.99)",
        }
      }}
      className={cardClassName}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          minHeight: cardHeight,
          height: "100%",
        }}
      >
        <CardContent
          sx={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              px: 1,
              py: 0.5,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {countContent}
              <Typography
                color={titleColor}
                component="div"
                fontWeight={700}
                sx={{ fontSize: textFontSize }}
              >
                {title}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignSelf: "stretch",
                alignItems: "center",
                justifyContent: "center",
                pl: 1,
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SituacaoCard;
