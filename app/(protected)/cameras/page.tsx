"use client";

import { useEffect, useState } from "react";
import { CamerasApi, Camera } from "@/lib/cameras-api";
import { useAuthStore } from "@/lib/auth-store";
import CameraForm from "@/components/cameras/CameraForm";
import CamerasTable from "@/components/cameras/CamerasTable";

export default function CamerasPage() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "ADMIN";

  const load = async () => {
    const data = await CamerasApi.getAll();
    setCameras(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (data: any) => {
    await CamerasApi.create(data);
    await load();
  };

  const handleDelete = async (id: string) => {
    await CamerasApi.remove(id);
    await load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Cámaras</h1>

      {isAdmin && <CameraForm onSubmit={handleCreate} />}

      <CamerasTable cameras={cameras} isAdmin={isAdmin} onDelete={handleDelete} />
    </div>
  );
}