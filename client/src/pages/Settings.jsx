import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Plus, Smile } from 'lucide-react';
import MainLayout from '../components/Layout/MainLayout';
import useAuthStore from '../store/useAuthStore';

const Settings = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  // State untuk form tambah mood baru
  const [newMoodName, setNewMoodName] = useState('');
  const [newMoodEmoji, setNewMoodEmoji] = useState('😊');
  const [newMoodColor, setNewMoodColor] = useState('#3b82f6');
  const [errorForm, setErrorForm] = useState('');

  // --- QUERY: Ambil Daftar Mood ---
  const { data: moodsData, isLoading } = useQuery({
    queryKey: ['moods'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/moods`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Gagal memuat mood');
      return response.json();
    }
  });

  // --- MUTATION: Tambah Mood ---
  const addMoodMutation = useMutation({
    mutationFn: async (newMood) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/moods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newMood)
      });
      if (!response.ok) throw new Error('Gagal menambahkan mood');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moods'] });
      setNewMoodName('');
      setErrorForm('');
    },
    onError: (err) => {
      setErrorForm(err.message);
    }
  });

  // --- MUTATION: Hapus Mood ---
  const deleteMoodMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/moods/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Gagal menghapus mood');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moods'] });
    }
  });

  const handleAddMood = (e) => {
    e.preventDefault();
    if (!newMoodName.trim()) {
      setErrorForm('Nama mood tidak boleh kosong');
      return;
    }
    addMoodMutation.mutate({
      name: newMoodName,
      emoji: newMoodEmoji,
      color: newMoodColor
    });
  };

  const moods = moodsData?.data || [];

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        <div className="pb-4 border-b border-[#e5e7eb]">
          <h1 className="text-3xl font-semibold tracking-tight text-[#111111]">Pengaturan</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Kelola preferensi dan kustomisasi jurnal Anda.</p>
        </div>

        <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[#e5e7eb] bg-gray-50">
            <h2 className="text-lg font-semibold text-[#111111]">Kustomisasi Mood</h2>
            <p className="text-sm text-[#6b7280]">Tambahkan label emosi spesifik yang sering Anda rasakan.</p>
          </div>

          <div className="p-5 space-y-6">
            {/* Form Tambah Mood */}
            <form onSubmit={handleAddMood} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Nama Mood (Mis: Nostalgia)"
                  value={newMoodName}
                  onChange={(e) => setNewMoodName(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
                />
              </div>
              <div className="w-full sm:w-24">
                <input
                  type="text"
                  placeholder="Emoji"
                  value={newMoodEmoji}
                  onChange={(e) => setNewMoodEmoji(e.target.value)}
                  className="w-full h-10 px-3 text-sm text-center bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
                />
              </div>
              <div className="w-full sm:w-20">
                <input
                  type="color"
                  value={newMoodColor}
                  onChange={(e) => setNewMoodColor(e.target.value)}
                  className="w-full h-10 p-1 bg-white border border-[#e5e7eb] rounded-md cursor-pointer"
                />
              </div>
              <button
                type="submit"
                disabled={addMoodMutation.isPending}
                className="flex items-center justify-center h-10 px-4 text-sm font-semibold text-white transition-colors bg-[#111111] rounded-md hover:bg-[#242424] disabled:bg-[#e5e7eb]"
              >
                <Plus size={16} className="mr-1.5" /> Tambah
              </button>
            </form>
            {errorForm && <p className="text-sm text-red-500">{errorForm}</p>}

            {/* Daftar Mood */}
            <div>
              <h3 className="text-sm font-medium text-[#374151] mb-3">Daftar Mood Anda</h3>
              {isLoading ? (
                <div className="text-sm text-gray-500">Memuat...</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {moods.map((mood) => (
                    <div
                      key={mood._id}
                      className="flex items-center px-3 py-1.5 space-x-2 text-sm border rounded-full"
                      style={{
                        borderColor: mood.color,
                        backgroundColor: `${mood.color}15`,
                        color: mood.color
                      }}
                    >
                      <span className="text-base">{mood.emoji || <Smile size={14}/>}</span>
                      <span className="font-medium">{mood.name}</span>
                      
                      {/* Hanya mood custom yang bisa dihapus */}
                      {!mood.isDefault && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus mood ${mood.name}?`)) {
                              deleteMoodMutation.mutate(mood._id);
                            }
                          }}
                          className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  {moods.length === 0 && (
                    <p className="text-sm text-gray-500">Belum ada mood custom. Buat satu di atas!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;