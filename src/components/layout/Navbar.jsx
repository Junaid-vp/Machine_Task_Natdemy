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

        <div className="hidden md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
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
