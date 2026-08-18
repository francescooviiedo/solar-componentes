# Component Architecture Rules (`solar-componentes`)

Rules for designing and maintaining reusable UI components in the `solar-componentes` library.

## Core Principles

1. **Pure UI & Decoupled Architecture**:
   - Components in this library must be pure presentation and interaction units.
   - **Never** import domain DTOs (`@/domain/...`) or application schemas from `solar-frontend`.
   - **Never** perform direct network calls (`fetch`, server actions, axios) or hardcode API endpoints.
   - **Never** access application-specific globals or browser storage (`localStorage.getItem("avisos_peticionamento")`) directly inside library components unless provided through configurable callbacks.

2. **Generics Over Rigid Types**:
   - Use TypeScript generics (`<T extends { id: string | number }>`) for tables, lists, cards, and dropdown selectors so components remain agnostic of specific backend structures.

3. **Event Callbacks & Uncontrolled/Controlled Support**:
   - Provide standard callbacks (`onClick`, `onChange`, `onSelect`, `onSubmit`, `onClose`) so parent applications retain full control over business logic and navigation.

4. **Self-Contained Exports**:
   - Every component must export its props interface (e.g., `export interface ModalProps`).
   - Every public component and type must be re-exported in [`src/index.ts`](file:///home/francesco/Documentos/solar/solar-componentes/src/index.ts).
