import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Lock, Globe, Edit, Trash2 } from 'lucide-react';
import MainLayout from '../components/Layout/MainLayout';
import useAuthStore from '../store/useAuthStore';

import 'react-quill-new/dist/quill.snow.css';

const EntryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['entry', id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/entries/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Gagal memuat detail jurnal');
      return response.json();
    }
  });

  // Mutation untuk delete
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/entries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Gagal menghapus jurnal');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
      navigate('/entries');
    }
  });

  // Function delete
  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jurnal ini secara permanen?')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) return (
    <MainLayout>
      <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-[#111111] border-t-transparent rounded-full animate-spin"></div></div>
    </MainLayout>
  );

  if (isError) return (
    <MainLayout>
      <div className="text-center text-red-500 py-20">Jurnal tidak ditemukan atau terjadi kesalahan.</div>
    </MainLayout>
  );

  const entry = data?.data;

  // Format tanggal
  const formattedDate = new Date(entry.entryDate).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/entries')}
            className="flex items-center text-sm font-medium text-[#6b7280] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Kembali ke Daftar
          </button>

          <div className="flex space-x-3">
            <button 
              onClick={() => navigate(`/editor/${entry._id}`)}
              className="p-2 text-[#6b7280] hover:text-[#111111] hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="p-2 text-[#6b7280] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Header Jurnal */}
        <div className="space-y-4 border-b border-[#e5e7eb] pb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111111] leading-tight">
            {entry.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b7280]">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1.5" /> {formattedDate}
            </div>
            <div className="flex items-center px-2.5 py-1 bg-gray-100 rounded-full font-medium text-[#374151]">
              Mood: {entry.mood}
            </div>
            <div className="flex items-center">
              {entry.isPrivate ? <><Lock size={14} className="mr-1.5" /> Privat</> : <><Globe size={14} className="mr-1.5" /> Publik</>}
            </div>
          </div>
        </div>

        {/* Konten HTML (Hasil dari React Quill) */}
        <div className="prose prose-stone max-w-none text-[#374151] leading-relaxed ql-editor px-0">
          <div dangerouslySetInnerHTML={{ __html: entry.contentHTML || entry.contentMarkdown }} />
        </div>

      </div>
    </MainLayout>
  );
};

export default EntryDetail;