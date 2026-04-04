import api from "./api";

export interface AlertPlate {
  id: string;
  plate: string;
  type: "BLACKLIST" | "WATCHLIST" | "WHITELIST";
  description?: string;
  enabled: boolean;
  createdAt: string;
}

export const AlertsApi = {
  async getAll(): Promise<AlertPlate[]> {
    const res = await api.get("/alerts");
    return res.data;
  },

  async create(data: {
    plate: string;
    type: "BLACKLIST" | "WATCHLIST" | "WHITELIST";
    description?: string;
  }) {
    const res = await api.post("/alerts", data);
    return res.data;
  },

  async update(id: string, data: any) {
    const res = await api.patch(`/alerts/${id}`, data);
    return res.data;
  },

  async toggle(id: string) {
    const res = await api.patch(`/alerts/${id}/toggle`);
    return res.data;
  },

  async remove(id: string) {
    await api.delete(`/alerts/${id}`);
  }
};
