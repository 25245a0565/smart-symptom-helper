import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, HeartPulse } from "lucide-react";
import SymptomForm from "@/components/SymptomForm";
import AnalysisResults from "@/components/AnalysisResults";
import { analyzeSymptoms } from "@/lib/symptomAnalyzer";
import type { AnalysisResult } from "@/lib/symptomAnalyzer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = (data: {
    symptoms: string[];
    age: string;
    gender: string;
    temperature: string;
    duration: string;
    followUpAnswers?: Record<string, string>;
    relatedSymptoms?: string[];
  }) => {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeSymptoms(
        data.symptoms,
        {
          age: data.age,
          temperature: data.temperature,
          duration: data.duration,
        },
        data.followUpAnswers
      );
      setResult(analysis);
      setIsLoading(false);
    }, 1800);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border bg-card/80 backdrop-blur-sm flex items-center gap-3 shrink-0">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
          <HeartPulse className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-base font-bold text-card-foreground leading-tight">SmartCare</h1>
          <p className="text-[11px] text-muted-foreground">Symptom Analysis & Health Recommendations</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full sm:w-[420px] shrink-0 border-r border-border bg-card overflow-y-auto"
        >
          <div className="p-5">
            <SymptomForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </motion.div>

        {/* Right: Results */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center space-y-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="mx-auto w-10 h-10 rounded-full border-3 border-primary/20 border-t-primary"
                    style={{ borderWidth: 3 }}
                  />
                  <p className="text-sm text-muted-foreground">Analyzing your symptoms...</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-5 max-w-[640px]"
              >
                <AnalysisResults result={result} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-muted-foreground"
              >
                <div className="text-center space-y-3">
                  <div className="mx-auto p-4 rounded-2xl bg-accent/50">
                    <Activity className="h-10 w-10 opacity-30" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">No analysis yet</p>
                    <p className="text-xs mt-1">Select symptoms and click analyze to see results</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-border bg-card/80 backdrop-blur-sm shrink-0">
        <p className="text-[10px] text-muted-foreground text-center">
          ⚕️ For informational purposes only. Always consult a healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default Index;
