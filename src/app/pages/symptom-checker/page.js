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

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    // Simulating AI response delay
    setTimeout(() => {
      const aiResponse = {
        role: "ai",
        text: `Based on your symptoms, you may be experiencing mild fatigue. It's recommended to stay hydrated and monitor for additional symptoms.`
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen pt-16 bg-neutral-950 text-white">
      {/* Header */}
      <div className="p-4 text-xl font-bold bg-neutral-900 shadow-md border-b border-neutral-800 text-center">
        AI Symptom Checker
      </div>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 bg-rose-600 flex items-center justify-center rounded-full mr-2">
                <Bot size={18} />
              </div>
            )}
            <div
              className={`p-3 max-w-[75%] rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-rose-600 text-white rounded-br-none"
                  : "bg-neutral-800 text-neutral-300 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-rose-600 flex items-center justify-center rounded-full mr-2">
              <Bot size={18} />
            </div>
            <div className="p-3 max-w-[75%] bg-neutral-800 text-neutral-400 text-sm rounded-lg">
              <Loader2 className="animate-spin inline-block mr-1" size={14} />
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 bg-neutral-800 border border-neutral-700 text-neutral-300 p-2 rounded-md outline-none focus:border-rose-500"
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} className="bg-rose-600 text-white">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
