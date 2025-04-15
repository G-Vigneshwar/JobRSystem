import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;