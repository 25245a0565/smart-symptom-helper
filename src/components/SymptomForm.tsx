import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Thermometer, Clock, User, ChevronDown, ChevronRight, Sparkles, Heart, Weight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { detectCategory, type SymptomCategory, type FollowUpQuestion } from "@/lib/symptomCategories";

const ALL_SYMPTOMS = [
  "Fever", "Cough", "Cold", "Headache", "Sore Throat",
  "Body Ache", "Fatigue", "Nausea", "Runny Nose", "Sneezing",
  "Chest Pain", "Shortness of Breath", "Dizziness", "Vomiting",
  "Diarrhea", "Chills", "Loss of Appetite", "Joint Pain",
  "Menstrual Cramps", "Back Pain", "Rash", "Itching", "Bloating",
  "Acidity", "Migraine",
];

const QUICK_CHIPS = ["Fever", "Cough", "Cold", "Headache", "Fatigue", "Nausea", "Body Ache", "Sore Throat"];

interface SymptomFormProps {
  onSubmit: (data: {
    symptoms: string[];
    age: string;
    gender: string;
    temperature: string;
    duration: string;
    followUpAnswers?: Record<string, string>;
    relatedSymptoms?: string[];
  }) => void;
  isLoading: boolean;
}

const SymptomForm = ({ onSubmit, isLoading }: SymptomFormProps) => {
  const [search, setSearch] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [temperature, setTemperature] = useState("");
  const [duration, setDuration] = useState("");
  const [weight, setWeight] = useState("");
  const [detectedCategory, setDetectedCategory] = useState<SymptomCategory | null>(null);
  const [selectedRelated, setSelectedRelated] = useState<string[]>([]);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [showFollowUp, setShowFollowUp] = useState(true);

  const filteredSymptoms = ALL_SYMPTOMS.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase()) && !selectedSymptoms.includes(s)
  );

  useEffect(() => {
    if (selectedSymptoms.length > 0) {
      for (const symptom of selectedSymptoms) {
        const cat = detectCategory(symptom);
        if (cat) {
          setDetectedCategory(cat);
          return;
        }
      }
    }
    setDetectedCategory(null);
    setSelectedRelated([]);
    setFollowUpAnswers({});
  }, [selectedSymptoms]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const toggleRelated = (symptom: string) => {
    setSelectedRelated((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleFollowUp = (questionId: string, answer: string) => {
    setFollowUpAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) return;
    onSubmit({
      symptoms: [...selectedSymptoms, ...selectedRelated],
      age,
      gender,
      temperature,
      duration,
      followUpAnswers,
      relatedSymptoms: selectedRelated,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header illustration */}
      <div className="flex items-center gap-3 pb-2 border-b border-border/50">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
          <Heart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-card-foreground">Tell us your symptoms</h2>
          <p className="text-xs text-muted-foreground">Select or search symptoms below</p>
        </div>
      </div>

      {/* Quick symptom chips */}
      <div>
        <p className="text-[11px] font-medium text-muted-foreground mb-2">Quick select:</p>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => toggleSymptom(chip)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                selectedSymptoms.includes(chip)
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-card-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search symptoms (e.g., menstrual cramps)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-muted/40 border-border/50 h-10 text-sm rounded-xl"
        />
      </div>

      {/* Symptom list */}
      {search && (
        <div className="max-h-28 overflow-y-auto space-y-0.5 rounded-xl bg-muted/20 border border-border/40 p-2">
          {filteredSymptoms.map((symptom) => (
            <label
              key={symptom}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent cursor-pointer transition-colors text-sm"
            >
              <Checkbox
                checked={selectedSymptoms.includes(symptom)}
                onCheckedChange={() => toggleSymptom(symptom)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-card-foreground text-xs">{symptom}</span>
            </label>
          ))}
          {filteredSymptoms.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-2">No matching symptoms</p>
          )}
        </div>
      )}

      {/* Selected tags */}
      <AnimatePresence>
        {selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-[11px] font-medium text-muted-foreground mb-1.5">Selected symptoms:</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedSymptoms.map((s) => (
                <motion.span
                  key={s}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                >
                  {s}
                  <button type="button" onClick={() => toggleSymptom(s)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Follow-Up Section */}
      <AnimatePresence>
        {detectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold border border-secondary/20">
                  <Sparkles className="h-3 w-3" />
                  {detectedCategory.name} detected
                </div>
                <button
                  type="button"
                  onClick={() => setShowFollowUp(!showFollowUp)}
                  className="text-muted-foreground hover:text-card-foreground transition-colors"
                >
                  {showFollowUp ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              </div>

              <AnimatePresence>
                {showFollowUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden space-y-3"
                  >
                    <div className="rounded-xl bg-muted/30 border border-border/50 p-3 space-y-2">
                      <p className="text-xs font-semibold text-card-foreground">Related symptoms you might have:</p>
                      <div className="space-y-0.5">
                        {detectedCategory.relatedSymptoms.map((rs) => (
                          <label key={rs} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent cursor-pointer transition-colors">
                            <Checkbox
                              checked={selectedRelated.includes(rs)}
                              onCheckedChange={() => toggleRelated(rs)}
                              className="data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                            />
                            <span className="text-card-foreground text-xs">{rs}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl bg-muted/30 border border-border/50 p-3 space-y-3">
                      <p className="text-xs font-semibold text-card-foreground">Help us understand better:</p>
                      {detectedCategory.followUpQuestions.map((q) => (
                        <FollowUpQuestionUI
                          key={q.id}
                          question={q}
                          value={followUpAnswers[q.id] || ""}
                          onChange={(val) => handleFollowUp(q.id, val)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Grid */}
      <div>
        <p className="text-[11px] font-medium text-muted-foreground mb-2">Additional details:</p>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" /> Age
            </Label>
            <Input type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} className="h-9 text-sm bg-muted/40 border-border/50 rounded-lg" />
          </div>
          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" /> Gender
            </Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="h-9 text-sm bg-muted/40 border-border/50 rounded-lg">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Weight className="h-3 w-3" /> Weight (kg)
            </Label>
            <Input type="number" placeholder="65" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-9 text-sm bg-muted/40 border-border/50 rounded-lg" />
          </div>
          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Thermometer className="h-3 w-3" /> Temp (°F)
            </Label>
            <Input type="number" placeholder="98.6" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="h-9 text-sm bg-muted/40 border-border/50 rounded-lg" />
          </div>
          <div className="space-y-1 col-span-2">
            <Label className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Duration
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="h-9 text-sm bg-muted/40 border-border/50 rounded-lg">
                <SelectValue placeholder="How long have you had symptoms?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2 days">1–2 days</SelectItem>
                <SelectItem value="3-5 days">3–5 days</SelectItem>
                <SelectItem value="1 week">~1 week</SelectItem>
                <SelectItem value="2+ weeks">2+ weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={selectedSymptoms.length === 0 || isLoading}
        className="w-full h-11 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
          />
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Analyze Symptoms
          </>
        )}
      </Button>
    </form>
  );
};

const FollowUpQuestionUI = ({
  question,
  value,
  onChange,
}: {
  question: FollowUpQuestion;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="space-y-1.5">
    <p className="text-xs text-muted-foreground font-medium">{question.question}</p>
    <div className="flex flex-wrap gap-1.5">
      {question.options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
            value === opt
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-muted-foreground border-border hover:border-primary/40"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default SymptomForm;
