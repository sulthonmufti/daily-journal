import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Lock, Globe } from 'lucide-react';

import MoodPicker from '../components/Journal/MoodPicker';
import MainLayout from '../components/Layout/MainLayout';
import useAuthStore from '../store/useAuthStore';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'blockquote'],
    ['clean']
  ],
};

const DRAFT_KEY = 'journal_draft_temp';

const EntryEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodObj, setMoodObj] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [draftStatus, setDraftStatus] = useState('');
  
  const { token } = useAuthStore();
  const navigate = useNavigate();

  //Save draft automatically every 10 seconds
  useEffect(() => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        if (parsedDraft.title) setTitle(parsedDraft.title);
        if (parsedDraft.content) setContent(parsedDraft.content);
        if (parsedDraft.moodObj) setMoodObj(parsedDraft.moodObj);
        if (parsedDraft.isPrivate !== undefined) setIsPrivate(parsedDraft.isPrivate);
        setDraftStatus('Draft dipulihkan');
      } catch (e) {
        console.error("Gagal memuat draft", e);
      }
    }
  }, []);

  // Auto save draft every 10 seconds
  useEffect(() => {
    if (!title && (!content || content === '<p><br></p>') && !moodObj) return;

    const timer = setTimeout(() => {
      const draftData = { title, content, moodObj, isPrivate };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
      
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setDraftStatus(`Draft tersimpan ${time}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, moodObj, isPrivate]);

  const handleSave = async () => {
    if (!content.trim() || content === '<p><br></p>') {
      setError('Konten jurnal tidak boleh kosong.');
      return;
    }
    if (!moodObj) {
      setError('Silakan pilih mood Anda hari ini.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title || 'Tanpa Judul',
          contentMarkdown: content,
          mood: moodObj.label,
          moodScore: moodObj.score,
          isPrivate: isPrivate,
          entryDate: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Gagal menyimpan jurnal');

      localStorage.removeItem(DRAFT_KEY);

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 pb-24">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e5e7eb] gap-4 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111]">Tulis Jurnal Baru</h1>
            <p className="mt-1 text-xs sm:text-sm text-[#6b7280] h-5">{draftStatus}</p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-[#6b7280] transition-all duration-200 rounded-md cursor-pointer hover:text-[#111111] hover:bg-gray-100 hover:shadow-sm"
            >
              Batal
            </button>
            <button 
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold text-white transition-all duration-200 bg-[#111111] rounded-md cursor-pointer hover:bg-[#242424] hover:-translate-y-0.5 hover:shadow-md disabled:bg-[#e5e7eb] disabled:text-[#6b7280] disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
            >
              {isLoading ? 'Menyimpan...' : 'Simpan Jurnal'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 text-sm text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-6 md:space-y-8">
          {/* Input Judul */}
          <div>
            <input
              type="text"
              placeholder="Beri judul momen hari ini..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl md:text-2xl font-medium text-[#111111] placeholder-[#a1a1aa] bg-transparent border-none focus:outline-none focus:ring-0 px-0"
            />
          </div>

          {/* Mood & Privasi */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8">
            <div className="flex-1 w-full">
              <MoodPicker selectedMood={moodObj} onMoodSelect={setMoodObj} />
            </div>

            {/* Privasi */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto p-3 md:p-0 bg-gray-50 md:bg-transparent rounded-lg md:rounded-none border md:border-none border-[#e5e7eb] space-y-0 md:space-y-2">
              <label className="text-sm font-medium text-[#374151]">Privasi Jurnal</label>
              <button
                type="button"
                onClick={() => setIsPrivate(!isPrivate)}
                className={`flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 border cursor-pointer hover:shadow-sm hover:opacity-80 active:scale-95 ${
                  isPrivate 
                    ? 'bg-[#fef2f2] text-[#ef4444] border-[#fecaca]'
                    : 'bg-[#f0fdf4] text-[#10b981] border-[#bbf7d0]'
                }`}
              >
                {isPrivate ? (
                  <>
                    <Lock size={14} className="mr-1.5" /> Privat
                  </>
                ) : (
                  <>
                    <Globe size={14} className="mr-1.5" /> Publik
                  </>
                )}
              </button>
            </div>
          </div>

          {/* React Quill Editor */}
          <div className="mt-4">
            <div className="border border-[#e5e7eb] rounded-lg overflow-hidden bg-white [&_.ql-toolbar]:bg-[#f8f9fa] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-[#e5e7eb] [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px] md:[&_.ql-editor]:min-h-[400px] [&_.ql-editor]:text-base [&_.ql-editor]:text-[#374151]">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                placeholder="Tuliskan apa yang ada di pikiran Anda..."
              />
            </div>
          </div>
          
        </div>
      </div>
    </MainLayout>
  );
};

export default EntryEditor;