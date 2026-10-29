import React, { useState } from 'react';
import { Sparkles, Users, RefreshCw, CheckCircle, Trophy, Code, Cpu, Wand2, ShieldCheck, Star } from 'lucide-react';
import { HackathonGenerationResult, TeamMemberCandidate } from '../types';

export const InteractiveGenerators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'teambuilder'>('generator');

  // Generator State
  const [topic, setTopic] = useState('Autonomous AI Agents & Climate Resilience');
  const [targetCollege, setTargetCollege] = useState('IIT Bombay & Stanford Students');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<HackathonGenerationResult | null>({
    theme: 'Autonomous AI Agents & Climate Resilience 2026',
    problemStatements: [
      'Design a multi-agent AI system that predicts hyper-local flash flood risks using satellite telemetry and sensor streams.',
      'Build a lightweight LLM agent running on low-power campus hardware to optimize energy consumption across college dormitories.',
      'Develop an AI agent that automatically audits open-source supply chains for carbon footprint and security vulnerabilities.'
    ],
    tracks: ['Green AI Architecture', 'Satellite Telemetry Agents', 'Campus CleanTech Innovation'],
    evaluationCriteria: [
      { criteria: 'Technical AI Complexity', weight: '35%' },
      { criteria: 'Environmental Impact Potential', weight: '30%' },
      { criteria: 'Code Cleanliness & Documentation', weight: '20%' },
      { criteria: 'Pitch & Demo Polish', weight: '15%' }
    ],
    suggestedDuration: '36-Hour Continuous Sprint',
    recommendedSponsors: ['Google Cloud', 'NVIDIA AI', 'ClimateTech Capital', 'Elevate Hive Ventures']
  });

  // Team Builder State
  const [selectedRole, setSelectedRole] = useState('AI / ML Research Lead');
  const [searchSkill, setSearchSkill] = useState('PyTorch');

  const candidates: TeamMemberCandidate[] = [
    {
      name: 'Rohan Deshmukh',
      college: 'IIT Bombay',
      role: 'AI / ML Research Lead',
      topSkills: ['PyTorch', 'Transformers', 'CUDA', 'Python'],
      synergyScore: 98,
      githubStars: 420,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Sophia Patel',
      college: 'Stanford University',
      role: 'Full-Stack & React Engineer',
      topSkills: ['React 19', 'TypeScript', 'Node.js', 'Tailwind'],
      synergyScore: 96,
      githubStars: 310,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
    },
    {
      name: 'Karthik Raja',
      college: 'BITS Pilani',
      role: 'Backend & Cloud Architect',
      topSkills: ['Go', 'Docker', 'Kubernetes', 'PostgreSQL'],
      synergyScore: 94,
      githubStars: 285,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    }
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedPlan({
        theme: `${topic} Hackathon 2026`,
        problemStatements: [
          `Build a production-ready AI solution targeting ${topic} with instant inference latency (<200ms).`,
          `Create a cross-platform dashboard that synthesizes complex datasets for ${targetCollege} researchers.`,
          `Develop an autonomous multi-modal agent capable of end-to-end task execution in ${topic}.`
        ],
        tracks: [`${topic} Core Track`, 'Open Innovation Track', 'Best Student MVP'],
        evaluationCriteria: [
          { criteria: 'Innovation & Originality', weight: '35%' },
          { criteria: 'Technical Execution', weight: '30%' },
          { criteria: 'Market Viability & Scalability', weight: '20%' },
          { criteria: 'User Interface & UX', weight: '15%' }
        ],
        suggestedDuration: '48-Hour Hybrid Sprint',
        recommendedSponsors: ['Google Cloud AI', 'OpenAI Ecosystem Fund', 'Y Combinator Partner Fund']
      });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <section id="solutions" className="py-20 relative bg-[#090D16] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Live Playground</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Experience the <span className="text-gradient-cyan">Elevate Hive AI Engines</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Try generating a full college hackathon specification or search for high-synergy teammates in real-time below.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl glass-panel border-slate-800 gap-2">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'generator'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI Hackathon Generator
            </button>
            <button
              onClick={() => setActiveTab('teambuilder')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'teambuilder'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-4 h-4" />
              AI Team Matcher
            </button>
          </div>
        </div>

        {/* Generator View */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Box */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border-slate-800 space-y-5">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Configure College Sprint
              </h3>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Hackathon Theme or Domain
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. HealthTech, Web3, Generative AI"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Target Student Audience
                  </label>
                  <input
                    type="text"
                    value={targetCollege}
                    onChange={(e) => setTargetCollege(e.target.value)}
                    placeholder="e.g. IIT Bombay, NITs, BITS, Ivy League"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      Synthesizing AI Rubrics...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 text-white" />
                      Generate Hackathon Blueprint
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Generated Plan Output Box */}
            <div className="lg:col-span-7 glass-panel-accent p-6 sm:p-8 rounded-2xl border-cyan-500/30 space-y-6">
              {generatedPlan && (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                        Generated Blueprint
                      </span>
                      <h4 className="text-xl font-display font-bold text-white">
                        {generatedPlan.theme}
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {generatedPlan.suggestedDuration}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono text-slate-300 mb-2 flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-cyan-400" />
                      AI Problem Statements
                    </h5>
                    <div className="space-y-2">
                      {generatedPlan.problemStatements.map((statement, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                          <span className="font-mono text-cyan-400 font-bold">0{idx + 1}.</span>
                          <span>{statement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <h5 className="text-xs font-mono text-slate-300 mb-2">Evaluation Rubric</h5>
                      <div className="space-y-1.5">
                        {generatedPlan.evaluationCriteria.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs p-2 rounded bg-slate-900/60 text-slate-300">
                            <span>{item.criteria}</span>
                            <span className="font-mono text-cyan-400 font-bold">{item.weight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-mono text-slate-300 mb-2">Target Sponsors</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {generatedPlan.recommendedSponsors.map((sponsor, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
                            {sponsor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        )}

        {/* Team Builder View */}
        {activeTab === 'teambuilder' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Filter By Skill:</span>
                {['PyTorch', 'React 19', 'TypeScript', 'Go', 'CUDA'].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSearchSkill(skill)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      searchSkill === skill
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> 2,400 Verified Student Profiles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {candidates.map((candidate, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border-slate-800 space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/40"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-display font-bold text-white text-base">{candidate.name}</h4>
                        <p className="text-xs text-purple-300 font-mono">{candidate.college}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-400 block">Synergy</span>
                      <span className="text-sm font-bold text-emerald-400">{candidate.synergyScore}%</span>
                    </div>
                  </div>

                  <div className="text-xs font-medium text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                    Role: <span className="text-white font-semibold">{candidate.role}</span>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-slate-400 mb-1.5">Top Tech Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.topSkills.map((s, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 text-xs font-semibold transition-all">
                    Invite to Hackathon Squad
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
