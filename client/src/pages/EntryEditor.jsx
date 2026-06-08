import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
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

const EntryEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodObj, setMoodObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { token } = useAuthStore();
  const navigate = useNavigate();

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
      const response = await fetch('http://localhost:5000/api/entries', {
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
          entryDate: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Gagal menyimpan jurnal');

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e7eb]">
          <h1 className="text-3xl font-semibold tracking-tight text-[#111111]">Tulis Jurnal Baru</h1>
          <div className="space-x-3">
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-[#6b7280] transition-colors rounded-md hover:text-[#111111] hover:bg-gray-100"
            >
              Batal
            </button>
            <button 
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-[#111111] rounded-md hover:bg-[#242424] disabled:bg-[#e5e7eb] disabled:text-[#6b7280]"
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

        <div className="space-y-6">
          {/* Input Judul */}
          <div>
            <input
              type="text"
              placeholder="Beri judul momen hari ini..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-medium text-[#111111] placeholder-[#a1a1aa] bg-transparent border-none focus:outline-none focus:ring-0"
            />
          </div>

          {/* Komponen MoodPicker */}
          <MoodPicker selectedMood={moodObj} onMoodSelect={setMoodObj} />

          {/* React Quill Editor */}
          <div className="mt-4">
            <div className="border border-[#e5e7eb] rounded-lg overflow-hidden bg-white [&_.ql-toolbar]:bg-[#f8f9fa] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-[#e5e7eb] [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base [&_.ql-editor]:text-[#374151]">
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