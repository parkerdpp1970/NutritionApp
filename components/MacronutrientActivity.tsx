
import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Play, Send, Calculator, RotateCcw, PieChart, Info, User, X, HelpCircle, Camera } from 'lucide-react';
import { ProblemData, AssessmentResult } from '../types';
import { gradeMacronutrientSubmission } from '../services/geminiService';

const GOALS = [
  { label: "Muscle Gain", split: { carbs: 45, protein: 30, fat: 25 }, desc: "High protein for hypertrophy, moderate fat." },
  { label: "Endurance Athlete", split: { carbs: 60, protein: 15, fat: 25 }, desc: "High carbohydrate for glycogen replenishment." },
  { label: "Fat Loss (Standard)", split: { carbs: 40, protein: 30, fat: 30 }, desc: "Balanced deficit with protein support." },
  { label: "General Health", split: { carbs: 50, protein: 15, fat: 35 }, desc: "Standard UK Healthy Eating guidelines." }
];

const generateProblem = (): ProblemData => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const goalData = GOALS[Math.floor(Math.random() * GOALS.length)];
  
  // Realistic TDEE/Calorie Target ranges based on Gender + Goal
  let minTdee = 2000;
  let maxTdee = 2500;

  if (gender === 'male') {
      switch (goalData.label) {
          case "Muscle Gain":
              minTdee = 2800; maxTdee = 3400; break;
          case "Endurance Athlete":
              minTdee = 3200; maxTdee = 4000; break;
          case "Fat Loss (Standard)":
              minTdee = 2100; maxTdee = 2500; break;
          case "General Health":
              minTdee = 2400; maxTdee = 2700; break;
          default:
              minTdee = 2500; maxTdee = 2500;
      }
  } else {
       switch (goalData.label) {
          case "Muscle Gain":
              minTdee = 2200; maxTdee = 2600; break;
          case "Endurance Athlete":
              minTdee = 2400; maxTdee = 3000; break;
          case "Fat Loss (Standard)":
              minTdee = 1600; maxTdee = 1900; break; // Realistic deficit
          case "General Health":
              minTdee = 1900; maxTdee = 2200; break;
          default:
              minTdee = 2000; maxTdee = 2000;
      }
  }

  // Generate random TDEE within range, rounded to nearest 50
  const tdee = Math.floor(Math.random() * ((maxTdee - minTdee) / 50 + 1)) * 50 + minTdee;

  return {
    id: Math.random().toString(36).substr(2, 9),
    weightKg: 0, // Not needed
    bodyFatPercentage: 0, // Not needed
    gender: gender,
    difficulty: 'medium',
    clientName: (gender === 'male' ? "Male Client " : "Female Client ") + Math.floor(Math.random() * 100),
    tdee: tdee,
    clientGoal: goalData.label,
    macroSplit: goalData.split
  };
};

const MacronutrientActivity: React.FC = () => {
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  
  // Inputs
  const [working, setWorking] = useState('');
  const [carbsInput, setCarbsInput] = useState('');
  const [proteinInput, setProteinInput] = useState('');
  const [fatInput, setFatInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

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
    setCarbsInput('');
    setProteinInput('');
    setFatInput('');
    setResult(null);
  };

  const handleRetryCurrent = () => {
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!problem) return;
    if (!working.trim() || !carbsInput || !proteinInput || !fatInput) {
      alert("Please fill in all macronutrient targets and show your working.");
      return;
    }

    setIsSubmitting(true);
    try {
      const assessment = await gradeMacronutrientSubmission(problem, {
        problemId: problem.id,
        working,
        carbsGrams: carbsInput,
        proteinGrams: proteinInput,
        fatGrams: fatInput
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
        {/* Formula Modal */}
        {showFormulaModal && (
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200" 
                onClick={() => setShowFormulaModal(false)}
            >
                <div 
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200" 
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-4 bg-orange-50 border-b border-orange-100 flex justify-between items-center">
                        <h3 className="font-bold text-orange-900 flex items-center gap-2">
                            <Calculator className="w-5 h-5"/>
                            Calculation Formulas
                        </h3>
                        <button 
                            onClick={() => setShowFormulaModal(false)} 
                            className="p-2 hover:bg-orange-100 rounded-full transition-colors text-orange-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-slate-600 mb-2">Use these energy density values to convert calories into grams.</p>
                        
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <h4 className="font-bold text-blue-900 text-sm uppercase mb-1">Carbohydrates</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-700 text-sm">4 kcal per gram</span>
                                <code className="text-xs bg-white px-2 py-1 rounded border border-blue-200 text-blue-800 font-mono">
                                    (Kcal × %) ÷ 4
                                </code>
                            </div>
                        </div>

                         <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                            <h4 className="font-bold text-indigo-900 text-sm uppercase mb-1">Protein</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-indigo-700 text-sm">4 kcal per gram</span>
                                <code className="text-xs bg-white px-2 py-1 rounded border border-indigo-200 text-indigo-800 font-mono">
                                    (Kcal × %) ÷ 4
                                </code>
                            </div>
                        </div>

                         <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                            <h4 className="font-bold text-amber-900 text-sm uppercase mb-1">Fat</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-amber-700 text-sm">9 kcal per gram</span>
                                <code className="text-xs bg-white px-2 py-1 rounded border border-amber-200 text-amber-800 font-mono">
                                    (Kcal × %) ÷ 9
                                </code>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                        <button 
                            onClick={() => setShowFormulaModal(false)} 
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
          <h1 className="text-2xl font-bold text-slate-900">Macronutrient Calculation</h1>
          <p className="text-slate-500">Calculate daily gram targets based on TDEE and Goal.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Client Scenario Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-bold text-orange-600 uppercase tracking-wider">Client Profile</h3>
                <button 
                  onClick={handleNextProblem}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/80 hover:bg-white border border-orange-100 hover:border-orange-200 shadow-sm rounded-lg text-xs font-medium text-orange-700 transition-all hover:shadow-md active:scale-95 z-20"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Client
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-4">
                 <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1 flex items-center gap-1">
                    <User className="w-3 h-3" /> Gender
                  </div>
                  <div className="text-lg font-bold text-slate-900 capitalize">{problem.gender}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Goal</div>
                  <div className="text-lg font-bold text-slate-900 leading-tight">{problem.clientGoal}</div>
                </div>
                 <div className="md:col-span-1 col-span-2">
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Daily Energy Target</div>
                  <div className="text-3xl font-bold text-slate-900">{problem.tdee} <span className="text-sm text-slate-400 font-normal">kcal</span></div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-2">Assigned Macro Split</div>
                  <div className="flex flex-wrap items-center gap-1 text-sm font-mono font-bold">
                     <span className="text-blue-600 px-2 py-1 bg-blue-50 rounded mb-1">{problem.macroSplit?.carbs}% Carbs</span>
                     <span className="text-slate-300 hidden sm:inline">/</span>
                     <span className="text-indigo-600 px-2 py-1 bg-indigo-50 rounded mb-1">{problem.macroSplit?.protein}% Protein</span>
                     <span className="text-slate-300 hidden sm:inline">/</span>
                     <span className="text-amber-600 px-2 py-1 bg-amber-50 rounded mb-1">{problem.macroSplit?.fat}% Fat</span>
                  </div>
              </div>
            </div>
          </div>

          {/* Working Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-semibold text-slate-700">
                Show your working
                <span className="text-red-500 ml-1">*</span>
                </label>
                <button
                    onClick={() => setShowFormulaModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wide rounded-full border border-orange-200 transition-colors"
                >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Show Formulas
                </button>
            </div>
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
              Calculate calories per nutrient first, then divide by the energy density (4, 4, or 9) to get grams.
            </p>
            <textarea
              value={working}
              onChange={(e) => setWorking(e.target.value)}
              disabled={!!result}
              placeholder={'Carbs: (Total Kcal * %) / 4 = ...\nProtein: (Total Kcal * %) / 4 = ...\nFat: (Total Kcal * %) / 9 = ...'}
              className="w-full h-40 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm resize-none disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Answer Inputs */}
          <div className="grid grid-cols-3 gap-3">
             <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
                <label className="block text-xs font-bold text-blue-800 uppercase mb-2">Carbohydrates</label>
                <div className="flex items-center gap-2">
                    <input
                    type="number"
                    value={carbsInput}
                    onChange={(e) => setCarbsInput(e.target.value)}
                    disabled={!!result}
                    placeholder="0"
                    className="w-full p-2 rounded border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-lg"
                    />
                    <span className="text-xs font-bold text-blue-400">g</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-sm">
                <label className="block text-xs font-bold text-indigo-800 uppercase mb-2">Protein</label>
                 <div className="flex items-center gap-2">
                    <input
                    type="number"
                    value={proteinInput}
                    onChange={(e) => setProteinInput(e.target.value)}
                    disabled={!!result}
                    placeholder="0"
                    className="w-full p-2 rounded border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-bold text-lg"
                    />
                    <span className="text-xs font-bold text-indigo-400">g</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                <label className="block text-xs font-bold text-amber-800 uppercase mb-2">Fat</label>
                 <div className="flex items-center gap-2">
                    <input
                    type="number"
                    value={fatInput}
                    onChange={(e) => setFatInput(e.target.value)}
                    disabled={!!result}
                    placeholder="0"
                    className="w-full p-2 rounded border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent font-bold text-lg"
                    />
                    <span className="text-xs font-bold text-amber-400">g</span>
                </div>
              </div>
          </div>
          
          {!result && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
                isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-orange-600 hover:bg-orange-700 hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing...
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
                      {result.isCorrect ? 'Spot On!' : 'Check Your Math'}
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
                        <span className="text-xs text-slate-500">Carbs</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.carbsGrams}g</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500">Protein</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.proteinGrams}g</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500">Fat</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.fatGrams}g</span>
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
                  className="flex-1 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" /> {nextButtonLabel}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
              <div>
                <PieChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Submit your calculation to see<br/>detailed feedback.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MacronutrientActivity;
