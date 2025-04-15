const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  employer: {
    getJobs: (adminId) => 
      fetch(`${API_BASE_URL}/employer/jobs/${adminId}`).then(res => res.json()),
      
    createJob: (jobData) =>
      fetch(`${API_BASE_URL}/employer/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      }).then(res => res.json()),
    
    updateJob: (jobId, jobData) =>
      fetch(`${API_BASE_URL}/employer/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      }).then(res => res.json()),
    
    deleteJob: (jobId) =>
      fetch(`${API_BASE_URL}/employer/jobs/${jobId}`, {
        method: 'DELETE'
      }).then(res => res.json()),
    
    getApplications: (adminId) =>
      fetch(`${API_BASE_URL}/employer/applications/${adminId}`).then(res => res.json()),
    
    updateApplicationStatus: (applicationId, status) =>
      fetch(`${API_BASE_URL}/employer/applications/${applicationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      }).then(res => res.json()),
    
    getCandidates: (adminId) =>
      fetch(`${API_BASE_URL}/employer/candidates/${adminId}`).then(res => res.json())
  },

  applicant: {
    searchJobs: (params) => {
      const queryString = new URLSearchParams(params).toString();
      return fetch(`${API_BASE_URL}/jobs/search?${queryString}`).then(res => res.json());
    },
    
    submitApplication: (applicationData) =>
      fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      }).then(res => res.json()),
    
    getApplications: (applicantId) =>
      fetch(`${API_BASE_URL}/applicant/applications/${applicantId}`).then(res => res.json()),
    
    getProfile: (applicantId) =>
      fetch(`${API_BASE_URL}/applicant/profile/${applicantId}`).then(res => res.json()),
    
    updateProfile: (applicantId, profileData) =>
      fetch(`${API_BASE_URL}/applicant/profile/${applicantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      }).then(res => res.json())
  }
};