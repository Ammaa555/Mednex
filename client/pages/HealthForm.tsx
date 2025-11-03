import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { analyzeSymptoms, HealthAnalysisResult, assessMentalHealth } from "@/utils/ai-helpers";
import VoiceRecorder from "@/components/VoiceRecorder";

export default function HealthForm() {
  const [activeTab, setActiveTab] = useState("symptoms");
  const [results, setResults] = useState<null | {
    symptoms: ReturnType<typeof analyzeSymptoms>;
    mental?: HealthAnalysisResult;
  }>(null);

  const [symptomsForm, setSymptomsForm] = useState({
    symptoms: "" as string,
    duration: "",
    severity: "",
    onsetDate: "",
  });

  const [mentalHealthForm, setMentalHealthForm] = useState({
    mood: 5,
    energy: 5,
    sleep: 5,
    stressors: [] as string[],
    additionalNotes: "",
  });

  const stressorOptions = [
    "Work/School Stress",
    "Relationship Issues",
    "Financial Problems",
    "Health Concerns",
    "Loss of Loved One",
    "Major Life Change",
  ];

  const isHealthTrackerPath = window.location.pathname === "/health-tracker";

  const handleSymptomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const symptomsList = symptomsForm.symptoms
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);

    if (symptomsList.length === 0) {
      alert("Please enter at least one symptom");
      return;
    }

    const analysisResult = analyzeSymptoms(symptomsList);
    setResults({ symptoms: analysisResult });
  };

  const handleMentalHealthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = assessMentalHealth(
      mentalHealthForm.mood,
      mentalHealthForm.energy,
      mentalHealthForm.sleep,
      mentalHealthForm.stressors
    );

    setResults({
      symptoms: { potentialDiseases: [], recommendations: [], disclaimer: "" },
      mental: result,
    });
  };

  const handleStressorToggle = (stressor: string) => {
    setMentalHealthForm((prev) => ({
      ...prev,
      stressors: prev.stressors.includes(stressor)
        ? prev.stressors.filter((s) => s !== stressor)
        : [...prev.stressors, stressor],
    }));
  };

  const handleReset = () => {
    setSymptomsForm({
      symptoms: "",
      duration: "",
      severity: "",
      onsetDate: "",
    });
    setMentalHealthForm({
      mood: 5,
      energy: 5,
      sleep: 5,
      stressors: [],
      additionalNotes: "",
    });
    setResults(null);
    setActiveTab("symptoms");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">
            {isHealthTrackerPath ? "📊 Health Tracker" : "📋 Health Form"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isHealthTrackerPath
              ? "Comprehensive health analysis including symptom checking, mental health assessment, BMI calculator, and health analyzer"
              : "Fill detailed symptom and health form for AI-powered health predictions"}
          </p>

          {!results ? (
            <div className="space-y-8">
              {/* Tabs */}
              <div className="flex gap-4 border-b border-border">
                {[
                  { id: "symptoms", label: "Symptom Checker" },
                  { id: "mental", label: "Mental Health Assessment" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 px-4 font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Symptom Checker */}
              {activeTab === "symptoms" && (
                <div className="space-y-6">
                  <VoiceRecorder
                    label="Describe Your Symptoms"
                    placeholder="Tell us about your symptoms..."
                    displayTranscription={true}
                  />

                  <form onSubmit={handleSymptomSubmit} className="bg-white rounded-lg border border-border p-8 space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Symptoms (comma-separated)
                      </label>
                      <textarea
                        value={symptomsForm.symptoms}
                        onChange={(e) => setSymptomsForm({ ...symptomsForm, symptoms: e.target.value })}
                        className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Fever, Cough, Sore throat"
                        rows={4}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter symptoms separated by commas (e.g., chest pain, shortness of breath, dizziness)
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Duration
                        </label>
                        <select
                          value={symptomsForm.duration}
                          onChange={(e) => setSymptomsForm({ ...symptomsForm, duration: e.target.value })}
                          className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select Duration</option>
                          <option>Less than 24 hours</option>
                          <option>1-7 days</option>
                          <option>1-2 weeks</option>
                          <option>2-4 weeks</option>
                          <option>More than a month</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Severity
                        </label>
                        <select
                          value={symptomsForm.severity}
                          onChange={(e) => setSymptomsForm({ ...symptomsForm, severity: e.target.value })}
                          className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select Severity</option>
                          <option>Mild</option>
                          <option>Moderate</option>
                          <option>Severe</option>
                          <option>Very Severe</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Onset Date
                        </label>
                        <input
                          type="date"
                          value={symptomsForm.onsetDate}
                          onChange={(e) => setSymptomsForm({ ...symptomsForm, onsetDate: e.target.value })}
                          className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6">
                      🔍 Analyze Symptoms
                    </Button>
                  </form>
                </div>
              )}

              {/* Mental Health Assessment */}
              {activeTab === "mental" && (
                <div className="space-y-6">
                  <VoiceRecorder
                    label="Describe Your Mental Health"
                    placeholder="Tell us how you're feeling..."
                    displayTranscription={true}
                  />

                  <form onSubmit={handleMentalHealthSubmit} className="bg-white rounded-lg border border-border p-8 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-4">
                          Mood (1-10)
                        </label>
                        <div className="flex gap-4 items-center">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={mentalHealthForm.mood}
                            onChange={(e) => setMentalHealthForm({ ...mentalHealthForm, mood: parseInt(e.target.value) })}
                            className="flex-1 cursor-pointer"
                          />
                          <span className="text-lg font-semibold text-primary w-8">{mentalHealthForm.mood}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-4">
                          Energy Level (1-10)
                        </label>
                        <div className="flex gap-4 items-center">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={mentalHealthForm.energy}
                            onChange={(e) => setMentalHealthForm({ ...mentalHealthForm, energy: parseInt(e.target.value) })}
                            className="flex-1 cursor-pointer"
                          />
                          <span className="text-lg font-semibold text-primary w-8">{mentalHealthForm.energy}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-4">
                          Sleep Quality (1-10)
                        </label>
                        <div className="flex gap-4 items-center">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={mentalHealthForm.sleep}
                            onChange={(e) => setMentalHealthForm({ ...mentalHealthForm, sleep: parseInt(e.target.value) })}
                            className="flex-1 cursor-pointer"
                          />
                          <span className="text-lg font-semibold text-primary w-8">{mentalHealthForm.sleep}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Life Stressors
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {stressorOptions.map((stressor) => (
                          <label key={stressor} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={mentalHealthForm.stressors.includes(stressor)}
                              onChange={() => handleStressorToggle(stressor)}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">{stressor}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={mentalHealthForm.additionalNotes}
                        onChange={(e) => setMentalHealthForm({ ...mentalHealthForm, additionalNotes: e.target.value })}
                        className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Any additional information you'd like to share..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6">
                      🧠 Get Mental Health Assessment
                    </Button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Symptom Analysis Results */}
              {results.symptoms.potentialDiseases.length > 0 && (
                <div className="bg-white rounded-lg border border-border p-8">
                  <h2 className="text-2xl font-bold mb-6">🔍 Symptom Analysis Results</h2>

                  <div className="space-y-4 mb-6">
                    {results.symptoms.potentialDiseases.map((disease, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          disease.probability > 70
                            ? "bg-danger/10 border-danger"
                            : disease.probability > 40
                            ? "bg-warning/10 border-warning"
                            : "bg-success/10 border-success"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold">{disease.name}</div>
                          <div className="text-sm font-bold">{disease.probability}%</div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Severity: <span className="font-medium">{disease.severity}</span>
                        </p>
                        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${
                              disease.probability > 70
                                ? "bg-danger"
                                : disease.probability > 40
                                ? "bg-warning"
                                : "bg-success"
                            }`}
                            style={{ width: `${disease.probability}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mental Health Results */}
              {results.mental && (
                <div className="bg-white rounded-lg border border-border p-8">
                  <h2 className="text-2xl font-bold mb-6">🧠 Mental Health Assessment Results</h2>

                  <div className={`p-6 rounded-lg border-2 mb-6 ${
                    results.mental.riskClass === "success"
                      ? "bg-success/10 border-success"
                      : results.mental.riskClass === "warning"
                      ? "bg-warning/10 border-warning"
                      : "bg-danger/10 border-danger"
                  }`}>
                    <div className="text-3xl font-bold mb-2">{results.mental.riskLevel}</div>
                    <div className={`text-lg font-semibold ${
                      results.mental.riskClass === "success"
                        ? "text-success"
                        : results.mental.riskClass === "warning"
                        ? "text-warning"
                        : "text-danger"
                    }`}>
                      Overall Score: {results.mental.overallScore}/10
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent rounded-lg p-4">
                    <h3 className="font-semibold mb-3">🎯 Recommendations</h3>
                    <ul className="space-y-2">
                      {results.mental.recommendations.map((rec, index) => (
                        <li key={index} className="flex gap-2 text-sm">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-white rounded-lg border border-border p-8">
                <h3 className="text-xl font-bold mb-4">📋 General Recommendations</h3>
                <ul className="space-y-2">
                  {results.symptoms.recommendations.map((rec, index) => (
                    <li key={index} className="flex gap-2 text-sm p-2 hover:bg-primary/5 rounded transition-colors">
                      <span className="text-primary">✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-warning/10 border border-warning rounded-lg p-6">
                <p className="text-sm text-foreground">
                  <strong>⚠️ Disclaimer:</strong> {results.symptoms.disclaimer}
                </p>
              </div>

              <Button onClick={handleReset} className="w-full bg-primary hover:bg-primary/90 py-6">
                Start New Assessment
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
