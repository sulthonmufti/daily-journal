import { useQuery } from '@tanstack/react-query';
import { 
  CloudRain, Angry, Frown, Annoyed, Moon, 
  Meh, Coffee, Smile, Zap, Sparkles, 
  Lock, Globe, Calendar, FileText
} from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

const getMoodConfig = (label) => {
  const configs = {
    'Terpuruk': { icon: CloudRain, color: '#1e293b' },
    'Marah': { icon: Angry, color: '#dc2626' },
    'Sedih': { icon: Frown, color: '#3b82f6' },
    'Kesal': { icon: Annoyed, color: '#ea580c' },
    'Lelah': { icon: Moon, color: '#8b5cf6' },
    'Biasa': { icon: Meh, color: '#9ca3af' },
    'Tenang': { icon: Coffee, color: '#14b8a6' },
    'Senang': { icon: Smile, color: '#10b981' },
    'Semangat': { icon: Zap, color: '#f59e0b' },
    'Luar Biasa': { icon: Sparkles, color: '#ec4899' },
  };
  return configs[label] || { icon: Meh, color: '#9ca3af' };
};

const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const EntryList = () => {
  const { token } = useAuthStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['entries'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/entries`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Gagal mengambil data jurnal');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-8 h-8 border-4 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-[#6b7280]">Memuat jurnal Anda...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-md">
        {error.message}
      </div>
    );
  }

  const entries = data?.data || [];

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-[#e5e7eb] rounded-xl bg-gray-50">
        <FileText size={48} className="text-[#d1d5db] mb-4" />
        <h3 className="text-lg font-semibold text-[#111111]">Belum ada catatan</h3>
        <p className="mt-1 text-sm text-[#6b7280] max-w-sm">
          Ruang ini masih kosong. Mulailah menulis jurnal pertama Anda dan rekam jejak perjalanan emosi Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => {
        const moodConfig = getMoodConfig(entry.mood);
        const MoodIcon = moodConfig.icon;
        const snippet = stripHtml(entry.contentHTML || entry.contentMarkdown);

        return (
          <div 
            key={entry._id} 
            className="flex flex-col p-5 space-y-4 transition-all duration-200 bg-white border border-[#e5e7eb] rounded-xl cursor-pointer hover:shadow-md hover:-translate-y-1 hover:border-[#d1d5db]"
          >
            {/* Header Card: Judul & Tanggal */}
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-[#111111] line-clamp-1">
                  {entry.title}
                </h3>
                {entry.isPrivate ? (
                  <Lock size={16} className="text-[#9ca3af] shrink-0 ml-2" />
                ) : (
                  <Globe size={16} className="text-[#9ca3af] shrink-0 ml-2" />
                )}
              </div>
              <div className="flex items-center mt-1 text-xs text-[#6b7280]">
                <Calendar size={12} className="mr-1.5" />
                {formatDate(entry.entryDate)}
              </div>
            </div>

            {/* Body Card: Snippet Teks */}
            <div className="flex-1">
              <p className="text-sm text-[#374151] line-clamp-3 leading-relaxed">
                {snippet}
              </p>
            </div>

            {/* Footer Card: Mood Badge */}
            <div className="pt-4 mt-auto border-t border-[#f3f4f6]">
              <div 
                className="inline-flex items-center px-2.5 py-1 space-x-1.5 text-xs font-medium rounded-md"
                style={{ backgroundColor: `${moodConfig.color}15`, color: moodConfig.color }}
              >
                <MoodIcon size={14} />
                <span>{entry.mood}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EntryList;