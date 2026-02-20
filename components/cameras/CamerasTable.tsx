"use client";

import { Camera } from "@/lib/cameras-api";

export default function CamerasTable({
  cameras,
  isAdmin,
  onDelete,
}: {
  cameras: Camera[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Ubicación</th>
            <th className="p-3">Estado</th>
            <th className="p-3">RTSP</th>
            <th className="p-3">Edge</th>
            {isAdmin && <th className="p-3">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {cameras.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-3 font-semibold">{c.name}</td>
              <td className="p-3">{c.location ?? "-"}</td>
              <td className="p-3">{c.status ?? "-"}</td>
              <td className="p-3 truncate max-w-[220px]">{c.rtspUrl ?? "-"}</td>
              <td className="p-3">
                {c.edgeNode ? c.edgeNode.name : "-"}
              </td>
              {isAdmin && (
                <td className="p-3">
                  <button className="text-red-600" onClick={() => onDelete(c.id)}>
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
          {cameras.length === 0 && (
            <tr>
              <td colSpan={isAdmin ? 5 : 4} className="p-6 text-center text-gray-500">
                No hay cámaras registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}