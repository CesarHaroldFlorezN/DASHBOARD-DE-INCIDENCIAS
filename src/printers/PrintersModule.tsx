import { useState } from 'react';
import { PrinterList } from './components/PrinterList';
import { PrinterForm } from './components/PrinterForm';
import { PrinterDetails } from './components/PrinterDetails';
import { PrinterFilters } from './components/PrinterFilters';
import { PrinterHistoryPanel } from './components/PrinterHistoryPanel';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';

export interface Printer {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  sede: string;
  status: 'online' | 'offline' | 'printing' | 'error';
  ipAddress: string;
  inkLevels: {
    cyan: number;
    magenta: number;
    yellow: number;
    black: number;
  };
  paperLevel: number;
  jobsInQueue: number;
  lastMaintenance: string;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  id: string;
  date: string;
  type: 'falla' | 'reparacion' | 'mantenimiento';
  description: string;
  technician?: string;
  cost?: number;
  status: 'pendiente' | 'en_proceso' | 'completado';
}

const initialPrinters: Printer[] = [
  {
    id: '1',
    name: 'Impresora Principal',
    model: 'HP LaserJet Pro M404dn',
    serialNumber: 'HP-2024-001-MLK',
    sede: 'Mega Centro Dueñas',
    status: 'online',
    ipAddress: '192.168.1.100',
    inkLevels: { cyan: 75, magenta: 60, yellow: 80, black: 45 },
    paperLevel: 85,
    jobsInQueue: 3,
    lastMaintenance: '2025-10-15',
    history: [
      {
        id: '1-1',
        date: '2025-10-15',
        type: 'mantenimiento',
        description: 'Mantenimiento preventivo programado',
        technician: 'Juan Pérez',
        cost: 150,
        status: 'completado',
      },
      {
        id: '1-2',
        date: '2025-09-20',
        type: 'reparacion',
        description: 'Reemplazo de rodillo de transferencia',
        technician: 'María González',
        cost: 280,
        status: 'completado',
      },
      {
        id: '1-3',
        date: '2025-08-10',
        type: 'falla',
        description: 'Atasco de papel recurrente',
        technician: 'Juan Pérez',
        cost: 0,
        status: 'completado',
      },
    ],
  },
  {
    id: '2',
    name: 'Impresora Diseño',
    model: 'Canon PIXMA PRO-200',
    serialNumber: 'CN-2024-042-XYZ',
    sede: 'Mega Centro Dueñas',
    status: 'printing',
    ipAddress: '192.168.1.101',
    inkLevels: { cyan: 20, magenta: 35, yellow: 50, black: 65 },
    paperLevel: 60,
    jobsInQueue: 7,
    lastMaintenance: '2025-11-01',
    history: [
      {
        id: '2-1',
        date: '2025-11-15',
        type: 'falla',
        description: 'Nivel de tinta cian bajo - requiere reemplazo',
        status: 'pendiente',
      },
      {
        id: '2-2',
        date: '2025-11-01',
        type: 'mantenimiento',
        description: 'Limpieza de cabezales de impresión',
        technician: 'Carlos Ruiz',
        cost: 120,
        status: 'completado',
      },
    ],
  },
  {
    id: '3',
    name: 'Impresora Recepción',
    model: 'Epson EcoTank L3250',
    serialNumber: 'EP-2023-128-ABC',
    sede: 'Mega Huachipa',
    status: 'offline',
    ipAddress: '192.168.1.102',
    inkLevels: { cyan: 90, magenta: 85, yellow: 88, black: 92 },
    paperLevel: 30,
    jobsInQueue: 0,
    lastMaintenance: '2025-09-20',
    history: [
      {
        id: '3-1',
        date: '2025-11-20',
        type: 'falla',
        description: 'Impresora no se conecta a la red',
        technician: 'Roberto Sánchez',
        status: 'en_proceso',
      },
      {
        id: '3-2',
        date: '2025-09-20',
        type: 'reparacion',
        description: 'Reemplazo de tarjeta de red',
        technician: 'Roberto Sánchez',
        cost: 350,
        status: 'completado',
      },
    ],
  },
  {
    id: '4',
    name: 'Impresora Contabilidad',
    model: 'Brother HL-L2350DW',
    serialNumber: 'BR-2024-067-QWE',
    sede: 'Mega Huachipa',
    status: 'error',
    ipAddress: '192.168.1.103',
    inkLevels: { cyan: 0, magenta: 0, yellow: 0, black: 15 },
    paperLevel: 95,
    jobsInQueue: 12,
    lastMaintenance: '2025-08-10',
    history: [
      {
        id: '4-1',
        date: '2025-11-22',
        type: 'falla',
        description: 'Error de tóner vacío - no imprime',
        status: 'pendiente',
      },
      {
        id: '4-2',
        date: '2025-10-05',
        type: 'falla',
        description: 'Calidad de impresión deficiente',
        technician: 'Juan Pérez',
        cost: 0,
        status: 'completado',
      },
      {
        id: '4-3',
        date: '2025-08-10',
        type: 'mantenimiento',
        description: 'Limpieza general y calibración',
        technician: 'María González',
        cost: 100,
        status: 'completado',
      },
    ],
  },
  {
    id: '5',
    name: 'Impresora Legal',
    model: 'HP LaserJet Enterprise M507dn',
    serialNumber: 'HP-2024-089-RTY',
    sede: 'Mega Centro Dueñas',
    status: 'online',
    ipAddress: '192.168.1.104',
    inkLevels: { cyan: 55, magenta: 70, yellow: 65, black: 80 },
    paperLevel: 75,
    jobsInQueue: 2,
    lastMaintenance: '2025-11-10',
    history: [
      {
        id: '5-1',
        date: '2025-11-10',
        type: 'mantenimiento',
        description: 'Mantenimiento preventivo trimestral',
        technician: 'Carlos Ruiz',
        cost: 180,
        status: 'completado',
      },
    ],
  },
];

export default function PrintersModule() {
  const [printers, setPrinters] = useState<Printer[]>(initialPrinters);
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPrinter, setEditingPrinter] = useState<Printer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSede, setSelectedSede] = useState('all');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Get unique sedes for filter
  const sedes = Array.from(new Set(printers.map((p) => p.sede))).sort();

  // Filter printers based on search and sede
  const filteredPrinters = printers.filter((printer) => {
    const matchesSearch =
      searchQuery === '' ||
      printer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      printer.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      printer.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSede = selectedSede === 'all' || printer.sede === selectedSede;

    return matchesSearch && matchesSede;
  });

  const handleAddPrinter = (printer: Omit<Printer, 'id'>) => {
    const newPrinter = {
      ...printer,
      id: Date.now().toString(),
    };
    setPrinters([...printers, newPrinter]);
    setIsFormOpen(false);
  };

  const handleEditPrinter = (printer: Printer) => {
    setPrinters(printers.map((p) => (p.id === printer.id ? printer : p)));
    setEditingPrinter(null);
    setIsFormOpen(false);
  };

  const handleDeletePrinter = (id: string) => {
    setPrinters(printers.filter((p) => p.id !== id));
    if (selectedPrinter?.id === id) {
      setSelectedPrinter(null);
    }
  };

  const handleAddHistory = (printerId: string, entry: Omit<HistoryEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: `${printerId}-${Date.now()}`,
    };
    
    setPrinters(
      printers.map((p) =>
        p.id === printerId
          ? { ...p, history: [newEntry, ...p.history] }
          : p
      )
    );
    
    // Update selected printer if it's the one being modified
    if (selectedPrinter?.id === printerId) {
      setSelectedPrinter({
        ...selectedPrinter,
        history: [newEntry, ...selectedPrinter.history],
      });
    }
  };

  const handleOpenEdit = (printer: Printer) => {
    setEditingPrinter(printer);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPrinter(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-slate-900">Gestión de Impresoras</h1>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="size-4 mr-2" />
              Agregar Impresora
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <PrinterFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSede={selectedSede}
            onSedeChange={setSelectedSede}
            sedes={sedes}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PrinterList
              printers={filteredPrinters}
              selectedPrinter={selectedPrinter}
              onSelectPrinter={setSelectedPrinter}
              onDeletePrinter={handleDeletePrinter}
              onEditPrinter={handleOpenEdit}
            />
          </div>
          <div className="lg:col-span-1">
            {selectedPrinter ? (
              <PrinterDetails 
                printer={selectedPrinter} 
                onAddHistory={handleAddHistory}
                onOpenHistory={() => setIsHistoryOpen(true)}
              />
            ) : (
              <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
                <p className="text-slate-500">
                  Selecciona una impresora para ver los detalles
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {isFormOpen && (
        <PrinterForm
          printer={editingPrinter}
          onSave={editingPrinter ? handleEditPrinter : handleAddPrinter}
          onClose={handleCloseForm}
        />
      )}

      {isHistoryOpen && selectedPrinter && (
        <PrinterHistoryPanel
          printer={selectedPrinter}
          onAddHistory={handleAddHistory}
          onClose={() => setIsHistoryOpen(false)}
        />
      )}
    </div>
  );
}