
import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Play, Send, Calculator, RotateCcw, Calendar, TrendingDown, TrendingUp, Info, Briefcase, Clock, Battery, Ruler, Lightbulb, X, Camera } from 'lucide-react';
import { ProblemData, AssessmentResult } from '../types';
import { gradeGoalSettingSubmission } from '../services/geminiService';

// Define rich personas for realistic scenarios
const PERSONAS = [
  {
    name: "James",
    age: 32,
    occupation: "Corporate Lawyer",
    experience: "Beginner" as const,
    weightRange: [90, 105],
    heightRange: [178, 188],
    bfRange: [28, 35],
    goal: "I want a six-pack for my wedding in 8 weeks.",
    lifestyle: "Extremely high stress. Works 60+ hours/week. Frequent client dinners with alcohol. Sleep is poor (5-6 hrs).",
    availability: "2 days per week (weekends only)",
    difficulty: 'hard' as const
  },
  {
    name: "Sarah",
    age: 45,
    occupation: "Freelance Designer",
    experience: "Intermediate" as const,
    weightRange: [60, 75],
    heightRange: [162, 172],
    bfRange: [28, 34],
    goal: "I want to tone up and lose the 'softness' around my middle.",
    lifestyle: "Moderate stress. Works from home, cooks mostly fresh food but snacks when working. Good sleep habits.",
    availability: "4 days per week (flexible)",
    difficulty: 'medium' as const
  },
  {
    name: "Marcus",
    age: 21,
    occupation: "University Student",
    experience: "Advanced" as const,
    weightRange: [75, 85],
    heightRange: [175, 185],
    bfRange: [15, 18],
    goal: "I want to get shredded (sub 10% body fat) for summer.",
    lifestyle: "Low income but high time availability. Meal preps religiously. Low stress.",
    availability: "6 days per week (gym access)",
    difficulty: 'medium' as const
  },
  {
    name: "Elena",
    age: 52,
    occupation: "Nurse (Shift Work)",
    experience: "Beginner" as const,
    weightRange: [70, 85],
    heightRange: [155, 165],
    bfRange: [30, 40],
    goal: "I need to lose weight for my health, my knees are hurting.",
    lifestyle: "High physical fatigue but sedentary metabolism. Irregular sleep patterns due to night shifts. Relies on cafeteria food.",
    availability: "3 days per week (irregular hours)",
    difficulty: 'hard' as const
  }
];

const generateProblem = (): ProblemData => {
  const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
  
  const weight = Math.floor(Math.random() * (persona.weightRange[1] - persona.weightRange[0] + 1)) + persona.weightRange[0];
  const bf = Math.floor(Math.random() * (persona.bfRange[1] - persona.bfRange[0] + 1)) + persona.bfRange[0];
  const height = Math.floor(Math.random() * (persona.heightRange[1] - persona.heightRange[0] + 1)) + persona.heightRange[0];

  return {
    id: Math.random().toString(36).substr(2, 9),
    weightKg: weight,
    bodyFatPercentage: bf,
    difficulty: persona.difficulty,
    clientName: persona.name,
    age: persona.age,
    heightCm: height,
    experienceLevel: persona.experience,
    clientGoal: persona.goal,
    occupation: persona.occupation,
    lifestyle: persona.lifestyle,
    trainingAvailability: persona.availability
  };
};

const Hint: React.FC<{ children: React.ReactNode; colorClass?: string }> = ({ children, colorClass = "text-amber-600 bg-amber-50 border-amber-100" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block ml-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${isOpen ? 'bg-slate-100 text-slate-500' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
        title="Show Hint"
      >
        {isOpen ? <X className="w-3.5 h-3.5" /> : <Lightbulb className="w-3.5 h-3.5" />}
        {isOpen ? 'Close' : 'Hint'}
      </button>
      {isOpen && (
        <div className={`absolute right-0 top-8 w-64 p-3 rounded-lg border shadow-lg z-20 text-xs leading-relaxed ${colorClass} animate-in fade-in slide-in-from-top-2`}>
          {children}
        </div>
      )}
    </div>
  );
};

const GoalSettingActivity: React.FC = () => {
  const [problem, setProblem] = useState<ProblemData | null>(null);
  
  // Inputs
  const [currentFatMass, setCurrentFatMass] = useState('');
  const [fatLossTarget, setFatLossTarget] = useState('');
  const [fatLossRate, setFatLossRate] = useState('');
  const [fatLossWeeks, setFatLossWeeks] = useState('');
  
  const [muscleGainTarget, setMuscleGainTarget] = useState('');
  const [muscleGainRate, setMuscleGainRate] = useState('');
  const [muscleGainMonths, setMuscleGainMonths] = useState('');
  
  const [smartGoal, setSmartGoal] = useState('');

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
    setCurrentFatMass('');
    setFatLossTarget('');
    setFatLossRate('');
    setFatLossWeeks('');
    setMuscleGainTarget('');
    setMuscleGainRate('');
    setMuscleGainMonths('');
    setSmartGoal('');
    setResult(null);
  };

  const handleRetryCurrent = () => {
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!problem) return;
    if (!currentFatMass || !fatLossTarget || !fatLossRate || !smartGoal) {
      alert("Please fill in the Fat Mass Analysis and write a SMART goal.");
      return;
    }

    setIsSubmitting(true);
    try {
      const assessment = await gradeGoalSettingSubmission(problem, {
        problemId: problem.id,
        currentFatMass,
        fatLossTarget,
        fatLossRate,
        fatLossWeeks,
        muscleGainTarget: muscleGainTarget || '0',
        muscleGainRate: muscleGainRate || '0',
        muscleGainMonths: muscleGainMonths || '0',
        smartGoal
      });
      setResult(assessment);
    } catch (e) {
      console.error(e);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-calculate timelines for better UX
  useEffect(() => {
    if (fatLossTarget && fatLossRate && Number(fatLossRate) > 0) {
      setFatLossWeeks((Number(fatLossTarget) / Number(fatLossRate)).toFixed(1));
    }
  }, [fatLossTarget, fatLossRate]);

  useEffect(() => {
    if (muscleGainTarget && muscleGainRate && Number(muscleGainRate) > 0) {
      setMuscleGainMonths((Number(muscleGainTarget) / Number(muscleGainRate)).toFixed(1));
    }
  }, [muscleGainTarget, muscleGainRate]);

  if (!problem) return <div className="p-12 text-center">Loading activity...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Goal Setting Workshop</h1>
          <p className="text-slate-500">Create a realistic strategy based on client circumstances.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Client Profile Card */}
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{problem.clientName}, <span className="text-slate-400 font-medium">{problem.age} yrs</span></h3>
                    <div className="flex items-center gap-2 mt-1 text-slate-300 text-sm">
                        <Briefcase className="w-3 h-3" />
                        <span>{problem.occupation}</span>
                        <span className="w-1 h-1 bg-slate-500 rounded-full mx-1"></span>
                        <span className="px-2 py-0.5 rounded bg-white/20 text-xs font-semibold tracking-wide text-white">
                            {problem.experienceLevel}
                        </span>
                    </div>
                  </div>
                   <button 
                    onClick={handleNextProblem}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    title="New Client"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-slate-400 text-xs uppercase font-bold">Body Mass</span>
                        <div className="text-xl font-mono">{problem.weightKg} kg</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-slate-400 text-xs uppercase font-bold">Body Fat</span>
                        <div className="text-xl font-mono">{problem.bodyFatPercentage}%</div>
                    </div>
                     <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-slate-400 text-xs uppercase font-bold flex items-center gap-1">
                          <Ruler className="w-3 h-3" /> Height
                        </span>
                        <div className="text-xl font-mono">{problem.heightCm} cm</div>
                    </div>
                </div>

                {/* New Lifestyle Context Section */}
                <div className="space-y-3 mb-6">
                    <div className="flex gap-3 items-start">
                        <Battery className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Lifestyle & Stress</span>
                            <p className="text-sm text-slate-200 leading-snug">{problem.lifestyle}</p>
                        </div>
                    </div>
                     <div className="flex gap-3 items-start">
                        <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Availability</span>
                            <p className="text-sm text-slate-200 leading-snug">{problem.trainingAvailability}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg border border-white/5 relative">
                    <span className="absolute -top-2 left-4 bg-slate-800 text-slate-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Client's Desire</span>
                    <p className="italic text-slate-200 text-sm pt-2">"{problem.clientGoal}"</p>
                </div>
             </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg text-amber-900 text-sm">
            <p className="font-bold mb-1">Trainer's Task:</p>
            <p>Evaluate if the client's desire is realistic given their lifestyle and age. Set a SMART goal that is <strong>Achievable</strong> for them, even if it means adjusting their expectations.</p>
          </div>

          {/* Step 1: Current State */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative z-0">
             <div className="flex justify-between items-start mb-4">
               <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-slate-400" />
                  Step 1: Current State
               </h3>
               <Hint colorClass="text-slate-700 bg-slate-50 border-slate-200">
                  <p className="font-bold mb-1">Formula</p>
                  <p>Current Fat Mass = Body Mass (kg) × (Body Fat % ÷ 100)</p>
               </Hint>
             </div>
             <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Calculate Current Fat Mass (kg)</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        value={currentFatMass}
                        onChange={(e) => setCurrentFatMass(e.target.value)}
                        disabled={!!result}
                        placeholder="0.0"
                        className="w-full p-2 rounded border border-slate-300"
                    />
                    <span className="p-2 bg-slate-100 rounded text-slate-500 font-bold min-w-[3rem] text-center">kg</span>
                </div>
             </div>
          </div>

          {/* Step 2: Fat Loss Plan */}
          <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-sm ring-1 ring-rose-500/10 relative z-0">
             <div className="flex justify-between items-start mb-4">
               <h3 className="font-bold text-rose-800 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Step 2: Fat Loss Plan
               </h3>
               <Hint colorClass="text-rose-800 bg-rose-50 border-rose-100">
                  <p className="font-bold mb-1">Realistic Rates</p>
                  <p className="mb-2">Standard: <strong>0.5kg - 1.0kg</strong> per week.</p>
                  <p><strong>Tip:</strong> If the client has high stress (high cortisol) or poor sleep, aim for the lower end (0.5kg) to prevent burnout.</p>
               </Hint>
             </div>
             <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target Loss (kg)</label>
                    <input
                        type="number"
                        value={fatLossTarget}
                        onChange={(e) => setFatLossTarget(e.target.value)}
                        disabled={!!result}
                        className="w-full p-2 rounded border border-slate-300"
                    />
                </div>
                 <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Weekly Rate (kg)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={fatLossRate}
                        onChange={(e) => setFatLossRate(e.target.value)}
                        disabled={!!result}
                        placeholder="e.g. 0.5"
                        className="w-full p-2 rounded border border-slate-300"
                    />
                </div>
             </div>
             <div className="bg-rose-50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm text-rose-800 font-medium">Estimated Time Needed:</span>
                <span className="font-mono font-bold text-rose-900 text-lg">
                    {fatLossWeeks ? fatLossWeeks : '--'} <span className="text-sm font-normal">weeks</span>
                </span>
             </div>
          </div>

          {/* Step 3: Muscle Gain Plan */}
          <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm ring-1 ring-indigo-500/10 relative z-0">
             <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-indigo-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Step 3: Muscle Gain Plan (Optional)
                </h3>
                <Hint colorClass="text-indigo-800 bg-indigo-50 border-indigo-100">
                    <p className="font-bold mb-1">Realistic Rates (Monthly)</p>
                    <ul className="list-disc list-inside space-y-1 mb-2">
                        <li>Beginner: 0.5 - 1.0 kg</li>
                        <li>Advanced: &lt; 0.25 kg</li>
                    </ul>
                    <p><strong>Tip:</strong> Age significantly impacts recovery. Older clients (40+) will build muscle slower than clients in their 20s.</p>
                </Hint>
             </div>
             <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Target Gain (kg)</label>
                    <input
                        type="number"
                        value={muscleGainTarget}
                        onChange={(e) => setMuscleGainTarget(e.target.value)}
                        disabled={!!result}
                        className="w-full p-2 rounded border border-slate-300"
                    />
                </div>
                 <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Monthly Rate (kg)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={muscleGainRate}
                        onChange={(e) => setMuscleGainRate(e.target.value)}
                        disabled={!!result}
                        placeholder="e.g. 0.5"
                        className="w-full p-2 rounded border border-slate-300"
                    />
                </div>
             </div>
             <div className="bg-indigo-50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-sm text-indigo-800 font-medium">Estimated Time Needed:</span>
                <span className="font-mono font-bold text-indigo-900 text-lg">
                    {muscleGainMonths ? muscleGainMonths : '--'} <span className="text-sm font-normal">months</span>
                </span>
             </div>
          </div>

          {/* Step 4: SMART Goal */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative z-0">
             <div className="flex justify-between items-start mb-3">
               <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-slate-400" />
                  Step 4: SMART Objective
               </h3>
               <Hint colorClass="text-sky-800 bg-sky-50 border-sky-100">
                  <p className="font-bold mb-1">Structure</p>
                  <p>Combine your data into a clear statement.</p>
                  <p className="mt-1 italic">"Starting at X kg, [Client] will [lose/gain] Y kg to reach Z kg over [Timeframe], by following a [specific strategy]."</p>
               </Hint>
             </div>
             
             <div className="mb-4 bg-sky-50 border border-sky-100 p-4 rounded-lg">
                <p className="text-xs font-bold text-sky-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    Objective Structure
                </p>
                <ul className="space-y-2 text-sm text-sky-900">
                    <li className="flex gap-2">
                        <span className="bg-sky-200 text-sky-800 text-xs font-bold px-2 py-0.5 rounded h-fit mt-0.5">1. START</span>
                        <span>State the starting figure (Where are they now?)</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="bg-sky-200 text-sky-800 text-xs font-bold px-2 py-0.5 rounded h-fit mt-0.5">2. ACTION</span>
                        <span>State specifically what will change (e.g., "lose 5kg fat mass")</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="bg-sky-200 text-sky-800 text-xs font-bold px-2 py-0.5 rounded h-fit mt-0.5">3. TARGET</span>
                        <span>State the target figure (Where would they like to be?)</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="bg-sky-200 text-sky-800 text-xs font-bold px-2 py-0.5 rounded h-fit mt-0.5">4. TIME</span>
                        <span>State the specific timeframe</span>
                    </li>
                </ul>
             </div>

             <textarea
                value={smartGoal}
                onChange={(e) => setSmartGoal(e.target.value)}
                disabled={!!result}
                placeholder={`Example: Starting at ${problem.weightKg}kg (${problem.bodyFatPercentage}% BF), ${problem.clientName} will lose 5kg of fat mass to reach a body mass of ${problem.weightKg - 5}kg over 10 weeks.`}
                className="w-full h-32 p-3 rounded border border-slate-300 text-sm leading-relaxed focus:ring-2 focus:ring-sky-500 focus:border-transparent"
             />
          </div>

          {!result && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
                isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-slate-900 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing...
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
                      {result.isCorrect ? 'Solid Plan!' : 'Review Strategy'}
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
                
                {result.reasoningCritique && (
                    <div>
                         <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">AI Critique</h4>
                         <p className="text-slate-600 text-sm leading-relaxed italic">"{result.reasoningCritique}"</p>
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
                  className="flex-1 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" /> {nextButtonLabel}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
              <div>
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Submit your timeline to see<br/>detailed feedback.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalSettingActivity;
