# ShopEase React E-Commerce

## Features
- React + Vite
- React Router
- DummyJSON Products API
- Product listing/search/category filter
- Product details page
- Global cart state with Context API
- Cart persistence with localStorage
- Login / Signup
- Protected checkout route
- Responsive UI

## Run
```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Demo authentication
Signup creates a demo account in localStorage. This is frontend-only authentication and is NOT suitable for production.

## API
Products are loaded from:
https://dummyjson.com/products

## Corrected version
This version includes explicit `React` imports in JSX files and a `vite.config.js`
with `@vitejs/plugin-react`, so the previous `React is not defined` blank-page error
is fixed.
