import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  AlertTriangle,
  UserCheck,
  Pill,
  Leaf,
  MapPin,
  CalendarCheck,
  ShieldAlert,
  Info,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/lib/symptomAnalyzer";

const severityConfig: Record<string, { bg: string; border: string; text: string; icon: React.ElementType }> = {
  Low: { bg: "bg-severity-low/10", border: "border-severity-low/30", text: "text-severity-low", icon: Info },
  Medium: { bg: "bg-severity-medium/10", border: "border-severity-medium/30", text: "text-severity-medium", icon: AlertTriangle },
  High: { bg: "bg-severity-high/10", border: "border-severity-high/30", text: "text-severity-high", icon: AlertCircle },
  Critical: { bg: "bg-destructive/10", border: "border-destructive/40", text: "text-destructive", icon: ShieldAlert },
};

const severityBadge: Record<string, string> = {
  Low: "bg-severity-low",
  Medium: "bg-severity-medium",
  High: "bg-severity-high",
  Critical: "bg-destructive",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const ResultCard = ({
  icon: Icon,
  title,
  children,
  accent,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  accent?: string;
}) => (
  <motion.div
    variants={item}
    className={`rounded-xl p-3.5 space-y-2 border ${accent ? accent : "bg-muted/30 border-border/50"}`}
  >
    <div className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
      <div className="p-1.5 rounded-lg bg-accent">
        <Icon className="h-3.5 w-3.5 text-accent-foreground" />
      </div>
      {title}
    </div>
    <div className="text-sm text-muted-foreground">{children}</div>
  </motion.div>
);

const MedicationCard = ({ med }: { med: AnalysisResult["medications"][0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-lg border border-border/50 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-2.5 text-left"
      >
        <div>
          <p className="font-semibold text-card-foreground text-xs">{med.name}</p>
          <p className="text-[11px] text-muted-foreground">{med.dosage} · {med.timing}</p>
        </div>
        {expanded ? (
          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-2.5 pb-2.5 space-y-1.5 border-t border-border/30 pt-2">
              <div className="flex items-start gap-1.5 text-[11px]">
                <span className="font-medium text-card-foreground min-w-[52px]">Usage:</span>
                <span>{med.usage}</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px]">
                <Clock className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                <span>Duration: {med.duration}</span>
              </div>
              {med.warnings && (
                <div className="flex items-start gap-1.5 text-[11px] text-destructive bg-destructive/5 rounded-md p-1.5">
                  <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                  <span>{med.warnings}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnalysisResults = ({ result }: { result: AnalysisResult }) => {
  const sev = severityConfig[result.severity] || severityConfig.Low;
  const SevIcon = sev.icon;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3 pt-3"
    >
      <div className="flex items-center gap-2 pb-1.5 border-b border-border">
        <Stethoscope className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold text-card-foreground">Analysis Results</h3>
      </div>

      {/* Critical Alert Banner */}
      {result.isCritical && (
        <motion.div
          variants={item}
          className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/30"
        >
          <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-destructive">⚠️ Critical Condition Detected</p>
            <p className="text-[11px] text-destructive/80 mt-0.5">
              Immediate medical attention is recommended. Please consult a doctor or visit the nearest emergency room.
            </p>
          </div>
        </motion.div>
      )}

      {/* Disease Prediction */}
      <ResultCard icon={Stethoscope} title="Disease Prediction">
        <p className="font-semibold text-card-foreground">{result.disease}</p>
        <p className="text-xs mt-1 leading-relaxed">{result.description}</p>
      </ResultCard>

      {/* Severity Level */}
      <ResultCard
        icon={SevIcon}
        title="Severity Level"
        accent={`${sev.bg} ${sev.border}`}
      >
        <div className="space-y-1.5">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-primary-foreground ${severityBadge[result.severity]}`}
          >
            {result.severity}
          </span>
          <p className="text-xs leading-relaxed">{result.severityNote}</p>
        </div>
      </ResultCard>

      {/* Doctor Consultation */}
      <ResultCard icon={UserCheck} title="Doctor Consultation">
        <p>
          Recommended: <span className="font-semibold text-card-foreground">{result.doctor}</span>
        </p>
        <p className="text-xs mt-1">{result.doctorNote}</p>
        {result.isCritical && (
          <Button
            size="sm"
            className="w-full mt-2.5 h-9 rounded-lg gap-2 text-xs font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            onClick={() => window.open("https://www.google.com/search?q=doctor+consultation+booking+near+me", "_blank")}
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            Book Emergency Consultation
          </Button>
        )}
        {!result.isCritical && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2.5 h-9 rounded-lg gap-2 text-xs border-primary/20 text-primary hover:bg-accent"
            onClick={() => window.open("https://www.google.com/search?q=book+doctor+appointment+near+me", "_blank")}
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            Book Doctor Appointment
          </Button>
        )}
      </ResultCard>

      {/* Home Remedies */}
      <ResultCard icon={Leaf} title="Home Remedies">
        <div className="space-y-2">
          {result.remedies.map((r, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-secondary mt-0.5 text-xs">●</span>
              <div>
                <p className="text-xs font-medium text-card-foreground">{r.title}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* Medications / Prescription */}
      <ResultCard icon={Pill} title="Medications & Prescription">
        <div className="space-y-2">
          {result.medications.map((med, i) => (
            <MedicationCard key={i} med={med} />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 italic">
          💊 Tap each medication for full prescription details & warnings.
        </p>
      </ResultCard>

      {/* Pharmacy */}
      <motion.div variants={item} className="space-y-2">
        <Button
          variant="outline"
          className="w-full h-10 rounded-xl gap-2 text-sm border-primary/20 text-primary hover:bg-accent"
          onClick={() => window.open("https://www.google.com/maps/search/pharmacy+near+me", "_blank")}
        >
          <MapPin className="h-4 w-4" />
          Find Nearby Pharmacy
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AnalysisResults;
