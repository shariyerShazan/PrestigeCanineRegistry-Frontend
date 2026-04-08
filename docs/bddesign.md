# Frontend Data Design & State Management

This document describes how data is structured and managed within the **Purebred Canine Registry (PCR)** frontend application.

## Core State Management

The application uses **Redux Toolkit (RTK)** to manage global state and **RTK Query** for efficient data fetching and caching.

### Authentication (`auth` slice)
Manages the user's login session and basic profile.
- **State**: `user` (Object), `token` (JWT String), `isAuthenticated` (Boolean).
- **Persistence**: Persisted using `redux-persist` to maintain sessions across page refreshes.

### Canine Data (`canine` & `admin-canine` slices)
Manages the representation of canine records.
- **Models**:
    - `Canine`: Represents a single dog with fields like `pcrId`, `name`, `breed`, `owner`, and `healthStats`.
    - `CanineList`: Array of `Canine` objects for search results and dashboard views.

### Litter Data (`litter` slice)
Manages information for litters of puppies.
- **Models**:
    - `Litter`: Includes `pcrLitterId`, `mother`, `father`, and `puppies` (Array).

### Admin-Only States
Specialized slices for administrative tasks, including:
- `admin-user`: List of all users and account statuses.
- `admin-permission`: Roles and specific permission bitmasks.
- `admin-membership-plan`: Pricing and plan definitions.

---

## Data Fetching (RTK Query)

The frontend communicates with the backend through specialized API services.

### API Services
- **`authApi`**: Handles login, registration, and logout.
- **`canineApi`**: Fetches dog profiles and search results.
- **`adminApi`**: Comprehensive access to all backend administrative endpoints.
- **`paymentApi`**: Manages Stripe checkout and transaction history.

### Request/Response Lifecycle
1. **Trigger**: A component calls a hook like `useGetCaninesQuery()`.
2. **Fetch**: RTK Query sends a request to the NestJS API.
3. **Cache**: The response is saved in the Redux store and cached.
4. **Update**: Any subsequent request to the same endpoint uses the cache unless invalidated (e.g., after a mutation like `addCanine`).

---

## Local UI State
For simple component-level states (e.g., is a modal open?), the application uses standard React `useState` or `useForm`.
