export interface FollowUpQuestion {
  id: string;
  question: string;
  type: "single" | "yesno";
  options: string[];
}

export interface SymptomCategory {
  id: string;
  name: string;
  keywords: string[];
  relatedSymptoms: string[];
  followUpQuestions: FollowUpQuestion[];
}

export const symptomCategories: SymptomCategory[] = [
  {
    id: "menstrual",
    name: "Menstrual / Gynecological",
    keywords: ["menstrual cramps", "period pain", "menstrual", "cramps", "period"],
    relatedSymptoms: ["Heavy bleeding", "Irregular periods", "Lower back pain", "Nausea", "Fatigue", "Bloating", "Mood swings"],
    followUpQuestions: [
      { id: "pain_duration", question: "Duration of pain?", type: "single", options: ["1–2 days", "3–5 days", "More than 5 days"] },
      { id: "pain_severity", question: "Pain severity?", type: "single", options: ["Mild", "Moderate", "Severe"] },
      { id: "cycle_regularity", question: "Cycle regularity?", type: "single", options: ["Regular", "Irregular"] },
      { id: "has_fever", question: "Any fever?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory",
    keywords: ["cough", "cold", "breathing", "shortness of breath", "wheezing", "congestion"],
    relatedSymptoms: ["Sore throat", "Runny nose", "Sneezing", "Chest tightness", "Fever", "Fatigue", "Loss of voice"],
    followUpQuestions: [
      { id: "cough_type", question: "Type of cough?", type: "single", options: ["Dry cough", "Wet/productive cough", "Barking cough"] },
      { id: "breathing_difficulty", question: "Difficulty breathing?", type: "single", options: ["None", "Mild", "Severe"] },
      { id: "symptom_duration", question: "How long have you had this?", type: "single", options: ["1–2 days", "3–5 days", "1 week+"] },
      { id: "has_fever", question: "Any fever?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
  {
    id: "digestive",
    name: "Digestive / Stomach",
    keywords: ["stomach", "nausea", "vomiting", "diarrhea", "stomach ache", "indigestion", "bloating", "acidity"],
    relatedSymptoms: ["Nausea", "Vomiting", "Diarrhea", "Loss of appetite", "Bloating", "Acidity/heartburn", "Abdominal cramps"],
    followUpQuestions: [
      { id: "pain_location", question: "Where is the pain?", type: "single", options: ["Upper abdomen", "Lower abdomen", "All over"] },
      { id: "food_trigger", question: "Related to food?", type: "yesno", options: ["Yes", "No"] },
      { id: "symptom_duration", question: "How long has this lasted?", type: "single", options: ["Few hours", "1–2 days", "3+ days"] },
      { id: "blood_in_stool", question: "Any blood in stool?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
  {
    id: "headache",
    name: "Head / Neurological",
    keywords: ["headache", "migraine", "head pain", "dizziness", "vertigo"],
    relatedSymptoms: ["Dizziness", "Blurred vision", "Nausea", "Sensitivity to light", "Neck stiffness", "Fatigue"],
    followUpQuestions: [
      { id: "pain_location", question: "Where does it hurt?", type: "single", options: ["Front/forehead", "One side", "Back of head", "All over"] },
      { id: "pain_severity", question: "Pain intensity?", type: "single", options: ["Mild", "Moderate", "Severe"] },
      { id: "frequency", question: "How often?", type: "single", options: ["First time", "Occasional", "Frequent/daily"] },
      { id: "screen_time", question: "Excessive screen time?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
  {
    id: "fever",
    name: "Fever / Infection",
    keywords: ["fever", "chills", "sweating", "high temperature"],
    relatedSymptoms: ["Body ache", "Chills", "Sweating", "Fatigue", "Loss of appetite", "Headache", "Joint pain"],
    followUpQuestions: [
      { id: "temperature", question: "Temperature range?", type: "single", options: ["99–100°F (low)", "101–102°F (moderate)", "103°F+ (high)"] },
      { id: "symptom_duration", question: "Duration of fever?", type: "single", options: ["1 day", "2–3 days", "4+ days"] },
      { id: "pattern", question: "Fever pattern?", type: "single", options: ["Constant", "Comes and goes", "Only at night"] },
      { id: "recent_travel", question: "Recent travel?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
  {
    id: "musculoskeletal",
    name: "Body / Joint Pain",
    keywords: ["body ache", "joint pain", "back pain", "muscle pain", "sprain", "stiffness"],
    relatedSymptoms: ["Joint swelling", "Stiffness", "Fatigue", "Limited movement", "Numbness", "Tingling"],
    followUpQuestions: [
      { id: "pain_area", question: "Which area hurts most?", type: "single", options: ["Back", "Knees/legs", "Shoulders/arms", "Multiple joints"] },
      { id: "pain_severity", question: "Pain level?", type: "single", options: ["Mild", "Moderate", "Severe"] },
      { id: "injury", question: "Any recent injury?", type: "yesno", options: ["Yes", "No"] },
      { id: "symptom_duration", question: "How long?", type: "single", options: ["1–2 days", "1 week", "2+ weeks"] },
    ],
  },
  {
    id: "skin",
    name: "Skin / Allergy",
    keywords: ["rash", "itching", "allergy", "hives", "skin", "swelling"],
    relatedSymptoms: ["Redness", "Swelling", "Itching", "Bumps/blisters", "Dry skin", "Burning sensation"],
    followUpQuestions: [
      { id: "rash_area", question: "Where on the body?", type: "single", options: ["Face", "Arms/legs", "Torso", "All over"] },
      { id: "new_product", question: "Used any new product recently?", type: "yesno", options: ["Yes", "No"] },
      { id: "symptom_duration", question: "How long?", type: "single", options: ["Few hours", "1–2 days", "1 week+"] },
      { id: "spreading", question: "Is it spreading?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
  {
    id: "throat",
    name: "Throat / ENT",
    keywords: ["sore throat", "throat pain", "difficulty swallowing", "tonsils"],
    relatedSymptoms: ["Cough", "Runny nose", "Ear pain", "Swollen glands", "Fever", "Hoarse voice"],
    followUpQuestions: [
      { id: "pain_severity", question: "Throat pain severity?", type: "single", options: ["Mild scratchy", "Moderate pain", "Severe/can't swallow"] },
      { id: "white_patches", question: "White patches on throat?", type: "yesno", options: ["Yes", "No"] },
      { id: "symptom_duration", question: "How long?", type: "single", options: ["1–2 days", "3–5 days", "1 week+"] },
      { id: "has_fever", question: "Any fever?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
  {
    id: "chest",
    name: "Chest / Cardiac",
    keywords: ["chest pain", "heart", "palpitation", "chest tightness"],
    relatedSymptoms: ["Shortness of breath", "Dizziness", "Sweating", "Left arm pain", "Jaw pain", "Nausea"],
    followUpQuestions: [
      { id: "pain_type", question: "Type of chest pain?", type: "single", options: ["Sharp/stabbing", "Dull/pressure", "Burning"] },
      { id: "exertion", question: "Pain during physical activity?", type: "yesno", options: ["Yes", "No"] },
      { id: "pain_severity", question: "Pain severity?", type: "single", options: ["Mild", "Moderate", "Severe"] },
      { id: "radiating", question: "Pain spreading to arm/jaw?", type: "yesno", options: ["Yes", "No"] },
    ],
  },
];

export function detectCategory(input: string): SymptomCategory | null {
  const lower = input.toLowerCase().trim();
  if (!lower) return null;
  
  for (const cat of symptomCategories) {
    for (const keyword of cat.keywords) {
      if (lower.includes(keyword) || keyword.includes(lower)) {
        return cat;
      }
    }
  }
  return null;
}

export function detectCategories(symptoms: string[]): SymptomCategory[] {
  const found = new Map<string, SymptomCategory>();
  for (const s of symptoms) {
    const cat = detectCategory(s);
    if (cat && !found.has(cat.id)) {
      found.set(cat.id, cat);
    }
  }
  return Array.from(found.values());
}
