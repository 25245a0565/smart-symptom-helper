import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
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
  }) => {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const analysis = analyzeSymptoms(data.symptoms, {
        age: data.age,
        temperature: data.temperature,
        duration: data.duration,
      });
      setResult(analysis);
      setIsLoading(false);
    }, 1800);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="px-5 py-3 border-b border-border bg-card flex items-center gap-2.5 shrink-0">
        <div className="p-2 rounded-xl bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-base font-bold text-card-foreground leading-tight">SmartCare</h1>
          <p className="text-xs text-muted-foreground">Symptom Analysis & Recommendations</p>
        </div>
      </div>

      {/* Side-by-side content */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full sm:w-[420px] shrink-0 border-r border-border bg-card overflow-y-auto"
        >
          <div className="px-5 py-4">
            <SymptomForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </motion.div>

        {/* Right: Results */}
        <div className="flex-1 overflow-y-auto bg-background">
          <AnimatePresence>
            {result ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="px-5 py-4 max-w-[560px]"
              >
                <AnalysisResults result={result} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-muted-foreground"
              >
                <div className="text-center space-y-2">
                  <Activity className="h-10 w-10 mx-auto opacity-20" />
                  <p className="text-sm">Select symptoms and analyze to see results here</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-border bg-card shrink-0">
        <p className="text-[10px] text-muted-foreground text-center">
          ⚕️ For informational purposes only. Always consult a healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default Index;
