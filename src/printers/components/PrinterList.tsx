import { Printer } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Printer as PrinterIcon, Pencil, Trash2, Circle } from 'lucide-react';

interface PrinterListProps {
  printers: Printer[];
  selectedPrinter: Printer | null;
  onSelectPrinter: (printer: Printer) => void;
  onDeletePrinter: (id: string) => void;
  onEditPrinter: (printer: Printer) => void;
}

const statusConfig = {
  online: { label: 'En Línea', color: 'bg-green-500' },
  offline: { label: 'Fuera de Línea', color: 'bg-slate-400' },
  printing: { label: 'Imprimiendo', color: 'bg-blue-500' },
  error: { label: 'Error', color: 'bg-red-500' },
};

export function PrinterList({
  printers,
  selectedPrinter,
  onSelectPrinter,
  onDeletePrinter,
  onEditPrinter,
}: PrinterListProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h2>Impresoras ({printers.length})</h2>
      </div>
      <div className="divide-y divide-slate-200">
        {printers.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No hay impresoras registradas
          </div>
        ) : (
          printers.map((printer) => (
            <div
              key={printer.id}
              className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                selectedPrinter?.id === printer.id ? 'bg-slate-50' : ''
              }`}
              onClick={() => onSelectPrinter(printer)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <PrinterIcon className="size-6 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 truncate">
                        {printer.name}
                      </h3>
                      <p className="text-slate-600 text-sm truncate">
                        {printer.model}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-slate-500 text-xs">
                          S/N: {printer.serialNumber}
                        </p>
                        <span className="text-slate-300">•</span>
                        <p className="text-slate-500 text-xs">{printer.sede}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditPrinter(printer);
                        }}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePrinter(printer.id);
                        }}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <Circle
                        className={`size-2 fill-current ${
                          statusConfig[printer.status].color
                        } text-transparent`}
                      />
                      <span className="text-sm text-slate-600">
                        {statusConfig[printer.status].label}
                      </span>
                    </div>
                    {printer.jobsInQueue > 0 && (
                      <Badge variant="secondary">
                        {printer.jobsInQueue} trabajos en cola
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}