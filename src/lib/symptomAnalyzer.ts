export interface Medication {
  name: string;
  dosage: string;
  usage: string;
  timing: string;
  duration: string;
  warnings: string;
}

export interface AnalysisResult {
  disease: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  severityNote: string;
  doctor: string;
  doctorNote: string;
  isCritical: boolean;
  medications: Medication[];
  remedies: { title: string; detail: string }[];
}

interface SymptomEntry {
  keywords: string[];
  minMatch: number;
  result: AnalysisResult;
}

const entries: SymptomEntry[] = [
  {
    keywords: ["chest pain", "shortness of breath"],
    minMatch: 1,
    result: {
      disease: "Acute Respiratory Distress / Cardiac Event",
      description: "Chest pain with breathing difficulty may indicate a serious cardiac or pulmonary condition requiring immediate medical attention.",
      severity: "Critical",
      severityNote: "Seek emergency medical care immediately. Do not delay.",
      doctor: "Cardiologist / Emergency Medicine",
      doctorNote: "Visit the nearest emergency room or call an ambulance right away.",
      isCritical: true,
      medications: [
        { name: "Aspirin 325mg", dosage: "1 tablet", usage: "Chew immediately if heart attack suspected", timing: "One-time emergency dose", duration: "Single dose", warnings: "Do not take if allergic to aspirin or on blood thinners without doctor's advice" },
        { name: "Nitroglycerin (if prescribed)", dosage: "0.4mg sublingual", usage: "Place under tongue for chest pain", timing: "Every 5 min, max 3 doses", duration: "Emergency only", warnings: "Prescription only. May cause dizziness and low BP" },
      ],
      remedies: [
        { title: "Stay calm & sit upright", detail: "Sit in a comfortable position, loosen tight clothing, and try to stay calm while waiting for help." },
        { title: "Deep slow breathing", detail: "Breathe in slowly through nose for 4 seconds, hold 4 seconds, exhale through mouth for 6 seconds." },
        { title: "Do NOT lie flat", detail: "Keep your upper body elevated. Lying flat can worsen breathing difficulty." },
      ],
    },
  },
  {
    keywords: ["fever", "cough"],
    minMatch: 2,
    result: {
      disease: "Influenza (Flu)",
      description: "A viral respiratory infection causing fever, cough, body aches, and fatigue. Usually resolves in 1–2 weeks.",
      severity: "Medium",
      severityNote: "Monitor temperature closely. Seek help if fever exceeds 103°F or lasts more than 3 days.",
      doctor: "General Physician",
      doctorNote: "Schedule a visit within 24–48 hours if symptoms worsen or don't improve.",
      isCritical: false,
      medications: [
        { name: "Paracetamol (Acetaminophen)", dosage: "500mg tablet", usage: "Reduces fever and relieves body pain", timing: "Every 6 hours as needed", duration: "3–5 days", warnings: "Do not exceed 4g/day. Avoid alcohol. Not for liver disease patients." },
        { name: "Dextromethorphan Syrup", dosage: "10ml", usage: "Suppresses dry cough", timing: "3 times daily after meals", duration: "5–7 days", warnings: "May cause drowsiness. Avoid driving after taking." },
        { name: "Vitamin C 500mg", dosage: "1 tablet", usage: "Immune system support", timing: "Once daily with breakfast", duration: "7–10 days", warnings: "Safe for most adults. Reduce dose if stomach upset." },
      ],
      remedies: [
        { title: "Warm fluids & hydration", detail: "Drink warm water, herbal tea, or chicken soup every 2 hours to stay hydrated and soothe throat." },
        { title: "Salt water gargle", detail: "Mix ½ tsp salt in warm water. Gargle 3–4 times daily to reduce throat irritation." },
        { title: "Steam inhalation", detail: "Inhale steam from hot water with 2 drops eucalyptus oil for 10 min, twice daily." },
        { title: "Rest adequately", detail: "Sleep 8–10 hours. Avoid strenuous activity until fever resolves completely." },
      ],
    },
  },
  {
    keywords: ["fever"],
    minMatch: 1,
    result: {
      disease: "Viral Fever",
      description: "A self-limiting viral infection causing elevated body temperature, chills, and general malaise.",
      severity: "Medium",
      severityNote: "Usually resolves in 3–5 days. Consult a doctor if temperature stays above 102°F for 48+ hours.",
      doctor: "General Physician",
      doctorNote: "Visit if fever persists beyond 3 days or is accompanied by rash or severe headache.",
      isCritical: false,
      medications: [
        { name: "Paracetamol 500mg", dosage: "1 tablet", usage: "Fever reduction and pain relief", timing: "Every 6 hours (max 4 times/day)", duration: "3–5 days", warnings: "Do not exceed 2g/day for elderly. Take with water after food." },
        { name: "ORS (Oral Rehydration Salts)", dosage: "1 sachet in 1L water", usage: "Prevents dehydration from fever", timing: "Sip throughout the day", duration: "Until fever subsides", warnings: "Prepare fresh solution every 24 hours." },
      ],
      remedies: [
        { title: "Lukewarm sponge bath", detail: "Use a cloth soaked in lukewarm water on forehead, armpits, and feet to bring down temperature naturally." },
        { title: "Light, nutritious diet", detail: "Eat khichdi, soup, or toast. Avoid oily/spicy foods that are hard to digest." },
        { title: "Stay hydrated", detail: "Drink at least 2–3 liters of water, coconut water, or fresh juice throughout the day." },
      ],
    },
  },
  {
    keywords: ["headache"],
    minMatch: 1,
    result: {
      disease: "Tension Headache",
      description: "A common headache caused by stress, poor posture, or eye strain. Feels like a band of pressure around the head.",
      severity: "Low",
      severityNote: "Usually manageable with OTC medication and rest. Seek help for recurring or severe headaches.",
      doctor: "General Physician",
      doctorNote: "Consult if headaches occur more than 3 times per week or are unusually severe.",
      isCritical: false,
      medications: [
        { name: "Ibuprofen 200mg", dosage: "1 tablet", usage: "Pain relief and anti-inflammatory", timing: "Every 8 hours with food", duration: "1–3 days", warnings: "Take with food to avoid stomach upset. Not for peptic ulcer patients." },
        { name: "Paracetamol 500mg", dosage: "1 tablet", usage: "Alternative pain relief", timing: "Every 6 hours as needed", duration: "1–2 days", warnings: "Do not combine with alcohol." },
      ],
      remedies: [
        { title: "Cold compress", detail: "Apply a cold pack wrapped in cloth to forehead for 15 minutes. Repeat every hour." },
        { title: "Rest in a dark room", detail: "Lie down in a quiet, dimly lit room. Close your eyes and relax for 20–30 minutes." },
        { title: "Neck & shoulder massage", detail: "Gently massage the base of your skull and neck muscles for 5 minutes to release tension." },
        { title: "Reduce screen time", detail: "Take a 20-second break every 20 minutes. Look at something 20 feet away (20-20-20 rule)." },
      ],
    },
  },
  {
    keywords: ["cold", "runny nose", "sneezing"],
    minMatch: 1,
    result: {
      disease: "Common Cold",
      description: "A mild viral upper respiratory infection causing congestion, sneezing, and a runny nose. Typically lasts 7–10 days.",
      severity: "Low",
      severityNote: "Self-limiting condition. Consult a doctor only if symptoms persist beyond 10 days.",
      doctor: "General Physician",
      doctorNote: "Visit if you develop high fever, green/yellow mucus, or ear pain.",
      isCritical: false,
      medications: [
        { name: "Cetirizine 10mg", dosage: "1 tablet", usage: "Antihistamine to reduce sneezing and runny nose", timing: "Once daily at bedtime", duration: "5–7 days", warnings: "May cause mild drowsiness. Avoid operating heavy machinery." },
        { name: "Nasal Saline Spray", dosage: "2 sprays per nostril", usage: "Moisturizes nasal passages and clears congestion", timing: "3–4 times daily", duration: "Until symptoms resolve", warnings: "Safe for all ages. Use with clean hands." },
        { name: "Paracetamol 500mg", dosage: "1 tablet", usage: "For body aches accompanying cold", timing: "Every 6 hours as needed", duration: "2–3 days", warnings: "Do not exceed 4 tablets per day." },
      ],
      remedies: [
        { title: "Steam inhalation", detail: "Boil water, add 2–3 drops eucalyptus oil. Inhale steam under a towel for 10 min, twice daily." },
        { title: "Ginger-honey-lemon tea", detail: "Boil sliced ginger in water, add honey and lemon. Drink warm 3 times daily." },
        { title: "Warm salt water gargle", detail: "Dissolve ½ tsp salt in a glass of warm water. Gargle for 30 seconds, 3–4 times daily." },
        { title: "Keep warm & rest", detail: "Wear warm clothes, use a light blanket, and rest to let your immune system fight the infection." },
      ],
    },
  },
  {
    keywords: ["sore throat"],
    minMatch: 1,
    result: {
      disease: "Pharyngitis (Sore Throat)",
      description: "Inflammation of the throat causing pain, scratchiness, and difficulty swallowing. Often viral but can be bacterial.",
      severity: "Low",
      severityNote: "Usually resolves in 5–7 days. See a doctor if you have white patches on throat or difficulty breathing.",
      doctor: "ENT Specialist / General Physician",
      doctorNote: "Consult if sore throat persists beyond a week or is accompanied by high fever and swollen glands.",
      isCritical: false,
      medications: [
        { name: "Strepsils Lozenges", dosage: "1 lozenge", usage: "Soothes throat pain and kills bacteria", timing: "Every 2–3 hours (max 8/day)", duration: "3–5 days", warnings: "Do not give to children under 6." },
        { name: "Ibuprofen 200mg", dosage: "1 tablet", usage: "Reduces throat inflammation and pain", timing: "Every 8 hours with food", duration: "3 days", warnings: "Avoid on empty stomach." },
      ],
      remedies: [
        { title: "Warm salt water gargle", detail: "Mix ½ tsp salt in a glass of warm water. Gargle gently for 30 seconds, repeat 4–5 times daily." },
        { title: "Honey & turmeric milk", detail: "Add 1 tsp honey and ½ tsp turmeric to warm milk. Drink before bedtime for soothing relief." },
        { title: "Avoid cold foods", detail: "Stick to warm soups, teas, and soft foods. Avoid ice cream, cold drinks, and acidic foods." },
      ],
    },
  },
  {
    keywords: ["nausea", "vomiting"],
    minMatch: 1,
    result: {
      disease: "Gastritis / Food Poisoning",
      description: "Stomach inflammation or contaminated food causing nausea, vomiting, and abdominal discomfort.",
      severity: "Medium",
      severityNote: "Monitor for dehydration. Seek immediate care if vomiting blood or unable to keep fluids down for 12+ hours.",
      doctor: "Gastroenterologist / General Physician",
      doctorNote: "Visit within 24 hours if symptoms are severe or if there's blood in vomit/stool.",
      isCritical: false,
      medications: [
        { name: "Ondansetron (Emeset) 4mg", dosage: "1 tablet", usage: "Anti-nausea medication", timing: "30 min before meals, up to 3 times/day", duration: "2–3 days", warnings: "May cause headache or constipation. Consult doctor if pregnant." },
        { name: "ORS Solution", dosage: "1 sachet in 1L water", usage: "Rehydration after vomiting", timing: "Small sips frequently", duration: "Until symptoms resolve", warnings: "Prepare fresh daily. Discard after 24 hours." },
      ],
      remedies: [
        { title: "BRAT diet", detail: "Eat only Bananas, Rice, Applesauce, and Toast for 24 hours to let your stomach recover." },
        { title: "Ginger tea", detail: "Chew small pieces of fresh ginger or sip ginger tea to naturally calm nausea." },
        { title: "Small frequent sips", detail: "Don't gulp water. Take small sips of clear fluids every 10–15 minutes to avoid triggering more vomiting." },
      ],
    },
  },
  {
    keywords: ["body ache", "fatigue", "joint pain"],
    minMatch: 1,
    result: {
      disease: "Viral Myalgia / General Fatigue",
      description: "Body aches and tiredness often caused by viral infections, stress, or overexertion.",
      severity: "Low",
      severityNote: "Rest and mild pain relief usually sufficient. See a doctor if pain is severe or accompanied by swelling.",
      doctor: "General Physician",
      doctorNote: "Consult if body aches last more than a week or are concentrated in joints with swelling.",
      isCritical: false,
      medications: [
        { name: "Ibuprofen 400mg", dosage: "1 tablet", usage: "Pain relief and anti-inflammatory", timing: "Every 8 hours after meals", duration: "3–5 days", warnings: "Take with food. Avoid if you have kidney issues." },
        { name: "Multivitamin Tablet", dosage: "1 tablet", usage: "Nutritional support during recovery", timing: "Once daily with breakfast", duration: "2–4 weeks", warnings: "Safe for most adults. Check for allergies to ingredients." },
      ],
      remedies: [
        { title: "Warm oil massage", detail: "Gently massage sore areas with warm sesame or coconut oil for 15 min before a warm bath." },
        { title: "Epsom salt bath", detail: "Add 2 cups Epsom salt to a warm bath. Soak for 20 minutes to relieve muscle soreness." },
        { title: "Adequate sleep", detail: "Aim for 8–9 hours of sleep. Use a supportive pillow and maintain consistent sleep schedule." },
        { title: "Light stretching", detail: "Do gentle stretching exercises for 10 minutes in the morning to improve circulation and reduce stiffness." },
      ],
    },
  },
  {
    keywords: ["diarrhea"],
    minMatch: 1,
    result: {
      disease: "Acute Gastroenteritis",
      description: "Inflammation of the stomach and intestines causing watery stools, cramps, and dehydration.",
      severity: "Medium",
      severityNote: "Dehydration is the main risk. Seek care if stools have blood or diarrhea lasts more than 3 days.",
      doctor: "Gastroenterologist / General Physician",
      doctorNote: "Visit promptly if experiencing high fever with diarrhea or signs of severe dehydration.",
      isCritical: false,
      medications: [
        { name: "ORS Solution", dosage: "1 sachet in 1L water", usage: "Rehydration therapy", timing: "After every loose stool", duration: "Until resolved", warnings: "Essential for preventing dehydration. Use clean water." },
        { name: "Loperamide 2mg", dosage: "1 capsule", usage: "Reduces frequency of stools", timing: "After first loose stool, then 1 after each", duration: "Max 2 days (max 8mg/day)", warnings: "Do not use if stools are bloody. Not for children under 12." },
      ],
      remedies: [
        { title: "BRAT diet", detail: "Stick to Bananas, Rice, Applesauce, and Toast. These are gentle on the stomach and help firm stools." },
        { title: "Probiotics (curd/yogurt)", detail: "Eat plain yogurt or take probiotic supplements to restore healthy gut bacteria." },
        { title: "Avoid dairy & spicy food", detail: "Skip milk, cheese, and spicy meals until stools normalize. Stick to bland foods." },
      ],
    },
  },
  {
    keywords: ["dizziness"],
    minMatch: 1,
    result: {
      disease: "Vertigo / Low Blood Pressure",
      description: "A sensation of spinning or lightheadedness, often caused by inner ear issues, dehydration, or low blood pressure.",
      severity: "Medium",
      severityNote: "Usually not dangerous but can cause falls. Seek help if accompanied by chest pain, slurred speech, or vision changes.",
      doctor: "ENT Specialist / Neurologist",
      doctorNote: "Schedule a visit if dizziness is recurrent or severely affects daily activities.",
      isCritical: false,
      medications: [
        { name: "Meclizine 25mg", dosage: "1 tablet", usage: "Anti-vertigo medication", timing: "Once daily or as directed", duration: "3–5 days", warnings: "Causes drowsiness. Do not drive or operate machinery." },
        { name: "Betahistine 16mg", dosage: "1 tablet", usage: "Improves inner ear blood flow", timing: "3 times daily with meals", duration: "As prescribed by doctor", warnings: "Not for patients with stomach ulcers. Prescription required." },
      ],
      remedies: [
        { title: "Sit or lie down immediately", detail: "When feeling dizzy, sit down right away. If standing, hold onto something stable." },
        { title: "Stay hydrated", detail: "Dehydration is a common cause. Drink water, coconut water, or electrolyte drinks regularly." },
        { title: "Epley maneuver", detail: "A series of head movements that can help reposition inner ear crystals. Ask your doctor to demonstrate." },
      ],
    },
  },
  {
    keywords: ["fever", "headache", "body ache"],
    minMatch: 2,
    result: {
      disease: "Dengue Fever (Suspected)",
      description: "A mosquito-borne viral disease causing high fever, severe headache, body/joint pain, and sometimes rash.",
      severity: "High",
      severityNote: "Platelet count may drop dangerously. Requires blood tests and close monitoring. Avoid aspirin/ibuprofen.",
      doctor: "Infectious Disease Specialist / General Physician",
      doctorNote: "Get a Complete Blood Count (CBC) test immediately. Hospitalization may be needed if platelets drop.",
      isCritical: true,
      medications: [
        { name: "Paracetamol 500mg ONLY", dosage: "1 tablet", usage: "Fever and pain relief", timing: "Every 6 hours (max 4g/day)", duration: "Until fever resolves", warnings: "⚠️ Do NOT take Aspirin or Ibuprofen — they increase bleeding risk in dengue." },
        { name: "ORS / IV Fluids", dosage: "As directed", usage: "Prevent dehydration and support platelet recovery", timing: "Continuously throughout the day", duration: "Until recovery", warnings: "IV fluids if unable to drink. Monitor urine output." },
      ],
      remedies: [
        { title: "Papaya leaf extract", detail: "Crush fresh papaya leaves and extract juice. Drink 2 tbsp twice daily — shown to help increase platelets." },
        { title: "Complete bed rest", detail: "Absolute rest is essential. Avoid any physical activity until fever has been gone for 48 hours." },
        { title: "Hydrate aggressively", detail: "Drink 3–4 liters of fluids daily: water, coconut water, ORS, and fresh juices." },
        { title: "Monitor for warning signs", detail: "Watch for: persistent vomiting, abdominal pain, bleeding gums, or blood in stool. Rush to ER if these occur." },
      ],
    },
  },
];

export function analyzeSymptoms(
  symptoms: string[],
  context?: { age?: string; temperature?: string; duration?: string }
): AnalysisResult {
  const lower = symptoms.map((s) => s.toLowerCase());

  // Sort entries by minMatch descending so more specific matches come first
  const sorted = [...entries].sort((a, b) => b.minMatch - a.minMatch);

  for (const entry of sorted) {
    const matchCount = entry.keywords.filter((k) => lower.includes(k)).length;
    if (matchCount >= entry.minMatch) {
      const result = { ...entry.result };
      // Escalate severity based on context
      if (context?.temperature) {
        const temp = parseFloat(context.temperature);
        if (temp >= 103 && result.severity === "Medium") {
          result.severity = "High";
          result.severityNote = `Temperature of ${temp}°F is high. ${result.severityNote}`;
          result.isCritical = true;
        }
      }
      if (context?.duration === "2+ weeks" && result.severity === "Low") {
        result.severity = "Medium";
        result.severityNote = `Symptoms persisting for over 2 weeks. ${result.severityNote}`;
      }
      if (context?.age) {
        const age = parseInt(context.age);
        if ((age > 65 || age < 5) && result.severity !== "Critical") {
          result.severityNote = `⚠️ Age ${age} is a risk factor. ${result.severityNote}`;
          if (result.severity === "Low") result.severity = "Medium";
        }
      }
      return result;
    }
  }

  return {
    disease: "General Ailment",
    description: "Your symptoms don't match a specific condition in our database. A general check-up is recommended.",
    severity: "Low",
    severityNote: "Symptoms appear mild. Monitor and consult a doctor if they persist or worsen.",
    doctor: "General Physician",
    doctorNote: "Schedule a routine check-up for proper diagnosis.",
    isCritical: false,
    medications: [
      { name: "Paracetamol 500mg", dosage: "1 tablet", usage: "General symptom relief", timing: "Every 6 hours as needed", duration: "2–3 days", warnings: "Do not exceed 4 tablets per day." },
    ],
    remedies: [
      { title: "Rest & hydration", detail: "Get plenty of sleep and drink at least 2 liters of water daily." },
      { title: "Monitor symptoms", detail: "Keep track of your symptoms. If they worsen or new symptoms appear, consult a doctor promptly." },
    ],
  };
}
