import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";

const SYSTEM_PROMPT = `You are Fundi-AI, the helpful assistant for FundiMart.
FundiMart is a leading construction materials marketplace in Kenya.
Your goal is to help users with questions about the website, system, services, and construction materials.
Key Information:
- Mission: Quality construction materials accessible to everyone in Kenya.
- Offerings: Cement, power tools, building materials, etc.
- New Tools: 
  1. Project Planner (/planner): Helps users estimate material requirements and total project costs.
  2. Product Comparison (/compare): Allows side-by-side comparison of products based on price and quality.
- Services: Wide selection, competitive pricing, fast delivery across Kenya, expert support, quality assurance.
- Workflow: 
  1. Product Exploration (browse, filter).
  2. Seller Verification (rigorous process).
  3. Easy Order Placement (Secure checkout, M-Pesa supported).
  4. Fast & Reliable Shipping (Real-time tracking).
  5. Reviews & Feedback.
- Contact: info@fundimart.co.ke, +254 (0) XXX XXX XXX.
- Founders/Team: Industry experts, logistics professionals.
Be polite, professional, and helpful. If you don't know something, ask the user to contact support at info@fundimart.co.ke.`;

export default function FundiAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
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
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Thank you for your message! I am currently in demo mode. For real-time assistance, please contact our support team at info@fundimart.co.ke or call +254 (0) XXX XXX XXX." 
      }]);
      setIsLoading(false);
    }, 1500);
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
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                      m.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-card text-card-foreground rounded-tl-none border border-border'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.text}</p>
                    </div>
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
