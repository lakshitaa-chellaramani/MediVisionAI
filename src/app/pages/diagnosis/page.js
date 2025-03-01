"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, UserCheck, ImageIcon, FileDigit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DiagnosisPage() {
  const [selectedScanFile, setSelectedScanFile] = useState(null);
  const [selectedReportFile, setSelectedReportFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiReport, setAiReport] = useState(null);
  const [activeTab, setActiveTab] = useState("scans");

  const handleScanFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedScanFile(file);
    setAiReport(null); // Reset report when a new file is uploaded
  };

  const handleReportFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedReportFile(file);
    setAiReport(null); // Reset report when a new file is uploaded
  };

  const handleAnalyzeScan = async () => {
    if (selectedScanFile) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', selectedScanFile);
        
        const response = await fetch('http://127.0.0.1:5500/generate-scan', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.text();
        setAiReport({
          type: 'scan',
          result: result,
        });
      } catch (error) {
        console.error('Error analyzing scan:', error);
        setAiReport({
          type: 'error',
          result: 'An error occurred while analyzing the scan. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAnalyzeReport = async () => {
    if (selectedReportFile) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', selectedReportFile);
        
        const response = await fetch('http://127.0.0.1:5500/generate-report', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.text();
        setAiReport({
          type: 'report',
          result: result,
        });
      } catch (error) {
        console.error('Error analyzing report:', error);
        setAiReport({
          type: 'error',
          result: 'An error occurred while analyzing the report. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-6 pt-20">
      <Card className="w-full max-w-2xl p-6 shadow-lg border rounded-xl bg-neutral-800">
        <CardHeader className="text-xl font-semibold text-green-500 flex items-center gap-2">
          <FileText className="h-6 w-6 text-green-500" /> Diagnosis Analysis
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <Tabs 
            defaultValue="scans" 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-4 bg-neutral-700">
              <TabsTrigger 
                value="scans" 
                className="data-[state=active]:bg-neutral-600 data-[state=active]:text-green-500 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
              >
                X-rays & Scans
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:bg-neutral-600 data-[state=active]:text-green-500 data-[state=active]:border-b-2 data-[state=active]:border-green-500"
              >
                Test Reports
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
              {activeTab === "scans" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-4">
                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-green-500 p-6 rounded-lg cursor-pointer bg-neutral-700 hover:bg-neutral-600">
                      <ImageIcon className="h-8 w-8 text-green-500" />
                      <span className="mt-2 text-sm text-white">Upload X-ray, MRI, or CT scan</span>
                      <Input type="file" className="hidden" onChange={handleScanFileUpload} accept="image/*,.dicom" />
                    </label>
                    {selectedScanFile && (
                      <p className="text-sm text-gray-300">Uploaded: {selectedScanFile.name}</p>
                    )}
                  </div>
                  <Button 
                    onClick={handleAnalyzeScan} 
                    disabled={!selectedScanFile || isLoading} 
                    className="bg-green-500 w-full hover:bg-green-600"
                  >
                    {isLoading && activeTab === "scans" ? "Analyzing..." : "Analyze Scan"}
                  </Button>
                </div>
              )}
              
              {activeTab === "reports" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-4">
                    <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-green-500 p-6 rounded-lg cursor-pointer bg-neutral-700 hover:bg-neutral-600">
                      <FileDigit className="h-8 w-8 text-green-500" />
                      <span className="mt-2 text-sm text-white">Upload Blood Tests, Urine Tests, etc.</span>
                      <Input type="file" className="hidden" onChange={handleReportFileUpload} accept=".pdf,.doc,.docx,.txt" />
                    </label>
                    {selectedReportFile && (
                      <p className="text-sm text-gray-300">Uploaded: {selectedReportFile.name}</p>
                    )}
                  </div>
                  <Button 
                    onClick={handleAnalyzeReport} 
                    disabled={!selectedReportFile || isLoading} 
                    className="bg-green-500 w-full hover:bg-green-600"
                  >
                    {isLoading && activeTab === "reports" ? "Analyzing..." : "Analyze Report"}
                  </Button>
                </div>
              )}
            </div>
          </Tabs>

          {aiReport && (
            <div className="p-4 mt-4 bg-neutral-700 rounded-lg border border-green-500 text-white">
              <p className="text-lg font-semibold text-green-500">
                AI Diagnosis {aiReport.type === 'scan' ? 'Scan' : 'Report'} Analysis
              </p>
              <div className="mt-2 whitespace-pre-line text-sm">
                {aiReport.result}
              </div>
            </div>
          )}
          
          <Button className="bg-green-500 w-full flex items-center gap-2 mt-4 hover:bg-green-600">
            <UserCheck className="h-5 w-5" /> Consult a Doctor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}