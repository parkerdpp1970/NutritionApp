import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Play, Send, Calculator, RotateCcw } from 'lucide-react';
import { ProblemData, AssessmentResult } from '../types';
import { gradeTargetCompositionSubmission } from '../services/geminiService';

const generateProblem = (): ProblemData => {
  // Generate realistic start weight and body fat
  const weight = Math.floor(Math.random() * (110 - 60 + 1)) + 60;
  const currentBF = Math.floor(Math.random() * (40 - 25 + 1)) + 25;
  
  // Goal is typically 5-15% lower than current
  const drop = Math.floor(Math.random() * (12 - 5 + 1)) + 5;
  const goalBF = currentBF - drop;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    weightKg: weight,
    bodyFatPercentage: currentBF,
    targetBodyFatPercentage: goalBF,
    difficulty: 'medium'
  };
};

const TargetCompositionActivity: React.FC = () => {
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [working, setWorking] = useState('');
  const [ffmInput, setFfmInput] = useState('');
  const [targetMassInput, setTargetMassInput] = useState('');
  const [lossInput, setLossInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    setProblem(generateProblem());
  }, []);

  const handleNextProblem = () => {
    setProblem(generateProblem());
    setWorking('');
    setFfmInput('');
    setTargetMassInput('');
    setLossInput('');
    setResult(null);
  };

  const handleRetryCurrent = () => {
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!problem) return;
    if (!working.trim() || !ffmInput || !targetMassInput || !lossInput) {
      alert("Please fill in all fields and show your working.");
      return;
    }

    setIsSubmitting(true);
    try {
      const assessment = await gradeTargetCompositionSubmission(problem, {
        problemId: problem.id,
        working,
        currentFFM: ffmInput,
        targetBodyMass: targetMassInput,
        massLossRequired: lossInput
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Target Composition Goals</h1>
          <p className="text-slate-500">Calculate the target body mass to achieve a new body fat percentage.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Client Data Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-bold text-rose-600 uppercase tracking-wider">Client Profile</h3>
                <button 
                  onClick={handleNextProblem}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/80 hover:bg-white border border-rose-100 hover:border-rose-200 shadow-sm rounded-lg text-xs font-medium text-rose-700 transition-all hover:shadow-md active:scale-95 z-20"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Client
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Current Mass</div>
                  <div className="text-2xl font-bold text-slate-900">{problem.weightKg} <span className="text-sm text-slate-400 font-normal">kg</span></div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Current BF%</div>
                  <div className="text-2xl font-bold text-slate-900">{problem.bodyFatPercentage} <span className="text-sm text-slate-400 font-normal">%</span></div>
                </div>
                <div className="relative">
                  <div className="text-rose-600 text-xs uppercase font-bold mb-1">Goal BF%</div>
                  <div className="text-2xl font-bold text-rose-600">{problem.targetBodyFatPercentage} <span className="text-sm font-normal">%</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Working Section */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Show your working
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
              Assumption: Fat-Free Mass (FFM) remains constant.
            </p>
            <textarea
              value={working}
              onChange={(e) => setWorking(e.target.value)}
              disabled={!!result}
              placeholder={'Step 1: Calculate Current FFM...\nStep 2: Calculate Target Body Mass (FFM / Goal Lean %)...\nStep 3: Calculate Weight Loss...'}
              className="w-full h-40 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent font-mono text-sm resize-none disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Answer Inputs */}
          <div className="space-y-4">
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">1. Current Fat-Free Mass (kg)</label>
                <input
                  type="number"
                  value={ffmInput}
                  onChange={(e) => setFfmInput(e.target.value)}
                  disabled={!!result}
                  placeholder="0.0"
                  step="0.1"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent font-bold text-lg"
                />
              </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">2. Target Body Mass (kg)</label>
                <input
                  type="number"
                  value={targetMassInput}
                  onChange={(e) => setTargetMassInput(e.target.value)}
                  disabled={!!result}
                  placeholder="0.0"
                  step="0.1"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent font-bold text-lg"
                />
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">3. Mass Loss Required (kg)</label>
                <input
                  type="number"
                  value={lossInput}
                  onChange={(e) => setLossInput(e.target.value)}
                  disabled={!!result}
                  placeholder="0.0"
                  step="0.1"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent font-bold text-lg"
                />
              </div>
            </div>
          </div>

          {!result && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
                isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-rose-600 hover:bg-rose-700 hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Checking...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Submit Plan
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
                      {result.isCorrect ? 'Correct Plan!' : 'Adjustments Needed'}
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
                        <span className="text-xs text-slate-500">Current FFM</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.ffm} kg</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500">Target Body Mass</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.targetBodyMass} kg</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500">Mass Loss Req.</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.massLossRequired} kg</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                   <p className="text-sm text-slate-600 italic text-center">
                    This is a critical skill for setting realistic client goals. Try another scenario!
                  </p>
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
                  className="flex-1 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" /> Next Client
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
              <div>
                <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Submit your calculation to see<br/>detailed feedback.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetCompositionActivity;