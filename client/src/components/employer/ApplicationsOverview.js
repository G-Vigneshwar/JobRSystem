import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const ApplicationsOverview = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const adminId = 1; // In real app, get from authentication

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await api.employer.getApplications(adminId);
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await api.employer.updateApplicationStatus(applicationId, newStatus);
      fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status.toLowerCase() === filter;
  });

  const statusColors = {
    Submitted: 'bg-yellow-100 text-yellow-800',
    Reviewed: 'bg-blue-100 text-blue-800',
    Interviewed: 'bg-purple-100 text-purple-800',
    Offered: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800'
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Applications Overview</h2>
        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-600">Filter by status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="all">All</option>
            <option value="submitted">Submitted</option>
            <option value="reviewed">Reviewed</option>
            <option value="interviewed">Interviewed</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No applications found.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map(application => (
            <div key={application.application_id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{application.job_title}</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      Applicant: {application.full_name}
                    </p>
                    <p className="text-gray-600">
                      Email: {application.email}
                    </p>
                    {application.contact_number && (
                      <p className="text-gray-600">
                        Phone: {application.contact_number}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    Applied: {new Date(application.application_date).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    statusColors[application.status]
                  }`}>
                    {application.status}
                  </span>
                  <select
                    value={application.status}
                    onChange={(e) => handleStatusUpdate(application.application_id, e.target.value)}
                    className="block mt-2 border rounded p-2"
                  >
                    <option value="Submitted">Mark as Submitted</option>
                    <option value="Reviewed">Mark as Reviewed</option>
                    <option value="Interviewed">Mark as Interviewed</option>
                    <option value="Offered">Mark as Offered</option>
                    <option value="Rejected">Mark as Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsOverview;
