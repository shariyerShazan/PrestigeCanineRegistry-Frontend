# Setup & Usage Guide (Frontend)

This document provides instructions on how to install and run the frontend of the **Purebred Canine Registry (PCR)** project.

## Prerequisites
- **Node.js**: v18 or later
- **npm**: v8 or later
- **Vite CLI** (Optional): `npm i -g vite`

## Installation

1. Clone the repository and navigate to the `vic_pec-frontend` directory.
2. Install the project dependencies:
```bash
npm install
```
3. Configure the environment variables by creating a `.env` file in the root:
```env
VITE_API_BASE_URL="http://localhost:3003"
VITE_STRIPE_PUBLIC_KEY="your-stripe-public-key"
VITE_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
```

## Running the Application

- **Development Mode** (with fast-refresh):
```bash
npm run dev
```
By default, the application will be available at: `http://localhost:5173`

- **Build for Production**:
```bash
npm run build
```
This will compile the application into the `dist/` folder.

- **Preview Production Build**:
```bash
npm run preview
```

## Testing & Quality
- Run linting: `npm run lint`
- Format code (if Prettier is configured): `npx prettier --write .`

## Deployment
The application can be deployed to platforms like **Vercel** or **Netlify**. Ensure that the environment variables are correctly set in the deployment dashboard.
