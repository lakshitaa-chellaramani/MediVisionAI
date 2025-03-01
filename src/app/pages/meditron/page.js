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

  const handleGenerate = async () => {
    setLoading(true);
    // Simulating AI response
    setTimeout(() => {
      setAnalysis({
        condition: "Pneumonia",
        explanation: "The symptoms provided indicate a possible lung infection. Further examination and tests are required for confirmation.",
      });
      setLoading(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Condition: ${analysis.condition}\nExplanation: ${analysis.explanation}`);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Condition: ${analysis.condition}\nExplanation: ${analysis.explanation}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "MeditronAI_Report.txt";
    document.body.appendChild(element);
    element.click();
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
          <div className="flex justify-end mt-4">
            <Button onClick={handleGenerate} className="bg-green-600 hover:bg-green-500 transition px-6">
              {loading ? "Analyzing..." : "Generate Analysis"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {analysis && (
        <Card className="w-full max-w-3xl bg-neutral-800 border border-neutral-700 shadow-lg p-6 mt-6 rounded-xl animate-fade-in">
          <CardContent>
            <h2 className="text-2xl font-semibold text-green-500">Predicted Condition</h2>
            <p className="text-lg text-white mt-2">{analysis.condition}</p>
            <h3 className="text-xl font-semibold text-green-400 mt-4">Explanation</h3>
            <p className="text-neutral-300 mt-2">{analysis.explanation}</p>
            <div className="flex gap-4 mt-6">
              <Button onClick={handleCopy} className="bg-neutral-700 hover:bg-neutral-600 flex items-center gap-2 px-6">
                <Copy size={18} /> Copy
              </Button>
              <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-500 flex items-center gap-2 px-6">
                <Download size={18} /> Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
