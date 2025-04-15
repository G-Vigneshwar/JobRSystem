import { useState, useEffect } from 'react';
import JobSearch from '../components/applicant/JobSearch';
import ApplicationStatus from '../components/applicant/ApplicationStatus';
import ProfileSettings from '../components/applicant/ProfileSettings';


const ApplicantDashboard = () => {
    const [activeTab, setActiveTab] = useState('search');
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <nav className="flex space-x-4 px-6 py-3">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-3 py-2 rounded-md ${
                  activeTab === 'search' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Job Search
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-3 py-2 rounded-md ${
                  activeTab === 'applications' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                My Applications
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-2 rounded-md ${
                  activeTab === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Profile Settings
              </button>
            </nav>
          </div>
  
          <div className="p-6">
            {activeTab === 'search' && <JobSearch />}
            {activeTab === 'applications' && <ApplicationStatus />}
            {activeTab === 'profile' && <ProfileSettings />}
          </div>
        </div>
      </div>
    );
  };
  
  export { 
    ApplicantDashboard 
  };