'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, ChevronDown, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const faqs = {
  'What is MediVisionAI?': 'MediVisionAI is an AI-powered platform for medical diagnosis and imaging analysis.',
  'How does MediVisionAI work?': 'We use deep learning models to analyze X-rays, MRIs, and CT scans for early disease detection.',
  'Is MediVisionAI a replacement for doctors?': 'No, it is an assistive tool to help radiologists and healthcare professionals.',
  'How can I book an appointment?': 'You can sign in and use our referral system to book an appointment with specialists.',
  'What types of scans does MediVisionAI analyze?': 'We support X-rays, MRIs, and CT scans.',
  'Is my medical data secure?': 'Yes, we follow strict security protocols to keep your data safe.',
  'Can I use MediVisionAI without a doctor?': 'You can check your symptoms, but we always recommend consulting a doctor for a final diagnosis.',
};

export default function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([
    { text: 'Hi! Ask me anything about MediVisionAI.', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (message) => {
    if (!message.trim()) return; // Prevent empty messages

    const userMessage = { text: message, sender: 'user' };
    const botResponse = faqs[message]
      ? { text: faqs[message], sender: 'bot' }
      : { text: 'I can answer FAQs! Please sign in for more details.', sender: 'bot' };

    setMessages([...messages, userMessage, botResponse]);
    setInput('');
  };

  return (
    <Card className="fixed bottom-20 right-6 w-full max-w-md p-4 shadow-lg border rounded-xl bg-neutral-900 text-white z-50">
      {/* Header with Close Button */}
      <CardHeader className="flex justify-between items-center text-lg font-semibold text-rose-500">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-rose-500" />
          AI Chatbot
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-neutral-800">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      {/* Chat Messages */}
      <CardContent className="h-64 overflow-y-auto flex flex-col gap-2 p-2 bg-neutral-800 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'self-end bg-rose-500 text-white' : 'self-start bg-neutral-700 text-white'}`}
          >
            {msg.text}
          </div>
        ))}
      </CardContent>

      {/* FAQ Dropdown & Input Box */}
      <div className="flex flex-col gap-2 mt-2">
        {/* FAQ Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-rose-500 flex items-center gap-2 w-full">
              FAQs <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-800 text-white border-neutral-700">
            {Object.keys(faqs).map((question, index) => (
              <DropdownMenuItem key={index} onClick={() => handleSendMessage(question)} className="hover:bg-neutral-700">
                {question}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Input Field & Send Button */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask me something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-neutral-800 text-white border-neutral-700"
          />
          <Button onClick={() => handleSendMessage(input)} className="bg-rose-500">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
