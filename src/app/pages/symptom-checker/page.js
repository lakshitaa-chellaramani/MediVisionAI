"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Bot } from "lucide-react";

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
    <div className="flex flex-col h-screen pt-16 bg-neutral-950 text-white">
      {/* Header */}
      <div className="p-4 text-xl font-bold bg-neutral-900 shadow-md border-b border-neutral-800 flex justify-between items-center">
        <span>AI Symptom Checker</span>
        {/* <button 
          onClick={toggleDebug} 
          className="text-xs bg-neutral-800 hover:bg-neutral-700 px-2 py-1 rounded"
        >
          {debugInfo ? "Hide Debug" : "Show Debug"}
        </button> */}
      </div>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 bg-green-600 flex items-center justify-center rounded-full mr-2">
                <Bot size={18} />
              </div>
            )}
            <div
              className={`p-3 max-w-[75%] rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-neutral-800 text-neutral-300 rounded-bl-none"
              }`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }}
            />
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-green-600 flex items-center justify-center rounded-full mr-2">
              <Bot size={18} />
            </div>
            <div className="p-3 max-w-[75%] bg-neutral-800 text-neutral-400 text-sm rounded-lg">
              <Loader2 className="animate-spin inline-block mr-1" size={14} />
              Typing...
            </div>
          </div>
        )}
        
        {/* Debug Info - only show when there's actual debug info */}
        {/* {debugInfo && !debugInfo.hidden && (
          <div className="mt-4 p-3 border border-yellow-600 bg-neutral-900 rounded text-xs text-yellow-500 overflow-x-auto">
            <div><strong>Status:</strong> {debugInfo.status}</div>
            <div><strong>Error:</strong> {debugInfo.error || 'None'}</div>
            <div className="mt-1"><strong>Raw Response:</strong> {debugInfo.rawResponse ? debugInfo.rawResponse.substring(0, 200) + (debugInfo.rawResponse.length > 200 ? '...' : '') : 'Empty'}</div>
            <div className="mt-1"><strong>Parsed Data:</strong> {debugInfo.parsed ? JSON.stringify(debugInfo.parsed).substring(0, 200) + (JSON.stringify(debugInfo.parsed).length > 200 ? '...' : '') : 'None'}</div>
          </div>
        )} */}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 bg-neutral-800 border border-neutral-700 text-neutral-300 p-2 rounded-md outline-none focus:border-green-500"
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} className="bg-green-600 text-white">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}