import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center text-white font-bold text-xl">
              Job Recruitment System
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link 
              to="/" 
              className={`text-white px-3 py-2 rounded-md ${
                location.pathname === '/' ? 'bg-gray-900' : 'hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/employer" 
              className={`text-white px-3 py-2 rounded-md ${
                location.pathname.startsWith('/employer') ? 'bg-gray-900' : 'hover:bg-gray-700'
              }`}
            >
              Employer Dashboard
            </Link>
            <Link 
              to="/applicant" 
              className={`text-white px-3 py-2 rounded-md ${
                location.pathname.startsWith('/applicant') ? 'bg-gray-900' : 'hover:bg-gray-700'
              }`}
            >
              Applicant Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;