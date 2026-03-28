import type { AnalysisResult } from "@/components/AnalysisResults";

const database: Record<string, AnalysisResult> = {
  "fever,cough": {
    disease: "Influenza (Flu)",
    severity: "Medium",
    doctor: "General Physician",
    medications: [
      { name: "Paracetamol 500mg", usage: "For fever & pain", timing: "Every 6 hours" },
      { name: "Dextromethorphan Syrup", usage: "Cough suppressant", timing: "3 times daily" },
    ],
    remedies: [
      "Rest and stay hydrated with warm fluids",
      "Gargle with warm salt water",
      "Use a humidifier at night",
    ],
  },
  "headache": {
    disease: "Tension Headache",
    severity: "Low",
    doctor: "General Physician",
    medications: [
      { name: "Ibuprofen 200mg", usage: "Pain relief", timing: "Every 8 hours" },
    ],
    remedies: [
      "Apply a cold compress on forehead",
      "Rest in a dark, quiet room",
      "Stay hydrated and avoid screen time",
    ],
  },
  "fever": {
    disease: "Viral Fever",
    severity: "Medium",
    doctor: "General Physician",
    medications: [
      { name: "Paracetamol 500mg", usage: "Reduce fever", timing: "Every 6 hours" },
      { name: "ORS Sachets", usage: "Prevent dehydration", timing: "After every meal" },
    ],
    remedies: [
      "Sponge bath with lukewarm water",
      "Drink plenty of fluids and rest",
      "Eat light, easily digestible food",
    ],
  },
  "cold,runny nose,sneezing": {
    disease: "Common Cold",
    severity: "Low",
    doctor: "General Physician",
    medications: [
      { name: "Cetirizine 10mg", usage: "Antihistamine", timing: "Once daily at night" },
      { name: "Nasal Saline Spray", usage: "Decongestant", timing: "3–4 times daily" },
    ],
    remedies: [
      "Inhale steam with eucalyptus oil",
      "Drink warm ginger-honey tea",
      "Keep yourself warm and rest well",
    ],
  },
  "chest pain,shortness of breath": {
    disease: "Possible Respiratory Infection",
    severity: "High",
    doctor: "Pulmonologist",
    medications: [
      { name: "Consult doctor immediately", usage: "Prescription required", timing: "ASAP" },
    ],
    remedies: [
      "Sit upright and breathe slowly",
      "Avoid physical exertion",
      "Seek emergency care if symptoms worsen",
    ],
  },
};

export function analyzeSymptoms(symptoms: string[]): AnalysisResult {
  const lower = symptoms.map((s) => s.toLowerCase()).sort();
  const key = lower.join(",");

  if (database[key]) return database[key];

  for (const dbKey of Object.keys(database)) {
    const dbSymptoms = dbKey.split(",");
    if (dbSymptoms.some((ds) => lower.includes(ds))) {
      return database[dbKey];
    }
  }

  return {
    disease: "General Ailment",
    severity: "Low",
    doctor: "General Physician",
    medications: [
      { name: "Paracetamol 500mg", usage: "Symptom relief", timing: "As needed" },
    ],
    remedies: [
      "Stay hydrated and get adequate rest",
      "Monitor symptoms and consult a doctor if they persist",
    ],
  };
}
