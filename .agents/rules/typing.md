# Typing Rules (`solar-componentes`)

TypeScript standards for the library components.

## 1. Strict Typing
- **No `any`**: Avoid `any`. Use `unknown`, generic parameters (`<T>`), or proper union types.
- **Props Interface**: Always declare and export a dedicated interface for component props (e.g., `export interface ButtonProps`).
- **Readonly Props**: Use `Readonly<Props>` or `readonly` properties where appropriate.

## 2. Generics & Polymorphic Props
- For data-driven components (lists, tables, autocompletes), enforce generic constraints:
  ```typescript
  export interface TableProps<T extends { id: string | number }> {
    data: T[];
    columns: ColumnConfig<T>[];
  }
  ```
- Export all helper types alongside the component so consumers can type their data cleanly.
