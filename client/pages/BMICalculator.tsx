import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { calculateBMI } from "@/utils/ai-helpers";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [results, setResults] = useState<null | ReturnType<typeof calculateBMI>>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    let weightKg = parseFloat(weight);
    let heightM = parseFloat(height);

    // Convert to metric if needed (height should be in meters, not squared)
    if (unit === "imperial") {
      weightKg = parseFloat(weight) * 0.453592; // lbs to kg
      heightM = parseFloat(height) * 0.3048; // feet to meters
    } else {
      heightM = heightM / 100; // cm to meters
    }

    const result = calculateBMI(weightKg, heightM);
    setResults(result);
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setResults(null);
  };

  const bmiChart = [
    { range: "Below 18.5", category: "Underweight", color: "text-primary" },
    { range: "18.5 - 24.9", category: "Normal Weight", color: "text-success" },
    { range: "25.0 - 29.9", category: "Overweight", color: "text-warning" },
    { range: "30.0+", category: "Obese", color: "text-danger" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">⚖️ BMI Calculator</h1>
          <p className="text-muted-foreground mb-12">
            Calculate your Body Mass Index and get personalized health recommendations
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-8 sticky top-24">
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3">Unit System</label>
                    <div className="flex gap-4">
                      {[
                        { value: "metric" as const, label: "Metric (kg, cm)" },
                        { value: "imperial" as const, label: "Imperial (lbs, feet)" },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value={option.value}
                            checked={unit === option.value}
                            onChange={() => setUnit(option.value)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Weight ({unit === "metric" ? "kg" : "lbs"})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your weight"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Height ({unit === "metric" ? "cm" : "feet"})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter your height"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                      Calculate BMI
                    </Button>
                    <Button
                      type="button"
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1"
                    >
                      Reset
                    </Button>
                  </div>
                </form>

                {/* BMI Chart */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-bold mb-4">BMI Categories</h3>
                  <div className="space-y-3">
                    {bmiChart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold">{item.category}</p>
                          <p className="text-xs text-muted-foreground">{item.range}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              {results ? (
                <div className="space-y-6">
                  {/* BMI Result Card */}
                  <div className="bg-white rounded-lg border border-border p-8">
                    <h2 className="text-2xl font-bold mb-6">Your BMI Results</h2>

                    <div className={`text-center p-8 rounded-lg border-2 mb-6 ${
                      results.riskLevel === "Low"
                        ? "border-success bg-success/10"
                        : results.riskLevel === "Moderate"
                        ? "border-warning bg-warning/10"
                        : "border-danger bg-danger/10"
                    }`}>
                      <div className="text-5xl font-bold mb-2">{results.bmi}</div>
                      <div className="text-xl font-semibold mb-2">{results.category}</div>
                      <div className={`text-sm font-semibold ${
                        results.riskLevel === "Low"
                          ? "text-success"
                          : results.riskLevel === "Moderate"
                          ? "text-warning"
                          : "text-danger"
                      }`}>
                        {results.riskLevel} Risk
                      </div>
                    </div>

                    <div className="bg-accent/10 border border-accent rounded-lg p-4">
                      <p className="text-sm font-medium">{results.healthStatus}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground">Daily Calories</p>
                        <p className="text-lg font-bold text-primary">{results.dailyCalories.min} - {results.dailyCalories.max}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Protein (g/day)</p>
                        <p className="text-lg font-bold text-primary">{results.proteinGrams}g</p>
                      </div>
                    </div>
                  </div>

                  {/* Exercises */}
                  <div className="bg-white rounded-lg border border-border p-8">
                    <h3 className="text-xl font-bold mb-4">💪 Recommended Exercises</h3>
                    <ul className="space-y-2">
                      {results.exercises.map((exercise, index) => (
                        <li key={index} className="flex gap-3 p-3 bg-success/10 rounded-lg">
                          <span className="text-success font-bold">✓</span>
                          <span className="text-sm">{exercise}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Foods */}
                  <div className="bg-white rounded-lg border border-border p-8">
                    <h3 className="text-xl font-bold mb-4">🥗 Recommended Foods</h3>
                    <ul className="space-y-2">
                      {results.foods.map((food, index) => (
                        <li key={index} className="flex gap-3 p-3 bg-primary/5 rounded-lg">
                          <span className="text-primary font-bold">•</span>
                          <span className="text-sm">{food}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Health Risks */}
                  {results.healthRisks.length > 0 && (
                    <div className="bg-white rounded-lg border border-border p-8">
                      <h3 className="text-xl font-bold mb-4">⚠️ Health Risks to Monitor</h3>
                      {results.healthRisks[0] === "Minimal health risks - maintain current habits" ? (
                        <div className="p-4 bg-success/10 border border-success rounded-lg">
                          <p className="text-sm font-medium text-success">{results.healthRisks[0]}</p>
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {results.healthRisks.map((risk, index) => (
                            <li key={index} className="flex gap-3 p-3 bg-danger/10 rounded-lg">
                              <span className="text-danger font-bold">•</span>
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-border p-12">
                  <p className="text-muted-foreground text-center py-12">
                    Enter your weight and height on the left to calculate your BMI and get personalized recommendations for exercises, foods, and health management.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
