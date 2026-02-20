"use client";

import { useEffect, useState } from "react";
import { AlertsApi, AlertPlate } from "@/lib/alerts-api";
import AlertsTable from "@/components/alerts/AlertsTable";
import AlertForm from "@/components/alerts/AlertForm";
import { useAuthStore } from "@/lib/auth-store";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertPlate[]>([]);
  const user = useAuthStore((s) => s.user);

  const isAdmin = user?.role === "ADMIN";

  const loadAlerts = async () => {
    const data = await AlertsApi.getAll();
    setAlerts(data);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleCreate = async (data: any) => {
    await AlertsApi.create(data);
    loadAlerts();
  };

  const handleToggle = async (id: string) => {
    await AlertsApi.toggle(id);
    loadAlerts();
  };

  const handleDelete = async (id: string) => {
    await AlertsApi.remove(id);
    loadAlerts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Gestión de Alertas
      </h1>

      {isAdmin && <AlertForm onSubmit={handleCreate} />}

      <AlertsTable
        alerts={alerts}
        onToggle={handleToggle}
        onDelete={handleDelete}
        isAdmin={isAdmin}
      />
    </div>
  );
}
