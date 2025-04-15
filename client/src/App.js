import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { ApplicantDashboard } from './pages/ApplicantDashboard'; // Changed to named import

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/employer/*" element={<DashboardLayout><EmployerDashboard /></DashboardLayout>} />
        <Route path="/applicant/*" element={<DashboardLayout><ApplicantDashboard /></DashboardLayout>} />
      </Routes>
    </Router>
  );
};

export default App;