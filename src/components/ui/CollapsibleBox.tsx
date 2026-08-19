import { ReactNode } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from '@mui/icons-material/Add';
type Props = Readonly<{
  title: string;
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
  children: ReactNode;
  height?: string;
  maxWidth?: string;
  marginTop?: number | string;
  hidden?: boolean;
  collapseOnDesktop?: boolean;
  isSelected?: boolean;
  hasButton?: boolean;
  actionTitle?: string;
  onButtonClick?: () => void;
}>;

export default function CollapsibleBox({
  title,
  isCollapsed,
  onToggleCollapse,
  children,
  height = "100%",
  maxWidth = "100%",
  marginTop = 0,
  hidden = false,
  collapseOnDesktop = false,
  isSelected = true,
  hasButton = false,
  actionTitle = "",
  onButtonClick
}: Props) {
  const isMobileOrTablet = useMediaQuery("(max-width:900px)");
  const isCollapsible = isMobileOrTablet || collapseOnDesktop;

  return (
    <Box hidden={hidden}>
      <Box
        onClick={() => isCollapsible && onToggleCollapse(!isCollapsed)}
        sx={{
          px: '24px', // 24px
          height: '45px', // Altura fixa do header
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: isCollapsed ? '4px' : 0,
          borderBottomLeftRadius: isCollapsed ? '4px' : 0,
          bgcolor: "#ECECEC", // Cor do header
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsible ? "center" : "flex-start",
          mt: marginTop,
          cursor: isCollapsible ? "pointer" : "default",
        }}
      >

        <Typography
          sx={{
            flexGrow: 1,
            color: "#757575", // Cor fonte
            fontWeight: 700, // Bold
            fontSize: "16px"
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            borderRadius: "50%",
            bgcolor: 'error.main',
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "white",
            mr: 1,
          }}
          hidden={isSelected}
        >
          1
        </Box>
        <Tooltip title={actionTitle} placement="bottom" hidden={!hasButton}>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              onButtonClick?.();
            }}
            hidden={!hasButton}
          >
            <AddIcon color="primary" />
          </IconButton>
        </Tooltip>
        {isCollapsible && (
          <IconButton size="small">
            {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        )}
      </Box>
      <Collapse in={!isCollapsed || !isCollapsible}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height,
            maxWidth,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            border: "1px solid lightgray",
            borderTop: "none",
          }}
        >
          <Box sx={{ p: '24px', display: "flex", flexDirection: "column", alignItems: 'stretch', gap: '24px' }}>
            {children}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
