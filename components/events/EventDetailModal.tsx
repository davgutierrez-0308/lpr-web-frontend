"use client";

import { PlateEvent } from "@/lib/events-api";

type Props = {
  event: PlateEvent | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function EventDetailModal({ event, isOpen, onClose }: Props) {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-auto">
        
        <h2 className="text-xl font-bold mb-4">
          Detalle del Evento
        </h2>

        {/* Datos */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div><b>Placa:</b> {event.plate}</div>
          <div><b>Confianza:</b> {event.confidence}</div>
          <div><b>Fecha:</b> {event.capturedAt}</div>
          <div><b>Cámara:</b> {event.cameraId}</div>
          <div><b>Alerta:</b> {event.isAlert ? "Sí" : "No"}</div>
          <div><b>Tipo Alerta:</b> {event.alertType ?? "-"}</div>
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Placa</h3>
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt="placa"
                className="w-full h-auto rounded border"
              />
            ) : (
              <div className="text-gray-400">Sin imagen</div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Vehículo</h3>
            {event.vehicleUrl ? (
              <img
                src={event.vehicleUrl}
                alt="vehiculo"
                className="w-full h-auto rounded border"
              />
            ) : (
              <div className="text-gray-400">Sin imagen</div>
            )}
          </div>
        </div>

        {/* Botón */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}