
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CycleChart = () => {

    const { getLocalizedText } = useLanguage();

  const cycleData = [
    { date: 'May 15', day: 1, phase: 'Menstrual', length: 28, energy: 3 },
    { date: 'May 20', day: 6, phase: 'Follicular', length: 28, energy: 6 },
    { date: 'May 25', day: 11, phase: 'Follicular', length: 28, energy: 8 },
    { date: 'May 29', day: 15, phase: 'Ovulation', length: 28, energy: 9 },
    { date: 'Jun 3', day: 20, phase: 'Luteal', length: 28, energy: 7 },
    { date: 'Jun 8', day: 25, phase: 'Luteal', length: 28, energy: 5 },
    { date: 'Jun 12', day: 28, phase: 'Pre-menstrual', length: 28, energy: 4 },
    { date: 'Jun 15', day: 1, phase: 'Menstrual', length: 29, energy: 3 },
    { date: 'Jun 20', day: 6, phase: 'Follicular', length: 29, energy: 6 },
    { date: 'Jun 25', day: 11, phase: 'Follicular', length: 29, energy: 8 },
    { date: 'Jun 30', day: 16, phase: 'Ovulation', length: 29, energy: 10 },
    { date: 'Jul 5', day: 21, phase: 'Luteal', length: 29, energy: 7 }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (

        <>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-purple-200 dark:border-slate-700 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✨</span>
              <p className="font-semibold text-purple-800 dark:text-white">{`Date: ${label}`}</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{`Cycle Day: ${data.day}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{`Phase: ${data.phase}`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{`Cycle Length: ${data.length} days`}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{`Energy Level: ${data.energy}/10`}</p>
          </div>


        </>
      );
    }
    return null;
  };

  return (

    <>



      <Card className="relative overflow-hidden border border-purple-200">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:hidden"></div>
        <div className="absolute inset-0 hidden dark:block bg-slate-900"></div>

        <div className="absolute inset-0 opacity-30 dark:hidden">
          <div className="animate-pulse absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-300 via-purple-300 to-purple-400 rounded-full blur-xl animation-delay-0"></div>
          <div className="animate-pulse absolute top-1/2 left-0 w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-300 to-white rounded-full blur-lg animation-delay-1000"></div>
          <div className="animate-pulse absolute bottom-0 right-1/3 w-16 h-16 bg-gradient-to-br from-white via-purple-200 to-pink-200 rounded-full blur-md animation-delay-2000"></div>
          <div className="animate-pulse absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-300 rounded-full blur-sm animation-delay-500"></div>
          <div className="animate-pulse absolute bottom-1/4 left-1/4 w-14 h-14 bg-gradient-to-br from-purple-300 to-white rounded-full blur-lg animation-delay-1500"></div>

        </div>

        <div className="absolute inset-0 overflow-hidden dark:hidden">
          <div className="animate-bounce absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
          <div className="animate-bounce absolute top-8 right-8 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50 animation-delay-700"></div>
          <div className="animate-bounce absolute bottom-6 left-8 w-2.5 h-2.5 bg-purple-300 rounded-full opacity-40 animation-delay-1200"></div>
          <div className="animate-bounce absolute bottom-8 right-6 w-1 h-1 bg-pink-300 rounded-full opacity-70 animation-delay-300"></div>
        </div>

        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-lavender-500 via-lavender-600 to-lavender-800 rounded-full flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-lavender-800 via-lavender-800 to-lavender-800 bg-clip-text text-transparent font-bold">
              {getLocalizedText('cycle.journey.visualization')}
              </span>
              <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cycleData}>
                <defs>
                  <linearGradient id="cycleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e879f9" opacity={0.3} />
                <XAxis
                  dataKey="date"
                  stroke="#9333ea"
                  fontSize={10}
                  fontWeight="600"
                />
                <YAxis
                  stroke="#9333ea"
                  fontSize={10}
                  fontWeight="600"
                  label={{
                    value: 'Cycle & Energy',
                    angle: -90,
                    position: 'insideLeft',
                    style: {
                      textAnchor: 'middle',
                      fill: '#9333ea',
                      fontWeight: 'bold'
                    }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={28} stroke="#ec4899" strokeDasharray="5 5" strokeWidth={2} />
                <Area
                  type="monotone"
                  dataKey="energy"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#energyGradient)"
                  fillOpacity={0.4}
                />
                <Line
                  type="monotone"
                  dataKey="length"
                  stroke="url(#cycleGradient)"
                  strokeWidth={5}
                  dot={{
                    fill: '#ec4899',
                    strokeWidth: 4,
                    r: 8,
                    stroke: '#ffffff',
                    filter: 'drop-shadow(0 2px 4px rgba(236, 72, 153, 0.3))'
                  }}
                  activeDot={{
                    r: 12,
                    stroke: '#ec4899',
                    strokeWidth: 4,
                    fill: '#ffffff',
                    filter: 'drop-shadow(0 4px 8px rgba(236, 72, 153, 0.4))'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 text-sm bg-white/60 dark:bg-slate-800 backdrop-blur-sm p-4 rounded-lg border border-purple-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 rounded-full shadow-sm"></div>
                <span className="text-gray-700 dark:text-white font-semibold">{getLocalizedText('cycle.length.journey')}</span>
                <span className="text-xl">🌸</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-1 bg-amber-400 rounded-full"></div>
                <span className="text-gray-700 dark:text-white font-semibold">{getLocalizedText('energy.levels')}</span>
                <span className="text-xl">⚡</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-pink-500" style={{ borderStyle: 'dashed' }}></div>
              <span className="text-gray-700 dark:text-white font-semibold">{getLocalizedText('average')} (28 days)</span>
              <span className="text-xl">📊</span>
            </div>
          </div>
        </CardContent>
      </Card>

    </>

  );
};

export default CycleChart;
