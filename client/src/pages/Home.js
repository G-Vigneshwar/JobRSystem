import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Job Recruitment System</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">For Employers</h2>
          <p className="mb-4">Post jobs and find the perfect candidates for your positions.</p>
          <Link
            to="/employer"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Go to Employer Dashboard
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">For Job Seekers</h2>
          <p className="mb-4">Find your dream job and track your applications.</p>
          <Link
            to="/applicant"
            className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Go to Applicant Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;