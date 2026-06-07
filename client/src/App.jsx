import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';

import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './components/Layout/MainLayout';

const Dashboard = () => (
  <MainLayout>
    <div className="mb-12">
      <h1 className="text-4xl font-semibold tracking-tight text-[#111111]">Welcome back.</h1>
      <p className="mt-2 text-[#374151] text-base">Here's an overview of your journal and mood trends.</p>
    </div>

    <div className="bg-[#f5f5f5] p-8 rounded-xl border border-[#e5e7eb]">
      <h2 className="text-lg font-semibold text-[#111111]">Your Space</h2>
      <p className="mt-2 text-[#374151]">
        The actual graphics feature will be implemented here soon
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
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;