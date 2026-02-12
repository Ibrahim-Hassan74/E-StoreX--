# E-StoreX - Advanced Angular E-Commerce Frontend

![Angular](https://img.shields.io/badge/Angular-19.0.0-dd0031.svg?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8.svg?style=flat&logo=tailwind-css)
![Stripe](https://img.shields.io/badge/Stripe-Payment-635bff.svg?style=flat&logo=stripe)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

## 1. Project Overview

**E-StoreX** is a modern, scalable, and feature-rich E-Commerce frontend application built with **Angular 19**.

This project was built to demonstrate **advanced frontend architecture**, **clean code practices**, and **real-world application flows**. It allows users to browse products, manage their cart, place orders, and pay securely using Stripe. The application is designed to be production-ready, featuring strong separation of concerns, modern state management using **Signals**, and full responsive design.

**Target Audience:** Recruiters, Technical Leads, and Developers looking for a reference implementation of a complex Angular application.

**Key Goals:**

- Demonstrate **Scalable Architecture** (Core/Features/Shared pattern).
- Showcase modern Angular features (**Signals**, **Control Flow**, **Standalone Components**).
- Implement real-world complex flows (Auth, Payment, Order Management).
- Provide a premium, responsive User Experience.

### 🔗 Project Links

- **Live Demo:** [e-store-x.web.app](https://e-store-x.web.app/)
- **Frontend Repository:** [github.com/Ibrahim-Hassan74/E-StoreX](https://github.com/Ibrahim-Hassan74/E-StoreX)
- **Backend Repository:** [github.com/Ibrahim-Hassan74/EStoreX](https://github.com/Ibrahim-Hassan74/EStoreX)
- **API Swagger:** [estorex.runasp.net/swagger](https://estorex.runasp.net/swagger/index.html)

---

## 2. Application Features

The application provides a comprehensive shopping experience:

### 🛍️ Product Management

- **Browsing & Filtering:** Advanced product filtering by Category, Brand, Price Range, and Search terms.
- **Product Details:** Detailed view with image galleries, descriptions, and user ratings.
- **Real-time Availability:** Dynamic stock checking and status updates.

### 👤 User Authentication & Profile

- **Secure Auth:** Login and Registration with JWT authentication.
- **OAuth Integration:** Secure login via **Google** and **GitHub**.
- **Password Management:** Forgot Password and Reset Password flows with email tokens.
- **Profile Management:** Update personal details and saved addresses (shipping/billing).
- **Security:** usage of `AuthGuard` to protect private routes.

### 🛒 Shopping Experience

- **Smart Cart:** Persistent cart management (supports Guest users via LocalStorage and merges upon Login).
- **Wishlist:** Save products for later.
- **Real-time Updates:** Cart totals and badge counts update instantly via Signals.

### 💳 Checkout & Payment

- **Multi-step Checkout:** Organized flow: `Shipping Address` → `Delivery Method` → `Payment`.
- **Stripe Integration:** Secure credit card processing using Stripe Elements.
- **Order Creation:** Seamless order generation and payment confirmation.

### 📦 Order Management

- **Order History:** List of past orders with status indicators (Pending, Shipped, Delivered).
- **Order Details:** Detailed receipt view including items, shipping cost, and delivery status.

### ⚙️ Technical Features

- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
- **Error Handling:** Global `ErrorInterceptor` and user-friendly toast notifications.
- **Loading States:** Centralized loading indicators for async operations.
- **SEO Ready:** Server-Side Rendering (SSR) support.

---

## 3. Frontend Architecture

The project follows a **Modular & Feature-Based Architecture** to ensure scalability and maintainability.

### High-Level Structure

The application is split into three main layers:

1.  **Core Module (`app/core`)**: containing singleton services and low-level infrastructure.
2.  **Shared Module (`app/shared`)**: containing reusable UI components and models.
3.  **Feature Modules (`app/features`)**: containing domain-specific logic (pages, components).

### Key Architectural Patterns

#### Service-based State Management (Signals)

Instead of using heavy external libraries, this project uses **Service-based State Management with Angular Signals**.

- **Data Access:** Services (e.g., `BasketService`) handle HTTP API calls (RxJS).
- **State Holders:** State Services (e.g., `BasketStateService`) hold application state in `WritableSignal`s.
- **Reactivity:** Components read state via `Computed` signals, ensuring fine-grained reactivity.

#### Generic Resource Service (`ResourceService`)

To avoid repetitive HTTP boilerplate code, the project implements a generic abstract `ResourceService<T>`.

- **Purpose:** Encapsulates common HTTP operations (`GET`, `POST`, `PUT`, `DELETE`).
- **Standardization:** Automatically handles `BaseURL` concatenation and request headers.
- **Usage:** Feature services (e.g., `ProductService`, `OrdersService`) extend this class, focusing only on domain-specific endpoints while inheriting robust error handling and type safety.

---

## 4. Project Structure

```text
src/app/
├── core/                   # Singleton objects (loaded once)
│   ├── guards/             # Auth & Admin route guards
│   ├── interceptors/       # HTTP Interceptors (JWT, Errors)
│   ├── services/           # Global Business Logic
│   │   ├── resource.service.ts # Generic HTTP wrapper
│   │   └── ...
│   └── layout/             # Global Layout (Navbar, Footer)
│
├── features/               # Business Features (Lazy Loaded)
│   ├── auth/               # Login, Register, OAuth
│   ├── product/            # Product Browsing
│   ├── cart/               # Basket Logic
│   ├── checkout/           # Checkout Steps
│   └── account/            # User Profile
│
└── shared/                 # Reusable Artifacts
    ├── components/         # Generic UI Components
    └── models/             # TypeScript Interfaces
```

---

## 5. Technologies Used

- **Framework:** [Angular 19](https://angular.io/) (Latest version)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/) & [SCSS](https://sass-lang.com/)
- **Reactivity:** [RxJS](https://rxjs.dev/) & [Angular Signals](https://angular.io/guide/signals)
- **Routing:** Angular Router (Lazy Loading configured)
- **Payment:** [Stripe.js](https://stripe.com/docs/js)
- **Build Tool:** Angular CLI & Vite

---

## 6. Checkout & Payment Flow (Frontend)

The checkout process is a critical part of this application, designed to be secure and robust.

1.  **Initialization:** `CheckoutService` loads saved addresses; Stripe Elements initialize.
2.  **Order Creation:** User confirms details -> App creates **Order** via API -> Backend returns **Stripe ClientSecret**.
3.  **Payment Confirmation:** App calls `stripe.confirmCardPayment()` with ClientSecret.
4.  **Completion:** On success, App clears cart and redirects to Order Success page.

---

## 7. Running the Project Locally

### Prerequisites

- Node.js (Latest LTS)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Ibrahim-Hassan74/E-StoreX-Frontend.git
    cd E-StoreX
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Open `src/environments/environment.ts`:

    ```typescript
    export const environment = {
      production: false,
      baseURL: "https://estorex.runasp.net/api/v1/", // Backend API
      stripeKey: "pk_test_...", // Your Stripe Publishable Key
    };
    ```

4.  **Run the Application**
    ```bash
    npm start
    ```
    Navigate to `http://localhost:4200/`.

---

## 8. Author

**Ibrahim Hassan**

I am a passionate **Software Engineer** specializing in Backend Development, currently expanding my expertise into Full-Stack Architecture. This project represents my journey into mastering modern Frontend Engineering.

- [LinkedIn](https://www.linkedin.com/in/ibrahim-hassan-48287b250)
- [GitHub Profile](https://github.com/Ibrahim-Hassan74)
