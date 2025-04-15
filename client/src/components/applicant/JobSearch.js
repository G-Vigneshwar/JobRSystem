import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import JobApplicationForm from './JobApplicationForm';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    industry: '',
    salaryMin: '',
    salaryMax: ''
  });
  const [sortBy, setSortBy] = useState('recent');

  const searchJobs = async () => {
    setLoading(true);
    try {
      const data = await api.applicant.searchJobs(filters);
      setJobs(data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchJobs();
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.posted_date) - new Date(a.posted_date);
      case 'salary':
        return b.salary_max - a.salary_max;
      case 'company':
        return a.company_name.localeCompare(b.company_name);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Keywords
            </label>
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
              placeholder="Job title or skills"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City or remote"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              value={filters.industry}
              onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
              className="w-full border rounded-md p-2"
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              <option value="recent">Most Recent</option>
              <option value="salary">Highest Salary</option>
              <option value="company">Company Name</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={searchJobs}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Search Jobs
          </button>
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {sortedJobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No jobs found matching your criteria.
            </div>
          ) : (
            sortedJobs.map(job => (
              <div key={job.job_id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company_name}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                  >
                    Apply Now
                  </button>
                </div>
                <p className="mt-4 text-gray-700">{job.description}</p>
                {job.skills_required && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills_required.split(',').map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4 text-sm text-gray-500">
                  Posted {new Date(job.posted_date).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationForm
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSubmitSuccess={() => {
            setSelectedJob(null);
            // Optionally show success message
          }}
        />
      )}
    </div>
  );
};

export default JobSearch;
