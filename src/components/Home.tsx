import { useMsal } from "@azure/msal-react";

/** Placeholder shown after a successful sign-in. Replace with the real app. */
export default function Home() {
  const { instance, accounts } = useMsal();
  const account = instance.getActiveAccount() ?? accounts[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center text-slate-900 dark:bg-slate-950 dark:text-white">
      <h1 className="text-3xl font-bold">Welcome to Money Matters</h1>
      <p className="text-slate-600 dark:text-slate-300">Signed in as {account?.name ?? account?.username}</p>
      <button
        type="button"
        onClick={() => instance.logoutRedirect({ account })}
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400"
      >
        Sign out
      </button>
    </main>
  );
}
