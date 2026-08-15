import { Button, ButtonProps } from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import { ReactNode } from "react";

type CreateButtonProps = ButtonProps & {
  href: string;
  label: string;
  icon?: ReactNode;
};

export function CreateButton({
  href,
  label,
  icon = <Add />,
  variant = "contained",
  color = "primary",
  sx,
  ...props
}: Readonly<CreateButtonProps>) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Button
        variant={variant}
        color={color}
        startIcon={icon}
        sx={{ borderRadius: 2, ...sx }}
        {...props}
      >
        {label}
      </Button>
    </Link>
  );
}
