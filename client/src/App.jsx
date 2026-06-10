import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useAuthStore from './store/useAuthStore';
import MainLayout from './components/Layout/MainLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import EntryEditor from './pages/EntryEditor';
import EntryList from './components/Journal/EntryList';
import Entries from './pages/Entries';
import EntryDetail from './pages/EntryDetail';

// Setup QueryClient buat optimasi data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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

    {/* Bagian Daftar Entri Jurnal */}
    <div>
      <EntryList />
    </div>
  </MainLayout>
);

function App() {
  const { user } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/editor" element={user ? <EntryEditor /> : <Navigate to="/login" />} />
          <Route path="/entries" element={user ? <Entries /> : <Navigate to="/login" />} />
          <Route path="/entries/:id" element={user ? <EntryDetail /> : <Navigate to="/login" />} />
          <Route path="/editor/:id" element={user ? <EntryEditor /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;