import { Search, Bell, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-slate-100"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white">PBS</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                <span className="text-white">AC</span>
              </div>
            </div>
            
            <div className="border-l border-slate-300 h-8 mx-2" />
            
            <div>
              <h1 className="text-slate-900">Dashboard de Incidencias</h1>
              <p className="text-xs text-slate-500">Sistema PBS – AC Corporativo</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Buscar por ticket, serie, sede, usuario…"
              className="pl-10 bg-slate-50 border-slate-200"
            />
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-100 relative"
            >
              <Bell className="h-5 w-5 text-slate-700" />
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500"
              >
                7
              </Badge>
            </Button>
          </div>
          
          <div className="border-l border-slate-300 h-8 mx-2" />
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-slate-900">Laura Martínez</p>
              <p className="text-xs text-slate-500">Supervisora de Operaciones PBS</p>
            </div>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Laura" />
              <AvatarFallback>LM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
