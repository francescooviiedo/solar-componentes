import { Box, Typography } from "@mui/material";

type CardItem = {
  key?: string;
  label: string;
  value: string | null | undefined;
  isBoldValue?: boolean;
  color?: string;
  isHeader?: boolean;
};

type Props = {
  items: CardItem[];
};

export function GenericMobileCard({ items }: Readonly<Props>) {
  const keyOccurrences = new Map<string, number>();

  const getItemKey = (item: CardItem) => {
    if (item.key) {
      return item.key;
    }

    const baseKey = `${item.label}::${item.value ?? ''}::${item.isHeader ? 'header' : 'content'}::${item.color ?? ''}::${item.isBoldValue ? 'bold' : 'regular'}`;
    const nextCount = (keyOccurrences.get(baseKey) ?? 0) + 1;
    keyOccurrences.set(baseKey, nextCount);

    return nextCount === 1 ? baseKey : `${baseKey}::${nextCount}`;
  };

  return (
    <Box>
      {items.map((item) => (
        <Typography
          key={getItemKey(item)}
          sx={{
            fontSize: item.isHeader ? "0.9rem" : "0.85rem",
            fontWeight: item.isHeader ? 600 : 400,
            color: item.color || "text.primary",
            m: 1,
          }}
        >
          <span style={{ fontWeight: "bold" }}>{item.label}: </span>
          <Box
            component="span"
            sx={{
              fontWeight: item.isBoldValue ? "bold" : "inherit",
            }}
          >
            {item.value}
          </Box>
        </Typography>
      ))}
    </Box>
  );
}
