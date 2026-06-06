# FakeS-redux

Small demo e-commerce frontend built with React, Vite, Tailwind CSS, Redux Toolkit and React Query.

## Purpose

- Demonstrates fetching product data from the Fake Store API and basic cart management.

## Main Features

- Product listing with category filtering (React Query)
- Product cards with image fallback and add-to-cart
- Cart management with Redux Toolkit and sessionStorage persistence
- Responsive layout using Tailwind CSS

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

## Project Structure (important files)

- `index.html` — Vite entry HTML
- `src/main.jsx` — App bootstrap; wraps app with Redux `Provider` and React Query `QueryClientProvider`
- `src/App.jsx` — Top-level app UI and simple view switching
- `src/components/` — React components (`ProductList`, `ProductCard`, `Cart`, `Navbar`)
- `src/api/products.js` — Axios helpers: `fetchProducts`, `fetchCategories` (used by React Query)
- `src/store/` — Redux Toolkit store and `cart` slice (`src/store/cartSlice.js`, `src/store/index.js`)

## Where Redux lives

- Store configured in `src/store/index.js` and provided to the app in `src/main.jsx`.
- Cart slice and actions are in `src/store/cartSlice.js`. Components dispatch actions like `addToCart` and `updateQuantity`.

## Where React Query lives

- `QueryClient` is created in `src/main.jsx` and the app is wrapped with `QueryClientProvider`.
- `useQuery` is used in `src/components/ProductList.jsx` and queries `src/api/products.js` helpers.

## Behavior & Notes

- Cart is persisted to `sessionStorage` so items survive page reloads within the same browser session.
- The project uses JavaScript + JSX (not TypeScript).

## Linting & Tooling

- ESLint config in `eslint.config.js`.
- Vite configured in `vite.config.js` with React and Tailwind integrations.

## Want changes?

If you'd like the README expanded (contributing, CI, deploy steps) or reworded for documentation, tell me what to include.
