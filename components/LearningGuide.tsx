import React from 'react';
import { ArrowRight, Info, Target } from 'lucide-react';

const LearningGuide: React.FC<{ onStartPractice: () => void }> = ({ onStartPractice }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Body Composition Basics</h1>
        <p className="text-lg text-slate-600">
          Understanding how to calculate body fat mass and fat-free mass from a fat mass percentage gained from a <strong>bio-electrical impedance device</strong>.
        </p>
      </div>

      {/* Activity Aim */}
      <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-xl">
        <h3 className="flex items-center gap-2 font-bold text-primary-900 text-lg mb-2">
            <Target className="w-5 h-5 text-primary-600" />
            Activity Aim
        </h3>
        <p className="text-primary-800 leading-relaxed">
            To calculate <strong>Fat Mass</strong> and <strong>Fat-Free Mass</strong> from a given fat mass percentage as gained from a bio-electrical impedance device.
        </p>
      </div>

      {/* Concept Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Steps to Calculate Mass Composition</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-blue-200 text-blue-600 font-bold text-sm shadow-sm">1</div>
                <p className="text-slate-700 pt-1">
                  Convert the body fat percentage to a decimal by moving the decimal point two places to the left.
                </p>
              </div>
              
              <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-blue-200 text-blue-600 font-bold text-sm shadow-sm">2</div>
                <p className="text-slate-700 pt-1">
                  Calculate the fat mass by multiplying the total body weight by the body fat percentage (as a decimal).
                </p>
              </div>

              <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-blue-200 text-blue-600 font-bold text-sm shadow-sm">3</div>
                <p className="text-slate-700 pt-1">
                  Calculate the fat-free mass by subtracting the fat mass from the total body weight.
                </p>
              </div>
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
                  <span className="text-slate-600">Total Weight:</span>
                  <span className="font-bold text-slate-900 text-lg">75 kg</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-600">Body Fat %:</span>
                  <span className="font-bold text-slate-900 text-lg">22%</span>
                </div>
                <div className="mt-2 text-xs text-slate-400 border-t border-slate-100 pt-2">
                    Source: Bio-Electrical Impedance
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Step 1 & 2: Find Fat Mass</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                  <p className="mb-1 text-slate-500">// Convert 22% to decimal</p>
                  <p className="mb-2">22 ÷ 100 = 0.22</p>
                  <p className="mb-1 text-slate-500">// Weight × Decimal</p>
                  <p>75 kg × 0.22 = <strong className="text-blue-600">16.5 kg</strong> (Body Fat Mass)</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Step 3: Find Fat-Free Mass</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                  <p className="mb-1 text-slate-500">// Weight - Fat Mass</p>
                  <p>75 kg - 16.5 kg = <strong className="text-emerald-600">58.5 kg</strong> (Fat-Free Mass)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          I'm ready to practise
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LearningGuide;