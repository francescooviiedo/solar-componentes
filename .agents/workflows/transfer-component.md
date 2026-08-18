---
description: Step-by-step workflow to decouple and migrate UI components from solar-frontend into the solar-componentes library.
---

# Transfer Component from Main Project to `solar-componentes`

This workflow provides a standardized procedure for extracting components from `solar-frontend` (or any consuming app) and migrating them into the `solar-componentes` library.

---

## 1. Component Audit & Decoupling Analysis

Before copying the component, analyze its dependencies to ensure it is 100% reusable and decoupled:

1. **Domain DTOs & Schemas**:
   - Identify any imports from `@/domain/...` or `@/infrastructure/schemas/...`.
   - **Action**: Replace domain-specific interfaces with generic TypeScript interfaces or generic parameters (e.g., `<T extends { id: string | number }>` or localized `types.ts`).
2. **Next.js & Routing Hooks**:
   - Identify uses of `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`), `next/link`, or Next.js server actions.
   - **Action**: Replace navigation logic with callback props (e.g., `onNavigate`, `onSelect`, `onChange`) or accept a generic `LinkComponent`.
3. **API & Data Fetching**:
   - Identify direct API calls (`fetch`, server actions, axios, localStorage).
   - **Action**: Lift data fetching out of the component. The component should receive data, loading state, and action callbacks via props.
4. **Hardcoded Text & Colors**:
   - Make status labels, custom badge colors, or specific judicial/system names configurable via props with sensible defaults.

---

## 2. Scaffold in `solar-componentes`

1. **Locate or Create Directory**:
   - General UI atoms/molecules: `src/components/ui/[ComponentName].tsx`
   - Feature/Composite modules (e.g., filter bars): `src/components/[ModuleName]/[ComponentName].tsx`
   - Accompanying types: Place in `src/types/[typesFile].ts` or directly in the component file if tightly coupled.
2. **Component File Template**:
   ```tsx
   import React from "react";
   import { Box, Typography } from "@mui/material";

   export interface MyComponentProps<T> {
     title: string;
     items: T[];
     onSelect?: (item: T) => void;
     isLoading?: boolean;
   }

   export function MyComponent<T extends { id: string | number }>({
     title,
     items,
     onSelect,
     isLoading = false,
   }: Readonly<MyComponentProps<T>>) {
     return (
       <Box>
         <Typography variant="h6">{title}</Typography>
         {/* UI Implementation */}
       </Box>
     );
   }

   export default MyComponent;
   ```

---

## 3. Register & Export in `src/index.ts`

Open [`src/index.ts`](file:///home/francesco/Documentos/solar/solar-componentes/src/index.ts) and export the new component and its associated types:

```typescript
// Component & Types
export { MyComponent, default as MyComponent } from './components/ui/MyComponent';
export type { MyComponentProps } from './components/ui/MyComponent';
```

---

## 4. Build and Package

Verify that the component compiles cleanly without type errors and package the new version:

1. **Bump Version in `package.json`**:
   - Increment patch version in `package.json` (e.g., `0.1.14` -> `0.1.15`).
2. **Build Library**:
   ```bash
   bun run build
   # or
   npm run build
   ```
   *Validates TypeScript compilation, generates CJS/ESM bundles in `dist/`, and generates `.d.ts` type declarations.*
3. **Pack Tarball**:
   ```bash
   npm pack
   ```

---

## 5. Update Consumer (`solar-frontend`)

> [!IMPORTANT]
> Whenever a component is transferred to `solar-componentes`, it **MUST be completely removed** from `solar-frontend` and all references across the entire codebase updated to import from `"solar-componentes"`.

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
   Search across the entire `solar-frontend` codebase for any import of the old local component path and replace with `"solar-componentes"`:
   ```tsx
   // ❌ Old
   import MyComponent from "@/components/ui/MyComponent";
   import { MyComponentProps } from "@/components/ui/MyComponent";

   // ✅ New
   import { MyComponent } from "solar-componentes";
   import type { MyComponentProps } from "solar-componentes";
   ```
4. **Delete the Original File(s) in `solar-frontend`**:
   Permanently delete the transferred component file and any local type definitions from `solar-frontend` to eliminate duplicate code and prevent drift:
   ```bash
   rm /path/to/solar-frontend/src/components/.../MyComponent.tsx
   ```
5. **Clean Up Obsolete Tests in `solar-frontend`**:
   - Locate any unit/component tests in `solar-frontend/test/` that were testing the deleted local component.
   - Either migrate those test cases to `solar-componentes` or **permanently delete the obsolete test files/blocks** from `solar-frontend` to prevent broken tests or dead test suites:
   ```bash
   rm /path/to/solar-frontend/test/components/.../MyComponent.test.tsx
   ```

---

## 6. Verification Checklist

- [ ] Component compiles cleanly without type errors in `solar-componentes` (`bun run build`).
- [ ] No domain DTOs, server actions, or hardcoded routes in `solar-componentes`.
- [ ] Exported properly from `solar-componentes/src/index.ts`.
- [ ] **Original component file completely deleted from `solar-frontend`**.
- [ ] **All imports across `solar-frontend` updated to `"solar-componentes"`**.
- [ ] **Obsolete local test files completely removed or updated in `solar-frontend`**.
- [ ] `npm run type-check` (or `npx tsc --noEmit`) passes cleanly in `solar-frontend`.
- [ ] Automated tests in `solar-frontend` pass cleanly (`npm test`).
