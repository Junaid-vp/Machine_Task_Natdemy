import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusSquare, Home } from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] pb-20 md:flex-row md:pb-0">
      
      {/* Sidebar for Desktop, Bottom Nav for Mobile */}
      <aside className="fixed bottom-0 left-0 z-50 w-full border-t border-[var(--border)] bg-[var(--card)] md:sticky md:top-0 md:h-screen md:w-64 md:border-r md:border-t-0 md:p-6">
        <h2 className="mb-6 hidden text-xl font-bold tracking-tight md:block">Admin Panel</h2>
        
        <nav className="flex items-center justify-around p-2 pb-safe md:flex-col md:items-stretch md:justify-start md:gap-2 md:p-0">
          
          {/* Dashboard */}
          <Link 
            to="/admin" 
            className={`flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium md:flex-row md:px-4 md:py-2 md:text-sm transition-colors hover:bg-[var(--muted)]/10 ${
              isActive('/admin') 
                ? 'text-[var(--foreground)] md:bg-[var(--muted)]/10' 
                : 'text-[var(--muted)] md:text-[var(--foreground)]'
            }`}
          >
            <LayoutDashboard size={20} className="md:mr-2" />
            <span>Dashboard</span>
          </Link>
          
          {/* Add Property */}
          <Link 
            to="/admin/add-property" 
            className={`flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium md:flex-row md:px-4 md:py-2 md:text-sm transition-colors hover:bg-[var(--muted)]/10 ${
              isActive('/admin/add-property') 
                ? 'text-[var(--foreground)] md:bg-[var(--muted)]/10' 
                : 'text-[var(--muted)] md:text-[var(--foreground)]'
            }`}
          >
            <PlusSquare size={20} className="md:mr-2" />
            <span>Add Property</span>
          </Link>

          {/* Back to Website */}
          <Link 
            to="/" 
            className="flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-[var(--muted)]/10 md:mt-4 md:flex-row md:border md:border-[var(--border)] md:px-4 md:py-2 md:text-sm md:text-[var(--foreground)]"
          >
            <Home size={20} className="md:mr-2" />
            <span className="hidden md:inline">Back to Website</span>
            <span className="md:hidden">Website</span>
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12">
        <div className="mb-6 md:hidden">
          <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
