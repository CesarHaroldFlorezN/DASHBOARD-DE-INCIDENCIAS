import { Filter, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';

interface FiltersBarProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  filters: {
    sede: string;
    estado: string[];
    prioridad: string[];
    tecnico: string;
    fechaInicio: string;
    fechaFin: string;
  };
  onFiltersChange: (filters: any) => void;
}

const roles = [
  { value: 'soporte-tecnico', label: 'Soporte Técnico PBS' },
  { value: 'supervisora-operaciones', label: 'Supervisora de Operaciones PBS' },
  { value: 'jefa-ti', label: 'Jefa de TI AC' },
  { value: 'analista-computo', label: 'Analista de Cómputo' },
  { value: 'asistente-cuenta', label: 'Asistente de Cuenta PBS' },
];

const sedes = ['Todas', 'Mega centro dueñas', 'Mega huachipa'];

const estados = ['Abierto', 'Pendiente', 'Resuelto'];

const prioridades = ['Baja', 'Media', 'Alta'];

const tecnicos = ['Todos', 'Juan Pérez', 'María González', 'Carlos Ruiz', 'Ana Torres'];

export function FiltersBar({ selectedRole, onRoleChange, filters, onFiltersChange }: FiltersBarProps) {
  const toggleEstado = (estado: string) => {
    const newEstados = filters.estado.includes(estado)
      ? filters.estado.filter(e => e !== estado)
      : [...filters.estado, estado];
    onFiltersChange({ ...filters, estado: newEstados });
  };

  const togglePrioridad = (prioridad: string) => {
    const newPrioridades = filters.prioridad.includes(prioridad)
      ? filters.prioridad.filter(p => p !== prioridad)
      : [...filters.prioridad, prioridad];
    onFiltersChange({ ...filters, prioridad: newPrioridades });
  };

  const estadoColors: Record<string, string> = {
    'Abierto': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    'Pendiente': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'Resuelto': 'bg-green-100 text-green-800 hover:bg-green-200',
  };

  const prioridadColors: Record<string, string> = {
    'Baja': 'bg-slate-100 text-slate-800 hover:bg-slate-200',
    'Media': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    'Alta': 'bg-red-100 text-red-800 hover:bg-red-200',
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 lg:px-6 py-2 lg:py-3">
        {/* Mobile: stacked layout */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700">Filtros y vista personalizada</span>
          </div>
          
          <div>
            <label className="text-xs text-slate-600 mb-1 block">Vista por rol</label>
            <Select value={selectedRole} onValueChange={onRoleChange}>
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">Sede</label>
              <Select 
                value={filters.sede} 
                onValueChange={(value) => onFiltersChange({ ...filters, sede: value })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccionar sede" />
                </SelectTrigger>
                <SelectContent>
                  {sedes.map(sede => (
                    <SelectItem key={sede} value={sede}>
                      {sede}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-xs text-slate-600 mb-1 block">Técnico asignado</label>
              <Select 
                value={filters.tecnico} 
                onValueChange={(value) => onFiltersChange({ ...filters, tecnico: value })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Seleccionar técnico" />
                </SelectTrigger>
                <SelectContent>
                  {tecnicos.map(tecnico => (
                    <SelectItem key={tecnico} value={tecnico}>
                      {tecnico}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-xs text-slate-600 mb-1 block">Fecha inicio</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.fechaInicio}
                  onChange={(e) => onFiltersChange({ ...filters, fechaInicio: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-slate-300 text-sm"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="text-xs text-slate-600 mb-1 block">Fecha fin</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.fechaFin}
                  onChange={(e) => onFiltersChange({ ...filters, fechaFin: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-slate-300 text-sm"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-xs text-slate-600 mb-1 block">Estado</label>
            <div className="flex flex-wrap gap-1.5">
              {estados.map(estado => (
                <Badge
                  key={estado}
                  variant="outline"
                  className={`cursor-pointer transition-all text-xs ${
                    filters.estado.includes(estado)
                      ? estadoColors[estado]
                      : 'bg-white hover:bg-slate-50'
                  }`}
                  onClick={() => toggleEstado(estado)}
                >
                  {estado}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-xs text-slate-600 mb-1 block">Prioridad</label>
            <div className="flex flex-wrap gap-1.5">
              {prioridades.map(prioridad => (
                <Badge
                  key={prioridad}
                  variant="outline"
                  className={`cursor-pointer transition-all text-xs ${
                    filters.prioridad.includes(prioridad)
                      ? prioridadColors[prioridad]
                      : 'bg-white hover:bg-slate-50'
                  }`}
                  onClick={() => togglePrioridad(prioridad)}
                >
                  {prioridad}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onFiltersChange({
                sede: '',
                estado: [],
                prioridad: [],
                tecnico: '',
                fechaInicio: '',
                fechaFin: ''
              })}
            >
              Limpiar filtros
            </Button>
          </div>
        </div>

        {/* Desktop: compact horizontal layout */}
        <div className="hidden lg:flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-slate-700 text-sm">Filtros</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-600">Rol:</label>
            <Select value={selectedRole} onValueChange={onRoleChange}>
              <SelectTrigger className="bg-white h-8 text-sm w-[240px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="h-6 w-px bg-slate-200" />
          
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-600">Sede:</label>
            <Select 
              value={filters.sede} 
              onValueChange={(value) => onFiltersChange({ ...filters, sede: value })}
            >
              <SelectTrigger className="bg-white h-8 text-sm w-[130px]">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                {sedes.map(sede => (
                  <SelectItem key={sede} value={sede}>
                    {sede}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-600">Técnico:</label>
            <Select 
              value={filters.tecnico} 
              onValueChange={(value) => onFiltersChange({ ...filters, tecnico: value })}
            >
              <SelectTrigger className="bg-white h-8 text-sm w-[140px]">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {tecnicos.map(tecnico => (
                  <SelectItem key={tecnico} value={tecnico}>
                    {tecnico}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="h-6 w-px bg-slate-200" />
          
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-600">Desde:</label>
            <div className="relative">
              <input
                type="date"
                value={filters.fechaInicio}
                onChange={(e) => onFiltersChange({ ...filters, fechaInicio: e.target.value })}
                className="w-[130px] h-8 px-2 rounded-md border border-slate-300 text-xs"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-600">Hasta:</label>
            <div className="relative">
              <input
                type="date"
                value={filters.fechaFin}
                onChange={(e) => onFiltersChange({ ...filters, fechaFin: e.target.value })}
                className="w-[130px] h-8 px-2 rounded-md border border-slate-300 text-xs"
              />
            </div>
          </div>
          
          <div className="h-6 w-px bg-slate-200" />
          
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-600">Estado:</label>
            <div className="flex gap-1">
              {estados.map(estado => (
                <Badge
                  key={estado}
                  variant="outline"
                  className={`cursor-pointer transition-all text-xs h-6 px-2 ${
                    filters.estado.includes(estado)
                      ? estadoColors[estado]
                      : 'bg-white hover:bg-slate-50'
                  }`}
                  onClick={() => toggleEstado(estado)}
                >
                  {estado}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="h-6 w-px bg-slate-200" />
          
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-slate-600">Prioridad:</label>
            <div className="flex gap-1">
              {prioridades.map(prioridad => (
                <Badge
                  key={prioridad}
                  variant="outline"
                  className={`cursor-pointer transition-all text-xs h-6 px-2 ${
                    filters.prioridad.includes(prioridad)
                      ? prioridadColors[prioridad]
                      : 'bg-white hover:bg-slate-50'
                  }`}
                  onClick={() => togglePrioridad(prioridad)}
                >
                  {prioridad}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="h-8"
              onClick={() => onFiltersChange({
                sede: '',
                estado: [],
                prioridad: [],
                tecnico: '',
                fechaInicio: '',
                fechaFin: ''
              })}
            >
              Limpiar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}