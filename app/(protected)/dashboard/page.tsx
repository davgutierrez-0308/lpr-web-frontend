"use client";

import { useAuthStore } from "@/lib/auth-store";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido {user?.email}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          Eventos hoy
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Alertas activas
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Cámaras activas
        </div>
      </div>
    </div>
  );
}
