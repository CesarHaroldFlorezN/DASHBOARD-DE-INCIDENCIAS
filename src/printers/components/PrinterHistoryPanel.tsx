import { useState } from 'react';
import { Printer, HistoryEntry } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { HistoryForm } from './HistoryForm';
import {
  History,
  Plus,
  AlertCircle,
  Wrench,
  Settings,
  Clock,
  CheckCircle2,
  User,
  DollarSign,
  X,
  Calendar,
} from 'lucide-react';

interface PrinterHistoryPanelProps {
  printer: Printer;
  onAddHistory: (printerId: string, entry: Omit<HistoryEntry, 'id'>) => void;
  onClose: () => void;
}

const typeConfig = {
  falla: { label: 'Falla', icon: AlertCircle, color: 'text-red-500 bg-red-50' },
  reparacion: { label: 'Reparación', icon: Wrench, color: 'text-blue-500 bg-blue-50' },
  mantenimiento: { label: 'Mantenimiento', icon: Settings, color: 'text-green-500 bg-green-50' },
};

const statusConfig = {
  pendiente: { label: 'Pendiente', variant: 'secondary' as const },
  en_proceso: { label: 'En Proceso', variant: 'default' as const },
  completado: { label: 'Completado', variant: 'default' as const },
};

export function PrinterHistoryPanel({ printer, onAddHistory, onClose }: PrinterHistoryPanelProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddEntry = (entry: Omit<HistoryEntry, 'id'>) => {
    onAddHistory(printer.id, entry);
    setIsFormOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl z-50 flex flex-col">
        <div className="flex-shrink-0 bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="size-4" />
              </Button>
              <div>
                <h2 className="text-slate-900">Historial de Fallas y Reparaciones</h2>
                <p className="text-sm text-slate-600 mt-0.5">
                  {printer.name} - {printer.serialNumber}
                </p>
              </div>
            </div>
            <Button size="sm" onClick={() => setIsFormOpen(true)}>
              <Plus className="size-4 mr-2" />
              Agregar
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-red-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="size-4 text-red-500" />
                <span className="text-xs text-red-700">Fallas</span>
              </div>
              <p className="text-red-900">
                {printer.history.filter((h) => h.type === 'falla').length}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="size-4 text-blue-500" />
                <span className="text-xs text-blue-700">Reparaciones</span>
              </div>
              <p className="text-blue-900">
                {printer.history.filter((h) => h.type === 'reparacion').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Settings className="size-4 text-green-500" />
                <span className="text-xs text-green-700">Mantenimientos</span>
              </div>
              <p className="text-green-900">
                {printer.history.filter((h) => h.type === 'mantenimiento').length}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-slate-200">
            {printer.history.length === 0 ? (
              <div className="p-12 text-center">
                <History className="size-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No hay registros en el historial</p>
                <p className="text-sm text-slate-400 mt-1">
                  Agrega el primer registro de falla, reparación o mantenimiento
                </p>
              </div>
            ) : (
              printer.history.map((entry) => {
                const typeInfo = typeConfig[entry.type];
                const TypeIcon = typeInfo.icon;

                return (
                  <div key={entry.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${typeInfo.color}`}
                      >
                        <TypeIcon className="size-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-slate-900">
                                {typeInfo.label}
                              </span>
                              <Badge variant={statusConfig[entry.status].variant}>
                                {entry.status === 'completado' && (
                                  <CheckCircle2 className="size-3 mr-1" />
                                )}
                                {entry.status === 'en_proceso' && (
                                  <Clock className="size-3 mr-1" />
                                )}
                                {statusConfig[entry.status].label}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-700 mb-3">{entry.description}</p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="size-4" />
                            {new Date(entry.date).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </div>

                          {entry.technician && (
                            <div className="flex items-center gap-1.5">
                              <User className="size-4" />
                              {entry.technician}
                            </div>
                          )}

                          {entry.cost !== undefined && entry.cost > 0 && (
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="size-4" />
                              <span>S/ {entry.cost.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {isFormOpen && (
        <HistoryForm onSave={handleAddEntry} onClose={() => setIsFormOpen(false)} />
      )}
    </>
  );
}
