import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, User, Sparkles, Heart, Weight, X, Plus, MessageSquare, Zap } from "lucide-react";
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
import { extractSymptoms, getAutocompleteSuggestions, getRelatedSymptoms } from "@/lib/symptomKeywords";
import { detectCategory, type FollowUpQuestion } from "@/lib/symptomCategories";

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

const DURATION_OPTIONS = [
  { value: "few-minutes", label: "Few minutes" },
  { value: "few-hours", label: "Few hours" },
  { value: "1-2-days", label: "1–2 days" },
  { value: "3-5-days", label: "3–5 days" },
  { value: "1-week", label: "~1 week" },
  { value: "2-weeks", label: "~2 weeks" },
  { value: "1-month+", label: "1 month+" },
];

const SEVERITY_OPTIONS = ["Mild", "Moderate", "Severe"];

const SymptomForm = ({ onSubmit, isLoading }: SymptomFormProps) => {
  const [inputText, setInputText] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const [relatedSymptoms, setRelatedSymptoms] = useState<string[]>([]);
  const [selectedRelated, setSelectedRelated] = useState<string[]>([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("");
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Extract & autocomplete as user types
  useEffect(() => {
    const suggestions = getAutocompleteSuggestions(inputText, [...selectedSymptoms, ...selectedRelated]);
    setAutocompleteSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0 && inputText.length >= 2);
  }, [inputText, selectedSymptoms, selectedRelated]);

  // Update related symptoms when selection changes
  useEffect(() => {
    const allSelected = [...selectedSymptoms, ...selectedRelated];
    const related = getRelatedSymptoms(allSelected);
    setRelatedSymptoms(related.filter(r => !selectedRelated.includes(r) && !selectedSymptoms.includes(r)));
  }, [selectedSymptoms, selectedRelated]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Get detected category for follow-up questions
  const detectedCategory = (() => {
    for (const s of [...selectedSymptoms, ...selectedRelated]) {
      const cat = detectCategory(s);
      if (cat) return cat;
    }
    return null;
  })();

  const handleNaturalLanguageSubmit = () => {
    const extracted = extractSymptoms(inputText);
    if (extracted.length > 0) {
      const newSymptoms = extracted.filter(s => !selectedSymptoms.includes(s));
      setSelectedSymptoms(prev => [...prev, ...newSymptoms]);
      setInputText("");
      setShowSuggestions(false);
    }
  };

  const addSuggestion = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(prev => [...prev, symptom]);
    }
    setInputText("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const addCustomSymptom = () => {
    const trimmed = inputText.trim();
    if (trimmed && !selectedSymptoms.includes(trimmed)) {
      setSelectedSymptoms(prev => [...prev, trimmed]);
      setInputText("");
      setShowSuggestions(false);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
  };

  const toggleRelated = (symptom: string) => {
    setSelectedRelated(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleFollowUp = (id: string, val: string) => {
    setFollowUpAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (autocompleteSuggestions.length > 0) {
        addSuggestion(autocompleteSuggestions[0]);
      } else if (inputText.trim()) {
        handleNaturalLanguageSubmit();
        if (extractSymptoms(inputText).length === 0) {
          addCustomSymptom();
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) return;
    onSubmit({
      symptoms: [...selectedSymptoms, ...selectedRelated],
      age,
      gender,
      temperature: "",
      duration,
      followUpAnswers: { ...followUpAnswers, ...(severity ? { pain_severity: severity } : {}) },
      relatedSymptoms: selectedRelated,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-border/50">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
          <Heart className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-card-foreground">Tell us how you feel</h2>
          <p className="text-xs text-muted-foreground">Type naturally or select symptoms</p>
        </div>
      </div>

      {/* Natural language input */}
      <div className="relative">
        <div className="relative">
          <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder='e.g., "I have stomach pain and feel tired"'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => autocompleteSuggestions.length > 0 && setShowSuggestions(true)}
            className="pl-9 pr-10 bg-muted/40 border-border/50 h-11 text-sm rounded-xl"
          />
          {inputText.trim() && (
            <button
              type="button"
              onClick={() => {
                handleNaturalLanguageSubmit();
                if (extractSymptoms(inputText).length === 0) addCustomSymptom();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Autocomplete dropdown */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              ref={suggestionsRef}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 w-full mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-1.5">
                <p className="text-[10px] text-muted-foreground px-2 py-1 font-medium">Suggestions</p>
                {autocompleteSuggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSuggestion(s)}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-accent text-card-foreground transition-colors flex items-center gap-2"
                  >
                    <Zap className="h-3 w-3 text-primary shrink-0" />
                    {s}
                  </button>
                ))}
                {inputText.trim() && !autocompleteSuggestions.some(s => s.toLowerCase() === inputText.toLowerCase()) && (
                  <button
                    type="button"
                    onClick={addCustomSymptom}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-accent text-muted-foreground transition-colors flex items-center gap-2 border-t border-border/30 mt-1 pt-2"
                  >
                    <Plus className="h-3 w-3 shrink-0" />
                    Add "{inputText.trim()}" as custom symptom
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Extracted hint */}
      {inputText.length >= 3 && extractSymptoms(inputText).length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-1.5 text-[11px] text-secondary">
            <Sparkles className="h-3 w-3" />
            Detected: {extractSymptoms(inputText).join(", ")}
          </div>
        </motion.div>
      )}

      {/* Selected symptoms */}
      <AnimatePresence>
        {selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-[11px] font-medium text-muted-foreground mb-1.5">Your symptoms:</p>
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
                  <button type="button" onClick={() => removeSymptom(s)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic related symptoms */}
      <AnimatePresence>
        {relatedSymptoms.length > 0 && selectedSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl bg-muted/30 border border-border/50 p-3 space-y-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                <p className="text-xs font-semibold text-card-foreground">You might also have:</p>
              </div>
              <div className="space-y-0.5">
                {relatedSymptoms.map((rs) => (
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Follow-up questions from detected category */}
      <AnimatePresence>
        {detectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl bg-accent/30 border border-border/50 p-3 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-foreground">
                <Zap className="h-3.5 w-3.5" />
                {detectedCategory.name} — Quick questions
              </div>
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

      {/* Details grid */}
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
              <Weight className="h-3 w-3" /> Weight (kg)
            </Label>
            <Input type="number" placeholder="65" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-9 text-sm bg-muted/40 border-border/50 rounded-lg" />
          </div>
          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Duration
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="h-9 text-sm bg-muted/40 border-border/50 rounded-lg">
                <SelectValue placeholder="How long?" />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground">Severity</Label>
            <div className="flex gap-1">
              {SEVERITY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSeverity(severity === opt ? "" : opt)}
                  className={`flex-1 px-2 py-2 rounded-lg text-[11px] font-medium transition-all border ${
                    severity === opt
                      ? opt === "Mild" ? "bg-severity-low/15 text-severity-low border-severity-low/30"
                      : opt === "Moderate" ? "bg-severity-medium/15 text-severity-medium border-severity-medium/30"
                      : "bg-severity-high/15 text-severity-high border-severity-high/30"
                      : "bg-muted/40 text-muted-foreground border-border/50 hover:border-border"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
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
