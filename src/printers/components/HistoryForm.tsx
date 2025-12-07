import { useState } from 'react';
import { HistoryEntry } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { X } from 'lucide-react';

interface HistoryFormProps {
  onSave: (entry: Omit<HistoryEntry, 'id'>) => void;
  onClose: () => void;
}

export function HistoryForm({ onSave, onClose }: HistoryFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'falla' as HistoryEntry['type'],
    description: '',
    technician: '',
    cost: '',
    status: 'pendiente' as HistoryEntry['status'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date: formData.date,
      type: formData.type,
      description: formData.description,
      technician: formData.technician || undefined,
      cost: formData.cost ? parseFloat(formData.cost) : undefined,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h2>Agregar Registro al Historial</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Fecha *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: HistoryEntry['type']) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="falla">Falla</SelectItem>
                <SelectItem value="reparacion">Reparación</SelectItem>
                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe el problema, reparación o mantenimiento..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado *</Label>
            <Select
              value={formData.status}
              onValueChange={(value: HistoryEntry['status']) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="en_proceso">En Proceso</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technician">Técnico</Label>
            <Input
              id="technician"
              value={formData.technician}
              onChange={(e) =>
                setFormData({ ...formData, technician: e.target.value })
              }
              placeholder="Nombre del técnico (opcional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Costo (S/)</Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              min="0"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              placeholder="0.00"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Agregar Registro</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
