"use client";

import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AppLayout({ children }: any) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* HEADER */}
      <header className="h-16 bg-white shadow flex items-center justify-between px-6">
        <div className="text-xl font-bold text-gray-800">
          LPR Monitoring
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <span className="text-sm font-medium">{user?.email}</span>
            <span className="text-xs text-gray-500">{user?.role}</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600">
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1">
        
        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
          <nav className="flex-1 p-4 space-y-2">
            <a href="/dashboard" className="block p-2 hover:bg-gray-800 rounded">
              Dashboard
            </a>
            <a href="/events" className="block p-2 hover:bg-gray-800 rounded">
              Eventos
            </a>
            <a href="/edges" className="block p-2 hover:bg-gray-800 rounded">
              Nodos de cámaras
            </a>
            <a href="/cameras" className="block p-2 hover:bg-gray-800 rounded">
              Cámaras
            </a>
            <a href="/events/history" className="block p-2 hover:bg-gray-800 rounded">
              Historial
            </a>
            <a href="/alerts" className="block p-2 hover:bg-gray-800 rounded">
              Alertas
            </a>
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
