"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/auth-store";

interface PlateEvent {
  id: string;
  plate: string;
  confidence: number;
  cameraId: string;
  capturedAt: string;
  isAlert: boolean;
}

export default function EventsPage() {
  const token = useAuthStore((s) => s.token);

  const [events, setEvents] = useState<PlateEvent[]>([]);
  const [connected, setConnected] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!token) return;

    // Creamos conexión SSE
    const eventSource = new EventSource(
      `http://localhost:3000/realtime/events?token=${token}`,
      {
        withCredentials: false,
      }
    );

    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setConnected(true);
    };

    eventSource.onerror = () => {
      setConnected(false);
    };

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);

        if (parsed.type === "plate_event") {
          setEvents((prev) => [parsed.data, ...prev].slice(0, 100));
        }
      } catch {
        // ignorar heartbeats
      }
    };

    return () => {
      eventSource.close();
    };
  }, [token]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Eventos en Tiempo Real</h1>

        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            connected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {connected ? "Conectado" : "Desconectado"}
        </div>
      </div>

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
                  {new Date(event.capturedAt).toLocaleTimeString()}
                </td>
                <td className="p-3">
                  {event.isAlert ? (
                    <span className="text-red-600 font-bold">ALERTA</span>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  Esperando eventos...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
