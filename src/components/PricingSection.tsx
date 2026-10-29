import React from 'react';
import { Check, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-24 relative bg-[#07090E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simple, Transparent Plans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Free for Students. Powerful for <span className="text-gradient-cyan">College Clubs</span>.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Choose the tier that matches your campus ambition. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 relative flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'glass-panel-accent border-cyan-500/50 shadow-2xl shadow-cyan-950/60 lg:-translate-y-2'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-[11px] font-mono font-bold text-white shadow-lg shadow-cyan-500/30 uppercase tracking-wider">
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-slate-800">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    / {plan.period}
                  </span>
                </div>

                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    Included Features:
                  </p>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-400 mt-0.5 flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                id={`select-${plan.id}-btn`}
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-3.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:scale-[1.02] text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
