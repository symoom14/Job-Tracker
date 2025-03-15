import React, { useState } from "react";
import axios from "axios"; // ✅ Import axios

function AddJobForm({ onJobAdded }) { 
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      company,
      position,
      applied_date: appliedDate,
      status: "Applied",
      notes,
    };

    try {
      const response = await axios.post(
        "http://job-tracker-backend.local/add_job.php",
        JSON.stringify(newJob),
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        onJobAdded(); // Refresh job list
        setCompany("");
        setPosition("");
        setAppliedDate("");
        setNotes("");
      } else {
        console.error("API Error:", response.data.error);
        alert("Error: " + (response.data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job: " + (error.response ? error.response.data : "No response from server"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Add New Job</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Company"
          className="border p-2 rounded w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          className="border p-2 rounded w-full"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Notes"
          className="border p-2 rounded w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full mt-4">
        Add Job
      </button>
    </form>
  );
}

export default AddJobForm;
