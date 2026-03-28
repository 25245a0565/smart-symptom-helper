import { motion } from "framer-motion";
import {
  Stethoscope,
  AlertTriangle,
  UserCheck,
  Pill,
  Leaf,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AnalysisResult {
  disease: string;
  severity: "Low" | "Medium" | "High";
  doctor: string;
  medications: { name: string; usage: string; timing: string }[];
  remedies: string[];
}

const severityColors: Record<string, string> = {
  Low: "bg-severity-low",
  Medium: "bg-severity-medium",
  High: "bg-severity-high",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ResultCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    variants={item}
    className="bg-muted/40 rounded-xl p-3.5 space-y-2"
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

const AnalysisResults = ({ result }: { result: AnalysisResult }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3 pt-2"
    >
      <div className="flex items-center gap-2 pb-1 border-b border-border">
        <Stethoscope className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold text-card-foreground">Analysis Results</h3>
      </div>

      {/* Disease */}
      <ResultCard icon={Stethoscope} title="Disease Prediction">
        <p className="font-medium text-card-foreground">{result.disease}</p>
      </ResultCard>

      {/* Severity */}
      <ResultCard icon={AlertTriangle} title="Severity Level">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-primary-foreground ${severityColors[result.severity]}`}
        >
          {result.severity}
        </span>
      </ResultCard>

      {/* Doctor */}
      <ResultCard icon={UserCheck} title="Doctor Consultation">
        <p>
          Consult a <span className="font-medium text-card-foreground">{result.doctor}</span>
        </p>
      </ResultCard>

      {/* Medications */}
      <ResultCard icon={Pill} title="Medications">
        <div className="space-y-2">
          {result.medications.map((med, i) => (
            <div key={i} className="bg-card rounded-lg p-2.5 space-y-0.5">
              <p className="font-medium text-card-foreground text-xs">{med.name}</p>
              <p className="text-xs text-muted-foreground">
                {med.usage} · {med.timing}
              </p>
            </div>
          ))}
        </div>
      </ResultCard>

      {/* Remedies */}
      <ResultCard icon={Leaf} title="Home Remedies">
        <ul className="space-y-1">
          {result.remedies.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="text-secondary mt-0.5">●</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </ResultCard>

      {/* Pharmacy */}
      <motion.div variants={item}>
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
