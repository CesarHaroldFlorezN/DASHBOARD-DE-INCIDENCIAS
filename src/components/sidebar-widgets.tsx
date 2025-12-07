import { AlertCircle, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const estadosData = [
  { name: 'Abierto', value: 15, color: '#ef4444' },
  { name: 'Pendiente', value: 8, color: '#eab308' },
  { name: 'Resuelto', value: 12, color: '#22c55e' },
];

const sedesData = [
  { name: 'Mega centro dueñas', incidencias: 45 },
  { name: 'Mega huachipa', incidencias: 32 },
];

const alertasSLA = [
  {
    id: 'INC-2024-1247',
    sede: 'Lima Centro',
    area: 'Facturación',
    horaCreacion: '08:32',
    tiempoRestante: 'SLA vencido hace 24m',
    critico: true,
  },
  {
    id: 'INC-2024-1246',
    sede: 'Lima Norte',
    area: 'Logística',
    horaCreacion: '07:15',
    tiempoRestante: '21m restantes',
    critico: false,
  },
  {
    id: 'INC-2024-1245',
    sede: 'Trujillo',
    area: 'Ventas',
    horaCreacion: '06:48',
    tiempoRestante: 'SLA vencido hace 1h 8m',
    critico: true,
  },
];

const incidenciasComunes = [
  { falla: 'Atasco de papel', casos: 18, porcentaje: 22.5 },
  { falla: 'Windows no arranca', casos: 15, porcentaje: 18.8 },
  { falla: 'No enciende', casos: 12, porcentaje: 15.0 },
  { falla: 'Pantalla sin imagen', casos: 10, porcentaje: 12.5 },
  { falla: 'Error de impresión', casos: 8, porcentaje: 10.0 },
];

export function SidebarWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="border-slate-200">
        <CardHeader className="pb-2 lg:pb-3 p-4 lg:p-5">
          <CardTitle className="text-slate-900">Estado general de incidencias</CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-5 pt-0 lg:pt-0">
          <div className="h-40 lg:h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estadosData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {estadosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {estadosData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-slate-600 truncate">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="pb-2 lg:pb-3 p-4 lg:p-5">
          <CardTitle className="text-slate-900">Incidencias por sede</CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-5 pt-0 lg:pt-0">
          <div className="h-40 lg:h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sedesData} layout="vertical">
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={70}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip />
                <Bar dataKey="incidencias" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="pb-2 lg:pb-3 p-4 lg:p-5">
          <CardTitle className="text-slate-900">Incidencias más comunes</CardTitle>
          <p className="text-xs text-slate-500">TOP 5 tipos de fallas</p>
        </CardHeader>
        <CardContent className="space-y-2 p-4 lg:p-5 pt-0 lg:pt-0">
          <div className="space-y-2.5 max-h-44 overflow-y-auto">
            {incidenciasComunes.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-700 text-xs truncate flex-1">{item.falla}</span>
                  <Button variant="ghost" size="sm" className="h-5 text-xs px-2 ml-1 flex-shrink-0">
                    <BookOpen className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-600 w-10 text-right flex-shrink-0">
                    {item.casos}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}