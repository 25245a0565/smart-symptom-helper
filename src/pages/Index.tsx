import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import SymptomForm from "@/components/SymptomForm";
import AnalysisResults, { type AnalysisResult } from "@/components/AnalysisResults";
import { analyzeSymptoms } from "@/lib/symptomAnalyzer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = (data: {
    symptoms: string[];
    age: string;
    gender: string;
    temperature: string;
    duration: string;
  }) => {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeSymptoms(data.symptoms);
      setResult(analysis);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px]"
      >
        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-lg shadow-primary/5 border border-border overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-base font-bold text-card-foreground leading-tight">
                  SmartCare
                </h1>
                <p className="text-xs text-muted-foreground">
                  Symptom Analysis & Recommendations
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-4">
            <SymptomForm onSubmit={handleSubmit} isLoading={isLoading} />

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnalysisResults result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground text-center">
              ⚕️ This is for informational purposes only. Always consult a healthcare professional.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
