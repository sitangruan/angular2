<!-- Copilot / AI agent instructions for contributors working on this repository -->
# Quick orientation for AI coding agents

This repo is a small Angular v20 single-page app (standalone components, Tailwind CSS). Below are the project-specific facts and examples that make an AI agent productive immediately.

## Big picture
- SPA built with Angular v20 (no NgModules; uses standalone components and ApplicationConfig). See `src/app/app.config.ts` for providers and router bootstrapping.
- Routes are defined declaratively in `src/common/constants.ts` as `routeList` and converted to Angular `Routes` in `src/app/app.routes.ts` using dynamic imports and `loadComponent`.
- Components live under `src/app/` as folders (e.g., `todos`, `posts`, `users`, `photos`, `sidebar`). Each component has `.ts`, `.html`, `.css`, and optional `.spec.ts` tests.

## Key files to reference
- Routing and navigation: `src/common/constants.ts` (the canonical `routeList`), `src/app/app.routes.ts` (maps routeList -> Angular routes).
- App bootstrap and providers: `src/app/app.config.ts` (uses `provideRouter`, `provideZoneChangeDetection`).
- Root component: `src/app/app.ts` and its template `src/app/app.html` (uses `Sidebar` component via `imports: [Sidebar]`).
- Types: `src/modals/NavigationLink.ts` and `src/modals/SortingInfo.ts` show the shapes used in `routeList` and sorting helpers.
- Tests: `.spec.ts` files next to components; Karma + Jasmine configured via `package.json` scripts.

## Routing pattern (important)
- The app uses a single source of truth `routeList` in `src/common/constants.ts`. Each entry contains `componentPath` and `componentName` which are used by `app.routes.ts` to dynamically import the component:

  Example extract (from `src/common/constants.ts`):

  - `{ displayName: "Todos", route: "todos", componentPath: "./todos/todos.ts", componentName: "Todos" }`

  How `app.routes.ts` builds the route:

  - `loadComponent: () => import(route.componentPath).then(m => m[route.componentName])`

Implication: when adding a new route, add a `NavigationLink` entry in `routeList` and add the component file and export with the given name.

## Conventions and patterns specific to this repo
- Standalone components: components declare `imports: [Sidebar]` rather than belonging to modules. Prefer creating small standalone components and include them with `imports` where needed.
- Dynamic component paths in `routeList` are relative to the `src/app` folder (follow existing entries). Keep `componentPath` strings like `"./<folder>/<file>.ts"` and ensure the exported class name matches `componentName`.
- Simple, file-local state: many components are small and self-contained (no global store). Look for `.spec.ts` tests next to implementation files.
- Tailwind is used for styling; the project switched from `less` to plain `css` to avoid version conflicts (see `README.md`).

## Build / test / debug commands (from `package.json`)
- Start dev server (live reload): `ng serve` (or `npm start`).
- Build: `ng build` (or `npm run build`).
- Watch build (dev): `ng build --watch --configuration development` (or `npm run watch`).
- Unit tests: `ng test` (or `npm test`) — Karma + Jasmine.

Notes: Node engine requirement: `>=20.19.0` and Angular CLI `~20.3.x` (see `package.json`).

## Examples / snippets an agent can use
- Add a new route entry (in `src/common/constants.ts`):

  - `{ id: N, displayName: "MyPage", route: "mypage", componentPath: "./mypage/mypage.ts", componentName: "MyPage" }`

  - Create `src/app/mypage/mypage.ts` and export the `MyPage` standalone component.

- Use existing types: import `NavigationLink` from `src/modals/NavigationLink.ts` for structural correctness.

## Tests and CI
- Unit tests run with Karma; look for `.spec.ts` files next to components. Run `npm test` locally to reproduce CI behavior.
- The repo contains an Azure Static Web App workflow in `.github/workflows/` — CI deploys the built `dist/` output to Azure static hosting.

## Common pitfalls seen in the codebase
- Be careful with import paths in `routeList`: they are relative and must point to a file that exports the named component.
- Some components use `templateUrl`/`styleUrl` (note singular) and may rely on file names matching `*.html`/`*.css` in the same folder.
- The project uses `provideZoneChangeDetection({ eventCoalescing: true })` — avoid modifying global change-detection semantics unless necessary.

## Where to change things
- Add routes: update `src/common/constants.ts` + add component folder under `src/app/`.
- Add shared types: `src/modals/`.
- Add small UI pieces: `src/app/sidebar/` or similar component folders.

## If you need more context
- Open `src/app/app.routes.ts`, `src/common/constants.ts`, and `src/app/app.config.ts` — they contain the essential wiring.
- If uncertain about a route or component import path, run `ng serve` and check the browser console — the route loader logs helpful messages.

---
If you want, I can merge this into an existing instructions file (none found) or expand any section (examples, tests, CI) — tell me which section to expand.
