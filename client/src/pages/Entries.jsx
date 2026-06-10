import { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import EntryList from '../components/Journal/EntryList';

const moods = [
  'Terpuruk', 'Marah', 'Sedih', 'Kesal', 'Lelah',
  'Biasa', 'Tenang', 'Senang', 'Semangat', 'Luar Biasa'
];

const Entries = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  //Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e5e7eb]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111]">Semua Jurnal</h1>
            <p className="mt-1 text-sm text-[#6b7280]">Telusuri kembali jejak pemikiran dan perasaan Anda.</p>
          </div>
          
          {/* UI Filter & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Cari kata di jurnal..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full sm:w-64 h-10 px-3 text-sm bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-shadow"
            />
            
            {/* Mood Dropdown */}
            <select 
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="w-full sm:w-auto h-10 px-3 text-sm bg-white border border-[#e5e7eb] rounded-md focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] cursor-pointer"
            >
              <option value="">Semua Mood</option>
              {moods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Kirim parameter pencarian dan filter ke EntryList */}
        <EntryList searchQuery={searchQuery} selectedMood={selectedMood} />
        
      </div>
    </MainLayout>
  );
};

export default Entries;