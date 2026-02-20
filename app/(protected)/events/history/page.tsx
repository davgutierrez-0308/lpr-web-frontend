"use client";

import { useEffect, useState } from "react";
import { EventsApi, PlateEvent } from "@/lib/events-api";
import EventsFilters from "@/components/events/EventsFilters";
import EventsHistoryTable from "@/components/events/EventsHistoryTable";

export default function EventsHistoryPage() {
  const [events, setEvents] = useState<PlateEvent[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 20,
  });

  const load = async (params: any) => {
    const res = await EventsApi.search(params);
    setEvents(res.data);
    setMeta(res.meta);
    setFilters(params);
  };

  useEffect(() => {
    load(filters);
  }, []);

  const handlePageChange = (newPage: number) => {
    load({ ...filters, page: newPage });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Búsqueda Histórica
      </h1>

      <EventsFilters onSearch={load} />

      <EventsHistoryTable events={events} />

      {meta && (
        <div className="mt-4 flex justify-between items-center">
          <span>
            Página {meta.page} de {meta.totalPages}
          </span>

          <div className="space-x-2">
            {meta.page > 1 && (
              <button
                onClick={() => handlePageChange(meta.page - 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Anterior
              </button>
            )}

            {meta.page < meta.totalPages && (
              <button
                onClick={() => handlePageChange(meta.page + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
