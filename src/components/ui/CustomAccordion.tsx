import * as Icons from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    isExpanded: boolean;
    isDisabled?: boolean;
    title: string;
    iconName: keyof typeof Icons;
    iconColor?: string;
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}>

export default function CustomAccordion({ 
  children, 
  isExpanded, 
  isDisabled = false,
  title,
  iconName,
  iconColor = "primary.main",
  onChange, 
}: Readonly<Props>) {
  const Icon = Icons[iconName];

  return (
    <Accordion
      expanded={isExpanded}
      disabled={isDisabled}
      onChange={onChange}
      sx={{ 
        margin: '0 !important',
        background: "white !important",
        boxShadow: "none !important",
        borderBottom: isExpanded ? 'none' : '1px solid #e0e0e0',
      }}
    >
      <AccordionSummary
        sx={{ 
          pl: '1rem !important',
          cursor: isExpanded ? "default !important" : "pointer !important",
          height: '3.5rem !important',
          '&.Mui-expanded': {
            minHeight: '3.5rem !important'
          },
        }}
        expandIcon={
          !isExpanded && (
            <div className="bg-neutral-200 p-1.5 rounded-full">
              <ExpandMoreIcon className="text-gray-700" />
            </div>
          )
        }
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Icon sx={{ color: iconColor, fontSize: "1.8rem" }} />
          <Typography variant="h6" fontWeight="600" component="h2">
            {title}
          </Typography>
        </Box>
      </AccordionSummary>

      {!isDisabled && (
        <AccordionDetails sx={{ p: 4, m: 0 }}>
          {children}
        </AccordionDetails>
      )}
    </Accordion>
  );
}
