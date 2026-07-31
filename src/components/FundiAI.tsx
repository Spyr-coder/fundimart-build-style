import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot, Loader2 } from "lucide-react";

// Define structured message interface with optional recommended categories
interface Message {
  role: 'user' | 'bot';
  text: string;
  recommendedCategories?: string[];
}

export default function FundiAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hello! I'm Fundi-AI. How can I help you with your construction needs today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // 1. Append user's message locally
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Format local state to match backend's chatHistory format
      // mapped as: { sender: "user" | "bot", text: string }
      const formattedHistory = messages.map(msg => ({
        sender: msg.role === 'user' ? 'user' : 'bot',
        text: msg.text
      }));

      // 3. Make the API request to your verified Node/Express server
      const response = await fetch("http://localhost:5000/api/ai/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage,
          chatHistory: formattedHistory
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI server.");
      }

      const data = await response.json();

      // 4. Append live Gemini structured data
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: data.replyText,
        recommendedCategories: data.recommendedCategories || []
      }]);

    } catch (error) {
      console.error("AI Communication Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Sorry, I ran into an error connecting to my server. Please verify your backend is running on port 5000!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <Card className="w-80 md:w-96 h-[500px] flex flex-col shadow-2xl border-primary/20 animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="bg-primary text-primary-foreground p-4 flex flex-row items-center justify-between rounded-t-lg space-y-0">
            <div className="flex items-center gap-2">
              <div className="bg-primary-foreground/20 p-1.5 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold block">Fundi-AI</span>
                <span className="text-[10px] opacity-80 uppercase tracking-wider">Online Assistant</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 bg-muted/30">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                      m.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-card text-card-foreground rounded-tl-none border border-border'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    </div>

                    {/* Interactive Recommendations UI */}
                    {m.recommendedCategories && m.recommendedCategories.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                        {m.recommendedCategories.map((cat, categoryIdx) => (
                          <button
                            key={categoryIdx}
                            onClick={() => {
                              // Directs user to category page filtering on target device
                              window.location.href = `/products?category=${encodeURIComponent(cat)}`;
                            }}
                            className="text-[11px] font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground rounded-full px-2.5 py-1 transition-all duration-200"
                          >
                            Search {cat} ↗
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-xs text-muted-foreground italic">Fundi-AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t bg-card">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
              <Input 
                placeholder="Type your message..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="shrink-0 h-9 w-9">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)} 
          size="lg" 
          className="rounded-full w-16 h-16 shadow-2xl hover:scale-105 transition-all duration-300 bg-primary group"
        >
          <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
          </span>
        </Button>
      )}
    </div>
  );
}