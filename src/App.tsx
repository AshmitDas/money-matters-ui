import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import ThemeToggle from "./components/ThemeToggle";

export default function App({ initialError }: { initialError: string | null }) {
  return (
    <>
      <ThemeToggle />
      <UnauthenticatedTemplate>
        <LoginPage initialError={initialError} />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Home />
      </AuthenticatedTemplate>
    </>
  );
}
