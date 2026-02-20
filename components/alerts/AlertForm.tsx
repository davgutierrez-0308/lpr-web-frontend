"use client";

import { useState } from "react";

interface Props {
  onSubmit: (data: any) => Promise<void>;
}

export default function AlertForm({ onSubmit }: Props) {
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("BLACKLIST");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSubmit({ plate, type, description });
    setPlate("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-6"
    >
      <h2 className="font-bold mb-4">Nueva Alerta</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Placa"
          className="border p-2 rounded"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          required
        />

        <select
          className="border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="BLACKLIST">BLACKLIST</option>
          <option value="WATCHLIST">WATCHLIST</option>
        </select>

        <input
          placeholder="Descripción"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}
