import { TrendingUp, AlertTriangle, Activity, Clock, UserX } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const kpis = [
  {
    title: 'Incidencias abiertas hoy',
    value: '32',
    subtitle: 'Total de tickets creados en las últimas 24h',
    icon: TrendingUp,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 h-full">
            <CardContent className="p-6 lg:p-8 flex flex-col justify-between h-full min-h-[280px]">
              <div className="flex items-center justify-center mb-4">
                <div className={`${kpi.iconBg} p-4 rounded-2xl shadow-md`}>
                  <Icon className={`h-8 w-8 ${kpi.iconColor}`} />
                </div>
              </div>
              
              <div className="text-center space-y-3 flex-1 flex flex-col justify-center">
                <p className="text-sm text-slate-600">{kpi.title}</p>
                <p className="text-slate-900 text-6xl">{kpi.value}</p>
                
                {kpi.progress !== undefined && (
                  <Progress 
                    value={kpi.progress} 
                    className={`h-2 mt-3 ${
                      kpi.progress >= 95 ? 'bg-green-100' :
                      kpi.progress >= 80 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}
                  />
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-center text-slate-600">{kpi.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}