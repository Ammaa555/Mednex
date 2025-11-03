import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { generateAIChatResponse } from "@/utils/ai-helpers";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! 👋 I'm your AI Health Assistant. I'm here to answer questions about health, fitness, nutrition, mental wellness, and general medical topics. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = generateAIChatResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are the benefits of regular exercise?",
    "How can I improve my sleep quality?",
    "What should I eat for a healthy diet?",
    "How do I manage stress?",
    "What are warning signs I should seek medical care?",
    "How often should I have health check-ups?",
  ];

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        type: "ai",
        content: "Hello! 👋 I'm your AI Health Assistant. I'm here to answer questions about health, fitness, nutrition, mental wellness, and general medical topics. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col">
        <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col h-screen">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">💬 AI Health Chat</h1>
            <p className="text-muted-foreground">
              Ask any health-related questions and get instant AI-powered responses
            </p>
          </div>

          <div className="flex-1 bg-white rounded-lg border border-border overflow-hidden flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-surface/30 text-foreground border border-surface rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 opacity-70`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface/30 text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (shown when chat is short) */}
            {messages.length <= 1 && !isLoading && (
              <div className="px-6 py-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground mb-3">Quick Questions:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickQuestions.slice(0, 4).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left text-sm p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded border border-primary/30 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-border p-4 space-y-3">
              <div className="flex gap-3">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your health..."
                  className="flex-1 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 h-fit"
                >
                  Send
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={clearChat}
                  variant="outline"
                  className="text-xs"
                >
                  Clear Chat
                </Button>
                <p className="text-xs text-muted-foreground flex items-center">
                  💡 Tip: This AI provides general health information. Always consult professionals for medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
