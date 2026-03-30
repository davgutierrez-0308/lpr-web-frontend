"use client";

import { useEffect, useState, useRef } from "react";
import { EventsApi, PlateEvent } from "@/lib/events-api";
import EventsFilters from "@/components/events/EventsFilters";
import EventsHistoryTable from "@/components/events/EventsHistoryTable";
import EventDetailModal from "@/components/events/EventDetailModal";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function EventsHistoryPage() {
  const [events, setEvents] = useState<PlateEvent[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 20,
  });

  const tableRef = useRef<HTMLDivElement>(null);

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

  const [selectedEvent, setSelectedEvent] = useState<PlateEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: PlateEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  // 🔥 EXPORT PDF
  const exportToPDF = async () => {
    if (!tableRef.current) return;

    const canvas = await html2canvas(tableRef.current, {
      scale: 2,
      useCORS: true, // importante para imágenes (Cloudinary)
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("l", "mm", "a4"); // horizontal

    const imgWidth = 297;
    const pageHeight = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("reporte-eventos.pdf");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Búsqueda Histórica
      </h1>

      <EventsFilters onSearch={load} />

      {/* BOTÓN PDF */}
      <div className="mb-4">
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Descargar PDF
        </button>
      </div>

      {/* 🔥 ENVOLVEMOS LA TABLA */}
      <div ref={tableRef}>
        <EventsHistoryTable events={events} onViewDetail={openModal}/>
      </div>

      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

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