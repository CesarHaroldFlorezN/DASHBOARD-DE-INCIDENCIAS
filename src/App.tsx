import { useState } from 'react';
import PrintersModule from "./printers/PrintersModule";
import { DashboardHeader } from './components/dashboard-header';
import { SidebarMenu } from './components/sidebar-menu';
import { FiltersBar } from './components/filters-bar';
import { KPICards } from './components/kpi-cards';
import { IncidentsTable } from './components/incidents-table';
import { SidebarWidgets } from './components/sidebar-widgets';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 👇 NUEVO: qué vista se está mostrando
  const [activeView, setActiveView] = useState<'dashboard' | 'printers'>('dashboard');

  const [selectedRole, setSelectedRole] = useState('supervisora-operaciones');
  const [filters, setFilters] = useState({
    sede: '',
    estado: [] as string[],
    prioridad: [] as string[],
    tecnico: '',
    fechaInicio: '',
    fechaFin: ''
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
      
      <SidebarMenu 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        // 👇 NUEVO: el menú avisa qué pantalla queremos ver
        onChangeView={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false); // cerramos el menú al cambiar
        }}
      />
      
      {/* 👇 Vista DASHBOARD (lo que ya tenías) */}
      {activeView === 'dashboard' && (
        <main className="pt-16">
          <FiltersBar 
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            filters={filters}
            onFiltersChange={setFilters}
          />
          
          <div className="px-4 lg:px-6 py-4 lg:py-5">
            <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
              <KPICards />
              <SidebarWidgets />
            </div>
            
            <div className="mt-4 lg:mt-5">
              <IncidentsTable 
                selectedRole={selectedRole} 
                filters={filters}
              />
            </div>
          </div>
        </main>
      )}

      {/* 👇 Vista MÓDULO DE IMPRESORAS */}
      {activeView === 'printers' && (
        <main className="pt-16">
          <PrintersModule />
        </main>
      )}
    </div>
  );
}
