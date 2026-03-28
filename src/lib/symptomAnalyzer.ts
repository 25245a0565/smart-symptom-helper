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
  // Menstrual conditions
  {
    keywords: ["menstrual cramps", "heavy bleeding", "irregular periods"],
    minMatch: 2,
    result: {
      disease: "PCOS / Hormonal Imbalance (Suspected)",
      description: "Combination of menstrual cramps with heavy/irregular periods may indicate Polycystic Ovary Syndrome or hormonal imbalance requiring medical evaluation.",
      severity: "High",
      severityNote: "Hormonal evaluation and ultrasound recommended. Early treatment prevents long-term complications.",
      doctor: "Gynecologist",
      doctorNote: "Schedule an appointment for hormonal blood tests and pelvic ultrasound within a week.",
      isCritical: true,
      medications: [
        { name: "Mefenamic Acid 500mg", dosage: "1 tablet", usage: "Pain relief for menstrual cramps", timing: "Every 8 hours during periods", duration: "During menstruation", warnings: "Take with food. Avoid if you have stomach ulcers." },
        { name: "Tranexamic Acid 500mg", dosage: "2 tablets", usage: "Reduces heavy menstrual bleeding", timing: "3 times daily during heavy flow", duration: "Up to 5 days per cycle", warnings: "Do not use if history of blood clots. Prescription required." },
        { name: "Iron + Folic Acid supplement", dosage: "1 tablet", usage: "Prevents anemia from heavy bleeding", timing: "Once daily after meals", duration: "Ongoing", warnings: "May cause constipation. Take with vitamin C for better absorption." },
      ],
      remedies: [
        { title: "Hot water bag on abdomen", detail: "Place a hot water bag or heating pad on lower abdomen for 20 minutes to relieve cramps naturally." },
        { title: "Ginger-turmeric tea", detail: "Boil fresh ginger and ½ tsp turmeric in water. Drink warm 2–3 times daily during periods." },
        { title: "Light exercise & yoga", detail: "Gentle yoga poses like child's pose and butterfly stretch can ease cramp pain significantly." },
        { title: "Hydration & nutrition", detail: "Drink 2–3 liters of warm water. Include iron-rich foods like spinach, dates, and pomegranate." },
      ],
    },
  },
  {
    keywords: ["menstrual cramps"],
    minMatch: 1,
    result: {
      disease: "Dysmenorrhea (Menstrual Cramps)",
      description: "Painful menstrual periods caused by uterine contractions. Common and usually manageable with self-care and OTC medications.",
      severity: "Low",
      severityNote: "Normal for many women. Consult a gynecologist if pain is severe or worsening each cycle.",
      doctor: "Gynecologist",
      doctorNote: "Visit if cramps interfere with daily activities or are accompanied by heavy/irregular periods.",
      isCritical: false,
      medications: [
        { name: "Ibuprofen 400mg", dosage: "1 tablet", usage: "Anti-inflammatory pain relief", timing: "Every 8 hours with food during periods", duration: "2–3 days", warnings: "Take with food. Avoid on empty stomach." },
        { name: "Mefenamic Acid 250mg", dosage: "1 tablet", usage: "Specifically for menstrual pain", timing: "Every 8 hours as needed", duration: "During menstruation", warnings: "Not for prolonged use. Consult doctor if no relief." },
        { name: "Antispasmodic (Drotaverine 40mg)", dosage: "1 tablet", usage: "Relieves uterine muscle spasms", timing: "2–3 times daily", duration: "During cramp episodes", warnings: "May cause slight dizziness. Avoid driving." },
      ],
      remedies: [
        { title: "Hot water bag / heating pad", detail: "Apply warmth to lower abdomen for 15–20 minutes. This relaxes uterine muscles and reduces pain." },
        { title: "Warm ginger tea", detail: "Steep fresh ginger slices in hot water for 10 min. Add honey. Drink 3 times daily — natural anti-inflammatory." },
        { title: "Gentle stretching & yoga", detail: "Try cat-cow pose, child's pose, and gentle pelvic tilts. Even 10 minutes helps reduce cramp severity." },
        { title: "Stay hydrated", detail: "Warm water is best. Avoid cold drinks, caffeine, and carbonated beverages during menstruation." },
        { title: "Cinnamon milk", detail: "Add ½ tsp cinnamon powder to warm milk. Drink before bed — cinnamon has natural anti-spasmodic properties." },
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
        { name: "Paracetamol (Acetaminophen)", dosage: "500mg tablet", usage: "Reduces fever and relieves body pain", timing: "Every 6 hours as needed", duration: "3–5 days", warnings: "Do not exceed 4g/day. Avoid alcohol." },
        { name: "Dextromethorphan Syrup", dosage: "10ml", usage: "Suppresses dry cough", timing: "3 times daily after meals", duration: "5–7 days", warnings: "May cause drowsiness. Avoid driving." },
        { name: "Vitamin C 500mg", dosage: "1 tablet", usage: "Immune system support", timing: "Once daily with breakfast", duration: "7–10 days", warnings: "Safe for most adults." },
      ],
      remedies: [
        { title: "Warm fluids & hydration", detail: "Drink warm water, herbal tea, or chicken soup every 2 hours." },
        { title: "Salt water gargle", detail: "Mix ½ tsp salt in warm water. Gargle 3–4 times daily." },
        { title: "Steam inhalation", detail: "Inhale steam from hot water with 2 drops eucalyptus oil for 10 min, twice daily." },
        { title: "Rest adequately", detail: "Sleep 8–10 hours. Avoid strenuous activity until fever resolves." },
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
        { name: "Paracetamol 500mg", dosage: "1 tablet", usage: "Fever reduction and pain relief", timing: "Every 6 hours (max 4 times/day)", duration: "3–5 days", warnings: "Do not exceed 2g/day for elderly." },
        { name: "ORS (Oral Rehydration Salts)", dosage: "1 sachet in 1L water", usage: "Prevents dehydration from fever", timing: "Sip throughout the day", duration: "Until fever subsides", warnings: "Prepare fresh every 24 hours." },
      ],
      remedies: [
        { title: "Lukewarm sponge bath", detail: "Use a cloth soaked in lukewarm water on forehead, armpits, and feet." },
        { title: "Light, nutritious diet", detail: "Eat khichdi, soup, or toast. Avoid oily/spicy foods." },
        { title: "Stay hydrated", detail: "Drink 2–3 liters of water, coconut water, or fresh juice daily." },
      ],
    },
  },
  {
    keywords: ["headache", "migraine"],
    minMatch: 1,
    result: {
      disease: "Tension Headache / Migraine",
      description: "A common headache caused by stress, poor posture, or eye strain. Feels like a band of pressure around the head.",
      severity: "Low",
      severityNote: "Usually manageable with OTC medication and rest.",
      doctor: "General Physician / Neurologist",
      doctorNote: "Consult if headaches occur more than 3 times per week.",
      isCritical: false,
      medications: [
        { name: "Ibuprofen 200mg", dosage: "1 tablet", usage: "Pain relief and anti-inflammatory", timing: "Every 8 hours with food", duration: "1–3 days", warnings: "Take with food." },
        { name: "Paracetamol 500mg", dosage: "1 tablet", usage: "Alternative pain relief", timing: "Every 6 hours as needed", duration: "1–2 days", warnings: "Do not combine with alcohol." },
      ],
      remedies: [
        { title: "Cold compress", detail: "Apply a cold pack to forehead for 15 minutes. Repeat hourly." },
        { title: "Rest in a dark room", detail: "Lie down in a quiet, dimly lit room for 20–30 minutes." },
        { title: "Neck & shoulder massage", detail: "Gently massage base of skull and neck muscles for 5 minutes." },
        { title: "Reduce screen time", detail: "Use the 20-20-20 rule: every 20 min, look 20 ft away for 20 seconds." },
      ],
    },
  },
  {
    keywords: ["cold", "runny nose", "sneezing"],
    minMatch: 1,
    result: {
      disease: "Common Cold",
      description: "A mild viral infection causing congestion, sneezing, and a runny nose. Typically lasts 7–10 days.",
      severity: "Low",
      severityNote: "Self-limiting. Consult a doctor only if symptoms persist beyond 10 days.",
      doctor: "General Physician",
      doctorNote: "Visit if you develop high fever, green/yellow mucus, or ear pain.",
      isCritical: false,
      medications: [
        { name: "Cetirizine 10mg", dosage: "1 tablet", usage: "Reduces sneezing and runny nose", timing: "Once daily at bedtime", duration: "5–7 days", warnings: "May cause mild drowsiness." },
        { name: "Nasal Saline Spray", dosage: "2 sprays per nostril", usage: "Clears congestion", timing: "3–4 times daily", duration: "Until symptoms resolve", warnings: "Safe for all ages." },
      ],
      remedies: [
        { title: "Steam inhalation", detail: "Inhale steam with eucalyptus oil for 10 min, twice daily." },
        { title: "Ginger-honey-lemon tea", detail: "Boil ginger in water, add honey and lemon. Drink 3 times daily." },
        { title: "Warm salt water gargle", detail: "½ tsp salt in warm water. Gargle 3–4 times daily." },
        { title: "Keep warm & rest", detail: "Wear warm clothes and rest to help your immune system." },
      ],
    },
  },
  {
    keywords: ["sore throat"],
    minMatch: 1,
    result: {
      disease: "Pharyngitis (Sore Throat)",
      description: "Inflammation of the throat causing pain and difficulty swallowing. Often viral but can be bacterial.",
      severity: "Low",
      severityNote: "Usually resolves in 5–7 days. See a doctor if white patches appear.",
      doctor: "ENT Specialist / General Physician",
      doctorNote: "Consult if sore throat persists beyond a week with high fever.",
      isCritical: false,
      medications: [
        { name: "Strepsils Lozenges", dosage: "1 lozenge", usage: "Soothes throat pain", timing: "Every 2–3 hours (max 8/day)", duration: "3–5 days", warnings: "Not for children under 6." },
        { name: "Ibuprofen 200mg", dosage: "1 tablet", usage: "Reduces inflammation", timing: "Every 8 hours with food", duration: "3 days", warnings: "Avoid on empty stomach." },
      ],
      remedies: [
        { title: "Warm salt water gargle", detail: "Gargle gently for 30 seconds, 4–5 times daily." },
        { title: "Honey & turmeric milk", detail: "Warm milk with honey and turmeric before bedtime." },
        { title: "Avoid cold foods", detail: "Stick to warm soups, teas, and soft foods." },
      ],
    },
  },
  {
    keywords: ["nausea", "vomiting"],
    minMatch: 1,
    result: {
      disease: "Gastritis / Food Poisoning",
      description: "Stomach inflammation causing nausea, vomiting, and abdominal discomfort.",
      severity: "Medium",
      severityNote: "Monitor for dehydration. Seek care if vomiting blood.",
      doctor: "Gastroenterologist / General Physician",
      doctorNote: "Visit within 24 hours if symptoms are severe.",
      isCritical: false,
      medications: [
        { name: "Ondansetron 4mg", dosage: "1 tablet", usage: "Anti-nausea medication", timing: "30 min before meals, up to 3 times/day", duration: "2–3 days", warnings: "May cause headache." },
        { name: "ORS Solution", dosage: "1 sachet in 1L water", usage: "Rehydration", timing: "Small sips frequently", duration: "Until symptoms resolve", warnings: "Prepare fresh daily." },
      ],
      remedies: [
        { title: "BRAT diet", detail: "Eat only Bananas, Rice, Applesauce, and Toast for 24 hours." },
        { title: "Ginger tea", detail: "Chew fresh ginger or sip ginger tea to calm nausea." },
        { title: "Small frequent sips", detail: "Take small sips of clear fluids every 10–15 minutes." },
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
      severityNote: "Rest and mild pain relief usually sufficient.",
      doctor: "General Physician",
      doctorNote: "Consult if body aches last more than a week.",
      isCritical: false,
      medications: [
        { name: "Ibuprofen 400mg", dosage: "1 tablet", usage: "Pain relief", timing: "Every 8 hours after meals", duration: "3–5 days", warnings: "Take with food." },
        { name: "Multivitamin Tablet", dosage: "1 tablet", usage: "Nutritional support", timing: "Once daily with breakfast", duration: "2–4 weeks", warnings: "Safe for most adults." },
      ],
      remedies: [
        { title: "Warm oil massage", detail: "Massage sore areas with warm sesame or coconut oil for 15 min." },
        { title: "Epsom salt bath", detail: "Add 2 cups Epsom salt to a warm bath. Soak for 20 minutes." },
        { title: "Adequate sleep", detail: "Aim for 8–9 hours of sleep." },
        { title: "Light stretching", detail: "Gentle stretching for 10 minutes in the morning." },
      ],
    },
  },
  {
    keywords: ["diarrhea"],
    minMatch: 1,
    result: {
      disease: "Acute Gastroenteritis",
      description: "Inflammation causing watery stools, cramps, and dehydration.",
      severity: "Medium",
      severityNote: "Dehydration is the main risk. Seek care if stools have blood.",
      doctor: "Gastroenterologist / General Physician",
      doctorNote: "Visit if experiencing high fever with diarrhea.",
      isCritical: false,
      medications: [
        { name: "ORS Solution", dosage: "1 sachet in 1L water", usage: "Rehydration", timing: "After every loose stool", duration: "Until resolved", warnings: "Use clean water." },
        { name: "Loperamide 2mg", dosage: "1 capsule", usage: "Reduces stool frequency", timing: "After first loose stool", duration: "Max 2 days", warnings: "Do not use if stools are bloody." },
      ],
      remedies: [
        { title: "BRAT diet", detail: "Bananas, Rice, Applesauce, and Toast — gentle on the stomach." },
        { title: "Probiotics", detail: "Plain yogurt or probiotic supplements to restore gut bacteria." },
        { title: "Avoid dairy & spicy food", detail: "Stick to bland foods until stools normalize." },
      ],
    },
  },
  {
    keywords: ["dizziness"],
    minMatch: 1,
    result: {
      disease: "Vertigo / Low Blood Pressure",
      description: "Spinning or lightheadedness, often from inner ear issues or dehydration.",
      severity: "Medium",
      severityNote: "Seek help if accompanied by chest pain or slurred speech.",
      doctor: "ENT Specialist / Neurologist",
      doctorNote: "Schedule a visit if dizziness is recurrent.",
      isCritical: false,
      medications: [
        { name: "Meclizine 25mg", dosage: "1 tablet", usage: "Anti-vertigo medication", timing: "Once daily", duration: "3–5 days", warnings: "Causes drowsiness." },
      ],
      remedies: [
        { title: "Sit or lie down immediately", detail: "When dizzy, sit down right away and hold onto something stable." },
        { title: "Stay hydrated", detail: "Drink water, coconut water, or electrolyte drinks regularly." },
        { title: "Epley maneuver", detail: "Head movements that help reposition inner ear crystals. Ask your doctor." },
      ],
    },
  },
  {
    keywords: ["fever", "headache", "body ache"],
    minMatch: 2,
    result: {
      disease: "Dengue Fever (Suspected)",
      description: "A mosquito-borne viral disease causing high fever, severe headache, and body/joint pain.",
      severity: "High",
      severityNote: "Platelet count may drop. Requires blood tests. Avoid aspirin/ibuprofen.",
      doctor: "Infectious Disease Specialist / General Physician",
      doctorNote: "Get a Complete Blood Count (CBC) test immediately.",
      isCritical: true,
      medications: [
        { name: "Paracetamol 500mg ONLY", dosage: "1 tablet", usage: "Fever and pain relief", timing: "Every 6 hours", duration: "Until fever resolves", warnings: "⚠️ Do NOT take Aspirin or Ibuprofen." },
        { name: "ORS / IV Fluids", dosage: "As directed", usage: "Prevent dehydration", timing: "Throughout the day", duration: "Until recovery", warnings: "IV fluids if unable to drink." },
      ],
      remedies: [
        { title: "Papaya leaf extract", detail: "Drink 2 tbsp papaya leaf juice twice daily — helps increase platelets." },
        { title: "Complete bed rest", detail: "Absolute rest until fever has been gone for 48 hours." },
        { title: "Hydrate aggressively", detail: "Drink 3–4 liters daily: water, coconut water, ORS, juices." },
        { title: "Monitor warning signs", detail: "Watch for persistent vomiting, abdominal pain, or bleeding gums." },
      ],
    },
  },
  // Skin/Allergy
  {
    keywords: ["rash", "itching"],
    minMatch: 1,
    result: {
      disease: "Allergic Dermatitis / Urticaria",
      description: "Skin reaction causing redness, itching, and rash. Often triggered by allergens, new products, or food.",
      severity: "Low",
      severityNote: "Usually mild and self-limiting. Seek help if swelling spreads to face/throat.",
      doctor: "Dermatologist",
      doctorNote: "Visit if rash persists beyond a week or is accompanied by fever.",
      isCritical: false,
      medications: [
        { name: "Cetirizine 10mg", dosage: "1 tablet", usage: "Antihistamine to reduce itching", timing: "Once daily at bedtime", duration: "5–7 days", warnings: "May cause drowsiness." },
        { name: "Calamine Lotion", dosage: "Apply thin layer", usage: "Soothes itching and irritation", timing: "3–4 times daily on affected area", duration: "Until rash clears", warnings: "For external use only. Avoid on open wounds." },
      ],
      remedies: [
        { title: "Cold compress", detail: "Apply a cold damp cloth to itchy areas for 10–15 minutes to reduce inflammation." },
        { title: "Oatmeal bath", detail: "Add colloidal oatmeal to lukewarm bath water. Soak for 15–20 minutes." },
        { title: "Avoid triggers", detail: "Stop using any new soaps, detergents, or products that may have caused the reaction." },
        { title: "Aloe vera gel", detail: "Apply fresh aloe vera gel to affected areas. Its cooling properties soothe irritated skin." },
      ],
    },
  },
  // Back pain
  {
    keywords: ["back pain"],
    minMatch: 1,
    result: {
      disease: "Muscular Back Pain / Lumbar Strain",
      description: "Pain in the lower or upper back due to muscle strain, poor posture, or prolonged sitting.",
      severity: "Low",
      severityNote: "Usually improves with rest and exercise. See a doctor if pain radiates to legs.",
      doctor: "Orthopedist / Physiotherapist",
      doctorNote: "Consult if pain persists beyond 2 weeks or causes numbness/tingling in legs.",
      isCritical: false,
      medications: [
        { name: "Ibuprofen 400mg", dosage: "1 tablet", usage: "Anti-inflammatory pain relief", timing: "Every 8 hours with food", duration: "3–5 days", warnings: "Take with food. Avoid prolonged use." },
        { name: "Muscle Relaxant (Thiocolchicoside 4mg)", dosage: "1 tablet", usage: "Relieves muscle spasm", timing: "Twice daily", duration: "3–5 days", warnings: "May cause drowsiness. Prescription recommended." },
      ],
      remedies: [
        { title: "Hot/cold therapy", detail: "Apply ice pack for first 48 hours, then switch to heat pad for 20 minutes." },
        { title: "Gentle stretching", detail: "Cat-cow stretches, knee-to-chest, and pelvic tilts help relieve tension." },
        { title: "Correct posture", detail: "Use lumbar support while sitting. Keep screen at eye level. Stand every 30 minutes." },
        { title: "Epsom salt bath", detail: "Soak in warm water with 2 cups Epsom salt for 20 minutes to relax muscles." },
      ],
    },
  },
  // Acidity/Bloating
  {
    keywords: ["acidity", "bloating"],
    minMatch: 1,
    result: {
      disease: "Acid Reflux / Functional Dyspepsia",
      description: "Excess stomach acid causing heartburn, bloating, and discomfort. Often triggered by diet and stress.",
      severity: "Low",
      severityNote: "Manageable with diet changes. See a doctor if symptoms occur daily.",
      doctor: "Gastroenterologist",
      doctorNote: "Visit if you experience persistent heartburn, difficulty swallowing, or weight loss.",
      isCritical: false,
      medications: [
        { name: "Antacid (Aluminum-Magnesium)", dosage: "10ml syrup", usage: "Neutralizes stomach acid", timing: "After meals and at bedtime", duration: "As needed", warnings: "May cause constipation or diarrhea." },
        { name: "Pantoprazole 40mg", dosage: "1 tablet", usage: "Reduces acid production", timing: "Once daily before breakfast", duration: "2–4 weeks", warnings: "Do not use long-term without doctor advice." },
      ],
      remedies: [
        { title: "Cold milk", detail: "Drink a glass of cold milk to neutralize acid quickly." },
        { title: "Fennel seeds", detail: "Chew ½ tsp fennel seeds after meals or steep in hot water as tea." },
        { title: "Avoid trigger foods", detail: "Cut down on spicy, fried, and citrus foods. Avoid eating 2 hours before bed." },
        { title: "Elevate head while sleeping", detail: "Use an extra pillow to keep head elevated and prevent nighttime acid reflux." },
      ],
    },
  },
];

export function analyzeSymptoms(
  symptoms: string[],
  context?: { age?: string; temperature?: string; duration?: string },
  followUpAnswers?: Record<string, string>
): AnalysisResult {
  const lower = symptoms.map((s) => s.toLowerCase());

  // Sort entries by minMatch descending so more specific matches come first
  const sorted = [...entries].sort((a, b) => b.minMatch - a.minMatch);

  for (const entry of sorted) {
    const matchCount = entry.keywords.filter((k) => lower.includes(k)).length;
    if (matchCount >= entry.minMatch) {
      const result = { ...entry.result };

      // Escalate severity based on follow-up answers
      if (followUpAnswers) {
        const severity = followUpAnswers["pain_severity"];
        if (severity === "Severe" && result.severity === "Low") {
          result.severity = "Medium";
          result.severityNote = `Severe pain reported. ${result.severityNote}`;
        }
        const breathingDiff = followUpAnswers["breathing_difficulty"];
        if (breathingDiff === "Severe" && result.severity !== "Critical") {
          result.severity = "High";
          result.severityNote = `Severe breathing difficulty. ${result.severityNote}`;
          result.isCritical = true;
        }
        const bloodInStool = followUpAnswers["blood_in_stool"];
        if (bloodInStool === "Yes") {
          result.severity = "High";
          result.severityNote = `Blood in stool detected. ${result.severityNote}`;
          result.isCritical = true;
        }
      }

      // Context-based escalation
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
        result.severityNote = `Symptoms persisting over 2 weeks. ${result.severityNote}`;
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
    severityNote: "Symptoms appear mild. Monitor and consult a doctor if they persist.",
    doctor: "General Physician",
    doctorNote: "Schedule a routine check-up for proper diagnosis.",
    isCritical: false,
    medications: [
      { name: "Paracetamol 500mg", dosage: "1 tablet", usage: "General symptom relief", timing: "Every 6 hours as needed", duration: "2–3 days", warnings: "Do not exceed 4 tablets per day." },
    ],
    remedies: [
      { title: "Rest & hydration", detail: "Get plenty of sleep and drink at least 2 liters of water daily." },
      { title: "Monitor symptoms", detail: "Track your symptoms. If they worsen, consult a doctor promptly." },
    ],
  };
}
