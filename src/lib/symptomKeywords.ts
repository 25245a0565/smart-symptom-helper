// NLP-like keyword extraction and dynamic suggestion engine

export interface SymptomSuggestion {
  symptom: string;
  related: string[];
}

// Comprehensive keyword → symptom mapping for natural language extraction
const keywordMap: Record<string, string> = {
  // Fever related
  "fever": "Fever", "temperature": "Fever", "hot": "Fever", "burning up": "Fever",
  "chills": "Chills", "shivering": "Chills", "cold sweats": "Chills",
  // Head
  "headache": "Headache", "head pain": "Headache", "head hurts": "Headache", "head ache": "Headache",
  "migraine": "Migraine", "throbbing head": "Migraine",
  "dizzy": "Dizziness", "dizziness": "Dizziness", "lightheaded": "Dizziness", "vertigo": "Dizziness", "spinning": "Dizziness",
  // Respiratory
  "cough": "Cough", "coughing": "Cough",
  "cold": "Cold", "common cold": "Cold",
  "runny nose": "Runny Nose", "nose running": "Runny Nose", "nasal": "Runny Nose",
  "sneezing": "Sneezing", "sneeze": "Sneezing",
  "congestion": "Nasal Congestion", "blocked nose": "Nasal Congestion", "stuffy nose": "Nasal Congestion",
  "sore throat": "Sore Throat", "throat pain": "Sore Throat", "throat hurts": "Sore Throat",
  "shortness of breath": "Shortness of Breath", "breathing difficulty": "Shortness of Breath", "breathless": "Shortness of Breath", "cant breathe": "Shortness of Breath",
  "wheezing": "Wheezing", "wheeze": "Wheezing",
  // Digestive
  "stomach": "Stomach Pain", "stomach pain": "Stomach Pain", "stomach ache": "Stomach Pain", "tummy ache": "Stomach Pain", "abdominal pain": "Stomach Pain", "belly pain": "Stomach Pain",
  "nausea": "Nausea", "nauseous": "Nausea", "feel sick": "Nausea", "queasy": "Nausea",
  "vomiting": "Vomiting", "throwing up": "Vomiting", "puke": "Vomiting", "vomit": "Vomiting",
  "diarrhea": "Diarrhea", "loose stools": "Diarrhea", "watery stools": "Diarrhea", "loose motions": "Diarrhea",
  "bloating": "Bloating", "bloated": "Bloating", "gas": "Bloating", "gassy": "Bloating",
  "acidity": "Acidity", "heartburn": "Acidity", "acid reflux": "Acidity", "indigestion": "Acidity",
  "constipation": "Constipation", "constipated": "Constipation",
  "appetite": "Loss of Appetite", "no appetite": "Loss of Appetite", "not hungry": "Loss of Appetite",
  // Body
  "body ache": "Body Ache", "body pain": "Body Ache", "aching": "Body Ache",
  "fatigue": "Fatigue", "tired": "Fatigue", "exhausted": "Fatigue", "weakness": "Fatigue", "weak": "Fatigue", "no energy": "Fatigue", "lethargic": "Fatigue",
  "joint pain": "Joint Pain", "joints hurt": "Joint Pain", "arthritis": "Joint Pain",
  "back pain": "Back Pain", "backache": "Back Pain", "lower back": "Back Pain",
  "muscle pain": "Muscle Pain", "sore muscles": "Muscle Pain", "muscle ache": "Muscle Pain",
  "neck pain": "Neck Pain", "stiff neck": "Neck Pain",
  // Skin
  "rash": "Rash", "skin rash": "Rash",
  "itching": "Itching", "itchy": "Itching", "itch": "Itching",
  "swelling": "Swelling", "swollen": "Swelling",
  "hives": "Hives", "urticaria": "Hives",
  // Chest
  "chest pain": "Chest Pain", "chest hurts": "Chest Pain", "chest tightness": "Chest Pain",
  "palpitations": "Palpitations", "heart racing": "Palpitations", "heart beating fast": "Palpitations",
  // Menstrual
  "menstrual": "Menstrual Cramps", "period pain": "Menstrual Cramps", "cramps": "Menstrual Cramps", "menstrual cramps": "Menstrual Cramps", "period cramps": "Menstrual Cramps",
  "heavy bleeding": "Heavy Bleeding", "heavy periods": "Heavy Bleeding",
  "irregular periods": "Irregular Periods", "missed period": "Irregular Periods",
  // General
  "insomnia": "Insomnia", "cant sleep": "Insomnia", "sleepless": "Insomnia",
  "anxiety": "Anxiety", "anxious": "Anxiety", "nervous": "Anxiety", "stressed": "Anxiety",
  "weight loss": "Unexplained Weight Loss",
  "numbness": "Numbness", "tingling": "Tingling",
  "ear pain": "Ear Pain", "earache": "Ear Pain",
  "eye pain": "Eye Pain", "blurred vision": "Blurred Vision", "vision problems": "Blurred Vision",
  "dehydration": "Dehydration", "dry mouth": "Dehydration",
};

// Dynamic related symptom suggestions based on detected symptoms
const relatedSuggestionsMap: Record<string, string[]> = {
  "Fever": ["Chills", "Body Ache", "Headache", "Fatigue", "Loss of Appetite", "Sweating"],
  "Cough": ["Sore Throat", "Runny Nose", "Sneezing", "Fever", "Shortness of Breath", "Chest Pain"],
  "Cold": ["Runny Nose", "Sneezing", "Sore Throat", "Cough", "Headache", "Fatigue"],
  "Headache": ["Dizziness", "Nausea", "Blurred Vision", "Neck Pain", "Fatigue", "Sensitivity to Light"],
  "Migraine": ["Nausea", "Blurred Vision", "Sensitivity to Light", "Dizziness", "Neck Pain"],
  "Stomach Pain": ["Nausea", "Vomiting", "Bloating", "Acidity", "Diarrhea", "Loss of Appetite"],
  "Nausea": ["Vomiting", "Dizziness", "Stomach Pain", "Loss of Appetite", "Fatigue"],
  "Vomiting": ["Nausea", "Stomach Pain", "Diarrhea", "Dehydration", "Fatigue"],
  "Diarrhea": ["Stomach Pain", "Nausea", "Dehydration", "Bloating", "Fatigue"],
  "Body Ache": ["Fatigue", "Fever", "Joint Pain", "Headache", "Chills"],
  "Fatigue": ["Body Ache", "Headache", "Loss of Appetite", "Insomnia", "Dizziness"],
  "Sore Throat": ["Cough", "Fever", "Runny Nose", "Ear Pain", "Swelling"],
  "Back Pain": ["Muscle Pain", "Joint Pain", "Numbness", "Fatigue", "Neck Pain"],
  "Chest Pain": ["Shortness of Breath", "Palpitations", "Dizziness", "Sweating", "Nausea"],
  "Rash": ["Itching", "Swelling", "Fever", "Hives", "Fatigue"],
  "Itching": ["Rash", "Swelling", "Hives", "Dry Skin"],
  "Menstrual Cramps": ["Heavy Bleeding", "Irregular Periods", "Back Pain", "Nausea", "Fatigue", "Bloating"],
  "Joint Pain": ["Swelling", "Stiffness", "Fatigue", "Numbness", "Back Pain"],
  "Dizziness": ["Nausea", "Headache", "Blurred Vision", "Fatigue", "Palpitations"],
  "Bloating": ["Acidity", "Stomach Pain", "Constipation", "Nausea", "Loss of Appetite"],
  "Acidity": ["Bloating", "Stomach Pain", "Nausea", "Chest Pain"],
  "Shortness of Breath": ["Chest Pain", "Cough", "Wheezing", "Palpitations", "Dizziness"],
  "Sneezing": ["Runny Nose", "Itching", "Cough", "Sore Throat"],
  "Chills": ["Fever", "Body Ache", "Fatigue", "Sweating"],
  "Palpitations": ["Chest Pain", "Dizziness", "Shortness of Breath", "Anxiety"],
  "Insomnia": ["Fatigue", "Anxiety", "Headache"],
};

/**
 * Extract symptom keywords from natural language input
 */
export function extractSymptoms(text: string): string[] {
  const lower = text.toLowerCase().trim();
  if (!lower) return [];

  const found = new Set<string>();

  // Sort keyword phrases by length (longest first) for greedy matching
  const sortedKeys = Object.keys(keywordMap).sort((a, b) => b.length - a.length);

  for (const key of sortedKeys) {
    if (lower.includes(key)) {
      found.add(keywordMap[key]);
    }
  }

  return Array.from(found);
}

/**
 * Get dynamic suggestions based on partial text input (autocomplete)
 */
export function getAutocompleteSuggestions(text: string, alreadySelected: string[]): string[] {
  const lower = text.toLowerCase().trim();
  if (!lower || lower.length < 2) return [];

  const suggestions = new Set<string>();

  for (const [key, symptom] of Object.entries(keywordMap)) {
    if ((key.includes(lower) || symptom.toLowerCase().includes(lower)) && !alreadySelected.includes(symptom)) {
      suggestions.add(symptom);
    }
  }

  return Array.from(suggestions).slice(0, 8);
}

/**
 * Get related symptoms for a set of selected symptoms
 */
export function getRelatedSymptoms(selectedSymptoms: string[]): string[] {
  const related = new Set<string>();

  for (const symptom of selectedSymptoms) {
    const suggestions = relatedSuggestionsMap[symptom];
    if (suggestions) {
      for (const s of suggestions) {
        if (!selectedSymptoms.includes(s)) {
          related.add(s);
        }
      }
    }
  }

  return Array.from(related).slice(0, 8);
}

/**
 * Get all unique symptom names for reference
 */
export function getAllSymptomNames(): string[] {
  return Array.from(new Set(Object.values(keywordMap))).sort();
}
