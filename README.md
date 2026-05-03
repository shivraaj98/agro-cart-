# HariyoMart / Agro Cart

HariyoMart is a React + Vite agricultural marketplace prototype for Nepali farmers, sellers, buyers, delivery staff, and admins. It includes product browsing, checkout, order tracking, delivery status updates, seller/admin dashboards, logistics charges, ratings, and intelligent price forecasting.

## Features

- Product marketplace for seeds, vegetables, fertilizers, tools, irrigation, livestock care, organic products, and agro accessories
- Buyer cart, checkout, VAT, and logistics charge calculation
- Order lifecycle tracking: `Pending`, `Processing`, `Shipped`, `Delivered`
- Delivery postman panel for updating delivery status
- Seller dashboard with product management, orders, analytics, and forecasting
- Admin dashboard for users, seller approvals, and transactions
- Rating and review system that updates product rating/review counts
- Intelligent price forecasting dashboard using ARIMA-style trend, LSTM-style demand projection, and GARCH-style volatility estimates
- Charts powered by Recharts
- Icons powered by Lucide React

## Tech Stack

- React 19
- Vite 6
- Recharts
- Lucide React
- JavaScript / JSX

## Project Structure

```text
agro-cart-/
|-- HariyoMart (1).jsx      # Main application UI and logic
|-- src/
|   `-- main.jsx            # React entry point
|-- index.html              # Vite HTML entry
|-- vite.config.js          # Vite config
|-- package.json            # Scripts and dependencies
|-- package-lock.json       # Locked dependency versions
|-- dist/                   # Production build output
|-- backend/                # Placeholder/backend folder
`-- config/                 # Config folder
```

## Prerequisites

Install:

- Node.js 18 or newer
- npm

Check versions:

```bash
node -v
npm -v
```

## Setup From Scratch

Clone or copy the project, then open the project folder:

```bash
cd agro-cart-
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

## Demo Logins

Use the quick demo login buttons on the login page:

- Buyer: browse products, add to cart, checkout, track orders
- Seller: manage products, view orders, use forecasting dashboard
- Delivery Postman: update order status
- Admin: view users, approvals, transactions, and platform analytics

## Available Scripts

Run local development server:

```bash
npm run dev
```

Build production files:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Build For Production

Create the optimized production build:

```bash
npm run build
```

The generated files are placed in:

```text
dist/
```

You can deploy the contents of `dist/` to any static hosting provider.

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Use these settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Netlify

1. Push the project to GitHub.
2. Create a new Netlify site from the repo.
3. Use these settings:

```text
Build command: npm run build
Publish directory: dist
```

### GitHub Pages

Build the project:

```bash
npm run build
```

Deploy the `dist/` folder using your preferred GitHub Pages workflow. If deploying under a subpath, update `vite.config.js` with the correct `base` value before building.

### Static Server / cPanel / Shared Hosting

Build the project:

```bash
npm run build
```

Upload everything inside `dist/` to the public web directory of your server, such as:

```text
public_html/
```

For single-page app routing, configure the server to fallback all routes to `index.html`.

## Forecasting Notes

The current forecasting system runs in the frontend as a deterministic prototype:

- ARIMA-style estimate uses recent price trend and momentum
- LSTM-style estimate uses demand, stock pressure, and product context
- GARCH-style estimate uses price volatility
- The final suggested farmer price blends all three estimates

For production, replace this frontend model with a backend service trained on real market, mandi, seasonal, inventory, and order data.

## Logistics Charge

Checkout includes:

- Subtotal
- VAT
- Logistics charge

The logistics charge is estimated from delivery zone, selected district, order quantity, and order value.

## Rating System

Buyers can submit product reviews with star ratings. New ratings update the product rating and review count during the current app session.

## Notes For Future Development

- Connect products, orders, users, ratings, and forecasts to a database
- Add authentication and role-based route protection
- Move forecasting to a backend ML/API service
- Persist delivery status updates
- Add payment gateway integrations for eSewa, Khalti, IME Pay, and cards
- Add tests before production deployment
