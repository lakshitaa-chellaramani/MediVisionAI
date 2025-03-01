"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Bot, Pill, Heart, FileQuestion, Info } from "lucide-react";

export default function AISymptomChecker() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AI Health Assistant. What symptoms are you experiencing today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setDebugInfo(null);

    try {
      const response = await fetch("http://127.0.0.1:5500/generate-diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const responseText = await response.text();
      
      let data;
      let debugData = {
        status: response.status,
        rawResponse: responseText,
        parsed: null,
        error: null
      };
      
      try {
        if (responseText && responseText.trim()) {
          data = JSON.parse(responseText);
          debugData.parsed = data;
        } else {
          data = {};
          debugData.error = "Empty response";
        }
      } catch (parseError) {
        debugData.error = `JSON parse error: ${parseError.message}`;
        data = {};
        
        if (responseText && responseText.trim()) {
          data = [{ response: responseText }];
        }
      }
      
      setDebugInfo(debugData);

      // Handle the array response structure
      let aiText = "";
      let doctorType = "";
      
      if (Array.isArray(data)) {
        // Find the object with response property
        const responseObj = data.find(item => item.response);
        if (responseObj) {
          aiText = responseObj.response.trim();
        }
        
        // Find the object with doctor_type property
        const doctorObj = data.find(item => item.doctor_type);
        if (doctorObj && doctorObj.doctor_type) {
          doctorType = doctorObj.doctor_type.trim();
        }
      } else if (data.response) {
        // Handle the case where it's a single object with response property
        aiText = data.response.trim();
        doctorType = data.doctor_type || data.doctorType || "";
      }

      let aiResponseText;
      
      if (aiText) {
        aiResponseText = aiText;
        // Only add doctor recommendation if doctorType exists and isn't empty
        if (doctorType != "No doctor type found" && doctorType.length > 0) {
          aiResponseText += `\n\nYou might want to consult a **${doctorType}**.`;
        }
      } else {
        aiResponseText = "I couldn't determine your condition. Please provide more details.";
      }

      const aiResponse = { role: "ai", text: aiResponseText };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error in API call:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Unable to connect to the server. Please try again later." }
      ]);
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle debug display
  const toggleDebug = () => {
    setDebugInfo(prev => prev ? null : { hidden: true });
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-50 text-neutral-800 pt-20">
      {/* Header */}
      <div className="p-4 text-xl font-bold bg-white shadow-sm border-b border-neutral-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
            <Heart size={18} />
          </div>
          <span>AI Symptom Checker</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs border-green-200 text-green-600 hover:bg-green-50">
            <FileQuestion size={14} className="mr-1" /> Help
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-green-200 text-green-600 hover:bg-green-50">
            <Info size={14} className="mr-1" /> About
          </Button>
        </div>
      </div>

      {/* Features or quick links */}
      {/* <div className="flex justify-center gap-4 py-3 bg-green-50 border-b border-green-100">
        <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100">
          <Pill size={14} className="mr-1" /> Common Symptoms
        </Button>
        <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100">
          <FileQuestion size={14} className="mr-1" /> Health FAQ
        </Button>
        <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100">
          <Info size={14} className="mr-1" /> Medical Disclaimer
        </Button>
      </div> */}

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full mr-2 shadow-sm">
                <Bot size={18} />
              </div>
            )}
            <div
              className={`p-4 max-w-[75%] rounded-lg shadow-sm ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-white border border-neutral-200 text-neutral-800 rounded-bl-none"
              }`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-green-700">$1</strong>').replace(/\n/g, '<br/>') }}
            />
            {msg.role === "user" && (
              <div className="w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded-full ml-2 shadow-sm">
                <span className="text-xs font-bold">You</span>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full mr-2 shadow-sm">
              <Bot size={18} />
            </div>
            <div className="p-4 max-w-[75%] bg-white border border-neutral-200 text-neutral-500 rounded-lg shadow-sm rounded-bl-none">
              <div className="flex items-center">
                <Loader2 className="animate-spin mr-2" size={16} />
                <span>Analyzing your symptoms...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t border-neutral-200 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <input
            type="text"
            className="flex-1 bg-neutral-50 border border-neutral-200 text-neutral-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            placeholder="Describe your symptoms (e.g., headache, fever, cough)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button 
            onClick={handleSend} 
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg shadow-sm transition-all hover:shadow-md"
          >
            <Send size={18} className="mr-2" /> Send
          </Button>
        </div>
        <div className="max-w-3xl mx-auto mt-2 text-xs text-neutral-500 text-center">
          Note: This AI tool provides general guidance only and is not a substitute for professional medical advice.
        </div>
      </div>
    </div>
  );
}