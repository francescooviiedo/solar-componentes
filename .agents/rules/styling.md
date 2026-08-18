# Styling Rules (`solar-componentes`)

Visual and layout standards for `solar-componentes`.

## 1. Material-UI (MUI) Integration
- **Components**: Use Material-UI (MUI v7) components and `@mui/icons-material`.
- **Styling**: Prefer the `sx` prop for custom styles:
  ```tsx
  sx={{ p: 2, borderRadius: 2, display: "flex", gap: 1 }}
  ```
- **Avoid Tailwind**: Do NOT include Tailwind utility classes in library components to prevent CSS collisions in consuming apps.

## 2. Responsiveness
- Ensure components render smoothly across breakpoints: `xs` (mobile), `sm` (small tablet), `md` (tablet/small desktop), `lg` (desktop).
- Use responsive object syntax with `sx`:
  ```tsx
  sx={{
    width: { xs: "100%", sm: "auto" },
    maxWidth: { xs: "100%", md: 650 },
  }}
  ```
