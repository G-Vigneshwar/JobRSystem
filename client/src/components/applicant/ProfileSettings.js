import { useState, useEffect } from 'react';

const ProfileSettings = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      console.log('Fetching applicants...');
      setLoading(true);
      setError(null);

      // First test the basic connection
      const testResponse = await fetch('http://localhost:3001/api/test');
      if (!testResponse.ok) {
        throw new Error('Backend server is not responding');
      }

      // Then fetch applicants
      const response = await fetch('http://localhost:3001/api/applicants');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch applicants');
      }

      const data = await response.json();
      console.log('Received data:', data);
      setApplicants(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500 mb-4">Failed to fetch applicants. Please try again later.</div>
        <button 
          onClick={fetchApplicants}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
          <p>Error details: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      <div className="space-y-4">
        {applicants.length === 0 ? (
          <p className="text-center text-gray-500">No applicants found</p>
        ) : (
          applicants.map(applicant => (
            <div key={applicant.applicant_id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{applicant.full_name}</h3>
              <p className="text-gray-600">{applicant.email}</p>
              <p className="text-sm text-gray-500">Experience: {applicant.experience}</p>
              {applicant.skills && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {applicant.skills.split(',').map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;