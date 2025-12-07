import { Printer } from '../App';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  Network,
  Calendar,
  FileText,
  Circle,
  Droplet,
  FileStack,
  Hash,
  Building2,
} from 'lucide-react';

interface PrinterDetailsProps {
  printer: Printer;
  onAddHistory: (printer: Printer) => void;
  onOpenHistory: () => void;
}

const statusConfig = {
  online: { label: 'En Línea', color: 'bg-green-500', variant: 'default' as const },
  offline: { label: 'Fuera de Línea', color: 'bg-slate-400', variant: 'secondary' as const },
  printing: { label: 'Imprimiendo', color: 'bg-blue-500', variant: 'default' as const },
  error: { label: 'Error', color: 'bg-red-500', variant: 'destructive' as const },
};

const inkColors = {
  cyan: { label: 'Cian', color: 'bg-cyan-500' },
  magenta: { label: 'Magenta', color: 'bg-pink-500' },
  yellow: { label: 'Amarillo', color: 'bg-yellow-400' },
  black: { label: 'Negro', color: 'bg-slate-900' },
};

export function PrinterDetails({ printer, onAddHistory, onOpenHistory }: PrinterDetailsProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 sticky top-24">
      <div className="p-4 border-b border-slate-200">
        <h2>Detalles de Impresora</h2>
      </div>
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-slate-900">{printer.name}</h3>
          <p className="text-slate-600 text-sm mt-1">{printer.model}</p>
          <div className="mt-3">
            <Badge variant={statusConfig[printer.status].variant}>
              <Circle
                className={`size-2 fill-current mr-2 ${
                  statusConfig[printer.status].color
                } text-transparent`}
              />
              {statusConfig[printer.status].label}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Hash className="size-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-500">Número de Serie</p>
              <p className="text-sm text-slate-900">{printer.serialNumber}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Building2 className="size-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-500">Sede</p>
              <p className="text-sm text-slate-900">{printer.sede}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Network className="size-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-500">Dirección IP</p>
              <p className="text-sm text-slate-900">{printer.ipAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="size-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-500">Último Mantenimiento</p>
              <p className="text-sm text-slate-900">
                {new Date(printer.lastMaintenance).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="size-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-500">Trabajos en Cola</p>
              <p className="text-sm text-slate-900">{printer.jobsInQueue}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Droplet className="size-4 text-slate-600" />
            <h3 className="text-slate-900">Niveles de Tinta</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(printer.inkLevels).map(([color, level]) => (
              <div key={color}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-600">
                    {inkColors[color as keyof typeof inkColors].label}
                  </span>
                  <span className="text-sm text-slate-900">{level}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      inkColors[color as keyof typeof inkColors].color
                    }`}
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <FileStack className="size-4 text-slate-600" />
            <h3 className="text-slate-900">Nivel de Papel</h3>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-slate-600">Bandeja Principal</span>
              <span className="text-sm text-slate-900">{printer.paperLevel}%</span>
            </div>
            <Progress value={printer.paperLevel} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}