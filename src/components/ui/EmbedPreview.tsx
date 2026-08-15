import { Box } from "@mui/material";

type EmbedPreviewProps = {
    url?: string | null;
};


export default function EmbedPreview({ url }: Readonly<EmbedPreviewProps>) {
    if (!url) {
        return null;
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: { xs: 500, md: 800 },
                border: '1px solid #e0e0e0',
                borderTop: 'none',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                overflow: 'hidden'
            }}
        >
            <Box
                component="iframe"
                src={url}
                title="Pré-visualização incorporada"
                sx={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                }}
                allow="clipboard-read; clipboard-write"
            />
        </Box>
    );
}