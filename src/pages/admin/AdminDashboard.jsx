const AdminDashboard = () => {
  return (
    <div className="flex h-full flex-col">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex flex-1 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
        <p className="text-3xl font-light text-[var(--foreground)] sm:text-4xl">
          Welcome to <span className="font-bold">Natdemy.</span> Dashboard
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
