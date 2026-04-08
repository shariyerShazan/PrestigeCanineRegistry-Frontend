# Frontend Project Structure

This document outlines the directory structure and organization of the **Purebred Canine Registry (PCR)** frontend application.

## Directory Overview

```text
/
├── public/                 # Static public assets (Favicon, robots.txt, etc.)
├── src/                    # Main source code of the React application
│   ├── (admin)/            # Pages and components specific to Admin role
│   ├── (auth)/             # Authentication pages (Login, Signup, Forgot Password)
│   ├── (owner)/            # Pages and components specific to Owner role
│   ├── (user)/             # Pages and components specific to General User role
│   ├── Layout/             # Shared layouts for different application sections
│   ├── assets/             # Images and local media files used in the UI
│   ├── components/         # Reusable UI components (Buttons, Inputs, Modals)
│   ├── hooks/              # Custom React hooks (e.g., useAuth, useDebounce)
│   ├── lib/                # Shared utilities and configurations (e.g., Axios instance)
│   ├── redux/              # Redux Toolkit state management and API services
│   ├── router/             # Centralized route configuration (React Router v7)
│   ├── index.css           # Global Tailwind CSS styles
│   └── main.tsx            # React entry point
├── components.json         # UI component configuration (Shadcn UI)
├── package.json            # Project dependencies and Vite scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## Key Folders

### `src/(group-name)/`
The project uses grouped routing to organize pages by user role. Each directory contains:
- `pages/`: Individual page components.
- `_components/`: Components specific to the pages in that group.

### `src/components/`
This folder contains highly reusable, atomic UI components. Many are based on **Radix UI** and styled with **Tailwind CSS**, following the Shadcn UI pattern.

### `src/redux/`
The application's global state is managed here.
- `store.ts`: The main Redux store.
- `features/`: Redux slices for local state (e.g., auth, UI states).
- `services/`: RTK Query services for fetching data from the backend.

### `src/router/`
Contains the `Router.tsx` file which defines all the application routes, protected paths, and role-based access logic.
