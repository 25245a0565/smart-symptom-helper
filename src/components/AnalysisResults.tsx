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
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/lib/symptomAnalyzer";

const severityConfig: Record<string, { bg: string; border: string; text: string; icon: React.ElementType; label: string }> = {
  Low: { bg: "bg-severity-low/10", border: "border-severity-low/30", text: "text-severity-low", icon: Info, label: "Mild (Normal)" },
  Medium: { bg: "bg-severity-medium/10", border: "border-severity-medium/30", text: "text-severity-medium", icon: AlertTriangle, label: "Moderate" },
  High: { bg: "bg-severity-high/10", border: "border-severity-high/30", text: "text-severity-high", icon: AlertCircle, label: "High" },
  Critical: { bg: "bg-destructive/10", border: "border-destructive/40", text: "text-destructive", icon: ShieldAlert, label: "Critical" },
};

const severityBarWidth: Record<string, string> = {
  Low: "w-1/4",
  Medium: "w-2/4",
  High: "w-3/4",
  Critical: "w-full",
};

const severityBarColor: Record<string, string> = {
  Low: "bg-severity-low",
  Medium: "bg-severity-medium",
  High: "bg-severity-high",
  Critical: "bg-destructive",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const GridCard = ({
  icon: Icon,
  title,
  children,
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={item}
    className={`rounded-2xl p-4 border bg-card shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="p-2 rounded-xl bg-accent">
        <Icon className="h-4 w-4 text-accent-foreground" />
      </div>
      <h4 className="text-sm font-bold text-card-foreground">{title}</h4>
    </div>
    <div className="text-sm text-muted-foreground">{children}</div>
  </motion.div>
);

const MedicationItem = ({ med }: { med: AnalysisResult["medications"][0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-accent/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Pill className="h-3.5 w-3.5 text-primary shrink-0" />
          <div>
            <p className="font-semibold text-card-foreground text-xs">{med.name}</p>
            <p className="text-[11px] text-muted-foreground">{med.dosage} · {med.timing}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
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
            <div className="px-3 pb-3 space-y-1.5 border-t border-border/30 pt-2">
              <div className="flex items-start gap-1.5 text-[11px]">
                <span className="font-medium text-card-foreground min-w-[52px]">Usage:</span>
                <span>{med.usage}</span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px]">
                <Clock className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                <span>Duration: {med.duration}</span>
              </div>
              {med.warnings && (
                <div className="flex items-start gap-1.5 text-[11px] text-destructive bg-destructive/5 rounded-lg p-2">
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
      className="space-y-3"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center gap-2 pb-2">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-card-foreground">Analysis Results</h3>
          <p className="text-xs text-muted-foreground">Based on your symptoms</p>
        </div>
      </motion.div>

      {/* Critical Alert */}
      {result.isCritical && (
        <motion.div
          variants={item}
          className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-destructive/10 border border-destructive/30"
        >
          <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-destructive">⚠️ Critical Condition Detected</p>
            <p className="text-[11px] text-destructive/80 mt-0.5">
              Immediate medical attention recommended. Please consult a doctor or visit the nearest emergency room.
            </p>
          </div>
        </motion.div>
      )}

      {/* Grid of result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Disease Prediction */}
        <GridCard icon={Stethoscope} title="Disease Prediction">
          <p className="font-semibold text-card-foreground text-sm">{result.disease}</p>
          <p className="text-xs mt-1.5 leading-relaxed">{result.description}</p>
        </GridCard>

        {/* Severity Level */}
        <GridCard icon={SevIcon} title="Severity Level" className={`${sev.bg} ${sev.border}`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-primary-foreground ${severityBarColor[result.severity]}`}>
                {sev.label}
              </span>
            </div>
            {/* Severity progress bar */}
            <div className="w-full h-2 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full ${severityBarColor[result.severity]} ${severityBarWidth[result.severity]}`}
              />
            </div>
            <p className="text-xs leading-relaxed">{result.severityNote}</p>
          </div>
        </GridCard>

        {/* Doctor Consultation */}
        <GridCard icon={UserCheck} title="Doctor Consultation">
          <p className="text-xs">
            Recommended: <span className="font-semibold text-card-foreground">{result.doctor}</span>
          </p>
          <p className="text-xs mt-1">{result.doctorNote}</p>
          {result.isCritical ? (
            <Button
              size="sm"
              className="w-full mt-3 h-9 rounded-xl gap-2 text-xs font-semibold bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={() => window.open("https://www.google.com/search?q=doctor+consultation+booking+near+me", "_blank")}
            >
              <CalendarCheck className="h-3.5 w-3.5" />
              Book Emergency Consultation
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 h-9 rounded-xl gap-2 text-xs border-primary/20 text-primary hover:bg-accent"
              onClick={() => window.open("https://www.google.com/search?q=book+doctor+appointment+near+me", "_blank")}
            >
              <CalendarCheck className="h-3.5 w-3.5" />
              Consult Now
            </Button>
          )}
        </GridCard>

        {/* Pharmacy */}
        <GridCard icon={MapPin} title="Nearby Pharmacy">
          <p className="text-xs mb-3">Find a pharmacy near you to get your prescribed medications.</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full h-9 rounded-xl gap-2 text-xs border-primary/20 text-primary hover:bg-accent"
            onClick={() => window.open("https://www.google.com/maps/search/pharmacy+near+me", "_blank")}
          >
            <MapPin className="h-3.5 w-3.5" />
            Find Pharmacy
          </Button>
        </GridCard>
      </div>

      {/* Home Remedies - full width */}
      <GridCard icon={Leaf} title="Home Remedies">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {result.remedies.map((r, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-muted/30 border border-border/30">
              <span className="text-secondary mt-0.5 text-sm shrink-0">🌿</span>
              <div>
                <p className="text-xs font-semibold text-card-foreground">{r.title}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </GridCard>

      {/* Medications - full width */}
      <GridCard icon={Pill} title="Medications & Prescription">
        <div className="space-y-2">
          {result.medications.map((med, i) => (
            <MedicationItem key={i} med={med} />
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2.5 italic">
          💊 Tap each medication for full prescription details & warnings.
        </p>
      </GridCard>
    </motion.div>
  );
};

export default AnalysisResults;
