"use client";

import { useState, useEffect } from "react";
import { EdgesApi, EdgeNode } from "@/lib/edges-api";

export default function CameraForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rtspUrl, setRtspUrl] = useState("");
  const [status, setStatus] = useState("DESCONOCIDO");
  const [edges, setEdges] = useState<EdgeNode[]>([]);
  const [edgeNodeId, setEdgeNodeId] = useState("");

  useEffect(() => {
    const loadEdges = async () => {
      const data = await EdgesApi.getAll();
      setEdges(data);
    };
    loadEdges();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSubmit({
      name,
      location: location || undefined,
      rtspUrl: rtspUrl || undefined,
      status: status || undefined,
      edgeNodeId: edgeNodeId || undefined,
    });
    setName("");
    setLocation("");
    setRtspUrl("");
    setStatus("DESCONOCIDO");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="font-bold mb-4">Nueva Cámara</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="RTSP URL"
          value={rtspUrl}
          onChange={(e) => setRtspUrl(e.target.value)}
        />
        <select className="border p-2 rounded" value={edgeNodeId} onChange={(e) => setEdgeNodeId(e.target.value)}>
          <option value="">Sin asignar</option>
          {edges.map((edge) => (
            <option key={edge.id} value={edge.id}>
              {edge.name}
            </option>
          ))}
        </select>

        <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="DESCONOCIDO">DESCONOCIDO</option>
          <option value="ONLINE">ONLINE</option>
          <option value="OFFLINE">OFFLINE</option>
        </select>
      </div>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}