# Application Routes Documentation

This document lists all the routes available in the **Purebred Canine Registry (PCR)** frontend application, categorized by user role.

## Public Routes
These routes are accessible to everyone, including guests.

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Landing page of the PCR Marketplace |
| `/search-dogs` | `DogSearchPage` | Search and filter registered canines |
| `/dogs/:canineId` | `DogProfilePage` | Public profile for a specific canine |
| `/owner-details/:ownerId` | `OwnerDetailsPage` | Public profile for a canine owner/breeder |
| `/about` | `AboutPage` | Information about the registry |
| `/contact` | `ContactPage` | Contact and support information |
| `/login` | `Login` | User authentication page |
| `/register` | `Register` | New account registration |
| `/forgot-password` | `AuthForgot` | Password recovery flow |
| `/become-member` | `PricingPage` | Membership plan selection |

---

## Admin Dashboard Routes
Path Prefix: `/admin/dashboard` (Protected by `PrivateRoute` and Admin Role)

| Sub-path | Description |
|----------|-------------|
| `/` | Admin overview and statistics |
| `canine-management` | Approve or reject canine registration requests |
| `Litter-management` | Manage litter registration requests |
| `User-Management` | View and manage all registered users |
| `breed-management` | Add/Edit breeds and breed codes |
| `Roles-Permissions` | Configure role-based access control |
| `Certificate-Requests` | Manage requests for physical certificates |
| `Reports-Management` | Review health and validation reports |
| `membership-plan-management` | Configure subscription plans and prices |
| `Transfer-Ownership` | Manage canine ownership transfer requests |

---

## Owner Dashboard Routes
Path Prefix: `/owner/dashboard` (Protected by `PrivateRoute` and Owner Role)

| Sub-path | Description |
|----------|-------------|
| `/` | Owner dashboard with recent updates and pet summary |
| `dog-registration` | Submit a new canine registration |
| `litter-registration` | Submit a new litter registration |
| `dog-preview/:canineId` | Detailed view of owned canine |
| `transfer-owner` | Initiate or view ownership transfers |
| `profile` | Update personal/breeder profile information |

---

## Error Handling
| Path | Description |
|------|-------------|
| `*` | Any undefined path will render the `NotFoundPage` component |
