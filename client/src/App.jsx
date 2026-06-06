import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';

import Login from './pages/Login';
import Register from './pages/Register';

const Dashboard = () => (
  <div className="p-8 text-center">
    <h1 className="text-3xl font-bold">Halaman Dashboard Utama</h1>
    <p>Selamat! Anda berhasil login.</p>
  </div>
);

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;