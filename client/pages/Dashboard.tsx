import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface HealthMetric {
  date: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  weight: number;
  steps: number;
  sleepHours: number;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    { date: "Day 1", heartRate: 72, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, weight: 75, steps: 8000, sleepHours: 7 },
    { date: "Day 2", heartRate: 70, bloodPressureSystolic: 118, bloodPressureDiastolic: 78, weight: 74.8, steps: 9200, sleepHours: 7.5 },
    { date: "Day 3", heartRate: 75, bloodPressureSystolic: 122, bloodPressureDiastolic: 82, weight: 75.1, steps: 7500, sleepHours: 6.5 },
    { date: "Day 4", heartRate: 68, bloodPressureSystolic: 119, bloodPressureDiastolic: 79, weight: 74.9, steps: 10000, sleepHours: 8 },
    { date: "Day 5", heartRate: 72, bloodPressureSystolic: 121, bloodPressureDiastolic: 81, weight: 75, steps: 8500, sleepHours: 7.5 },
    { date: "Day 6", heartRate: 71, bloodPressureSystolic: 120, bloodPressureDiastolic: 80, weight: 74.7, steps: 9500, sleepHours: 7 },
    { date: "Day 7", heartRate: 73, bloodPressureSystolic: 123, bloodPressureDiastolic: 82, weight: 75.2, steps: 8200, sleepHours: 7.5 },
  ]);

  const [newMetric, setNewMetric] = useState({
    heartRate: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    weight: "",
    steps: "",
    sleepHours: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMetric = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: HealthMetric = {
      date: `Day ${metrics.length + 1}`,
      heartRate: parseInt(newMetric.heartRate) || 0,
      bloodPressureSystolic: parseInt(newMetric.bloodPressureSystolic) || 0,
      bloodPressureDiastolic: parseInt(newMetric.bloodPressureDiastolic) || 0,
      weight: parseFloat(newMetric.weight) || 0,
      steps: parseInt(newMetric.steps) || 0,
      sleepHours: parseFloat(newMetric.sleepHours) || 0,
    };

    setMetrics([...metrics, newEntry]);
    setNewMetric({
      heartRate: "",
      bloodPressureSystolic: "",
      bloodPressureDiastolic: "",
      weight: "",
      steps: "",
      sleepHours: "",
    });
    setShowAddForm(false);
  };

  const calculateAverages = () => {
    return {
      heartRate: (metrics.reduce((sum, m) => sum + m.heartRate, 0) / metrics.length).toFixed(1),
      weight: (metrics.reduce((sum, m) => sum + m.weight, 0) / metrics.length).toFixed(1),
      steps: (metrics.reduce((sum, m) => sum + m.steps, 0) / metrics.length).toFixed(0),
      sleepHours: (metrics.reduce((sum, m) => sum + m.sleepHours, 0) / metrics.length).toFixed(1),
    };
  };

  const calculateTrends = () => {
    if (metrics.length < 2) return { weight: "stable", heartRate: "stable", steps: "stable" };
    
    const first = metrics[0];
    const last = metrics[metrics.length - 1];
    
    return {
      weight: last.weight > first.weight ? "increasing" : last.weight < first.weight ? "decreasing" : "stable",
      heartRate: last.heartRate > first.heartRate ? "increasing" : last.heartRate < first.heartRate ? "decreasing" : "stable",
      steps: last.steps > first.steps ? "increasing" : last.steps < first.steps ? "decreasing" : "stable",
    };
  };

  const healthScoreBreakdown = [
    { name: "Physical Activity", value: 75 },
    { name: "Sleep Quality", value: 80 },
    { name: "Heart Health", value: 85 },
    { name: "Weight Management", value: 70 },
  ];

  const COLORS = ["#00BFA6", "#10b981", "#3b82f6", "#f59e0b"];

  const averages = calculateAverages();
  const trends = calculateTrends();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">📈 Health Dashboard</h1>
              <p className="text-muted-foreground">
                Track your health metrics over time and see AI-powered pattern analysis
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary hover:bg-primary/90"
            >
              {showAddForm ? "Cancel" : "+ Add Metric"}
            </Button>
          </div>

          {/* Add Metric Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg border border-border p-6 mb-8">
              <form onSubmit={handleAddMetric} className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Heart Rate (bpm)</label>
                    <input
                      type="number"
                      value={newMetric.heartRate}
                      onChange={(e) => setNewMetric({ ...newMetric, heartRate: e.target.value })}
                      className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 72"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">BP Systolic</label>
                    <input
                      type="number"
                      value={newMetric.bloodPressureSystolic}
                      onChange={(e) => setNewMetric({ ...newMetric, bloodPressureSystolic: e.target.value })}
                      className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 120"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">BP Diastolic</label>
                    <input
                      type="number"
                      value={newMetric.bloodPressureDiastolic}
                      onChange={(e) => setNewMetric({ ...newMetric, bloodPressureDiastolic: e.target.value })}
                      className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 80"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newMetric.weight}
                      onChange={(e) => setNewMetric({ ...newMetric, weight: e.target.value })}
                      className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 75"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Steps</label>
                    <input
                      type="number"
                      value={newMetric.steps}
                      onChange={(e) => setNewMetric({ ...newMetric, steps: e.target.value })}
                      className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 8000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Sleep (hours)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newMetric.sleepHours}
                      onChange={(e) => setNewMetric({ ...newMetric, sleepHours: e.target.value })}
                      className="w-full border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 7.5"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Save Metric
                </Button>
              </form>
            </div>
          )}

          {/* Health Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="text-muted-foreground text-sm mb-2">❤️ Avg Heart Rate</div>
              <div className="text-3xl font-bold">{averages.heartRate} bpm</div>
              <div className={`text-xs mt-2 ${trends.heartRate === "increasing" ? "text-warning" : "text-success"}`}>
                {trends.heartRate === "increasing" ? "↑ Increasing" : trends.heartRate === "decreasing" ? "↓ Decreasing" : "→ Stable"}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-6">
              <div className="text-muted-foreground text-sm mb-2">⚖️ Avg Weight</div>
              <div className="text-3xl font-bold">{averages.weight} kg</div>
              <div className={`text-xs mt-2 ${trends.weight === "decreasing" ? "text-success" : trends.weight === "increasing" ? "text-warning" : "text-muted-foreground"}`}>
                {trends.weight === "decreasing" ? "↓ Decreasing" : trends.weight === "increasing" ? "↑ Increasing" : "→ Stable"}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-6">
              <div className="text-muted-foreground text-sm mb-2">👟 Avg Steps</div>
              <div className="text-3xl font-bold">{averages.steps}</div>
              <div className={`text-xs mt-2 ${trends.steps === "increasing" ? "text-success" : "text-muted-foreground"}`}>
                {trends.steps === "increasing" ? "↑ Increasing" : trends.steps === "decreasing" ? "↓ Decreasing" : "→ Stable"}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-6">
              <div className="text-muted-foreground text-sm mb-2">😴 Avg Sleep</div>
              <div className="text-3xl font-bold">{averages.sleepHours} h</div>
              <div className="text-xs mt-2 text-muted-foreground">
                {parseFloat(averages.sleepHours) >= 7 ? "Good" : parseFloat(averages.sleepHours) >= 6 ? "Fair" : "Poor"}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Heart Rate Chart */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold mb-4">Heart Rate Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="#00BFA6"
                    dot={{ fill: "#00BFA6" }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Weight Trend */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold mb-4">Weight Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[74, 76]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#f59e0b"
                    dot={{ fill: "#f59e0b" }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Steps Chart */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold mb-4">Daily Steps</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="steps" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Health Score Breakdown */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold mb-4">Health Score Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={healthScoreBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {healthScoreBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Sleep Quality Chart */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold mb-4">Sleep Hours</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sleepHours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Blood Pressure Chart */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-bold mb-4">Blood Pressure</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bloodPressureSystolic"
                    stroke="#ef4444"
                    dot={{ fill: "#ef4444" }}
                    name="Systolic"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="bloodPressureDiastolic"
                    stroke="#06b6d4"
                    dot={{ fill: "#06b6d4" }}
                    name="Diastolic"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">🤖 AI-Powered Insights</h3>
            <div className="space-y-2">
              <p className="text-sm">
                ✅ <strong>Physical Activity:</strong> Your daily steps are above average. Keep up the good work with your exercise routine!
              </p>
              <p className="text-sm">
                ✅ <strong>Sleep Quality:</strong> Your sleep duration is healthy. Maintaining this routine is excellent for your overall health.
              </p>
              <p className="text-sm">
                ⚠️ <strong>Heart Rate:</strong> Your heart rate is within normal range. Continue monitoring for any significant changes.
              </p>
              <p className="text-sm">
                ✅ <strong>Weight Management:</strong> Your weight is stable. Maintain your current diet and exercise routine.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
