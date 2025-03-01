"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DiagnosisPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [aiReport, setAiReport] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setAiReport(null); // Reset report when a new file is uploaded
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      setAiReport({
        result: "Potential abnormality detected.",
        confidence: "87%",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-6">
      <Card className="w-full max-w-2xl p-6 shadow-lg border rounded-xl bg-neutral-800">
        <CardHeader className="text-xl font-semibold text-green-500 flex items-center gap-2">
          <FileText className="h-6 w-6 text-green-500" /> Diagnosis Analysis
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4">
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-green-500 p-6 rounded-lg cursor-pointer bg-neutral-700 hover:bg-neutral-600">
              <Upload className="h-8 w-8 text-green-500" />
              <span className="mt-2 text-sm text-white">Click to upload X-ray, MRI, or CT scan</span>
              <Input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
            {selectedFile && (
              <p className="text-sm text-gray-300">Uploaded: {selectedFile.name}</p>
            )}
          </div>
          <Button onClick={handleAnalyze} disabled={!selectedFile} className="bg-green-500 w-full">
            Analyze Scan
          </Button>
          {aiReport && (
            <div className="p-4 bg-neutral-700 rounded-lg border border-green-500 text-white">
              <p className="text-lg font-semibold text-green-500">AI Diagnosis Report</p>
              <p className="text-sm">{aiReport.result}</p>
              <p className="text-sm">Confidence Level: {aiReport.confidence}</p>
            </div>
          )}
          <Button className="bg-green-500 w-full flex items-center gap-2">
            <UserCheck className="h-5 w-5" /> Consult a Doctor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
