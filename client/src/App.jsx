import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import MainLayout from './components/Layout/MainLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import EntryEditor from './pages/EntryEditor'; 
const Dashboard = () => (
  <MainLayout>
    {/* Menggunakan flex-row agar judul di kiri dan tombol di kanan */}
    <div className="flex items-center justify-between mb-12">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-[#111111]">Welcome back.</h1>
        <p className="mt-2 text-[#374151] text-base">Here's an overview of your journal and mood trends.</p>
      </div>
      
      {/* Tombol Utama menuju Editor */}
      <Link 
        to="/editor" 
        className="flex items-center h-10 px-4 text-sm font-semibold text-white transition-colors bg-[#111111] rounded-md hover:bg-[#242424]"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Tulis Jurnal
      </Link>
    </div>

    <div className="bg-[#f5f5f5] p-8 rounded-xl border border-[#e5e7eb]">
      <h2 className="text-lg font-semibold text-[#111111]">Your Space</h2>
      <p className="mt-2 text-[#374151]">
        Fitur grafik akan segera diimplementasikan di sini.
      </p>
    </div>
  </MainLayout>
);

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/editor" element={user ? <EntryEditor /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;