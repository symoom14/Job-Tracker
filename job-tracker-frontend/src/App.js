import React, { useEffect, useState } from "react";
import axios from "axios";
import AddJobForm from "./components/AddJobForm";
import JobList from "./components/JobList";

export default function App() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    axios.get("https://job-tracker.infy.uk/get_jobs.php")
    .then(response => setJobs(response.data))
      .catch(error => console.error("Error fetching jobs:", error));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center py-10 transition-all">
      {/* Header */}
      <div className="w-full max-w-4xl bg-green-500 text-white text-center py-6 shadow-lg mb-8">
        <h1 className="text-4xl font-bold tracking-wide">Job Application Tracker</h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <AddJobForm onJobAdded={fetchJobs} />
        <JobList jobs={jobs || []} fetchJobs={fetchJobs} />
      </div>
    </div>
  );
}
