# FakeStore Firebase App

A full-stack e-commerce frontend built with **React**, **Vite**, **Tailwind CSS**, **Redux Toolkit**, **React Query**, and **Firebase** (Authentication + Firestore).

This project extends a previous FakeStore API demo by replacing the external REST API with a Firebase backend — giving the app its own database, user authentication, and secure access control.

---

## Features

### Products
- Product listing with category filtering, loaded from **Firestore**
- Product cards with image, rating, and add-to-cart
- Product data originally seeded from the FakeStore API, now owned in your Firestore `products` collection

### Authentication
- User registration and login via **Firebase Authentication** (email/password)
- Persistent auth state — stays logged in across page reloads
- Logout available from the navbar

### User Profiles
- On registration, a user document is created in the Firestore `users` collection
- Profile data (name, address) can be read and updated via the app

### Cart & Orders
- Cart managed with **Redux Toolkit** and persisted to `sessionStorage`
- Checkout saves the full order (items, totals, user ID) to the Firestore `orders` collection
- **Order History** tab shows all past orders for the logged-in user
- Click any order to see its full product breakdown and total

### Admin Panel
- Admin users can **create**, **edit**, and **delete** products directly in Firestore
- Admin access is gated by `VITE_ADMIN_EMAIL` / `VITE_ADMIN_UID` in `.env.local`

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

Create a `.env.local` file in the project root with your Firebase project credentials:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_ADMIN_EMAIL=your-admin@email.com
```

### 3. Seed the database

Populate the Firestore `products` collection from the FakeStore API (requires `serviceAccount.json` at the repo root):

```bash
node tools/seed-products.cjs
```

### 4. Run the dev server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## Project Structure

```
src/
├── firebase.js                  # Firebase SDK init (auth + db)
├── main.jsx                     # App entry — Redux, React Query, AuthProvider
├── App.jsx                      # View switcher (home, cart, login, register, orders, admin)
├── contexts/
│   └── AuthContext.jsx          # Firebase auth state, useAuth() hook
├── api/
│   ├── products.js              # Firestore CRUD for products
│   ├── orders.js                # Firestore CRUD for orders
│   └── users.js                 # Firestore CRUD for user profiles
├── components/
│   ├── Navbar.jsx               # Nav with auth-aware links and admin tab
│   ├── ProductList.jsx          # Product grid with category filter
│   ├── ProductCard.jsx          # Individual product card
│   ├── Cart.jsx                 # Cart view with checkout → Firestore
│   ├── Auth/
│   │   ├── Login.jsx            # Firebase email/password login
│   │   └── Register.jsx         # Firebase registration + Firestore user doc
│   ├── Orders/
│   │   ├── OrderHistory.jsx     # List of user's past orders
│   │   └── OrderDetail.jsx      # Full detail view of a single order
│   └── Admin/
│       ├── ProductAdmin.jsx     # Admin product list with delete
│       └── ProductForm.jsx      # Create / update product form
└── store/
    ├── index.js                 # Redux store
    └── cartSlice.js             # Cart state and actions
```

---

## Firebase Setup Notes

- **Authentication**: Email/password provider must be enabled in the Firebase console.
- **Firestore**: Database must be created in the Firebase console. Rules are in `firestore.rules`.
- **Deploy rules**: `firebase deploy --only firestore:rules`
- **Service account**: `serviceAccount.json` is required locally for admin scripts and is git-ignored.

---

## Tooling

| File | Purpose |
|---|---|
| `tools/seed-products.cjs` | Seeds Firestore with live FakeStore product data |
| `tools/set-admin.cjs` | Sets admin custom claim on a Firebase user by UID |
| `firestore.rules` | Firestore security rules |
| `firestore.indexes.json` | Composite index for orders query |
| `firebase.json` | Firebase CLI config for deploy and emulators |
