import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type ActionButtonProps<RowType> = Readonly<{
  row: RowType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>, row: RowType) => void;
  color?: string;
}>;

export default function ActionButton<RowType>({ row, onClick, color }: ActionButtonProps<RowType>) {
  return (
    <IconButton
      aria-label="more"
      color={color as any}
      onClick={(e) => onClick(e, row)}
    >
      <MoreVertIcon />
    </IconButton>
  );
}
