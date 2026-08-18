---
description: Step-by-step workflow to decouple and migrate utility/helper functions from solar-frontend into the solar-componentes library.
---

# Transfer Utility Functions to `solar-componentes`

This workflow defines the process for transferring pure helper functions, formatters, string manipulators, and array utilities into the `solar-componentes` library.

---

## 1. Audit & Decoupling Checklist

Ensure the utility meets the library criteria:
- [ ] **Pure & Deterministic**: Output depends strictly on input arguments (e.g., date formatters, currency formatters, regex masks).
- [ ] **No Domain Coupling**: Does not import `@/domain/...` or backend-specific DTOs.
- [ ] **No Secrets / Env Dependencies**: Does not rely on private environment variables or server-side auth cookies.
- [ ] **TypeScript Types**: All parameters and return values are explicitly typed.

---

## 2. Scaffold in `solar-componentes/src/utils/`

1. **File Placement**:
   - Create or place the function in `src/utils/[utilName].ts` or group related helpers into modules:
     - `formatters.ts` / `formatDate.ts` / `formatCurrency.ts` / `formatDocument.ts`
     - `stringUtils.ts` / `arrayUtils.ts`
2. **Template**:
   ```typescript
   /**
    * Formats a raw number or string into a Brazilian currency representation.
    * @example formatCurrency(1234.56) -> "R$ 1.234,56"
    */
   export function formatCurrency(value: number): string {
     return new Intl.NumberFormat("pt-BR", {
       style: "currency",
       currency: "BRL",
       minimumFractionDigits: 2,
       maximumFractionDigits: 2,
     }).format(value);
   }
   ```

---

## 3. Centralize & Export

1. **Export in `src/utils/index.ts`**:
   ```typescript
   export * from "./formatCurrency";
   export * from "./formatDate";
   export * from "./formatNumber";
   export * from "./formatDocument";
   export * from "./formatProcessNumber";
   export * from "./formatarNome";
   export * from "./formatarHorario";
   export * from "./stringUtils";
   export * from "./arrayUtils";
   ```

2. **Re-export in Library Root (`src/index.ts`)**:
   ```typescript
   // Utilities
   export * from "./utils";
   ```

---

## 4. Build and Pack

1. **Bump Version in `package.json`**:
   - Increment patch version (e.g. `0.1.14` -> `0.1.15`).
2. **Build the library**:
   ```bash
   bun run build
   # or
   npm run build
   ```
3. **Pack**:
   ```bash
   npm pack
   ```

---

## 5. Update Consumer (`solar-frontend`)

> [!IMPORTANT]
> Whenever a utility function is transferred to `solar-componentes`, it **MUST be completely removed** from `solar-frontend` and all imports across the entire codebase updated to import from `"solar-componentes"`.

1. **Update `package.json` in `solar-frontend`**:
   Point to the newly generated `.tgz` file:
   ```json
   "solar-componentes": "file:../solar-componentes/solar-componentes-0.1.15.tgz"
   ```
2. **Install/Link Dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```
3. **Global Search and Replace Imports in `solar-frontend`**:
   Search across the entire `solar-frontend` codebase for any import of the old local util path and replace with `"solar-componentes"`:
   ```typescript
   // ❌ Old
   import { formatCurrency } from "@/infrastructure/utils/formatCurrency";

   // ✅ New
   import { formatCurrency } from "solar-componentes";
   ```
4. **Delete the Original File(s) in `solar-frontend`**:
   Permanently delete the transferred utility file from `solar-frontend` to eliminate duplicate code and prevent drift:
   ```bash
   rm /path/to/solar-frontend/src/infrastructure/utils/formatCurrency.ts
   ```
5. **Clean Up Obsolete Tests in `solar-frontend`**:
   - Locate test files or test suites in `solar-frontend/test/infrastructure/utils/` testing the old local functions.
   - Either migrate those test cases to `solar-componentes` or **permanently remove the deleted utility tests** from `solar-frontend` to ensure the test suite remains clean with no broken imports:
   ```bash
   # Example: remove or update test file
   rm /path/to/solar-frontend/test/infrastructure/utils/formatCurrency.test.ts
   ```

---

## 6. Verification Checklist

- [ ] Utility compiles cleanly without type errors in `solar-componentes` (`bun run build`).
- [ ] Exported properly from `solar-componentes/src/utils/index.ts` and `solar-componentes/src/index.ts`.
- [ ] **Original utility file completely deleted from `solar-frontend`**.
- [ ] **All imports across `solar-frontend` updated to `"solar-componentes"`**.
- [ ] **Obsolete local test files/blocks removed or updated in `solar-frontend`**.
- [ ] `npm run type-check` (or `npx tsc --noEmit`) passes cleanly in `solar-frontend`.
- [ ] Automated tests in `solar-frontend` pass cleanly (`npm test`).
