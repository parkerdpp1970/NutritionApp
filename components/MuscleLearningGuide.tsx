import React from 'react';
import { ArrowRight, Info, BicepsFlexed, Target } from 'lucide-react';

const MuscleLearningGuide: React.FC<{ onStartPractice: () => void }> = ({ onStartPractice }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Estimating Muscle Mass</h1>
        <p className="text-lg text-slate-600">
          Learn how to estimate skeletal muscle mass based on fat-free mass and calculate its proportion to total body mass.
        </p>
      </div>

      {/* Activity Aim */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl">
        <h3 className="flex items-center gap-2 font-bold text-indigo-900 text-lg mb-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Activity Aim
        </h3>
        <p className="text-indigo-800 leading-relaxed">
            To estimate <strong>Skeletal Muscle Mass</strong> (in kg) from Fat-Free Mass and express it as a <strong>percentage</strong> of Total Body Mass.
        </p>
      </div>

      {/* Concept Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-100 p-3 rounded-lg flex-shrink-0">
            <BicepsFlexed className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Steps to Calculate Muscle Mass</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-indigo-200 text-indigo-600 font-bold text-sm shadow-sm">1</div>
                <div>
                  <p className="text-slate-700 font-medium">Calculate Fat-Free Mass (FFM)</p>
                  <p className="text-sm text-slate-500">Subtract Fat Mass from Total Body Mass (as learned previously).</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-indigo-200 text-indigo-600 font-bold text-sm shadow-sm">2</div>
                <div>
                  <p className="text-slate-700 font-medium">Estimate Skeletal Muscle Mass (SMM)</p>
                  <p className="text-sm text-slate-500 mb-2">Multiply FFM by the gender-specific factor:</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside ml-2">
                    <li><strong>Men:</strong> 49% - 50% (Multiply by 0.49 or 0.50)</li>
                    <li><strong>Women:</strong> 41% - 45% (Multiply by 0.41 - 0.45)</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-indigo-200 text-indigo-600 font-bold text-sm shadow-sm">3</div>
                <div>
                  <p className="text-slate-700 font-medium">Calculate % of Total Body Mass</p>
                  <p className="text-sm text-slate-500">
                    (Skeletal Muscle Mass ÷ Total Body Mass) × 100
                  </p>
                </div>
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
                  <span className="text-slate-600">Gender:</span>
                  <span className="font-bold text-slate-900 text-lg">Male</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-slate-600">Total Mass:</span>
                  <span className="font-bold text-slate-900 text-lg">80 kg</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-600">Body Fat:</span>
                  <span className="font-bold text-slate-900 text-lg">20%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>Since the client is Male, we will use <strong>50%</strong> (0.50) as our estimation factor for Step 2.</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Step 1: Find Fat-Free Mass (FFM)</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                  <p className="mb-1 text-slate-500">// Fat Mass = 80kg * 0.20 = 16kg</p>
                  <p>80kg - 16kg = <strong className="text-indigo-600">64 kg</strong> (FFM)</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Step 2: Estimate Muscle Mass</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                  <p className="mb-1 text-slate-500">// FFM * 0.50 (Male factor)</p>
                  <p>64kg * 0.50 = <strong className="text-indigo-600">32 kg</strong> (Skeletal Muscle Mass)</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-2">Step 3: Calculate % of Total Mass</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                  <p className="mb-1 text-slate-500">// (Muscle Mass ÷ Total Mass) * 100</p>
                  <p>(32 ÷ 80) * 100 = <strong className="text-emerald-600">40%</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Start Learner Activity
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MuscleLearningGuide;