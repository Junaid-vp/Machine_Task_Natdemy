import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[var(--background)] px-4 text-center text-[var(--foreground)]">
      <div className="flex items-center justify-center rounded-full bg-[var(--muted)]/10 p-6 mb-6">
        <AlertCircle size={48} className="text-[var(--foreground)]" />
      </div>
      
      <h1 className="mb-2 text-5xl font-extrabold tracking-tight sm:text-7xl">404</h1>
      
      <h2 className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
        Page Not Found
      </h2>
      
      <p className="mb-8 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        The page or property you are looking for doesn't exist, has been moved, or is no longer available.
      </p>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          to="/"
          className="flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
        >
          Back to Home
        </Link>
        <Link
          to="/properties"
          className="flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-8 py-3.5 text-sm font-bold text-[var(--foreground)] transition-all hover:scale-[1.02] hover:bg-[var(--muted)]/5 active:scale-95"
        >
          Browse Properties
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
