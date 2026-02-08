import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Play, TrendingUp, Calculator, ArrowRight, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface Scenario {
  id: string;
  initial: { weight: number; bf: number };
  final: { weight: number; bf: number };
  options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  breakdown: {
    initialFM: number;
    initialFFM: number;
    finalFM: number;
    finalFFM: number;
    deltaFM: number;
    deltaFFM: number;
  };
}

const generateScenario = (): Scenario => {
  // 1. Setup Initial State
  const initialWeight = Math.floor(Math.random() * (95 - 65 + 1)) + 65; // 65-95kg
  const initialBF = Math.floor(Math.random() * (35 - 20 + 1)) + 20; // 20-35%
  
  const initialFM = Number((initialWeight * (initialBF / 100)).toFixed(1));
  const initialFFM = Number((initialWeight - initialFM).toFixed(1));

  // 2. Determine Scenario Type
  const scenarioType = Math.random();
  let finalWeight, finalBF;

  if (scenarioType < 0.33) {
    // Recomposition (Weight same/similiar, BF down)
    finalWeight = initialWeight; 
    finalBF = initialBF - Math.floor(Math.random() * 5 + 3); // Drop 3-8%
  } else if (scenarioType < 0.66) {
    // Standard Cut (Weight down, BF down)
    const weightLoss = Math.floor(Math.random() * 6 + 4); // Lose 4-10kg
    finalWeight = initialWeight - weightLoss;
    finalBF = initialBF - Math.floor(Math.random() * 4 + 2); // BF drops a bit
  } else {
    // Bulk (Weight up, BF same or slightly up)
    const weightGain = Math.floor(Math.random() * 5 + 3); // Gain 3-8kg
    finalWeight = initialWeight + weightGain;
    finalBF = initialBF; 
  }

  const finalFM = Number((finalWeight * (finalBF / 100)).toFixed(1));
  const finalFFM = Number((finalWeight - finalFM).toFixed(1));

  const deltaFM = Number((finalFM - initialFM).toFixed(1));
  const deltaFFM = Number((finalFFM - initialFFM).toFixed(1));

  // 3. Generate Options
  const formatVal = (v: number) => Math.abs(v).toFixed(1);
  const fmAction = deltaFM < 0 ? 'lost' : 'gained';
  const ffmAction = deltaFFM < 0 ? 'lost' : 'gained';
  const noChange = (v: number) => Math.abs(v) < 0.1;

  // Correct Option
  const correctText = `The client ${noChange(deltaFM) ? 'maintained their Fat Mass' : `${fmAction} ${formatVal(deltaFM)}kg of Fat Mass`} and ${noChange(deltaFFM) ? 'maintained their Fat-Free Mass' : `${ffmAction} ${formatVal(deltaFFM)}kg of Fat-Free Mass`}.`;

  // Distractor 1: Swap values
  const distractor1 = `The client ${noChange(deltaFFM) ? 'maintained their Fat Mass' : `${fmAction} ${formatVal(deltaFFM)}kg of Fat Mass`} and ${noChange(deltaFM) ? 'maintained their Fat-Free Mass' : `${ffmAction} ${formatVal(deltaFM)}kg of Fat-Free Mass`}.`;

  // Distractor 2: Wrong direction for FFM 
  const wrongFFMAction = ffmAction === 'lost' ? 'gained' : 'lost';
  const distractor2 = `The client ${fmAction} ${formatVal(deltaFM)}kg of Fat Mass and ${wrongFFMAction} ${formatVal(deltaFFM)}kg of Fat-Free Mass.`;

  // Distractor 3: Total weight confusion
  const totalDelta = finalWeight - initialWeight;
  const totalAction = totalDelta < 0 ? 'lost' : 'gained';
  const distractor3 = `The client ${totalAction} ${formatVal(totalDelta)}kg of body weight, which consisted entirely of changes in Fat Mass.`;

  const options = [
    { id: 'opt1', text: correctText, isCorrect: true, feedback: "Correct! You accurately calculated the change in both Fat Mass and Fat-Free Mass." },
    { id: 'opt2', text: distractor1, isCorrect: false, feedback: "Incorrect. It looks like you swapped the values for Fat Mass and Fat-Free Mass." },
    { id: 'opt3', text: distractor2, isCorrect: false, feedback: "Incorrect. Check the direction of change (Gain vs Loss) for the Fat-Free Mass." },
    { id: 'opt4', text: distractor3, isCorrect: false, feedback: "Incorrect. Weight change is rarely just one component. You need to calculate FM and FFM separately." },
  ];

  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    id: Math.random().toString(36),
    initial: { weight: initialWeight, bf: initialBF },
    final: { weight: finalWeight, bf: finalBF },
    options,
    breakdown: {
      initialFM,
      initialFFM,
      finalFM,
      finalFFM,
      deltaFM,
      deltaFFM
    }
  };
};

const CompositionChangeActivity: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [scratchpad, setScratchpad] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setScenario(generateScenario());
  }, []);

  const handleNext = () => {
    setScenario(generateScenario());
    setSelectedOption(null);
    setIsEvaluated(false);
    setScratchpad('');
    setShowHint(false);
  };

  const handleEvaluate = () => {
    if (selectedOption) setIsEvaluated(true);
  };

  if (!scenario) return <div className="p-12 text-center">Loading scenario...</div>;

  const selectedOptionData = scenario.options.find(o => o.id === selectedOption);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analysis Challenge</h1>
          <p className="text-slate-500">Compare the measurements and identify the correct physiological change.</p>
        </div>
        <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
            <RefreshCw className="w-4 h-4" />
            New Scenario
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Data Cards */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
            <span className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-bl-xl">START</span>
            <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-4">Initial Stats</div>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Total Mass</span>
                    <span className="text-xl font-bold text-slate-900">{scenario.initial.weight} kg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Body Fat</span>
                    <span className="text-xl font-bold text-slate-900">{scenario.initial.bf}%</span>
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm relative ring-1 ring-emerald-500/10">
            <span className="absolute top-0 right-0 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-bl-xl">END</span>
            <div className="text-sm text-emerald-600 uppercase tracking-wide font-semibold mb-4">Post-Period Stats</div>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-emerald-50/50 rounded-lg">
                    <span className="text-slate-600 font-medium">Total Mass</span>
                    <span className="text-xl font-bold text-slate-900">{scenario.final.weight} kg</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50/50 rounded-lg">
                    <span className="text-slate-600 font-medium">Body Fat</span>
                    <span className="text-xl font-bold text-emerald-600">{scenario.final.bf}%</span>
                </div>
            </div>
        </div>
      </div>

      {/* Hint Section */}
      <div className="bg-amber-50 rounded-xl border border-amber-100 overflow-hidden">
        <button 
          onClick={() => setShowHint(!showHint)}
          className="w-full flex items-center justify-between p-4 text-amber-800 font-medium hover:bg-amber-100/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className={`w-5 h-5 ${showHint ? 'fill-amber-500 text-amber-600' : 'text-amber-600'}`} />
            <span>Need a hint?</span>
          </div>
          {showHint ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {showHint && (
          <div className="px-4 pb-4 animate-in slide-in-from-top-2">
            <div className="bg-white p-4 rounded-lg border border-amber-100 text-sm text-slate-600 space-y-2">
              <p className="font-semibold text-amber-900">How to tackle this:</p>
              <ol className="list-decimal list-inside space-y-1 ml-1">
                <li>Calculate <strong>Initial</strong> Fat Mass (Weight × BF%) and Fat-Free Mass.</li>
                <li>Calculate <strong>Final</strong> Fat Mass (Weight × BF%) and Fat-Free Mass.</li>
                <li>Subtract Initial from Final to see specifically how much of each component changed.</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Scratchpad */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
            <Calculator className="w-4 h-4" />
            Scratchpad (Optional)
        </label>
        <textarea
            value={scratchpad}
            onChange={(e) => setScratchpad(e.target.value)}
            placeholder="Use this space to calculate the Initial FM/FFM and Final FM/FFM..."
            className="w-full h-24 p-3 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Which statement accurately describes the change?</h3>
        </div>
        
        <div className="p-4 space-y-3">
            {scenario.options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => !isEvaluated && setSelectedOption(option.id)}
                    disabled={isEvaluated}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                        selectedOption === option.id 
                            ? isEvaluated 
                                ? option.isCorrect 
                                    ? 'bg-green-50 border-green-500 ring-1 ring-green-500'
                                    : 'bg-red-50 border-red-500 ring-1 ring-red-500'
                                : 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                            : 'bg-white border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
                    } ${isEvaluated && !selectedOption ? 'opacity-50' : ''}`}
                >
                    <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        selectedOption === option.id
                            ? isEvaluated
                                ? option.isCorrect ? 'border-green-600 bg-green-600 text-white' : 'border-red-500 bg-red-500 text-white'
                                : 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-300'
                    }`}>
                        {selectedOption === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className={`text-sm md:text-base font-medium ${selectedOption === option.id ? 'text-slate-900' : 'text-slate-600'}`}>
                        {option.text}
                    </span>
                    {isEvaluated && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" />
                    )}
                     {isEvaluated && selectedOption === option.id && !option.isCorrect && (
                        <AlertCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
                    )}
                </button>
            ))}
        </div>

        {/* Action Area */}
        <div className="p-6 bg-slate-50 border-t border-slate-200">
            {!isEvaluated ? (
                <button
                    onClick={handleEvaluate}
                    disabled={!selectedOption}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    Submit Answer
                </button>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
                    {/* Feedback Banner */}
                    <div className={`p-4 rounded-lg flex gap-3 ${selectedOptionData?.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedOptionData?.isCorrect ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                        <div>
                            <p className="font-bold mb-1">{selectedOptionData?.isCorrect ? 'Correct!' : 'Incorrect'}</p>
                            <p className="text-sm">{selectedOptionData?.feedback}</p>
                        </div>
                    </div>

                    {/* Detailed Working Out (Always shown after submission) */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <Calculator className="w-4 h-4" />
                                Full Working Out
                            </h4>
                        </div>
                        <div className="p-4 space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold text-slate-500 text-xs uppercase mb-1">Step 1: Initial</p>
                                    <div className="bg-slate-50 p-2 rounded border border-slate-100 font-mono text-slate-700">
                                        <div className="flex justify-between mb-1">
                                            <span>FM:</span>
                                            <span>{scenario.initial.weight} × {(scenario.initial.bf/100).toFixed(2)} = <strong>{scenario.breakdown.initialFM}</strong></span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>FFM:</span>
                                            <span>{scenario.initial.weight} - {scenario.breakdown.initialFM} = <strong>{scenario.breakdown.initialFFM}</strong></span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-emerald-600 text-xs uppercase mb-1">Step 2: Final</p>
                                    <div className="bg-emerald-50/50 p-2 rounded border border-emerald-100 font-mono text-slate-700">
                                        <div className="flex justify-between mb-1">
                                            <span>FM:</span>
                                            <span>{scenario.final.weight} × {(scenario.final.bf/100).toFixed(2)} = <strong>{scenario.breakdown.finalFM}</strong></span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>FFM:</span>
                                            <span>{scenario.final.weight} - {scenario.breakdown.finalFM} = <strong>{scenario.breakdown.finalFFM}</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <p className="font-semibold text-slate-900 text-xs uppercase mb-1">Step 3: The Difference</p>
                                <div className="bg-slate-50 p-3 rounded border border-slate-200 font-mono text-base">
                                     <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-2">
                                        <span className="text-slate-600">Fat Mass Change:</span>
                                        <span className={scenario.breakdown.deltaFM < 0 ? 'text-emerald-600 font-bold' : 'text-slate-900 font-bold'}>
                                            {scenario.breakdown.finalFM} - {scenario.breakdown.initialFM} = {scenario.breakdown.deltaFM > 0 ? '+' : ''}{scenario.breakdown.deltaFM} kg
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Fat-Free Mass Change:</span>
                                        <span className={scenario.breakdown.deltaFFM > 0 ? 'text-emerald-600 font-bold' : 'text-slate-900 font-bold'}>
                                            {scenario.breakdown.finalFFM} - {scenario.breakdown.initialFFM} = {scenario.breakdown.deltaFFM > 0 ? '+' : ''}{scenario.breakdown.deltaFFM} kg
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Next Scenario <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CompositionChangeActivity;