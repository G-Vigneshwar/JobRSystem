import { useState } from 'react';
import JobManagement from '../components/employer/JobManagement';
import ApplicationsOverview from '../components/employer/ApplicationsOverview';
import CandidateManagement from '../components/employer/CandidateManagement';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  
  const stats = {
    activeJobs: 12,
    totalApplications: 48,
    newApplications: 8,
    shortlisted: 15
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Employer Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm text-blue-600 font-medium">Active Jobs</h3>
            <p className="text-2xl font-bold">{stats.activeJobs}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm text-green-600 font-medium">Total Applications</h3>
            <p className="text-2xl font-bold">{stats.totalApplications}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm text-yellow-600 font-medium">New Applications</h3>
            <p className="text-2xl font-bold">{stats.newApplications}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm text-purple-600 font-medium">Shortlisted</h3>
            <p className="text-2xl font-bold">{stats.shortlisted}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-4 px-6 py-3">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-2 rounded-md ${
                activeTab === 'jobs' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3 py-2 rounded-md ${
                activeTab === 'applications' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-3 py-2 rounded-md ${
                activeTab === 'candidates' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Candidates
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'jobs' && <JobManagement />}
          {activeTab === 'applications' && <ApplicationsOverview />}
          {activeTab === 'candidates' && <CandidateManagement />}
        </div>
      </div>
    </div>
  );
};

export { 
  EmployerDashboard 
};