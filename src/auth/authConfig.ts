import { LogLevel, type Configuration, type RedirectRequest } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID;
const apiScope = import.meta.env.VITE_API_SCOPE;

if (!clientId || !tenantId) {
  throw new Error(
    "Missing VITE_AZURE_CLIENT_ID or VITE_AZURE_TENANT_ID. Copy .env.example to .env.local and fill it in.",
  );
}

export const msalConfig: Configuration = {
  auth: {
    clientId,
    // Tenant-specific authority => only users from YOUR tenant can sign in.
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    // sessionStorage: token cleared when the tab closes.
    cacheLocation: "sessionStorage",
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Warning,
      piiLoggingEnabled: false,
    },
  },
};

/** Scopes requested at sign-in. Includes your backend API scope when configured. */
export const loginRequest: RedirectRequest = {
  scopes: ["openid", "profile", ...(apiScope ? [apiScope] : [])],
};

/** Scopes used when calling your backend API with a Bearer token. */
export const apiRequest = {
  scopes: apiScope ? [apiScope] : [],
};
