import { Eye, Wrench, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState } from 'react';

interface IncidentsTableProps {
  selectedRole: string;
  filters: any;
}

const mockIncidents = [
  {
    id: 'INC-2024-1247',
    fecha: '2024-11-19 08:32',
    sede: 'Mega centro dueñas',
    area: 'Facturación',
    equipo: 'HP LaserJet P3015 - SN:2847291',
    tipoFalla: 'Atasco de papel',
    estado: 'Abierto',
    tecnico: 'Juan Pérez',
    prioridad: 'Alta',
    tiempoAbierto: '3h 24m',
  },
  {
    id: 'INC-2024-1246',
    fecha: '2024-11-19 07:15',
    sede: 'Mega huachipa',
    area: 'Logística',
    equipo: 'Dell OptiPlex 7090 - SN:7392847',
    tipoFalla: 'No enciende',
    estado: 'Abierto',
    tecnico: 'María García',
    prioridad: 'Alta',
    tiempoAbierto: '4h 41m',
  },
  {
    id: 'INC-2024-1245',
    fecha: '2024-11-19 06:48',
    sede: 'Mega centro dueñas',
    area: 'Ventas',
    equipo: 'Lenovo ThinkPad E15 - SN:9283746',
    tipoFalla: 'Pantalla sin imagen',
    estado: 'Pendiente',
    tecnico: 'Sin asignar',
    prioridad: 'Media',
    tiempoAbierto: '5h 8m',
  },
  {
    id: 'INC-2024-1244',
    fecha: '2024-11-18 16:22',
    sede: 'Mega huachipa',
    area: 'Recursos Humanos',
    equipo: 'HP ProDesk 400 - SN:1928374',
    tipoFalla: 'Windows no arranca',
    estado: 'Abierto',
    tecnico: 'Carlos López',
    prioridad: 'Alta',
    tiempoAbierto: '19h 34m',
  },
  {
    id: 'INC-2024-1243',
    fecha: '2024-11-18 14:55',
    sede: 'Mega centro dueñas',
    area: 'Facturación',
    equipo: 'Canon IR-ADV C5540i - SN:5647382',
    tipoFalla: 'Error de impresión',
    estado: 'Resuelto',
    tecnico: 'Ana Torres',
    prioridad: 'Baja',
    tiempoAbierto: '21h 1m',
  },
  {
    id: 'INC-2024-1242',
    fecha: '2024-11-18 13:30',
    sede: 'Mega huachipa',
    area: 'Contabilidad',
    equipo: 'Dell Latitude 5420 - SN:3847291',
    tipoFalla: 'Teclado no funciona',
    estado: 'Abierto',
    tecnico: 'Juan Pérez',
    prioridad: 'Media',
    tiempoAbierto: '22h 26m',
  },
  {
    id: 'INC-2024-1241',
    fecha: '2024-11-18 11:15',
    sede: 'Mega centro dueñas',
    area: 'Logística',
    equipo: 'HP EliteBook 840 - SN:9283741',
    tipoFalla: 'Batería no carga',
    estado: 'Pendiente',
    tecnico: 'Sin asignar',
    prioridad: 'Baja',
    tiempoAbierto: '1d 0h 41m',
  },
  {
    id: 'INC-2024-1240',
    fecha: '2024-11-18 09:45',
    sede: 'Mega huachipa',
    area: 'Ventas',
    equipo: 'Epson L3150 - SN:4738291',
    tipoFalla: 'No imprime en color',
    estado: 'Resuelto',
    tecnico: 'María García',
    prioridad: 'Media',
    tiempoAbierto: '1d 2h 11m',
  },
  {
    id: 'INC-2024-1239',
    fecha: '2024-11-17 17:30',
    sede: 'Mega centro dueñas',
    area: 'Gerencia',
    equipo: 'MacBook Pro 14 - SN:8374629',
    tipoFalla: 'Sistema operativo lento',
    estado: 'Abierto',
    tecnico: 'Carlos López',
    prioridad: 'Alta',
    tiempoAbierto: '1d 18h 26m',
  },
  {
    id: 'INC-2024-1238',
    fecha: '2024-11-17 15:20',
    sede: 'Mega huachipa',
    area: 'Facturación',
    equipo: 'HP LaserJet M404n - SN:6283749',
    tipoFalla: 'Atasco de papel',
    estado: 'Resuelto',
    tecnico: 'Ana Torres',
    prioridad: 'Media',
    tiempoAbierto: '1d 20h 36m',
  },
];

export function IncidentsTable({ selectedRole, filters }: IncidentsTableProps) {
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);

  const estadoColors: Record<string, string> = {
    'Abierto': 'bg-red-100 text-red-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Resuelto': 'bg-green-100 text-green-800',
  };

  const prioridadColors: Record<string, string> = {
    'Baja': 'bg-slate-100 text-slate-800',
    'Media': 'bg-orange-100 text-orange-800',
    'Alta': 'bg-red-100 text-red-800',
  };

  const roleLabels: Record<string, string> = {
    'soporte-tecnico': 'Soporte Técnico – PBS',
    'supervisora-operaciones': 'Supervisora de Operaciones – PBS',
    'jefa-ti': 'Jefa de TI – AC Corporativo',
    'analista-computo': 'Analista de Cómputo Distribuido – AC',
    'asistente-cuenta': 'Asistente de la Cuenta PBS',
  };

  const filteredIncidents = mockIncidents.filter(incident => {
    if (filters.sede && filters.sede !== 'Todas' && incident.sede !== filters.sede) return false;
    if (filters.estado.length > 0 && !filters.estado.includes(incident.estado)) return false;
    if (filters.prioridad.length > 0 && !filters.prioridad.includes(incident.prioridad)) return false;
    if (filters.tecnico && filters.tecnico !== 'Todos' && incident.tecnico !== filters.tecnico) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredIncidents.length / parseInt(itemsPerPage));
  const startIndex = (currentPage - 1) * parseInt(itemsPerPage);
  const endIndex = startIndex + parseInt(itemsPerPage);
  const paginatedIncidents = filteredIncidents.slice(startIndex, endIndex);

  return (
    <Card className="border-slate-200">
      <CardHeader className="border-b border-slate-200 bg-slate-50 p-4 lg:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Listado de incidencias</CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              Filtrado por: {roleLabels[selectedRole]}
              {filters.sede && filters.sede !== 'Todas' && ` • ${filters.sede}`}
              {filters.estado.length > 0 && ` • Estados: ${filters.estado.join(', ')}`}
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 shrink-0 h-9 text-sm">
            + Registrar nueva incidencia
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">
                  <div className="flex items-center gap-1">
                    ID Ticket
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Fecha creación
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Sede</TableHead>
                <TableHead>Área</TableHead>
                <TableHead className="min-w-[200px]">Equipo</TableHead>
                <TableHead>Tipo de falla</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Tiempo abierto</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedIncidents.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-slate-50">
                  <TableCell className="font-mono text-blue-700">
                    {incident.id}
                  </TableCell>
                  <TableCell className="text-slate-600 text-xs">
                    {incident.fecha}
                  </TableCell>
                  <TableCell>{incident.sede}</TableCell>
                  <TableCell>{incident.area}</TableCell>
                  <TableCell className="text-xs text-slate-600">
                    {incident.equipo}
                  </TableCell>
                  <TableCell>{incident.tipoFalla}</TableCell>
                  <TableCell>
                    <Badge className={estadoColors[incident.estado]}>
                      {incident.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {incident.tecnico === 'Sin asignar' ? (
                      <span className="text-red-600">{incident.tecnico}</span>
                    ) : (
                      incident.tecnico
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={prioridadColors[incident.prioridad]}>
                      {incident.prioridad}
                    </Badge>
                  </TableCell>
                  <TableCell className={
                    incident.tiempoAbierto.includes('d') || 
                    parseInt(incident.tiempoAbierto) > 8 
                      ? 'text-red-600' 
                      : 'text-slate-600'
                  }>
                    {incident.tiempoAbierto}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                        Ver
                      </Button>
                      {incident.estado !== 'Resuelto' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Wrench className="h-4 w-4 mr-1" />
                          Atender
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 text-xs">Mostrar</span>
            <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-slate-600 text-xs">
              por página. Mostrando {startIndex + 1}–{Math.min(endIndex, filteredIncidents.length)} de {filteredIncidents.length} incidencias
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    className={currentPage === pageNum ? "bg-blue-600" : ""}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}