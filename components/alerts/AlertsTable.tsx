"use client";

import { AlertPlate } from "@/lib/alerts-api";

interface Props {
  alerts: AlertPlate[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, 
    data: { type: "BLACKLIST" | "WATCHLIST" | "WHITELIST" }
  ) => void;
  isAdmin: boolean;
}

export default function AlertsTable({
  alerts,
  onToggle,
  onDelete,
  onUpdate,
  isAdmin,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Placa</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Descripción</th>
            <th className="p-3">Estado</th>
            {isAdmin && <th className="p-3">Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id} className="border-t">
              <td className="p-3 font-semibold">{alert.plate}</td>
              <td className="p-3">
                {isAdmin ? (
                  <select
                    value={alert.type}
                    onChange={(e) =>
                      onUpdate(alert.id, { type: e.target.value })
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="BLACKLIST">BLACKLIST</option>
                    <option value="WATCHLIST">WATCHLIST</option>
                    <option value="WHITELIST">WHITELIST</option>
                  </select>
                ) : (
                  <span>
                    {alert.type}
                  </span>
                )}
              </td>

              <td className="p-3">{alert.description ?? "-"}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    alert.enabled
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {alert.enabled ? "Activo" : "Inactivo"}
                </span>
              </td>

              {isAdmin && (
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => onToggle(alert.id)}
                    className="text-blue-600"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => onDelete(alert.id)}
                    className="text-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}

          {alerts.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center text-gray-500"
              >
                No hay alertas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
