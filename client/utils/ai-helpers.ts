export interface DiseaseRisk {
  name: string;
  risk: "Low" | "Medium" | "High";
  percentage: number;
  color: "success" | "warning" | "danger";
  recommendation: string;
}

export interface HealthAnalysisResult {
  overallScore: number;
  riskLevel: "Good" | "Moderate" | "Requires Attention";
  riskClass: "success" | "warning" | "danger";
  recommendations: string[];
}

export interface BMIResult {
  bmi: number;
  category: string;
  riskLevel: string;
  healthStatus: string;
  exercises: string[];
  foods: string[];
  healthRisks: string[];
  dailyCalories: { min: number; max: number };
  proteinGrams: number;
}

export interface GeneticAnalysisResult {
  diseases: DiseaseRisk[];
  overallRisk: number;
  recommendations: string[];
}

export function calculateBMI(weightKg: number, heightM: number): BMIResult {
  const bmi = weightKg / (heightM * heightM);

  let category = "";
  let riskLevel = "";
  let healthStatus = "";
  let exercises: string[] = [];
  let foods: string[] = [];
  let healthRisks: string[] = [];
  let dailyCalories = { min: 1800, max: 2200 };
  let proteinGrams = 50;

  if (bmi < 18.5) {
    category = "Underweight";
    riskLevel = "Low";
    healthStatus =
      "Below normal weight range. You should focus on gaining weight healthily.";
    exercises = [
      "Strength training 3x per week",
      "Resistance exercises to build muscle",
      "Light cardio 2-3x per week",
      "Yoga for flexibility",
    ];
    foods = [
      "Calorie-dense foods: nuts, avocados, olive oil",
      "High-protein foods: eggs, chicken, fish, beans",
      "Whole grains: brown rice, oats, quinoa",
      "Dairy products: milk, yogurt, cheese",
      "Healthy snacks: granola, dried fruits",
    ];
    healthRisks = [
      "Weakened immune system",
      "Nutritional deficiencies",
      "Lower bone density",
      "Hormonal imbalances",
    ];
    dailyCalories = { min: 2200, max: 2800 };
    proteinGrams = 1.6 * weightKg;
  } else if (bmi < 25) {
    category = "Normal Weight";
    riskLevel = "Low";
    healthStatus =
      "You are in a healthy weight range. Maintain your current lifestyle.";
    exercises = [
      "Cardio 150 minutes per week",
      "Strength training 2-3x per week",
      "Flexibility exercises like yoga",
      "Daily activities: walking, climbing stairs",
    ];
    foods = [
      "Lean proteins: fish, chicken breast, turkey",
      "Whole grains: brown rice, whole wheat bread",
      "Fruits: berries, apples, oranges",
      "Vegetables: broccoli, spinach, carrots",
      "Healthy fats: olive oil, nuts, seeds",
    ];
    healthRisks = ["Minimal health risks - maintain current habits"];
    dailyCalories = { min: 1800, max: 2200 };
    proteinGrams = 1.2 * weightKg;
  } else if (bmi < 30) {
    category = "Overweight";
    riskLevel = "Moderate";
    healthStatus =
      "You are above normal weight range. Lifestyle modifications are recommended.";
    exercises = [
      "Cardio 200-300 minutes per week",
      "Strength training 3-4x per week",
      "Walking: 10,000+ steps daily",
      "Swimming or cycling for low-impact cardio",
      "Group fitness classes for motivation",
    ];
    foods = [
      "Lean proteins: fish, chicken, turkey breast",
      "Whole grains: oatmeal, brown rice, quinoa",
      "Lots of vegetables: leafy greens, peppers",
      "Fruits: watermelon, oranges, berries",
      "Low-fat dairy: yogurt, low-fat milk",
      "Avoid: fried foods, sugary drinks, processed foods",
    ];
    healthRisks = [
      "Type 2 diabetes risk",
      "Hypertension (high blood pressure)",
      "Heart disease",
      "Sleep apnea",
      "Joint problems",
    ];
    dailyCalories = { min: 1500, max: 1800 };
    proteinGrams = 1.5 * weightKg;
  } else {
    category = "Obese";
    riskLevel = "High";
    healthStatus =
      "Significant weight above healthy range. Professional guidance is strongly recommended.";
    exercises = [
      "Start with low-impact activities: walking, water aerobics",
      "Strength training 3-4x per week with light weights",
      "Swimming: easy on joints",
      "Cycling or stationary bike",
      "Gradually increase intensity over months",
      "Consider working with a trainer",
    ];
    foods = [
      "Lean proteins: fish, chicken, tofu, legumes",
      "Whole grains: brown rice, whole wheat, oats",
      "Vegetables: all types, especially leafy greens",
      "Fruits: berries, apples, watermelon",
      "Low-fat dairy or dairy alternatives",
      "Avoid: sugar, fried foods, processed foods, alcohol",
      "Portion control is important",
    ];
    healthRisks = [
      "Type 2 diabetes",
      "High blood pressure",
      "Heart disease and stroke",
      "Sleep apnea",
      "Joint and back problems",
      "Fatty liver disease",
      "Certain cancers",
    ];
    dailyCalories = { min: 1200, max: 1500 };
    proteinGrams = 1.4 * weightKg;
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    riskLevel,
    healthStatus,
    exercises,
    foods,
    healthRisks,
    dailyCalories,
    proteinGrams: Math.round(proteinGrams),
  };
}

export function analyzeGeneticRisk(
  symptoms: string[],
  familyHistory: string[],
  age: number,
  gender: string,
): GeneticAnalysisResult {
  const diseases: DiseaseRisk[] = [
    {
      name: "BRCA1/BRCA2 (Breast Cancer)",
      risk: "Low",
      percentage: 15,
      color: "success",
      recommendation: "Regular mammography screening recommended every 2 years",
    },
    {
      name: "APOE4 (Alzheimer's Disease)",
      risk: "Medium",
      percentage: 45,
      color: "warning",
      recommendation: "Cognitive training and regular neurological assessment",
    },
    {
      name: "Factor V Leiden (Blood Clots)",
      risk: "High",
      percentage: 75,
      color: "danger",
      recommendation:
        "Anticoagulation therapy and lifestyle modifications required",
    },
    {
      name: "Huntington's Disease",
      risk: "Low",
      percentage: 5,
      color: "success",
      recommendation: "Genetic counseling recommended",
    },
    {
      name: "Cystic Fibrosis Carrier",
      risk: "Medium",
      percentage: 25,
      color: "warning",
      recommendation: "Carrier status counseling for family planning",
    },
  ];

  const familyRiskMultiplier = familyHistory.length * 0.15;
  const ageRiskMultiplier = age > 50 ? 0.2 : 0;

  const overallRisk = Math.min(
    100,
    (diseases.reduce((sum, d) => sum + d.percentage, 0) / diseases.length) *
      (1 + familyRiskMultiplier + ageRiskMultiplier),
  );

  return {
    diseases: diseases.map((d) => ({
      ...d,
      percentage: Math.min(
        100,
        d.percentage * (1 + familyRiskMultiplier * 0.5),
      ),
    })),
    overallRisk: Math.round(overallRisk),
    recommendations: [
      "Consider genetic counseling for high-risk diseases",
      "Regular screening for early disease detection",
      "Lifestyle modifications to reduce overall risk",
      "Consult with specialists for preventive care",
      "Maintain healthy diet and regular exercise",
    ],
  };
}

export function assessMentalHealth(
  mood: number,
  energy: number,
  sleep: number,
  stressors: string[],
): HealthAnalysisResult {
  const averageScore = (mood + energy + sleep) / 3;
  const stressorMultiplier = stressors.length * 0.1;
  const adjustedScore = Math.max(1, averageScore - stressorMultiplier);

  let riskLevel: "Good" | "Moderate" | "Requires Attention";
  let riskClass: "success" | "warning" | "danger";

  if (adjustedScore >= 7) {
    riskLevel = "Good";
    riskClass = "success";
  } else if (adjustedScore >= 4) {
    riskLevel = "Moderate";
    riskClass = "warning";
  } else {
    riskLevel = "Requires Attention";
    riskClass = "danger";
  }

  const recommendations = getHealthRecommendations(riskLevel, stressors);

  return {
    overallScore: Math.round(adjustedScore * 10) / 10,
    riskLevel,
    riskClass,
    recommendations,
  };
}

function getHealthRecommendations(
  riskLevel: string,
  stressors: string[],
): string[] {
  const baseRecommendations: Record<string, string[]> = {
    Good: [
      "Continue current wellness practices",
      "Maintain social connections",
      "Regular exercise and healthy diet",
      "Consider mindfulness or meditation",
    ],
    Moderate: [
      "Consider speaking with a counselor",
      "Focus on stress management techniques",
      "Improve sleep hygiene",
      "Engage in regular physical activity",
      "Practice breathing exercises",
    ],
    "Requires Attention": [
      "Strongly recommend professional mental health support",
      "Contact crisis helpline if needed: 988",
      "Reach out to trusted friends or family",
      "Consider therapy or counseling services",
      "Prioritize self-care and relaxation",
    ],
  };

  const recommendations = [...(baseRecommendations[riskLevel] || [])];

  if (stressors.includes("work")) {
    recommendations.push("Consider work-life balance improvements");
  }
  if (stressors.includes("relationship")) {
    recommendations.push("Open communication with loved ones");
  }
  if (stressors.includes("financial")) {
    recommendations.push("Seek financial counseling if needed");
  }

  return recommendations;
}

export function analyzeSymptoms(symptoms: string[]): {
  potentialDiseases: Array<{
    name: string;
    probability: number;
    severity: string;
  }>;
  recommendations: string[];
  disclaimer: string;
} {
  const diseaseSymptomMap: Record<string, { name: string; baseProb: number }> =
    {
      fever: { name: "Viral Infection", baseProb: 0.8 },
      cough: { name: "Respiratory Infection", baseProb: 0.75 },
      "chest pain": { name: "Cardiovascular Issues", baseProb: 0.9 },
      fatigue: { name: "Anemia or Thyroid Issues", baseProb: 0.7 },
      headache: { name: "Migraine or Tension Headache", baseProb: 0.6 },
      "joint pain": { name: "Arthritis or Inflammation", baseProb: 0.65 },
      "shortness of breath": {
        name: "Asthma or Cardio Issues",
        baseProb: 0.85,
      },
      dizziness: { name: "Vestibular Disorder or Hypertension", baseProb: 0.7 },
    };

  const matchedDiseases: Array<{
    name: string;
    probability: number;
    severity: string;
  }> = [];
  const processedSymptoms = new Set<string>();

  symptoms.forEach((symptom) => {
    const lowercaseSymptom = symptom.toLowerCase();
    Object.entries(diseaseSymptomMap).forEach(([key, value]) => {
      if (
        lowercaseSymptom.includes(key) &&
        !processedSymptoms.has(value.name)
      ) {
        matchedDiseases.push({
          name: value.name,
          probability: Math.round(value.baseProb * 100),
          severity:
            value.baseProb > 0.8
              ? "High"
              : value.baseProb > 0.6
                ? "Moderate"
                : "Low",
        });
        processedSymptoms.add(value.name);
      }
    });
  });

  if (matchedDiseases.length === 0) {
    matchedDiseases.push({
      name: "General Health Concern",
      probability: 50,
      severity: "Moderate",
    });
  }

  matchedDiseases.sort((a, b) => b.probability - a.probability);

  return {
    potentialDiseases: matchedDiseases.slice(0, 5),
    recommendations: [
      "Consult with a healthcare professional for accurate diagnosis",
      "Keep track of symptom progression and duration",
      "Note any additional symptoms that develop",
      "Avoid self-medication without professional guidance",
      "Seek emergency care if symptoms worsen significantly",
    ],
    disclaimer:
      "This analysis is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.",
  };
}

export function analyzeHealthForm(formData: {
  age: number;
  gender: string;
  weight: number;
  height: number;
  bloodPressure: string;
  symptoms: string[];
  medications: string[];
  allergies: string[];
  familyHistory: string[];
}): {
  healthScore: number;
  riskFactors: string[];
  medicines: Array<{ name: string; purpose: string; dosage: string }>;
  procedures: Array<{ name: string; reason: string; urgency: string }>;
  lifestyleTips: string[];
} {
  const bmiResult = calculateBMI(formData.weight, formData.height);
  const geneticRisk = analyzeGeneticRisk(
    formData.symptoms,
    formData.familyHistory,
    formData.age,
    formData.gender,
  );

  let healthScore = 100;
  const riskFactors: string[] = [];

  if (bmiResult.riskLevel === "High") {
    healthScore -= 20;
    riskFactors.push(`Obesity (BMI: ${bmiResult.bmi})`);
  } else if (bmiResult.riskLevel === "Moderate") {
    healthScore -= 10;
    riskFactors.push(`Overweight (BMI: ${bmiResult.bmi})`);
  }

  if (formData.symptoms.length > 3) {
    healthScore -= 15;
    riskFactors.push("Multiple symptoms present");
  }

  if (formData.familyHistory.length > 2) {
    healthScore -= 10;
    riskFactors.push("Significant family history of diseases");
  }

  const bpValues = formData.bloodPressure.split("/");
  const systolic = parseInt(bpValues[0]);
  if (systolic > 140) {
    healthScore -= 15;
    riskFactors.push("High blood pressure");
  } else if (systolic > 130) {
    healthScore -= 10;
    riskFactors.push("Elevated blood pressure");
  }

  healthScore = Math.max(0, Math.min(100, healthScore));

  const medicines: Array<{ name: string; purpose: string; dosage: string }> =
    [];
  const procedures: Array<{ name: string; reason: string; urgency: string }> =
    [];

  if (healthScore < 50) {
    medicines.push({
      name: "Multivitamin Complex",
      purpose: "General health and immune support",
      dosage: "1 tablet daily with breakfast",
    });
    if (riskFactors.includes("High blood pressure")) {
      medicines.push({
        name: "Lisinopril",
        purpose: "Blood pressure management",
        dosage: "10mg once daily",
      });
    }
    if (riskFactors.some((r) => r.includes("Overweight"))) {
      medicines.push({
        name: "Metformin",
        purpose: "Blood sugar management",
        dosage: "500mg twice daily",
      });
    }
  }

  if (
    formData.symptoms.includes("chest pain") ||
    formData.symptoms.includes("shortness of breath")
  ) {
    procedures.push({
      name: "ECG (Electrocardiogram)",
      reason: "Cardiac function assessment",
      urgency: "High - Within 24 hours",
    });
    procedures.push({
      name: "Blood Test Panel",
      reason: "Cardiac markers and general health",
      urgency: "High - Within 24 hours",
    });
  }

  if (healthScore < 40) {
    procedures.push({
      name: "Complete Physical Examination",
      reason: "Comprehensive health assessment",
      urgency: "Medium - Within 1 week",
    });
  }

  if (formData.age > 45) {
    procedures.push({
      name: "Annual Screening",
      reason: "Age-appropriate health screening",
      urgency: "Low - Routine",
    });
  }

  const lifestyleTips = [
    "Maintain a balanced diet with fruits, vegetables, and lean proteins",
    "Aim for at least 150 minutes of moderate exercise per week",
    "Get 7-9 hours of quality sleep each night",
    "Reduce stress through meditation or yoga",
    "Limit alcohol consumption and avoid smoking",
    "Stay hydrated with at least 8 glasses of water daily",
    "Have regular health check-ups",
  ];

  if (bmiResult.riskLevel !== "Low") {
    lifestyleTips.push("Work with a nutritionist for personalized diet plan");
  }

  return {
    healthScore,
    riskFactors,
    medicines,
    procedures,
    lifestyleTips,
  };
}

export function generateAIChatResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Exercise-related questions
  if (
    lowerMessage.includes("exercise") ||
    lowerMessage.includes("workout") ||
    lowerMessage.includes("fitness") ||
    lowerMessage.includes("physical activity") ||
    lowerMessage.includes("benefits of exercise")
  ) {
    return "Regular exercise is crucial for health! It improves cardiovascular health, strengthens muscles, boosts metabolism, and enhances mental well-being. Aim for at least 150 minutes of moderate-intensity exercise per week, including cardio, strength training, and flexibility work. Start slowly and gradually increase intensity to avoid injury.";
  }

  // Sleep-related questions
  if (
    lowerMessage.includes("sleep") ||
    lowerMessage.includes("insomnia") ||
    lowerMessage.includes("improve sleep") ||
    lowerMessage.includes("sleep quality")
  ) {
    return "Sleep is essential for health! Most adults need 7-9 hours nightly. Tips to improve sleep: maintain a consistent schedule, avoid screens 30 minutes before bed, keep your bedroom cool and dark, avoid caffeine after 2 PM, and try relaxation techniques like meditation or deep breathing. Consult a doctor if you have persistent sleep problems.";
  }

  // Diet and nutrition questions
  if (
    lowerMessage.includes("diet") ||
    lowerMessage.includes("nutrition") ||
    lowerMessage.includes("eat") ||
    lowerMessage.includes("food") ||
    lowerMessage.includes("healthy diet")
  ) {
    return "A balanced diet is fundamental for health! Include: whole grains, lean proteins (fish, chicken, legumes), plenty of fruits and vegetables, healthy fats (olive oil, nuts), and limit sugar and processed foods. Stay hydrated with 8-10 glasses of water daily. Remember, moderation and variety are key. Consider consulting a nutritionist for personalized guidance.";
  }

  // Stress management
  if (
    lowerMessage.includes("stress") ||
    lowerMessage.includes("anxiety") ||
    lowerMessage.includes("tension") ||
    lowerMessage.includes("manage stress") ||
    lowerMessage.includes("stressed")
  ) {
    return "Managing stress is vital for overall health. Effective techniques include: meditation and mindfulness, regular exercise, deep breathing exercises, yoga, journaling, spending time in nature, and socializing. Maintain work-life balance, set boundaries, and don't hesitate to seek professional help if stress becomes overwhelming. Remember, self-care is not selfish!";
  }

  // Weight and BMI questions
  if (
    lowerMessage.includes("weight") ||
    lowerMessage.includes("bmi") ||
    lowerMessage.includes("overweight") ||
    lowerMessage.includes("weight loss") ||
    lowerMessage.includes("lose weight")
  ) {
    return "Weight management involves a combination of proper nutrition, regular exercise, and healthy lifestyle habits. Focus on sustainable changes rather than quick fixes. Try our BMI Calculator tool to assess your current status. A healthy approach combines calorie balance, nutritious food choices, regular physical activity, and adequate sleep. Consider working with a healthcare provider for personalized guidance.";
  }

  // Disease prevention and screening
  if (
    lowerMessage.includes("prevent") ||
    lowerMessage.includes("screening") ||
    lowerMessage.includes("check-up") ||
    lowerMessage.includes("checkup") ||
    lowerMessage.includes("medical care")
  ) {
    return "Disease prevention through regular check-ups is crucial! Adults should have annual health screenings appropriate for their age and risk factors. Prevention strategies include: maintaining healthy weight, exercising regularly, eating nutritious food, avoiding smoking and excess alcohol, managing stress, and getting vaccinations. Early detection of diseases often leads to better outcomes. Try our Health Analyzer tool for comprehensive health assessment.";
  }

  // Mental health questions
  if (
    lowerMessage.includes("mental health") ||
    lowerMessage.includes("depression") ||
    lowerMessage.includes("anxiety") ||
    lowerMessage.includes("mental") ||
    lowerMessage.includes("emotional health")
  ) {
    return "Mental health is as important as physical health. Key steps: seek professional help if needed, practice mindfulness and meditation, maintain social connections, exercise regularly, get adequate sleep, and manage stress. Don't hesitate to talk to a therapist or counselor. Our Mental Health Assessment tool can help you evaluate your emotional well-being and get personalized recommendations.";
  }

  // General health improvement
  if (
    lowerMessage.includes("health") ||
    lowerMessage.includes("healthy") ||
    lowerMessage.includes("wellness") ||
    lowerMessage.includes("improve health")
  ) {
    return "To improve your overall health, focus on these key areas: regular exercise (150+ min/week), balanced nutrition (fruits, vegetables, lean proteins), 7-9 hours of sleep, stress management, hydration, and regular health check-ups. Avoid smoking and limit alcohol. Consistency is more important than perfection. Our various tools like Health Analyzer and Genetic Analyzer can provide personalized insights.";
  }

  // Greeting and general questions
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("help") ||
    lowerMessage.includes("what can you do")
  ) {
    return "Hello! I'm your AI Health Assistant. I can help you with questions about exercise, nutrition, sleep, stress management, weight management, disease prevention, and general wellness. I can also guide you to our specialized tools like BMI Calculator, Health Analyzer, and Genetic Disease Analyzer. What health topic would you like to explore?";
  }

  // Default response for unrecognized questions
  return "That's an interesting health question! While I can provide general wellness guidance, please remember that personal medical advice should come from qualified healthcare professionals. Our platform offers several tools like Health Analyzer and Genetic Disease Analyzer that can provide more detailed assessments. Would you like to learn about these tools, or do you have other health questions?";
}
