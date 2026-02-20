"use client";

import { useState } from "react";

interface Props {
  onSearch: (filters: any) => void;
}

export default function EventsFilters({ onSearch }: Props) {
  const [plate, setPlate] = useState("");
  const [cameraId, setCameraId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isAlert, setIsAlert] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSearch({
      plate: plate || undefined,
      cameraId: cameraId || undefined,
      from: from || undefined,
      to: to || undefined,
      isAlert: isAlert || undefined,
      page: 1,
      limit: 20,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-6"
    >
      <h2 className="font-bold mb-4">Filtros</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          placeholder="Placa"
          className="border p-2 rounded"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />

        <input
          placeholder="Camera ID"
          className="border p-2 rounded"
          value={cameraId}
          onChange={(e) => setCameraId(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={isAlert}
          onChange={(e) => setIsAlert(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="true">Solo Alertas</option>
          <option value="false">Solo No Alertas</option>
        </select>
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Buscar
      </button>
    </form>
  );
}
