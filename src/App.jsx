import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1200);

    // Remove from DOM completely after 1.5 seconds
    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showLoader && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)] transition-opacity duration-300 ease-in-out ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex animate-pulse flex-col items-center gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Natdemy<span className="text-[var(--muted)]">.</span>
            </h1>
            <div className="h-1 w-16 overflow-hidden rounded-full bg-[var(--border)]">
              <div className="h-full w-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] bg-[var(--foreground)]"></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-col bg-[var(--background)]">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;