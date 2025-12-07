import { useState, useEffect } from 'react';
import { Printer, HistoryEntry } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { X } from 'lucide-react';

interface PrinterFormProps {
  printer: Printer | null;
  onSave: (printer: any) => void;
  onClose: () => void;
}

export function PrinterForm({ printer, onSave, onClose }: PrinterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    serialNumber: '',
    sede: '',
    status: 'online' as Printer['status'],
    ipAddress: '',
    inkLevels: { cyan: 100, magenta: 100, yellow: 100, black: 100 },
    paperLevel: 100,
    jobsInQueue: 0,
    lastMaintenance: new Date().toISOString().split('T')[0],
    history: [] as HistoryEntry[],
  });

  useEffect(() => {
    if (printer) {
      setFormData(printer);
    }
  }, [printer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInkLevelChange = (color: string, value: string) => {
    const numValue = Math.min(100, Math.max(0, parseInt(value) || 0));
    setFormData({
      ...formData,
      inkLevels: { ...formData.inkLevels, [color]: numValue },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h2>{printer ? 'Editar Impresora' : 'Agregar Impresora'}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Modelo *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber">Número de Serie *</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) =>
                  setFormData({ ...formData, serialNumber: e.target.value })
                }
                placeholder="HP-2024-001-MLK"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sede">Sede *</Label>
              <Select
                value={formData.sede}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, sede: value })
                }
              >
                <SelectTrigger id="sede">
                  <SelectValue placeholder="Selecciona una sede" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mega Centro Dueñas">Mega Centro Dueñas</SelectItem>
                  <SelectItem value="Mega Huachipa">Mega Huachipa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ipAddress">Dirección IP *</Label>
              <Input
                id="ipAddress"
                value={formData.ipAddress}
                onChange={(e) =>
                  setFormData({ ...formData, ipAddress: e.target.value })
                }
                placeholder="192.168.1.100"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Printer['status']) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">En Línea</SelectItem>
                  <SelectItem value="offline">Fuera de Línea</SelectItem>
                  <SelectItem value="printing">Imprimiendo</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastMaintenance">Último Mantenimiento</Label>
              <Input
                id="lastMaintenance"
                type="date"
                value={formData.lastMaintenance}
                onChange={(e) =>
                  setFormData({ ...formData, lastMaintenance: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paperLevel">Nivel de Papel (%)</Label>
              <Input
                id="paperLevel"
                type="number"
                min="0"
                max="100"
                value={formData.paperLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paperLevel: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobsInQueue">Trabajos en Cola</Label>
              <Input
                id="jobsInQueue"
                type="number"
                min="0"
                value={formData.jobsInQueue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jobsInQueue: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-slate-900 mb-4">Niveles de Tinta (%)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cyan">Cian</Label>
                <Input
                  id="cyan"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.inkLevels.cyan}
                  onChange={(e) => handleInkLevelChange('cyan', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="magenta">Magenta</Label>
                <Input
                  id="magenta"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.inkLevels.magenta}
                  onChange={(e) =>
                    handleInkLevelChange('magenta', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yellow">Amarillo</Label>
                <Input
                  id="yellow"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.inkLevels.yellow}
                  onChange={(e) =>
                    handleInkLevelChange('yellow', e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="black">Negro</Label>
                <Input
                  id="black"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.inkLevels.black}
                  onChange={(e) => handleInkLevelChange('black', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {printer ? 'Guardar Cambios' : 'Agregar Impresora'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}