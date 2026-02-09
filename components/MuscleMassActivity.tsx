
import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Play, Send, Calculator, RotateCcw, Info, Camera } from 'lucide-react';
import { ProblemData, AssessmentResult } from '../types';
import { gradeMuscleMassSubmission } from '../services/geminiService';

const generateProblem = (): ProblemData => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  // Men tend to be heavier on average for this simulation
  const weight = gender === 'male' 
    ? Math.floor(Math.random() * (110 - 65 + 1)) + 65
    : Math.floor(Math.random() * (90 - 50 + 1)) + 50;
    
  // Men tend to have lower BF% on average
  const bf = gender === 'male'
    ? Math.floor(Math.random() * (25 - 10 + 1)) + 10
    : Math.floor(Math.random() * (35 - 18 + 1)) + 18;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    weightKg: weight,
    bodyFatPercentage: bf,
    gender: gender,
    difficulty: 'medium'
  };
};

const MuscleMassActivity: React.FC = () => {
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [working, setWorking] = useState('');
  const [ffmInput, setFfmInput] = useState('');
  const [smmInput, setSmmInput] = useState('');
  const [smmPercentInput, setSmmPercentInput] = useState('');
  
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
    setFfmInput('');
    setSmmInput('');
    setSmmPercentInput('');
    setResult(null);
  };

  const handleRetryCurrent = () => {
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!problem) return;
    if (!working.trim() || !ffmInput || !smmInput || !smmPercentInput) {
      alert("Please fill in all fields and show your working.");
      return;
    }

    setIsSubmitting(true);
    try {
      const assessment = await gradeMuscleMassSubmission(problem, {
        problemId: problem.id,
        working,
        calculatedFFM: ffmInput,
        calculatedSMM: smmInput,
        calculatedSMMPercent: smmPercentInput
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
          <h1 className="text-2xl font-bold text-slate-900">Skeletal Muscle Mass Estimation</h1>
          <p className="text-slate-500">Calculate muscle mass as a percentage of total body mass.</p>
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4">
        <div className="bg-white p-2 rounded-full h-fit shadow-sm text-blue-600">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-900 mb-1">Estimation Guidelines (Average Population)</h3>
          <p className="text-sm text-blue-800 mb-2">
            Skeletal muscle constitutes a specific portion of the Fat-Free Mass (FFM):
          </p>
          <ul className="text-sm text-blue-800 list-disc list-inside space-y-1 ml-1">
            <li><strong>Men:</strong> Approx. 49% - 50% of Fat-Free Mass.</li>
            <li><strong>Women:</strong> Approx. 41% - 45% of Fat-Free Mass.</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Client Data Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Client Profile</h3>
                <button 
                  onClick={handleNextProblem}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/80 hover:bg-white border border-indigo-100 hover:border-indigo-200 shadow-sm rounded-lg text-xs font-medium text-indigo-700 transition-all hover:shadow-md active:scale-95 z-20"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Client
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Gender</div>
                  <div className="text-xl font-bold text-slate-900 capitalize">{problem.gender}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Total Body Mass</div>
                  <div className="text-2xl font-bold text-slate-900">{problem.weightKg} <span className="text-sm text-slate-400 font-normal">kg</span></div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase font-semibold mb-1">Body Fat</div>
                  <div className="text-2xl font-bold text-slate-900">{problem.bodyFatPercentage} <span className="text-sm text-slate-400 font-normal">%</span></div>
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
              Use your calculator. Show how you found FFM, then the estimated Muscle Mass (kg), and finally the % of total mass.
            </p>
            <textarea
              value={working}
              onChange={(e) => setWorking(e.target.value)}
              disabled={!!result}
              placeholder={'Step 1: Calculate FFM (Weight - Fat Mass)\nStep 2: Estimate Muscle Mass (FFM * factor)\nStep 3: Calculate % of Total (Muscle / Weight * 100)'}
              className="w-full h-40 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm resize-none disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          {/* Answer Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">1. Fat-Free Mass (kg)</label>
                <input
                  type="number"
                  value={ffmInput}
                  onChange={(e) => setFfmInput(e.target.value)}
                  disabled={!!result}
                  placeholder="0.0"
                  step="0.1"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-bold text-lg"
                />
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">2. Est. Muscle Mass (kg)</label>
                <input
                  type="number"
                  value={smmInput}
                  onChange={(e) => setSmmInput(e.target.value)}
                  disabled={!!result}
                  placeholder="0.0"
                  step="0.1"
                  className="w-full p-2 rounded border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-bold text-lg"
                />
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-2 border-indigo-50 shadow-sm">
              <label className="block text-sm font-bold text-indigo-900 mb-2">3. Muscle Mass as % of Total Body Mass</label>
              <div className="relative">
                <input
                  type="number"
                  value={smmPercentInput}
                  onChange={(e) => setSmmPercentInput(e.target.value)}
                  disabled={!!result}
                  placeholder="0.0"
                  step="0.1"
                  className="w-full p-3 pr-12 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-bold text-xl text-indigo-700"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 font-bold">%</div>
              </div>
            </div>
          </div>

          {!result && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
                isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Checking...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Submit Analysis
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
                      {result.isCorrect ? 'Excellent Analysis' : 'Review Needed'}
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
                        <span className="text-xs text-slate-500">Fat-Free Mass</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.ffm} kg</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500">Est. Muscle Mass</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.smm} kg</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="text-xs text-slate-500">% of Total Mass</span>
                        <span className="font-mono font-bold text-slate-800">{result.corrections.smmPercent}%</span>
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
                  className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" /> {nextButtonLabel}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
              <div>
                <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Submit your estimation to see<br/>detailed feedback.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MuscleMassActivity;
