import { useState } from "react";
import { InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";

function MicrosoftLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 21 21" className="h-5 w-5">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

export default function LoginPage({ initialError }: { initialError: string | null }) {
  const { instance, inProgress } = useMsal();
  const [error, setError] = useState<string | null>(initialError);

  const busy = inProgress !== InteractionStatus.None;

  const handleLogin = async () => {
    setError(null);
    try {
      await instance.loginRedirect(loginRequest);
    } catch (e) {
      setError(e instanceof Error ? e.message.split("\n")[0] : "Sign-in failed.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 dark:bg-slate-950">
      <section className="w-full max-w-md p-8 sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500 text-4xl font-bold text-white shadow-lg shadow-emerald-500/30 dark:shadow-[0_10px_40px_-4px_rgba(52,211,153,0.6)]">
            $
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Money Matters</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Private financial tracking for our organization
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={busy}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MicrosoftLogo />
          {busy ? "Signing in…" : "Login using Microsoft"}
        </button>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/20 dark:text-red-100">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Access is restricted to authorized members of our Microsoft organization.
        </p>
      </section>
    </main>
  );
}
