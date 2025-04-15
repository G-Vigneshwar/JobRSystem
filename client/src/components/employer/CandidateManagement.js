import { useState, useEffect } from 'react';
import { api } from '../../services/api';

const CandidateManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Name');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/employer/candidates/1');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter candidates based on search query and selected skills
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.every(skill => 
                           candidate.skills?.includes(skill)
                         );
    
    return matchesSearch && matchesSkills;
  });

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch(sortBy) {
      case 'Name':
        return a.full_name.localeCompare(b.full_name);
      case 'Experience':
        return (b.experience || 0) - (a.experience || 0);
      case 'Applications':
        return (b.total_applications || 0) - (a.total_applications || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Candidate Management</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-md px-4 py-2 w-64"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-4 py-2"
          >
            <option>Sort by Name</option>
            <option>Sort by Experience</option>
            <option>Sort by Applications</option>
          </select>
        </div>
      </div>

      {/* Skills Filter */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Filter by Skills</p>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(candidates.flatMap(c => c.skills || []))).map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkills(prev => 
                prev.includes(skill) 
                  ? prev.filter(s => s !== skill)
                  : [...prev, skill]
              )}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedSkills.includes(skill)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates List */}
      {loading ? (
        <div className="text-center py-8">Loading candidates...</div>
      ) : sortedCandidates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No candidates found matching your criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedCandidates.map(candidate => (
            <div key={candidate.applicant_id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">{candidate.full_name}</h4>
                  <p className="text-gray-600">{candidate.email}</p>
                  {candidate.skills && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Experience: {candidate.experience || 'Not specified'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Applications: {candidate.total_applications || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;