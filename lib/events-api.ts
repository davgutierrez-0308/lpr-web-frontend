
import api from "./api";

export interface PlateEvent {
  id: string;
  plate: string;
  confidence: number;
  cameraId: string;
  capturedAt: string;
  imageUrl?: string;
  isAlert: boolean;
  alertType?: string;
  vehicleUrl?: string;
}

export interface SearchResponse {
  data: PlateEvent[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const EventsApi = {
  async search(params: Record<string, any>): Promise<SearchResponse> {
    const res = await api.get("/events", { params });
    return res.data;
  },
};
