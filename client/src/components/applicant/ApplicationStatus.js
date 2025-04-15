import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const applicantId = 2; // In real app, get from authentication

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await api.applicant.getApplications(applicantId);
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Submitted: 'bg-yellow-100 text-yellow-800',
      Reviewed: 'bg-blue-100 text-blue-800',
      Interviewed: 'bg-purple-100 text-purple-800',
      Offered: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status.toLowerCase() === filter.toLowerCase()
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Applications</h2>
        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-600">Filter by status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="all">All Applications</option>
            <option value="submitted">Submitted</option>
            <option value="reviewed">Reviewed</option>
            <option value="interviewed">Interviewed</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No applications found.</p>
          <a 
            href="/applicant/search" 
            className="mt-4 inline-block text-blue-500 hover:text-blue-600"
          >
            Search for jobs →
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map(app => (
            <div key={app.application_id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{app.job_title}</h3>
                  <p className="text-gray-600">{app.company_name}</p>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-500">
                      Applied: {new Date(app.application_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last Updated: {new Date(app.last_updated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>
              {app.feedback && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">{app.feedback}</p>
                </div>
              )}
              {app.next_steps && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Next Steps</h4>
                  <p className="text-sm text-gray-600">{app.next_steps}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationStatus;