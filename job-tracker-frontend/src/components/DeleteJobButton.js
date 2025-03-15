import React from "react";
import axios from "axios";

export default function DeleteJobButton({ jobId, fetchJobs }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await axios.post(
        "http://job-tracker-backend.local/delete_job.php",
        { id: jobId },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        fetchJobs(); // Refresh list
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Delete
    </button>
  );
}
