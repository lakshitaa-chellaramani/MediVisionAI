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
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5500/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });

      const data = await response.json();

      const aiResponse = {
        role: "ai",
        text: data.response || "I'm not sure about that. Please try again."
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Failed to connect to the server. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
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
            >
              {msg.text}
            </div>
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
