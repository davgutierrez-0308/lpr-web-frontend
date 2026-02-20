import api from "./api";

export interface EdgeNode {
  id: string;
  name: string;
  location?: string;
  status: string;
  lastSeenAt?: string;
}

export const EdgesApi = {
  async getAll(): Promise<EdgeNode[]> {
    const res = await api.get("/edges");
    return res.data;
  },

  async create(data: any) {
    return (await api.post("/edges", data)).data;
  },

  async update(id: string, data: any) {
    return (await api.patch(`/edges/${id}`, data)).data;
  },

  async remove(id: string) {
    await api.delete(`/edges/${id}`);
  },
};