import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search } from 'lucide-react';

interface PrinterFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSede: string;
  onSedeChange: (sede: string) => void;
  sedes: string[];
}

export function PrinterFilters({
  searchQuery,
  onSearchChange,
  selectedSede,
  onSedeChange,
  sedes,
}: PrinterFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              id="search"
              placeholder="Nombre, modelo, número de serie..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sede-filter">Filtrar por Sede</Label>
          <Select value={selectedSede} onValueChange={onSedeChange}>
            <SelectTrigger id="sede-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Sedes</SelectItem>
              {sedes.map((sede) => (
                <SelectItem key={sede} value={sede}>
                  {sede}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}