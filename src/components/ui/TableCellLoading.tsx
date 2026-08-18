import { TableCell, Skeleton, Box } from "@mui/material";

type Props = Readonly<{
    loading: boolean;
    text?: string ;
    component?: React.ReactNode;
    isAction?: boolean;
}>;

export default function LoadingCell({ loading, text, component, isAction = false }: Props){
    const content = component ?? text;

    if (loading && content) {
        return (
            <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                <Box sx={{ position: "relative", display: "inline-flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ visibility: "hidden", width: "100%", display: "flex", justifyContent: "center" }}>
                        {content}
                    </Box>
                    <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isAction
                            ? <Skeleton variant="circular" width={40} height={40} />
                            : <Skeleton width="70%" height={24} />
                        }
                    </Box>
                </Box>
            </TableCell>
        );
    }

    if (loading) {
        return (
            <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                {isAction
                    ? <Skeleton variant="circular" width={40} height={40} sx={{ mx: "auto" }} />
                    : <Skeleton width="70%" height={24} sx={{ mx: "auto" }} />
                }
            </TableCell>
        );
    }

    return (
        <TableCell align="center" sx={{ verticalAlign: "middle" }}>
            {content}
        </TableCell>
    );
}
