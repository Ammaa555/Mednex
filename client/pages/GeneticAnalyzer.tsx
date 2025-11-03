import Header from "@/components/Header";
import VoiceRecorder from "@/components/VoiceRecorder";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { analyzeGeneticRisk, DiseaseRisk } from "@/utils/ai-helpers";

export default function GeneticAnalyzer() {
  const [activeTab, setActiveTab] = useState("genetic-input");
  const [results, setResults] = useState<null | {
    diseases: DiseaseRisk[];
    overallRisk: number;
    recommendations: string[];
  }>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: [] as string[],
    familyHistory: [] as string[],
  });

  const symptomOptions = [
    "Heart Disease",
    "Cancer",
    "Diabetes",
    "Alzheimer's",
    "Huntington's Disease",
    "Sickle Cell Disease",
    "Cystic Fibrosis",
    "Tay-Sachs Disease",
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // Simulate file processing
      setTimeout(() => {
        alert(
          `File "${file.name}" uploaded successfully! File size: ${(file.size / 1024).toFixed(2)} KB`,
        );
      }, 500);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      "geneticFileInput",
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const handleAnalyzeGenetics = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(formData.age) || 30;
    const result = analyzeGeneticRisk(
      formData.symptoms,
      formData.familyHistory,
      age,
      formData.gender,
    );
    setResults(result);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">
            🧬 Genetic Disease Analyzer
          </h1>
          <p className="text-muted-foreground mb-8">
            Advanced AI-powered analysis of genetic markers and family history
            to identify disease predispositions
          </p>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-border mb-8 flex-wrap">
            {[
              { id: "genetic-input", label: "Genetic Analysis" },
              { id: "family-history", label: "Family History" },
              { id: "risk-assessment", label: "Risk Assessment" },
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

          {/* Genetic Input Tab */}
          {activeTab === "genetic-input" && (
            <div className="space-y-6">
              <VoiceRecorder
                label="Voice Input - Describe Genetic Information"
                displayTranscription={true}
              />

              <div className="bg-white rounded-lg border border-border p-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Upload Genetic Data File
                  </label>
                  <input
                    id="geneticFileInput"
                    type="file"
                    accept=".vcf,.fasta,.txt,.csv,.bam,.fastq"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-surface rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    {uploadedFileName ? (
                      <>
                        <p className="text-primary font-semibold">
                          ✅ File Uploaded
                        </p>
                        <small className="text-sm text-muted-foreground block mt-2">
                          {uploadedFileName}
                        </small>
                        <small className="text-xs text-muted-foreground block mt-1">
                          Click to change file
                        </small>
                      </>
                    ) : (
                      <>
                        <p className="text-muted-foreground">
                          📁 Click to upload genetic data file
                        </p>
                        <small className="text-xs text-muted-foreground block mt-2">
                          Supported formats: VCF, FASTA, TXT, CSV, BAM, FASTQ
                        </small>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Or Enter Genetic Sequence
                  </label>
                  <textarea
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter DNA sequence (e.g., ATCGATCGATCG...)"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Analysis Type
                  </label>
                  <select className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Comprehensive Disease Panel</option>
                    <option>Cancer Predisposition</option>
                    <option>Cardiovascular Diseases</option>
                    <option>Neurological Disorders</option>
                    <option>Metabolic Disorders</option>
                  </select>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  🔬 Analyze Genetic Data
                </Button>
              </div>
            </div>
          )}

          {/* Family History Tab */}
          {activeTab === "family-history" && (
            <form onSubmit={handleAnalyzeGenetics} className="space-y-6">
              <div className="bg-white rounded-lg border border-border p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Age"
                      min="0"
                      max="120"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-4">
                    Family History of Diseases
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {symptomOptions.map((symptom) => (
                      <label
                        key={symptom}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.familyHistory.includes(symptom)}
                          onChange={() => handleFamilyHistoryToggle(symptom)}
                          className="w-4 h-4 rounded border-border cursor-pointer"
                        />
                        <span className="text-sm">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Current Symptoms
                  </label>
                  <textarea
                    className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe any current symptoms or health concerns"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  📊 Assess Genetic Risk
                </Button>
              </div>
            </form>
          )}

          {/* Risk Assessment Tab */}
          {activeTab === "risk-assessment" && (
            <div className="space-y-6">
              {results ? (
                <>
                  <div className="bg-white rounded-lg border border-border p-8">
                    <h3 className="text-2xl font-bold mb-6">
                      🔬 Genetic Analysis Results
                    </h3>

                    <div className="mb-8">
                      <div className="text-lg font-semibold mb-2">
                        Overall Genetic Risk Score
                      </div>
                      <div className="w-full bg-border rounded-full h-3 overflow-hidden mb-2">
                        <div
                          className={`h-full transition-all ${
                            results.overallRisk > 70
                              ? "bg-danger"
                              : results.overallRisk > 40
                                ? "bg-warning"
                                : "bg-success"
                          }`}
                          style={{ width: `${results.overallRisk}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {results.overallRisk}% -{" "}
                        {results.overallRisk > 70
                          ? "High Risk"
                          : results.overallRisk > 40
                            ? "Moderate Risk"
                            : "Low Risk"}
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <h4 className="font-semibold">Disease Risk Breakdown:</h4>
                      {results.diseases.map((disease, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            disease.color === "success"
                              ? "bg-success/10 border-success text-success"
                              : disease.color === "warning"
                                ? "bg-warning/10 border-warning text-warning"
                                : "bg-danger/10 border-danger text-danger"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-semibold">{disease.name}</div>
                            <div className="font-bold">
                              {disease.percentage}%
                            </div>
                          </div>
                          <div className="w-full bg-border rounded-full h-2 overflow-hidden mb-2">
                            <div
                              className={`h-full ${
                                disease.color === "success"
                                  ? "bg-success"
                                  : disease.color === "warning"
                                    ? "bg-warning"
                                    : "bg-danger"
                              }`}
                              style={{ width: `${disease.percentage}%` }}
                            />
                          </div>
                          <p className="text-sm opacity-75">
                            {disease.recommendation}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-accent/10 border border-accent rounded-lg p-4">
                      <h4 className="font-semibold mb-3">🎯 Recommendations</h4>
                      <ul className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <span className="text-primary">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={() => setResults(null)}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Results
                  </Button>
                </>
              ) : (
                <div className="bg-white rounded-lg border border-border p-12 text-center">
                  <p className="text-muted-foreground">
                    Complete genetic analysis or family history assessment to
                    see risk results here.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
