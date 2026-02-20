import api from "./api";

export interface Camera {
  id: string;
  name: string;
  location?: string;
  rtspUrl?: string;
  edgeNodeId?: string | null;
  status?: string;
  createdAt?: string;
  edgeNode?: {
    id: string;
    name: string;
  } | null;
}

export const CamerasApi = {
  async getAll(): Promise<Camera[]> {
    const res = await api.get("/cameras");
    return res.data;
  },

  async create(data: {
    name: string;
    location?: string;
    rtspUrl?: string;
    edgeNodeId?: string;
    status?: string;
  }) {
    const res = await api.post("/cameras", data);
    return res.data;
  },

  async update(id: string, data: any) {
    const res = await api.patch(`/cameras/${id}`, data);
    return res.data;
  },

  async remove(id: string) {
    await api.delete(`/cameras/${id}`);
  },
};