import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import Index from "./pages/Index";
import About from "./pages/About";
import Teachers from "./pages/Teachers";
import Programs from "./pages/Programs";
import News from "./pages/News";
import Contacts from "./pages/Contacts";
import Auth from "./pages/Auth";
import Trainer from "./pages/Trainer";
import TrainerSession from "./pages/TrainerSession";
import TrainerDashboard from "./pages/TrainerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AccessibilityPanel />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/news" element={<News />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/trainer" element={<Trainer />} />
          <Route path="/trainer/session" element={<TrainerSession />} />
          <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
