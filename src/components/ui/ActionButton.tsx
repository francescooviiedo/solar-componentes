import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type ActionButtonProps<RowType> = Readonly<{
  row: RowType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>, row: RowType) => void;
}>;

export default function ActionButton<RowType>({ row, onClick }: ActionButtonProps<RowType>) {
  return (
    <IconButton
      aria-label="more"
      color="primary"
      onClick={(e) => onClick(e, row)}
    >
      <MoreVertIcon />
    </IconButton>
  );
}
