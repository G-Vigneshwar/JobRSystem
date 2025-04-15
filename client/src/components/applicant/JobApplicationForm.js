import { useState, useEffect } from 'react';
import { api } from '../../services/api'; // Added api import

const JobApplicationForm = ({ job, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    coverLetter: '',
    resume: null,
    portfolio: '',
    availableDate: '',
    additionalNotes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    }
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append('jobId', job.job_id);

      await api.applicant.submitApplication(formDataToSend);
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Apply for {job.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter *
            </label>
            <textarea
              value={formData.coverLetter}
              onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
              rows={6}
              className={`w-full border rounded-md p-2 ${errors.coverLetter ? 'border-red-500' : ''}`}
              placeholder="Why are you interested in this position?"
            />
            {errors.coverLetter && (
              <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume *
            </label>
            <input
              type="file"
              onChange={(e) => setFormData(prev => ({ ...prev, resume: e.target.files[0] }))}
              className={`w-full ${errors.resume ? 'text-red-500' : ''}`}
              accept=".pdf,.doc,.docx"
            />
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio Link
            </label>
            <input
              type="url"
              value={formData.portfolio}
              onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
              className="w-full border rounded-md p-2"
              placeholder="https://yourportfolio.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Start Date
            </label>
            <input
              type="date"
              value={formData.availableDate}
              onChange={(e) => setFormData(prev => ({ ...prev, availableDate: e.target.value }))}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              rows={3}
              className="w-full border rounded-md p-2"
              placeholder="Any additional information you'd like to share?"
            />
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm">{errors.submit}</p>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;