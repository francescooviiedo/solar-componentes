import { TableCell, Skeleton } from "@mui/material";

type Props = Readonly<{
    loading: boolean;
    text?: string ;
    component?: React.ReactNode;
    isAction?: boolean;
}>;

export default function LoadingCell({ loading, text, component, isAction = false }: Props){
    let cellContent: React.ReactNode;
    if (loading) {
        cellContent = isAction
            ? <Skeleton variant="circular" width={40} height={40} />
            : <Skeleton width="70%" height={24} />;
    } else {
        cellContent = component ?? text;
    }

    return(
        <TableCell align="center" sx={{ verticalAlign: "middle" }}>
            {cellContent}
        </TableCell>
    )
}
