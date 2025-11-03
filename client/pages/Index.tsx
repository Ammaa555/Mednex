import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  const features = [
    {
      icon: "🧬",
      title: "Genetic Disease Detection",
      description:
        "AI-powered analysis of genetic markers to identify inherited diseases and predispositions early",
      link: "/genetic-analyzer",
      bgColor: "from-primary/20 to-primary/10",
      featured: true,
    },
    {
      icon: "📊",
      title: "Health Tracker",
      description:
        "Comprehensive health analysis, BMI calculator, symptom checker, and health form for AI-powered predictions",
      link: "/health-tracker",
      bgColor: "from-accent/20 to-accent/10",
      featured: true,
    },
    {
      icon: "💬",
      title: "AI Health Chat",
      description:
        "Interactive chatbot to answer health questions and provide instant wellness guidance",
      link: "/ai-chat",
      bgColor: "from-secondary/20 to-secondary/10",
      featured: true,
    },
    {
      icon: "⚖️",
      title: "BMI Calculator",
      description:
        "Calculate your Body Mass Index with personalized exercises, food recommendations, and health risks",
      link: "/bmi-calculator",
      bgColor: "from-success/20 to-success/10",
      featured: false,
    },
    {
      icon: "🩺",
      title: "Health Analyzer",
      description:
        "Comprehensive health analysis with AI-powered disease risk assessment and treatment suggestions",
      link: "/health-analyzer",
      bgColor: "from-warning/20 to-warning/10",
      featured: false,
    },
    {
      icon: "📈",
      title: "Health Dashboard",
      description:
        "Track your health metrics over time and see AI-powered pattern analysis",
      link: "/dashboard",
      bgColor: "from-surface/20 to-surface/10",
      featured: false,
    },
  ];

  const stats = [
    {
      number: "7-8 Years",
      label: "Average diagnostic journey reduced to minutes",
    },
    { number: "4 Billion", label: "People gaining access to specialist care" },
    { number: "50K+", label: "Preventable misdiagnoses avoided yearly" },
    { number: "90%", label: "Cost reduction in healthcare delivery" },
  ];

  const featuredFeatures = features.filter((f) => f.featured);
  const otherFeatures = features.filter((f) => !f.featured);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary via-secondary to-accent text-white min-h-screen flex items-center justify-center py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Welcome to Mednex
            </h1>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Revolutionary AI-powered health analysis combining genetic disease
              detection, personalized health tracking, and intelligent wellness
              guidance
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/health-tracker">
                <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  📊 Get Health Analysis
                </Button>
              </Link>
              <Link to="/genetic-analyzer">
                <Button className="bg-white/20 text-white hover:bg-white/30 border border-white text-lg px-8 py-6 font-semibold">
                  🧬 Genetic Analyzer
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Main Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredFeatures.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  <div
                    className={`bg-gradient-to-br ${feature.bgColor} rounded-lg p-8 border border-border hover:shadow-lg transition-all duration-300 h-full cursor-pointer hover:-translate-y-1`}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      Explore →
                    </Button>
                  </div>
                </Link>
              ))}
            </div>

            {/* Additional Features */}
            {otherFeatures.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-center mb-8 text-muted-foreground">
                  Additional Tools & Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherFeatures.map((feature, index) => (
                    <Link key={index} to={feature.link}>
                      <div
                        className={`bg-gradient-to-br ${feature.bgColor} rounded-lg p-6 border border-border hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1`}
                      >
                        <div className="text-3xl mb-3">{feature.icon}</div>
                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-surface/30 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              Platform Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-8 border border-border text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Input Data",
                  description:
                    "Provide your health information, genetic data, or voice recording",
                },
                {
                  step: 2,
                  title: "AI Analysis",
                  description:
                    "Our advanced AI analyzes your data for disease markers and health patterns",
                },
                {
                  step: 3,
                  title: "Risk Assessment",
                  description:
                    "Receive detailed risk scores and health predictions",
                },
                {
                  step: 4,
                  title: "Recommendations",
                  description:
                    "Get personalized treatment and lifestyle recommendations",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Start your personalized health journey with Mednex today. Get
              instant AI-powered insights into your health status.
            </p>
            <Link to="/health-tracker">
              <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                Get Started Now →
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            &copy; 2025 Mednex - AI-Powered Health Platform. Revolutionizing
            healthcare through artificial intelligence.
          </p>
          <p className="text-sm opacity-75 mt-2">
            For informational purposes only. Always consult with healthcare
            professionals for medical advice.
          </p>
        </div>
      </footer>
    </>
  );
}
