import React from 'react';
import { ArrowRight, Info, TrendingUp, Scale, ArrowLeftRight, Target } from 'lucide-react';

const CompositionChangeGuide: React.FC<{ onStartPractice: () => void }> = ({ onStartPractice }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Analysing Composition Changes</h1>
        <p className="text-lg text-slate-600">
          Learn how to interpret changes in client data over time to understand what is happening physiologically (Fat vs. Fat-Free Mass).
        </p>
      </div>

      {/* Activity Aim */}
      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
        <h3 className="flex items-center gap-2 font-bold text-emerald-900 text-lg mb-2">
            <Target className="w-5 h-5 text-emerald-600" />
            Activity Aim
        </h3>
        <p className="text-emerald-800 leading-relaxed">
            To analyse changes in body composition over time by comparing initial and final <strong>Fat Mass</strong> and <strong>Fat-Free Mass</strong>, rather than relying solely on Total Body Mass.
        </p>
      </div>

      {/* Concept Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
            <ArrowLeftRight className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Total Weight Can Be Deceiving</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              A common mistake is to only look at total body weight. A client's weight might stay exactly the same, but their body composition could change drastically (e.g., losing fat while gaining muscle).
              <br/><br/>
              To accurately assess progress, you must calculate the <strong>Mass (kg)</strong> of each component at both the start and end of the period.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                  <h3 className="font-bold text-slate-700 mb-1">Weight Loss</h3>
                  <p className="text-xs text-slate-500">Usually involves loss of both Fat and some FFM.</p>
               </div>
               <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 text-center">
                  <h3 className="font-bold text-emerald-800 mb-1">Recomposition</h3>
                  <p className="text-xs text-emerald-700">Stable weight. Fat goes down, FFM goes up.</p>
               </div>
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-center">
                  <h3 className="font-bold text-slate-700 mb-1">Weight Gain</h3>
                  <p className="text-xs text-slate-500">Ideally involves maximizing FFM gain while minimizing Fat gain.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Worked Example */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">Worked Example: The "Stable Weight" Scenario</h3>
        </div>
        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Initial State */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm relative">
              <span className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-bl-lg">WEEK 1</span>
              <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-3">Initial Measurements</div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-slate-600">Total Mass:</span>
                <span className="font-bold text-slate-900 text-lg">80 kg</span>
              </div>
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-slate-600">Body Fat %:</span>
                <span className="font-bold text-slate-900 text-lg">25%</span>
              </div>
              <div className="pt-3 border-t border-slate-100 text-sm space-y-1">
                <div className="flex justify-between">
                   <span className="text-slate-500">Fat Mass:</span>
                   <span className="font-mono text-slate-700">20.0 kg</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">Fat-Free Mass:</span>
                   <span className="font-mono text-slate-700">60.0 kg</span>
                </div>
              </div>
            </div>

            {/* Final State */}
            <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm ring-1 ring-emerald-500/20 relative">
               <span className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-bl-lg">WEEK 12</span>
              <div className="text-sm text-emerald-600 uppercase tracking-wide font-semibold mb-3">Post-Period Measurements</div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-slate-600">Total Mass:</span>
                <span className="font-bold text-slate-900 text-lg">80 kg</span>
              </div>
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-slate-600">Body Fat %:</span>
                <span className="font-bold text-emerald-600 text-lg">20%</span>
              </div>
              <div className="pt-3 border-t border-slate-100 text-sm space-y-1">
                <div className="flex justify-between">
                   <span className="text-slate-500">Fat Mass:</span>
                   <span className="font-mono text-emerald-700 font-bold">16.0 kg</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">Fat-Free Mass:</span>
                   <span className="font-mono text-emerald-700 font-bold">64.0 kg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
             <h4 className="font-bold text-slate-900 mb-2">Analysis of Changes</h4>
             <div className="space-y-2 text-sm md:text-base">
                <p className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                   <span>Total Weight Change: <strong>0 kg</strong></span>
                </p>
                <p className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                   <span>Fat Mass Change: 16kg - 20kg = <strong className="text-emerald-600">-4 kg (Loss)</strong></span>
                </p>
                <p className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                   <span>Fat-Free Mass Change: 64kg - 60kg = <strong className="text-emerald-600">+4 kg (Gain)</strong></span>
                </p>
                <p className="mt-3 text-slate-600 italic border-t border-slate-200 pt-3">
                   "The client maintained their body weight but successfully lost 4kg of body fat and replaced it with 4kg of fat-free mass."
                </p>
             </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Start Learner Activity
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CompositionChangeGuide;