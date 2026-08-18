# Utility Functions Architecture Rules (`solar-componentes`)

Rules and standards for all helper and utility functions inside `solar-componentes/src/utils/`.

## 1. Purity & Reusability
- **Pure Functions**: Utilities should not produce side-effects or mutate inputs in-place.
- **Defensive Programming**: Always handle `null`, `undefined`, and empty string inputs gracefully without throwing uncaught exceptions.
  ```typescript
  export function formatCPF(cpf?: string | null): string {
    if (!cpf) return "";
    // ...
  }
  ```

## 2. Decoupling & Dependencies
- **No Domain DTOs**: Never import domain entities or backend response schemas.
- **Standard Web APIs**: Leverage native ECMAScript/Web APIs (`Intl.NumberFormat`, `Intl.DateTimeFormat`, `FileReader`) over large external libraries when possible.

## 3. Organization & Exports
- Each utility file should have focused responsibility.
- Re-export every public utility through `src/utils/index.ts` and the main library entrypoint `src/index.ts`.
