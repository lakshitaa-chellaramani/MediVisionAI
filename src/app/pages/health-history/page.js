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

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 pt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Health History</h1>
      
      <div className="flex space-x-4 justify-center mb-6">
        {tabs.map((t) => (
          <Button
            key={t.id}
            className={`px-4 py-2 rounded-md ${tab === t.id ? "bg-green-600" : "bg-neutral-800"}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </Button>
        ))}
      </div>

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
  );
}

function Table({ title, data, downloadable }) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-green-400">{title}</h2>
      <table className="w-full border-collapse border border-neutral-700 text-white">
        <thead>
          <tr className="bg-neutral-700">
            {data.headers.map((header, index) => (
              <th key={index} className="border border-neutral-600 p-2">{header}</th>
            ))}
            {downloadable && <th className="border border-neutral-600 p-2">Download</th>}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-neutral-900 even:bg-neutral-800">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-neutral-700 p-2">{cell}</td>
              ))}
              {downloadable && (
                <td className="border border-neutral-700 p-2">
                  <Button className="bg-green-600 text-white px-2 py-1">Download</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Sample Data
const appointmentsData = {
  headers: ["Date", "Doctor", "Specialization", "Hospital"],
  rows: [
    ["12-Jan-2024", "Dr. Smith", "Cardiology", "City Hospital"],
    ["25-Feb-2024", "Dr. Jane", "Dermatology", "Wellness Clinic"],
  ],
};

const reportsData = {
  headers: ["Date", "Report Type", "Hospital"],
  rows: [
    ["10-Jan-2024", "MRI Scan", "City Hospital"],
    ["15-Feb-2024", "Blood Test", "LabCorp"],
  ],
};

const aiChatsData = {
  headers: ["Date", "Symptoms Analyzed", "Result"],
  rows: [
    ["05-Mar-2024", "Fever, Cough", "Possible Flu"],
    ["10-Apr-2024", "Headache, Fatigue", "Possible Migraine"],
  ],
};

const prescriptionsData = {
  headers: ["Date", "Medicine", "Dosage", "Doctor"],
  rows: [
    ["12-Jan-2024", "Paracetamol", "500mg", "Dr. Smith"],
    ["25-Feb-2024", "Cetirizine", "10mg", "Dr. Jane"],
  ],
};

const doctorNotesData = {
  headers: ["Date", "Doctor", "Notes"],
  rows: [
    ["12-Jan-2024", "Dr. Smith", "Monitor blood pressure regularly."],
    ["25-Feb-2024", "Dr. Jane", "Apply moisturizer daily for dry skin."],
  ],
};
