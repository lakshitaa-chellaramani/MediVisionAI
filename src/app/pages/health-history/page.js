"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HealthHistory() {
  const [tab, setTab] = useState("appointments");

  const tabs = [
    { id: "appointments", label: "Previous Appointments" },
    { id: "reports", label: "Scans & Reports" },
    { id: "aiChats", label: "AI Symptom Analysis" },
    { id: "prescriptions", label: "Prescriptions History" },
    { id: "doctorNotes", label: "Doctor's Notes" },
  ];

  // Example data arrays (assuming these exist in your actual code)
const appointmentsData = {
  headers: ["Date", "Doctor", "Specialization", "Hospital"],
  rows: [
    ["12-Jan-2024", "Dr. Smith", "Cardiology", "City Hospital"],
    ["25-Feb-2024", "Dr. Jane", "Dermatology", "Wellness Clinic"],
    ["05-Mar-2024", "Dr. Patel", "Orthopedics", "Sunrise Medical Center"],
    ["18-Mar-2024", "Dr. Brown", "Neurology", "NeuroCare Hospital"],
    ["02-Apr-2024", "Dr. Lee", "Pediatrics", "Children's Hospital"],
  ],
};

const reportsData = {
  headers: ["Date", "Report Type", "Hospital"],
  rows: [
    ["10-Jan-2024", "MRI Scan", "City Hospital"],
    ["15-Feb-2024", "Blood Test", "LabCorp"],
    ["22-Feb-2024", "X-Ray", "Sunrise Medical Center"],
    ["05-Mar-2024", "CT Scan", "NeuroCare Hospital"],
    ["12-Apr-2024", "ECG", "City Hospital"],
  ],
};

const aiChatsData = {
  headers: ["Date", "Symptoms Analyzed", "Result"],
  rows: [
    ["05-Mar-2024", "Fever, Cough", "Possible Flu"],
    ["10-Apr-2024", "Headache, Fatigue", "Possible Migraine"],
    ["15-Apr-2024", "Chest Pain, Dizziness", "Possible Heart Issue"],
    ["20-Apr-2024", "Nausea, Stomach Pain", "Possible Food Poisoning"],
    ["25-Apr-2024", "Joint Pain, Swelling", "Possible Arthritis"],
  ],
};

const prescriptionsData = {
  headers: ["Date", "Medicine", "Dosage", "Doctor"],
  rows: [
    ["12-Jan-2024", "Paracetamol", "500mg", "Dr. Smith"],
    ["25-Feb-2024", "Cetirizine", "10mg", "Dr. Jane"],
    ["05-Mar-2024", "Ibuprofen", "200mg", "Dr. Patel"],
    ["18-Mar-2024", "Omeprazole", "20mg", "Dr. Brown"],
    ["02-Apr-2024", "Metformin", "500mg", "Dr. Lee"],
  ],
};

const doctorNotesData = {
  headers: ["Date", "Doctor", "Notes"],
  rows: [
    ["12-Jan-2024", "Dr. Smith", "Monitor blood pressure regularly."],
    ["25-Feb-2024", "Dr. Jane", "Apply moisturizer daily for dry skin."],
    ["05-Mar-2024", "Dr. Patel", "Avoid strenuous activities for 2 weeks."],
    ["18-Mar-2024", "Dr. Brown", "Follow a balanced diet to improve focus."],
    ["02-Apr-2024", "Dr. Lee", "Ensure child gets enough sleep and hydration."],
  ],
};


  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-800 p-6 pt-24">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-8">Health History</h1>
      
      {/* Tabs with improved styling */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tabs.map((t) => (
          <Button
            key={t.id}
            variant={tab === t.id ? "default" : "outline"}
            className={`px-4 py-2 rounded-md ${
              tab === t.id 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-white text-green-700 border-green-200 hover:bg-green-50 hover:text-green-800"
            }`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {tab === "appointments" && (
          <Table title="Previous Appointments" data={appointmentsData} />
        )}
        {tab === "reports" && (
          <Table title="Scans & Reports" data={reportsData} downloadable />
        )}
        {tab === "aiChats" && (
          <Table title="AI Symptom Analysis" data={aiChatsData} />
        )}
        {tab === "prescriptions" && (
          <Table title="Prescriptions History" data={prescriptionsData} downloadable />
        )}
        {tab === "doctorNotes" && (
          <Table title="Doctor's Notes" data={doctorNotesData} />
        )}
      </div>
    </div>
  );
}

function Table({ title, data, downloadable }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-neutral-200">
      <h2 className="text-xl font-semibold mb-4 text-green-700">{title}</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100">
              {data.headers.map((header, index) => (
                <th key={index} className="border-b border-green-100 p-3 text-left text-green-800">{header}</th>
              ))}
              {downloadable && <th className="border-b border-green-100 p-3 text-left text-green-800">Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-neutral-50 border-b border-neutral-100">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-3 text-neutral-700">{cell}</td>
                ))}
                {downloadable && (
                  <td className="p-3">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white font-medium"
                    >
                      Download
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}