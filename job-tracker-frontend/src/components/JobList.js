import React from "react";
import axios from "axios";
import DeleteJobButton from "./DeleteJobButton";

export default function JobList({ jobs, fetchJobs }) {
  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.post(
        "http://job-tracker-backend.local/update_status.php",
        { id, status },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        fetchJobs(); // Refresh list
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-6 rounded-lg shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white uppercase text-sm tracking-wider">
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Position</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Notes</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b last:border-none hover:bg-blue-50 transition duration-200">
              <td className="px-4 py-2">{job.company}</td>
              <td className="px-4 py-2">{job.position}</td>
              <td className="px-4 py-2">
                <select
                  className="border p-1 rounded bg-white"
                  value={job.status}
                  onChange={(e) => handleStatusChange(job.id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td className="px-4 py-2">{job.notes || "N/A"}</td>
              <td className="px-4 py-2">
                <DeleteJobButton jobId={job.id} fetchJobs={fetchJobs} />
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">No job applications added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
