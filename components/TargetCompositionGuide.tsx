import React from 'react';
import { ArrowRight, Target, TrendingDown, Scale } from 'lucide-react';

const TargetCompositionGuide: React.FC<{ onStartPractice: () => void }> = ({ onStartPractice }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Target Body Mass Calculation</h1>
        <p className="text-lg text-slate-600">
          Learn how to calculate the goal body mass required to reach a specific body fat percentage without losing muscle.
        </p>
      </div>

      {/* Activity Aim */}
      <div className="bg-rose-50 border-l-4 border-rose-500 p-6 rounded-r-xl">
        <h3 className="flex items-center gap-2 font-bold text-rose-900 text-lg mb-2">
            <Target className="w-5 h-5 text-rose-600" />
            Activity Aim
        </h3>
        <p className="text-rose-800 leading-relaxed">
            To calculate the <strong>Target Body Mass</strong> required to achieve a desired Body Fat Percentage, assuming Fat-Free Mass remains constant.
        </p>
      </div>

      {/* Concept Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="bg-rose-100 p-3 rounded-lg flex-shrink-0">
            <Target className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">The "Fixed FFM" Principle</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              When a client wants to lower their body fat percentage, we assume their goal is to lose <strong>Fat Mass</strong> while maintaining their <strong>Fat-Free Mass (FFM)</strong> (muscle, bone, etc.).
              <br/><br/>
              Because the total body mass will decrease as fat is lost, we cannot simply subtract the percentages. We must use the FFM as a constant to find the new Total Body Mass.
            </p>
            
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg">
              <h3 className="font-bold text-rose-900 mb-2">The Formula</h3>
              <div className="font-mono text-sm md:text-base text-rose-800 bg-white/50 p-3 rounded border border-rose-100 mb-2">
                Target Body Mass = Current FFM ÷ (1 - Goal Body Fat % as decimal)
              </div>
              <p className="text-xs text-rose-700">
                <em>Note: (1 - Goal BF%) represents the "Goal Lean Mass %".</em>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Worked Example */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">Worked Example</h3>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 space-y-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-1">Client Profile</div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-slate-600">Current Mass:</span>
                  <span className="font-bold text-slate-900 text-lg">90 kg</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-slate-600">Current BF%:</span>
                  <span className="font-bold text-slate-900 text-lg">30%</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 mt-2">
                  <span className="text-slate-600 font-semibold">Goal BF%:</span>
                  <span className="font-bold text-emerald-600 text-lg">20%</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Step 1: Calculate Current FFM</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                  <p className="mb-1 text-slate-500">// Fat Mass = 90kg * 0.30 = 27kg</p>
                  <p>90kg - 27kg = <strong className="text-indigo-600">63 kg</strong> (Current FFM)</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Step 2: Calculate Target Body Mass</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                  <p className="mb-1 text-slate-500">// Goal is 20% Fat, so Goal Lean Mass is 80% (0.80)</p>
                  <p className="mb-1 text-slate-500">// Target Mass = FFM ÷ Goal Lean %</p>
                  <p>63kg ÷ 0.80 = <strong className="text-emerald-600">78.75 kg</strong></p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-2">Step 3: Calculate Required Loss</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                  <p className="mb-1 text-slate-500">// Current Mass - Target Mass</p>
                  <p>90kg - 78.75kg = <strong className="text-rose-600">11.25 kg</strong> (Total Mass to lose)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Start Learner Activity
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TargetCompositionGuide;