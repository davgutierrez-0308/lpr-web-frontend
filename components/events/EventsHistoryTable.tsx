"use client";

import { PlateEvent } from "@/lib/events-api";

interface Props {
  events: PlateEvent[];
}

export default function EventsHistoryTable({ events }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Placa</th>
            <th className="p-3">Confianza</th>
            <th className="p-3">Cámara</th>
            <th className="p-3">Fecha</th>
            <th className="p-3">Alerta</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className={`border-t ${
                event.isAlert ? "bg-red-50" : ""
              }`}
            >
              <td className="p-3 font-semibold">{event.plate}</td>
              <td className="p-3">
                {(event.confidence * 100).toFixed(1)}%
              </td>
              <td className="p-3">{event.cameraId}</td>
              <td className="p-3">
                {new Date(event.capturedAt).toLocaleString()}
              </td>
              <td className="p-3">
                {event.isAlert ? (
                  <span className="text-red-600 font-bold">
                    {event.alertType ?? "ALERTA"}
                  </span>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}

          {events.length === 0 && (
            <tr>
              <td colSpan={5} className="p-6 text-center text-gray-500">
                No hay resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
