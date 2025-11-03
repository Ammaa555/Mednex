import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { analyzeHealthForm } from "@/utils/ai-helpers";
import VoiceRecorder from "@/components/VoiceRecorder";

export default function HealthAnalyzer() {
  const [results, setResults] = useState<null | ReturnType<typeof analyzeHealthForm>>(null);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    bloodPressure: "",
    symptoms: [] as string[],
    medications: "",
    allergies: "",
    familyHistory: [] as string[],
  });

  const symptomOptions = [
    "Fever",
    "Cough",
    "Chest pain",
    "Fatigue",
    "Headache",
    "Joint pain",
    "Shortness of breath",
    "Dizziness",
    "Sore throat",
    "Nausea",
  ];

  const familyHistoryOptions = [
    "Heart Disease",
    "Diabetes",
    "Cancer",
    "Stroke",
    "Hypertension",
    "Thyroid Disease",
    "Kidney Disease",
    "Arthritis",
  ];

  const handleSymptomToggle = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleFamilyHistoryToggle = (disease: string) => {
    setFormData((prev) => ({
      ...prev,
      familyHistory: prev.familyHistory.includes(disease)
        ? prev.familyHistory.filter((d) => d !== disease)
        : [...prev.familyHistory, disease],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weight = parseFloat(formData.weight) || 0;
    const height = parseFloat(formData.height) || 0;
    const age = parseInt(formData.age) || 0;

    const analysisData = {
      age,
      gender: formData.gender,
      weight,
      height: height / 100,
      bloodPressure: formData.bloodPressure,
      symptoms: formData.symptoms,
      medications: formData.medications.split(",").filter((m) => m.trim()),
      allergies: formData.allergies.split(",").filter((a) => a.trim()),
      familyHistory: formData.familyHistory,
    };

    const analysisResult = analyzeHealthForm(analysisData);
    setResults(analysisResult);
  };

  const handleReset = () => {
    setFormData({
      age: "",
      gender: "",
      weight: "",
      height: "",
      bloodPressure: "",
      symptoms: [],
      medications: "",
      allergies: "",
      familyHistory: [],
    });
    setResults(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">📊 Health Analyzer</h1>
          <p className="text-muted-foreground mb-8">
            Comprehensive health analysis with AI-powered disease risk assessment and treatment suggestions
          </p>

          {!results ? (
            <div className="space-y-8">
              {/* Voice Input */}
              <VoiceRecorder
                label="Voice Input - Describe Your Health Concerns"
                displayTranscription={true}
              />

              {/* Health Form */}
              <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Age"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Weight"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Height (cm)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Height"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Blood Pressure (e.g., 120/80)</label>
                  <input
                    type="text"
                    value={formData.bloodPressure}
                    onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Systolic/Diastolic"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Current Symptoms</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {symptomOptions.map((symptom) => (
                      <label key={symptom} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.symptoms.includes(symptom)}
                          onChange={() => handleSymptomToggle(symptom)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Current Medications (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.medications}
                    onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Aspirin, Metformin, Lisinopril"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Allergies (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Penicillin, Peanuts, Shellfish"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Family History</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {familyHistoryOptions.map((disease) => (
                      <label key={disease} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.familyHistory.includes(disease)}
                          onChange={() => handleFamilyHistoryToggle(disease)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{disease}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6">
                  📊 Analyze Health
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Health Score */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-4">Your Health Score</h2>
                <div className="text-6xl font-bold mb-2">{results.healthScore}/100</div>
                <p className="text-lg opacity-90">
                  {results.healthScore >= 80
                    ? "Excellent health status"
                    : results.healthScore >= 60
                    ? "Good health with some concerns"
                    : results.healthScore >= 40
                    ? "Moderate health concerns"
                    : "Serious health concerns - Professional consultation recommended"}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Factors */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="text-xl font-bold mb-4">⚠️ Risk Factors Identified</h3>
                  {results.riskFactors.length > 0 ? (
                    <ul className="space-y-2">
                      {results.riskFactors.map((factor, index) => (
                        <li key={index} className="flex gap-2 p-3 bg-danger/10 border border-danger/30 rounded-lg text-sm">
                          <span className="text-danger">●</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No significant risk factors identified</p>
                  )}
                </div>

                {/* Lifestyle Tips */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="text-xl font-bold mb-4">💡 Lifestyle Tips</h3>
                  <ul className="space-y-2">
                    {results.lifestyleTips.slice(0, 5).map((tip, index) => (
                      <li key={index} className="flex gap-2 text-sm">
                        <span className="text-success">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Medications */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-xl font-bold mb-4">💊 Recommended Medicines</h3>
                {results.medicines.length > 0 ? (
                  <div className="space-y-3">
                    {results.medicines.map((medicine, index) => (
                      <div key={index} className="p-4 bg-accent/10 border border-accent rounded-lg">
                        <div className="font-semibold text-foreground">{medicine.name}</div>
                        <p className="text-sm text-muted-foreground mt-1">{medicine.purpose}</p>
                        <p className="text-sm font-medium text-primary mt-1">Dosage: {medicine.dosage}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No medications currently recommended. Continue monitoring and healthy lifestyle.</p>
                )}
              </div>

              {/* Procedures */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h3 className="text-xl font-bold mb-4">🏥 Recommended Procedures & Tests</h3>
                {results.procedures.length > 0 ? (
                  <div className="space-y-3">
                    {results.procedures.map((procedure, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          procedure.urgency.includes("High")
                            ? "bg-danger/10 border-danger"
                            : procedure.urgency.includes("Medium")
                            ? "bg-warning/10 border-warning"
                            : "bg-success/10 border-success"
                        }`}
                      >
                        <div className="font-semibold text-foreground">{procedure.name}</div>
                        <p className="text-sm text-muted-foreground mt-1">{procedure.reason}</p>
                        <p className={`text-sm font-medium mt-1 ${
                          procedure.urgency.includes("High")
                            ? "text-danger"
                            : procedure.urgency.includes("Medium")
                            ? "text-warning"
                            : "text-success"
                        }`}>
                          {procedure.urgency}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No additional procedures recommended at this time.</p>
                )}
              </div>

              {/* Disclaimer */}
              <div className="bg-warning/10 border border-warning rounded-lg p-6">
                <p className="text-sm text-foreground">
                  <strong>⚠️ Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
              </div>

              <Button onClick={handleReset} className="w-full bg-primary hover:bg-primary/90 py-6">
                Start New Analysis
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
