
import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Play, Send, Calculator, RotateCcw, Zap, X, Table2, Camera } from 'lucide-react';
import { ProblemData, AssessmentResult } from '../types';
import { gradeEnergyExpenditureSubmission } from '../services/geminiService';

// Activity Multipliers Map
const ACTIVITY_LEVELS = [
  { label: "Sedentary (desk job, little exercise)", multiplier: 1.2 },
  { label: "Lightly Active (exercise 1-3 days/week)", multiplier: 1.375 },
  { label: "Moderately Active (exercise 3-5 days/week)", multiplier: 1.55 },
  { label: "Very Active (exercise 6-7 days/week)", multiplier: 1.725 },
  { label: "Extra Active (physical job & hard exercise)", multiplier: 1.9 }
];

const generateProblem = (): ProblemData => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const weight = Math.floor(Math.random() * (110 - 55 + 1)) + 55;
  const height = Math.floor(Math.random() * (195 - 155 + 1)) + 155;
  const age = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
  
  // Random activity level
  const activityData = ACTIVITY_LEVELS[Math.floor(Math.random() * ACTIVITY_LEVELS.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    weightKg: weight,
    heightCm: height,
    age: age,
    gender: gender,
    bodyFatPercentage: 0, // Not needed for Mifflin-St Jeor
    difficulty: 'medium',
    activityLevel: activityData.label,
    activityMultiplier: activityData.multiplier
  };
};

const EnergyExpenditureActivity: React.FC = () => {
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [working, setWorking] = useState('');
  const [bmrInput, setBmrInput] = useState('');
  const [tdeeInput, setTdeeInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [activeModal, setActiveModal] = useState<'equation' | 'multipliers' | null>(null);

  useEffect(() => {
    setProblem(generateProblem());
  }, []);

  const nextButtonLabel = useMemo(() => {
    const labels = ["Give it Another Shot", "New Attempt", "Practise Again", "Next Challenge", "Try Another One", "New Client Profile"];
    return labels[Math.floor(Math.random() * labels.length)];
  }, [result]);

  const handleNextProblem = () => {
    setProblem(generateProblem());
    setWorking('');
    setBmrInput('');
    setTdeeInput('');
    setResult(null);
  };

  const handleRetryCurrent = () => {
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!problem) return;
    if (!working.trim() || !bmrInput || !tdeeInput) {
      alert("Please fill in BMR, TDEE and show your working.");
      return;
    }

    setIsSubmitting(true);
    try {
      const assessment = await gradeEnergyExpenditureSubmission(problem, {
        problemId: problem.id,
        working,
        calculatedBMR: bmrInput,
        calculatedTDEE: tdeeInput
      });
      setResult(assessment);
    } catch (e) {
      console.error(e);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) return <div className="p-12 text-center">Loading activity...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 relative">
      
      {/* Reference Modals */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          >
             <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  {activeModal === 'equation' ? <Calculator className="w-5 h-5 text-amber-600"/> : <Zap className="w-5 h-5 text-emerald-600"/>}
                  {activeModal === 'equation' ? 'Mifflin-St Jeor Equation' : 'Activity Multipliers'}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>
             
             <div className="p-6 overflow-y-auto max-h-[70vh]">
               {activeModal === 'equation' ? (
                 <div className="space-y-6">
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 relative overflow-hidden">
                        <div className="absolute right-0 top-0 p-4 opacity-10 pointer-events-none"><Calculator className="w-24 h-24 text-blue-600" /></div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide block mb-2">For Men</span>
                        <p className="font-mono text-lg text-slate-800 font-medium leading-relaxed relative z-10">
                          (10 × weight) + (6.25 × height) - (5 × age) <span className="text-blue-600 font-bold bg-white px-2 py-0.5 rounded border border-blue-100 shadow-sm ml-1">+ 5</span>
                        </p>
                    </div>
                    <div className="bg-rose-50 p-5 rounded-xl border border-rose-100 relative overflow-hidden">
                         <div className="absolute right-0 top-0 p-4 opacity-10 pointer-events-none"><Calculator className="w-24 h-24 text-rose-600" /></div>
                        <span className="text-xs font-bold text-rose-600 uppercase tracking-wide block mb-2">For Women</span>
                        <p className="font-mono text-lg text-slate-800 font-medium leading-relaxed relative z-10">
                          (10 × weight) + (6.25 × height) - (5 × age) <span className="text-rose-600 font-bold bg-white px-2 py-0.5 rounded border border-rose-100 shadow-sm ml-1">- 161</span>
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-4 text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                            <span>Weight: kg</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>Height: cm</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>Age: years</span>
                        </span>
                    </div>
                 </div>
               ) : (
                 <div>
                    <p className="text-sm text-slate-600 mb-4 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        Multiply the BMR by one of the following factors to estimate Total Daily Energy Expenditure (TDEE).
                    </p>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                          <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                              <tr>
                                  <th className="p-3 text-left">Level</th>
                                  <th className="p-3 text-right">Multiplier</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                              {ACTIVITY_LEVELS.map((level, i) => (
                                  <tr key={i} className="hover:bg-slate-50">
                                      <td className="p-3">
                                          <div className="font-bold text-slate-800">{level.label.split('(')[0].trim()}</div>
                                          <div className="text-xs text-slate-500 mt-0.5">{level.label.split('(')[1]?.replace(')', '')}</div>
                                      </td>
                                      <td className="p-3 text-right font-mono font-bold text-emerald-600 text-base">{level.multiplier}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                    </div>
                 </div>
               )}
             </div>
             <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="px-6 py-2 bg-white border border-slate-300 shadow-sm text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
             </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Energy Expenditure Practice</h1>
          <p className="text-slate-500">Calculate BMR (Mifflin-St Jeor) and TDEE for the client below.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Client Data Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider">Client Profile</h3>
                <button 
                  onClick={handleNextProblem}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/80 hover:bg-white border border-amber-100 hover:border-amber-200 shadow-sm rounded-lg text-xs font-medium text-amber-700 transition-all hover:shadow-md active:scale-95 z-20"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Client
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Gender</div>
                  <div className="text-lg font-bold text-slate-900 capitalize">{problem.gender}</div>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Weight</div>
                  <div className="text-lg font-bold text-slate-900">{problem.weightKg} kg</div>
                </div>
                 <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Height</div>
                  <div className="text-lg font-bold text-slate-900">{problem.heightCm} cm</div>
                </div>
                 <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Age</div>
                  <div className="text-lg font-bold text-slate-900">{problem.age}</div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg">
                  <div className="text-amber-800 text-[10px] uppercase font-bold mb-1">Activity Level</div>
                  <div className="text-sm font-medium text-amber-900">{problem.activityLevel}</div>
                  <div className="text-xs text-amber-700 mt-1">Multiplier: <span className="font-mono font-bold">{problem.activityMultiplier}</span></div>
              </div>
            </div>
          </div>

          {/* Working Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700">
                    Show your working
                    <span className="text-red-500 ml-1">*</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Show the full Mifflin-St Jeor calculation and the multiplier step.
                    </p>
                </div>
                {/* Helper Buttons */}
                <div className="flex gap-2 shrink-0">
                    <button 
                        onClick={() => setActiveModal('equation')} 
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 shadow-sm rounded-lg text-xs font-medium text-slate-600 hover:text-amber-700 transition-all h-fit"
                        title="View Equation"
                    >
                        <Calculator className="w-3.5 h-3.5" /> 
                        <span className="hidden sm:inline">Equation</span>
                    </button>
                    <button 
                        onClick={() => setActiveModal('multipliers')} 
                         className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 shadow-sm rounded-lg text-xs font-medium text-slate-600 hover:text-emerald-700 transition-all h-fit"
                         title="View Multipliers"
                    >
                        <Table2 className="w-3.5 h-3.5" /> 
                        <span className="hidden sm:inline">Multipliers</span>
                    </button>
                </div>
            </div>
            
            <textarea
              value={working}
              onChange={(e) => setWorking(e.target.value)}
              disabled={!!result}
              placeholder={'1. BMR: (10 x Weight) + ...\n2. TDEE: BMR x Multiplier...'}
              className="w-full h-40 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-sm resize-none disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Answer Inputs */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">1. BMR (kcal)</label>
                <input
                  type="number"
                  value={bmrInput}
                  onChange={(e) => setBmrInput(e.target.value)}
                  disabled={!!result}
                  placeholder="0"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent font-bold text-lg"
                />
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">2. TDEE (kcal)</label>
                <input
                  type="number"
                  value={tdeeInput}
                  onChange={(e) => setTdeeInput(e.target.value)}
                  disabled={!!result}
                  placeholder="0"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent font-bold text-lg"
                />
              </div>
          </div>

          {!result && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
                isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-amber-600 hover:bg-amber-700 hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Assessing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Submit Calculation
                </span>
              )}
            </button>
          )}
        </div>

        {/* Right Column: Feedback */}
        <div className="md:col-span-5">
           {result ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden animate-in zoom-in-95 duration-300 h-full flex flex-col">
              <div className={`p-6 border-b ${result.isCorrect ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="flex items-center gap-3 mb-2">
                  {result.isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-amber-600" />
                  )}
                  <div>
                    <h3 className={`font-bold text-lg ${result.isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                      {result.isCorrect ? 'Spot On!' : 'Check Your Maths'}
                    </h3>
                    <p className={`text-sm ${result.isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                      Score: {result.score}/100
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Feedback</h4>
                  <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {result.feedback}
                  </p>
                </div>

                {!result.isCorrect && (
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Expected Values</h4>
                    <div className="space-y-2">
                       <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500">BMR</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.bmr} kcal</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500">TDEE</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.tdee} kcal</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Padlet Link Section */}
                <div className="mt-4 p-4 bg-slate-900 rounded-xl flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/10 rounded-lg text-white">
                            <Camera className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">Evidence of Completion</h4>
                            <p className="text-xs text-slate-300 mt-1">
                                Take a screenshot of your work (including this feedback) and upload it to your personal Padlet.
                            </p>
                        </div>
                    </div>
                    <a 
                        href="https://padlet.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-white text-slate-900 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors"
                    >
                        <img src="https://res.cloudinary.com/dlshlye2v/image/upload/v1769796954/Padlet_Logo_o4n9m5.png" alt="" className="w-5 h-5 object-contain" />
                        Open Padlet
                    </a>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 mt-auto flex gap-3">
                 {!result.isCorrect && (
                   <button
                    onClick={handleRetryCurrent}
                    className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center justify-center gap-2"
                   >
                     <RotateCcw className="w-4 h-4" /> Try Again
                   </button>
                 )}
                <button
                  onClick={handleNextProblem}
                  className="flex-1 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" /> {nextButtonLabel}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
              <div>
                <Zap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Submit your calculation to see<br/>detailed feedback.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnergyExpenditureActivity;
