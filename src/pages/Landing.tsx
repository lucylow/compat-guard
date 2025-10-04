import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Code, GitBranch, Users, Zap, RefreshCw, Rocket, PlayCircle, Download, Calendar } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-card border-b border-border z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">CompatGuard</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">Features</a>
            <a href="#frameworks" className="text-foreground hover:text-primary transition-colors font-medium">Frameworks</a>
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">Dashboard</Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/" className="px-4 py-2 text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
              Sign In
            </Link>
            <button className="px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Get Started Free
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-4">
                New: Baseline 2024 Support
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Your framework's best friend for safe web feature adoption
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                CompatGuard eliminates compatibility anxiety by integrating real-time Baseline checking directly into your development workflow. Stop guessing, start building with confidence.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Get Started Free
                </button>
                <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="bg-muted px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-sm text-muted-foreground">Component.jsx</span>
                </div>
                <div className="p-6 bg-card font-mono text-sm">
                  <div className="text-secondary">// CompatGuard protects your code in real-time</div>
                  <div className="text-foreground">import React from 'react';</div>
                  <div className="mt-2 text-foreground">function MyComponent() {'{'}</div>
                  <div className="text-foreground ml-4">return (</div>
                  <div className="text-muted-foreground ml-8">&lt;div className="container"&gt;</div>
                  <div className="text-secondary ml-12">{'<!-- ✅ Baseline 2022 -->'}</div>
                  <div className="text-muted-foreground ml-12">&lt;div className="grid"&gt;...&lt;/div&gt;</div>
                  <div className="text-accent ml-12">{'<!-- ⚠️ Newly Available -->'}</div>
                  <div className="text-muted-foreground ml-12">&lt;dialog open&gt;...&lt;/dialog&gt;</div>
                  <div className="text-muted-foreground ml-8">&lt;/div&gt;</div>
                  <div className="text-foreground ml-4">);</div>
                  <div className="text-foreground">{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Why CompatGuard is your framework's best friend</h2>
            <p className="text-xl text-muted-foreground">We protect your code at every stage of development</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8" />,
                title: "Real-Time Protection",
                desc: "Get instant feedback in your IDE with inline warnings and smart suggestions before compatibility issues reach production."
              },
              {
                icon: <GitBranch className="w-8 h-8" />,
                title: "Framework-Aware Analysis",
                desc: "CompatGuard understands React, Vue, Svelte, and more, providing context-specific guidance for your preferred framework."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "CI/CD Integration",
                desc: "Automatically block problematic commits and deployments with our seamless GitHub Actions, GitLab CI, and Jenkins integration."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Team Compliance",
                desc: "Ensure everyone on your team follows the same compatibility standards with customizable Baseline targets and reporting."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Performance Optimized",
                desc: "Our intelligent caching and incremental analysis ensure CompatGuard works seamlessly without slowing down your workflow."
              },
              {
                icon: <RefreshCw className="w-8 h-8" />,
                title: "Automated Updates",
                desc: "As web standards evolve, CompatGuard automatically updates its knowledge base, keeping your projects future-proof."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center text-primary-foreground mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section id="frameworks" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Works with your favorite frameworks</h2>
            <p className="text-xl text-muted-foreground">CompatGuard speaks your framework's language</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "React", desc: "JSX analysis, Hook compatibility, Next.js integration" },
              { name: "Vue.js", desc: "Template parsing, Composition API, Nuxt.js support" },
              { name: "Svelte", desc: "Compile-time checks, Action validation, SvelteKit ready" },
              { name: "Angular", desc: "Template analysis, Directive checking, Ivy compiler" }
            ].map((framework, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4 text-primary">⚛️</div>
                <h3 className="font-semibold text-lg mb-2">{framework.name}</h3>
                <p className="text-sm text-muted-foreground">{framework.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Start building with confidence today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of developers who trust CompatGuard to protect their projects from compatibility issues.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-background text-primary rounded-lg font-semibold hover:bg-muted transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Install Now
            </button>
            <button className="px-6 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground hover:text-primary transition-all flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-1 after:bg-primary">
                CompatGuard
              </h3>
              <p className="text-muted-foreground">Your framework's best friend for safe web feature adoption.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-1 after:bg-primary">
                Product
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Releases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-1 after:bg-primary">
                Company
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-1 after:bg-primary">
                Connect
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
            <p>&copy; 2024 CompatGuard. All rights reserved. | Built with ❤️ for the web community</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
