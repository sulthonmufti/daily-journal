import { useQuery } from '@tanstack/react-query';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import useAuthStore from '../../store/useAuthStore';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

// ringkasan mood
const MoodAnalytics = () => {
  const { token } = useAuthStore();

  const { data: summaryData } = useQuery({
    queryKey: ['analytics', 'summary'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/analytics/summary`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }
  });

  //tren mood
  const { data: trendData, isLoading: loadTrend } = useQuery({
    queryKey: ['analytics', 'trend'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/analytics/mood-trend`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }
  });

  // distribusi mood
  const { data: distData, isLoading: loadDist } = useQuery({
    queryKey: ['analytics', 'distribution'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/analytics/mood-distribution`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }
  });

  if (loadTrend || loadDist) {
    return (
      <div className="flex items-center justify-center h-48 border-2 border-dashed border-[#e5e7eb] rounded-xl bg-gray-50">
        <p className="text-sm font-medium text-[#6b7280] animate-pulse">Menghitung analitik...</p>
      </div>
    );
  }

  const trend = trendData?.data || [];
  const distribution = distData?.data || [];
  const summary = summaryData?.data || { totalEntries: 0, favoriteMood: '-' };

  if (trend.length === 0) return null; 

  return (
    <div className="space-y-6 mb-12">
      {/* ringkasan */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-white border border-[#e5e7eb] rounded-xl shadow-sm">
          <p className="text-sm font-medium text-[#6b7280]">Total Jurnal</p>
          <p className="mt-2 text-3xl font-semibold text-[#111111]">{summary.totalEntries}</p>
        </div>
        <div className="p-5 bg-white border border-[#e5e7eb] rounded-xl shadow-sm">
          <p className="text-sm font-medium text-[#6b7280]">Mood Dominan</p>
          <p className="mt-2 text-3xl font-semibold text-[#111111] capitalize">{summary.favoriteMood}</p>
        </div>
      </div>

      {/* Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart: Tren Mood */}
        <div className="lg:col-span-2 p-5 bg-white border border-[#e5e7eb] rounded-xl shadow-sm">
          <h3 className="mb-6 text-sm font-semibold text-[#111111]">Tren Emosi Harian</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="_id" 
                  tick={{ fontSize: 12, fill: '#6b7280' }} 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(val) => new Date(val).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                />
                <YAxis 
                  domain={[0, 10]} 
                  tick={{ fontSize: 12, fill: '#6b7280' }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelFormatter={(val) => new Date(val).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                />
                <Line 
                  type="monotone" 
                  dataKey="averageScore" 
                  stroke="#111111" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#111111', strokeWidth: 0 }} 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="Skor Mood"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Distribusi Mood */}
        <div className="p-5 bg-white border border-[#e5e7eb] rounded-xl shadow-sm">
          <h3 className="mb-6 text-sm font-semibold text-[#111111]">Distribusi Mood</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MoodAnalytics;