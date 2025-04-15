import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import PostJobForm from './PostJobForm';
import LoadingSpinner from '../common/LoadingSpinner';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const adminId = 1; // In real app, get from authentication

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await api.employer.getJobs(adminId);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Add toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.employer.deleteJob(jobId);
        fetchJobs();
        // Add success toast notification
      } catch (error) {
        console.error('Error deleting job:', error);
        // Add error toast notification
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posted Jobs</h2>
        <button
          onClick={() => setShowPostForm(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Post New Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No jobs posted yet. Click 'Post New Job' to get started.
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map(job => (
            <div key={job.job_id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="mt-2 text-gray-600 space-y-1">
                    <p>{job.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center">
                        <LocationIcon className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <CurrencyIcon className="w-4 h-4 mr-1" />
                        ${job.salary_min} - ${job.salary_max}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.skills_required?.split(',').map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingJob(job);
                      setShowPostForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <EditIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.job_id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Posted on: {new Date(job.posted_date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {showPostForm && (
        <PostJobForm
          job={editingJob}
          onClose={() => {
            setShowPostForm(false);
            setEditingJob(null);
          }}
          onSubmit={async (jobData) => {
            try {
              if (editingJob) {
                await api.employer.updateJob(editingJob.job_id, jobData);
              } else {
                await api.employer.createJob({ ...jobData, admin_id: adminId });
              }
              fetchJobs();
              setShowPostForm(false);
              setEditingJob(null);
              // Add success toast notification
            } catch (error) {
              console.error('Error saving job:', error);
              // Add error toast notification
            }
          }}
        />
      )}
    </div>
  );
};

// Utility components for icons
const LocationIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CurrencyIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EditIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export default JobManagement;