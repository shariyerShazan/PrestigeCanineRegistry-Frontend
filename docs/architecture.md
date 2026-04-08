# Frontend Architecture Guide

This document describes the high-level architecture of the **Purebred Canine Registry (PCR)** frontend application.

## Overview

The frontend is a single-page application (SPA) built with **React** and **Vite**. It is designed for maximum performance, clean developer experience (DX), and a premium user experience (UX).

## Key Technologies

- **Library**: React 19+
- **Build Tool**: Vite
- **State Management**: Redux Toolkit (RTK)
- **Data Fetching**: RTK Query
- **Routing**: React Router v7 (with role-based access control)
- **Styling**: Tailwind CSS & Shadcn UI
- **Icons/UI**: Lucide React & Radix UI
- **Forms**: React Hook Form with Zod validation
- **PDF Generation**: `jspdf-html2canvas` & `dom-to-image-more`

## Design Patterns

### Component-Based Architecture
The UI is built with modular and reusable components. We follow a hierarchy of components:
1. **Atomic Components**: Basic building blocks (Buttons, Inputs, Badges) found in `src/components/`.
2. **Page Components**: Functional pages (Home, Dashboard, Search) found in `src/(role)/pages/`.
3. **Layout Components**: High-level structural components (AdminSidebar, MainNavbar) found in `src/Layout/`.

### Role-Based Route Grouping
To simplify the developer experience, pages are grouped by user roles:
- `(admin)`: Features and controls for administrators.
- `(owner)`: Features and controls for canine owners/breeders.
- `(auth)`: User authentication flows.
- `(user)`: Publicly accessible content.

### Global State & Persistence
- **Redux Toolkit**: Centralized state for global flags and user profile.
- **Redux Persist**: Configured to sync the store with LocalStorage, ensuring session persistence.
- **RTK Query Cache**: Automatically manages backend data fetching, deduplication, and caching.

## Security & Authentication

### Protected Routes
The application uses a `<PrivateRoute />` component to wrap any route that requires authentication. It checks the Redux `auth` state and redirects unauthenticated users to the `/login` page.

### Role-Based Access Control (RBAC)
Beyond basic authentication, the `Router.tsx` structure and layout wrappers ensure that only users with the correct roles can see or access certain dashboard sections.

---

## Conclusion
This architecture provides a scalable and maintainable foundation for the PCR frontend. The use of advanced tooling like RTK Query androle-based patterns ensures that the application remains fast and secure as new features are added.
