
import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Play, Send, Calculator, RotateCcw, Camera } from 'lucide-react';
import { ProblemData, AssessmentResult } from '../types';
import { gradeStudentSubmission } from '../services/geminiService';

const generateProblem = (): ProblemData => {
  // Generate realistic human weight (50kg - 120kg) and BF% (10% - 40%)
  const weight = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
  const bf = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    weightKg: weight,
    bodyFatPercentage: bf,
    difficulty: 'medium'
  };
};

const PracticeActivity: React.FC = () => {
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [working, setWorking] = useState('');
  const [bfmInput, setBfmInput] = useState('');
  const [ffmInput, setFfmInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    // Initial load
    setProblem(generateProblem());
  }, []);

  const nextButtonLabel = useMemo(() => {
    const labels = ["Give it Another Shot", "New Attempt", "Practise Again", "Next Challenge", "Try Another One", "New Client Profile"];
    return labels[Math.floor(Math.random() * labels.length)];
  }, [result]);

  const handleNextProblem = () => {
    setProblem(generateProblem());
    setWorking('');
    setBfmInput('');
    setFfmInput('');
    setResult(null);
  };
  
  const handleRetryCurrent = () => {
    setResult(null);
    // Keep inputs and working so they can edit
  };

  const handleSubmit = async () => {
    if (!problem) return;
    if (!working.trim() || !bfmInput || !ffmInput) {
      alert("Please fill in all fields and show your working.");
      return;
    }

    setIsSubmitting(true);
    try {
      const assessment = await gradeStudentSubmission(problem, {
        problemId: problem.id,
        working,
        calculatedBFM: bfmInput,
        calculatedFFM: ffmInput
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Learner Activity</h1>
          <p className="text-slate-500">Calculate the mass composition for the client below.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column: Problem & Inputs */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Problem Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-8 -mt-8 z-0 transition-transform group-hover:scale-105 duration-500"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-bold text-primary-600 uppercase tracking-wider">Client Data</h3>
                <button 
                  onClick={handleNextProblem}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/80 hover:bg-white border border-primary-100 hover:border-primary-200 shadow-sm rounded-lg text-xs font-medium text-primary-700 transition-all hover:shadow-md active:scale-95 z-20"
                  title="Generate random client data"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Randomize Client
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Total Body Mass</div>
                  <div className="text-4xl font-bold text-slate-900">{problem.weightKg} <span className="text-lg text-slate-400 font-normal">kg</span></div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Body Fat</div>
                  <div className="text-4xl font-bold text-slate-900">{problem.bodyFatPercentage} <span className="text-lg text-slate-400 font-normal">%</span></div>
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
              Use your calculator on your mobile phone to document your calculations below.
              <br/>
              <span className="text-slate-500 italic">Example: "Step 1: 22% = 0.22. Step 2: 75 * 0.22 = 16.5. Step 3: 75 - 16.5 = 58.5"</span>
            </p>
            <textarea
              value={working}
              onChange={(e) => setWorking(e.target.value)}
              disabled={!!result}
              placeholder={'Step 1: Convert percentage to decimal...\nStep 2: Calculate Fat Mass...\nStep 3: Calculate Fat-Free Mass...'}
              className="w-full h-32 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm resize-none disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Answer Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Body Fat Mass (kg)</label>
              <input
                type="number"
                value={bfmInput}
                onChange={(e) => setBfmInput(e.target.value)}
                disabled={!!result}
                placeholder="0.0"
                step="0.1"
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-bold text-lg"
              />
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Fat-Free Mass (kg)</label>
              <input
                type="number"
                value={ffmInput}
                onChange={(e) => setFfmInput(e.target.value)}
                disabled={!!result}
                placeholder="0.0"
                step="0.1"
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-bold text-lg"
              />
            </div>
          </div>

          {!result && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
                isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Assessing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Submit Answer
                </span>
              )}
            </button>
          )}
        </div>

        {/* Right Column: Feedback/Results */}
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
                      {result.isCorrect ? 'Excellent Work!' : 'Needs Review'}
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
                    <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Correct Values</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded border border-slate-200">
                        <span className="block text-xs text-slate-500">BFM</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.bfm} kg</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded border border-slate-200">
                        <span className="block text-xs text-slate-500">FFM</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.ffm} kg</span>
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
                  className="flex-1 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" /> {nextButtonLabel}
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

export default PracticeActivity;
