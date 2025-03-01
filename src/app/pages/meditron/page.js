"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Copy } from "lucide-react";

export default function MeditronAI() {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!symptoms.trim()) {
      setError("Please enter symptoms first");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("http://127.0.0.1:5500/generate-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: symptoms }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if data.response exists
      if (!data || !data.response) {
        throw new Error("Invalid response format from API");
      }
      
      // Format the response text for proper display
      // Convert markdown-style formatting to HTML
      let formattedText = data.response;
      
      setAnalysis({
        explanation: formattedText
      });
    } catch (err) {
      console.error("Error generating analysis:", err);
      setError("Failed to generate analysis: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Convert markdown-style text to HTML
  const formatText = (text) => {
    if (!text) return "";
    
    // Replace ** with strong tags
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace * with em tags
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace newlines with br tags
    formatted = formatted.replace(/\n/g, '<br/>');
    
    return formatted;
  };

  const handleCopy = () => {
    if (analysis) {
      navigator.clipboard.writeText(analysis.explanation);
    }
  };

  const handleDownload = () => {
    if (analysis) {
      const element = document.createElement("a");
      const file = new Blob([analysis.explanation], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "MeditronAI_Report.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 p-6 pt-24 text-white">
      <h1 className="text-3xl font-bold text-green-500 mb-4">MeditronAI - Diagnosis Assistant</h1>
      <p className="text-neutral-400 text-center max-w-xl mb-6">Enter the patient's symptoms in medical jargon, and MeditronAI will generate a detailed analysis with a predicted condition.</p>
      
      <Card className="w-full max-w-3xl bg-neutral-800 border border-neutral-700 shadow-lg p-6 rounded-xl">
        <CardContent>
          <Textarea
            placeholder="Enter symptoms in medical jargon..."
            className="w-full h-40 p-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleGenerate} 
              className="bg-green-600 hover:bg-green-500 transition px-6"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Generate Analysis"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {analysis && (
        <Card className="w-full max-w-3xl bg-neutral-800 border border-neutral-700 shadow-lg p-6 mt-6 rounded-xl animate-fade-in">
          <CardContent>
            <h2 className="text-2xl font-semibold text-green-500 mb-4">Diagnostic Analysis</h2>
            <div 
              className="text-neutral-300 mt-2"
              dangerouslySetInnerHTML={{ __html: formatText(analysis.explanation) }}
            />
            <div className="flex gap-4 mt-6">
              <Button onClick={handleCopy} className="bg-neutral-700 hover:bg-neutral-600 flex items-center gap-2 px-6">
                <Copy size={18} /> Copy
              </Button>
              <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-500 flex items-center gap-2 px-6">
                <Download size={18} /> Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}