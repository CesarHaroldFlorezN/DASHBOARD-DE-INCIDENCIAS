// src/components/sidebar-menu.tsx
import {
  LogIn,
  LayoutDashboard,
  FilePlus,
  FileText,
  Printer,
  BarChart3,
  AlertCircle,
  Wrench,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Button } from "./ui/button";

type View = "dashboard" | "printers";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeView?: (view: View) => void;
}

const menuItems = [
  { id: "login", icon: LogIn, label: "Pantalla de Login" },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Panel principal (Dashboard de incidencias)",
  },
  { id: "registro", icon: FilePlus, label: "Registro de incidencia" },
  { id: "detalle", icon: FileText, label: "Detalle de incidencia" },
  { id: "printers", icon: Printer, label: "Módulo de impresoras" },
  { id: "reportes", icon: BarChart3, label: "Reportes visuales (gráficas)" },
  { id: "comunes", icon: AlertCircle, label: "Incidencias más comunes" },
  { id: "atencion", icon: Wrench, label: "Atención de Incidencia" },
];

export function SidebarMenu({ isOpen, onClose, onChangeView }: SidebarMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <SheetTitle>Menú de Navegación</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetDescription className="sr-only">
            Navegación principal del sistema de incidencias
          </SheetDescription>
        </SheetHeader>

        <nav className="py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const handleClick = (e: React.MouseEvent) => {
              e.preventDefault();

              if (item.id === "dashboard") {
                onChangeView?.("dashboard");
              } else if (item.id === "printers") {
                onChangeView?.("printers");
              }

              onClose();
            };

            return (
              <button
                key={item.id}
                onClick={handleClick}
                className="w-full text-left flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200">
          <div className="flex items-center gap-2 text-slate-600">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs">PBS</span>
            </div>
            <div>
              <p className="text-xs">Sistema de Incidencias</p>
              <p className="text-xs text-slate-500">v2.0.1</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
