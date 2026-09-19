import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] md:flex-row">
      <aside className="w-full border-r border-[var(--border)] bg-[var(--card)] p-6 md:w-64 md:flex-shrink-0">
        <h2 className="mb-6 text-xl font-bold tracking-tight">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-[var(--muted)]/10">Dashboard</Link>
          <Link to="/admin/add-property" className="rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-[var(--muted)]/10">Add Property</Link>
          <Link to="/" className="mt-4 rounded-lg border border-[var(--border)] px-4 py-2 text-center text-sm font-medium transition hover:bg-[var(--muted)]/10">Back to Website</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
