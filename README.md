# Money Matters

Private financial tracking for our organization. A React + TypeScript single-page app built with Vite and Tailwind CSS, with sign-in through Microsoft Entra ID (Azure AD).

## Features

- Sign in with Microsoft, restricted to users of your own Entra ID tenant
- Light and dark theme with a toggle. The app follows the device theme by default, and a theme you choose is saved in the browser and takes priority

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer, which includes npm
- An Microsoft Entra ID tenant where you can create an app registration

## Installation

1. **Clone the repository and install dependencies**

   ```bash
   git clone <repository-url>
   cd money-matters
   npm install
   ```

2. **Register the app in Microsoft Entra ID**

   1. Open the [Azure portal](https://portal.azure.com) and go to **Microsoft Entra ID** > **App registrations** > **New registration**.
   2. Choose **Accounts in this organizational directory only** (single tenant).
   3. Under **Redirect URI**, pick the **Single-page application (SPA)** platform and enter `http://localhost:5173`.
   4. After creating it, copy the **Application (client) ID** and **Directory (tenant) ID** from the Overview page.
   5. *(Optional)* If you have a backend API, copy the scope it exposes, for example `api://<client-id>/access_as_user`.

3. **Configure environment variables**

   Copy the example file and fill it in:

   ```bash
   # macOS / Linux / Git Bash
   cp .env.example .env.local

   # Windows (Command Prompt)
   copy .env.example .env.local
   ```

   | Variable                | Description                                                      |
   | ----------------------- | ---------------------------------------------------------------- |
   | `VITE_AZURE_CLIENT_ID`  | Application (client) ID of the app registration                  |
   | `VITE_AZURE_TENANT_ID`  | Directory (tenant) ID. Only users from this tenant can sign in   |
   | `VITE_API_SCOPE`        | Optional. Scope exposed by your backend API                      |

   `.env.local` holds your configuration and is git-ignored. Do not commit it.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open <http://localhost:5173>. The port is fixed, so if it is already in use the server exits instead of choosing another one. The redirect URI registered in step 2 must match it.

## Scripts

| Command           | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Starts the dev server with hot reload             |
| `npm run build`   | Type-checks and builds the production bundle in `dist/` |
| `npm run preview` | Serves the production build locally               |

## Deploying

Build with `npm run build` and host the contents of `dist/` on any static host. Then:

- Add your production URL as another **SPA** redirect URI in the Entra ID app registration.
- Set the three `VITE_` variables in your host's build environment. They are read at build time.

## Project structure

```
src/
  App.tsx                   Chooses login page or home based on sign-in state
  main.tsx                  MSAL setup and app entry point
  theme.ts                  Light/dark theme logic (saved choice, system fallback)
  auth/authConfig.ts        MSAL and Entra ID configuration
  components/
    LoginPage.tsx           Sign-in screen
    Home.tsx                Screen shown after sign-in (placeholder)
    ThemeToggle.tsx         Light/dark toggle button
```

## Troubleshooting

- **"Missing VITE_AZURE_CLIENT_ID or VITE_AZURE_TENANT_ID"**: `.env.local` is missing or incomplete. Complete step 3, then restart `npm run dev`.
- **Redirect URI mismatch error from Microsoft**: the URI in the app registration must be registered as a **SPA** platform and match the address in the browser exactly, including the port.
- **Sign-in rejected for a user**: the user must belong to the tenant set in `VITE_AZURE_TENANT_ID`.
