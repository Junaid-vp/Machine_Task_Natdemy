import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((current) => !current);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-[var(--foreground)]"
        : "text-[var(--muted)] hover:text-[var(--foreground)]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight text-[var(--foreground)]"
        >
          Natdemy<span>.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/properties" className={getNavLinkClass}>
            Properties
          </NavLink>

          <NavLink to="/admin" className={getNavLinkClass}>
            Admin <span className="text-[10px] opacity-70">[just for route]</span>
          </NavLink>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <span className="text-xs font-medium text-[var(--muted)]">Theme</span>
          {/* Theme Toggle (Desktop) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-[var(--border)] bg-[var(--muted)]/10 transition-colors duration-300 ease-in-out hover:border-[var(--foreground)]/30"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-[var(--foreground)] shadow-sm transition duration-300 ease-in-out ${
                isDarkMode ? "translate-x-[22px]" : "translate-x-[4px]"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:hidden">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)] sm:text-xs">
            Theme
          </span>
          {/* Theme Toggle (Mobile) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative mr-2 flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-[var(--border)] bg-[var(--muted)]/10 transition-colors duration-300 ease-in-out hover:border-[var(--foreground)]/30"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-[var(--foreground)] shadow-sm transition duration-300 ease-in-out ${
                isDarkMode ? "translate-x-[22px]" : "translate-x-[4px]"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-5 py-4 sm:px-6">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={getNavLinkClass}
            >
              <span className="block py-3">Home</span>
            </NavLink>

            <NavLink
              to="/properties"
              onClick={closeMenu}
              className={getNavLinkClass}
            >
              <span className="block py-3">Properties</span>
            </NavLink>

            <NavLink
              to="/admin"
              onClick={closeMenu}
              className={getNavLinkClass}
            >
              <span className="block py-3">
                Admin <span className="text-[10px] opacity-70">[just for route]</span>
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
