export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative">
        <div className="h-24 w-24 animate-spin rounded-full border-2 border-violet-400/40 border-t-cyan-300" />
        <p className="mt-4 text-center text-sm text-white/70">Initialisation de l&apos;expérience Altéra…</p>
      </div>
    </div>
  );
}
