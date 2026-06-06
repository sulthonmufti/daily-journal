import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';

// Placeholder halaman (nanti kita buat komponennya)
const LoginPage = () => <h1>Halaman Login</h1>;
const RegisterPage = () => <h1>Halaman Register</h1>;
const Dashboard = () => <h1>Halaman Dashboard</h1>;

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;