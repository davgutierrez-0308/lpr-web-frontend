"use client";

import { useEffect, useState } from "react";
import { EdgesApi, EdgeNode } from "@/lib/edges-api";
import { useAuthStore } from "@/lib/auth-store";

export default function EdgesPage() {
  const [edges, setEdges] = useState<EdgeNode[]>([]);
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "ADMIN";

  const load = async () => {
    setEdges(await EdgesApi.getAll());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Gestión de Nodos Edge
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        {edges.map((edge) => (
          <div key={edge.id} className="border-b py-2">
            <strong>{edge.name}</strong> — {edge.status}
          </div>
        ))}
      </div>
    </div>
  );
}