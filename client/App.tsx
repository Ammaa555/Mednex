import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GeneticAnalyzer from "./pages/GeneticAnalyzer";
import BMICalculator from "./pages/BMICalculator";
import HealthAnalyzer from "./pages/HealthAnalyzer";
import HealthForm from "./pages/HealthForm";
import AIChat from "./pages/AIChat";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/genetic-analyzer" element={<GeneticAnalyzer />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/health-analyzer" element={<HealthAnalyzer />} />
          <Route path="/health-form" element={<HealthForm />} />
          <Route path="/health-tracker" element={<HealthForm />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
