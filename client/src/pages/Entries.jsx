import MainLayout from '../components/Layout/MainLayout';
import EntryList from '../components/Journal/EntryList';

const Entries = () => {
  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8">
        {/* Header & Area Filter/Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5e7eb]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111]">Semua Jurnal</h1>
            <p className="mt-1 text-sm text-[#6b7280]">Telusuri kembali jejak pemikiran dan perasaan Anda.</p>
          </div>
          
          {/* Buat UI Filter & Search nanti */}
          <div className="flex items-center gap-2">
             <button className="px-3 py-1.5 text-sm font-medium text-[#374151] bg-white border border-[#e5e7eb] rounded-md hover:bg-gray-50">
               Filter
             </button>
             <button className="px-3 py-1.5 text-sm font-medium text-[#374151] bg-white border border-[#e5e7eb] rounded-md hover:bg-gray-50">
               Cari
             </button>
          </div>
        </div>

        {/* Panggil Komponen Daftar Jurnal */}
        <EntryList />
        
      </div>
    </MainLayout>
  );
};

export default Entries;