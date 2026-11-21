import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  EventType,
  PublicClientApplication,
  type AuthenticationResult,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/authConfig";
import App from "./App";
import "./index.css";

const msalInstance = new PublicClientApplication(msalConfig);

async function bootstrap() {
  await msalInstance.initialize();

  // Complete a pending redirect sign-in; capture failures (e.g. user not in tenant)
  // so the login page can show them.
  let loginError: string | null = null;
  try {
    await msalInstance.handleRedirectPromise();
  } catch (e) {
    loginError = e instanceof Error ? e.message.split("\n")[0] : "Sign-in failed.";
  }

  // Use the first cached account as the active one (page refresh).
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0 && !msalInstance.getActiveAccount()) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  // Set the active account after a successful sign-in.
  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const { account } = event.payload as AuthenticationResult;
      msalInstance.setActiveAccount(account);
    }
  });

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App initialError={loginError} />
      </MsalProvider>
    </StrictMode>,
  );
}

void bootstrap();
