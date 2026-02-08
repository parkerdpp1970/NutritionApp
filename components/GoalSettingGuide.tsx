import React from 'react';
import { ArrowRight, Clock, Scale, TrendingUp, CheckCircle2, Target } from 'lucide-react';

const GoalSettingGuide: React.FC<{ onStartPractice: () => void }> = ({ onStartPractice }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Setting Realistic Goals</h1>
        <p className="text-lg text-slate-600">
          Learn how to set achievable timelines for fat loss and muscle gain, and structure them into SMART objectives.
        </p>
      </div>

      {/* Activity Aim */}
      <div className="bg-sky-50 border-l-4 border-sky-500 p-6 rounded-r-xl">
        <h3 className="flex items-center gap-2 font-bold text-sky-900 text-lg mb-2">
            <Target className="w-5 h-5 text-sky-600" />
            Activity Aim
        </h3>
        <p className="text-sky-800 leading-relaxed">
            To synthesise physiological data and lifestyle factors (age, stress, availability) to create realistic, <strong>SMART goals</strong> for clients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Fat Loss Rates */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-rose-600 rotate-180" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Fat Loss Guidelines</h2>
          </div>
          <p className="text-slate-600 text-sm mb-4">
            Fat loss should be gradual to preserve muscle mass.
          </p>
          <div className="space-y-3">
             <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Standard Rate</span>
                <span className="font-bold text-slate-900">0.5 kg to 1.0 kg</span> <span className="text-slate-600 text-sm">per week</span>
             </div>
             <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="block text-xs text-slate-500 uppercase font-semibold">Percentage Basis</span>
                <span className="font-bold text-slate-900">0.5% to 1.0%</span> <span className="text-slate-600 text-sm">of body weight / week</span>
             </div>
          </div>
        </div>

        {/* Muscle Gain Rates */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Scale className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Muscle Gain Guidelines</h2>
          </div>
          <p className="text-slate-600 text-sm mb-4">
            Building muscle is significantly slower than losing fat and depends on training age.
          </p>
          <div className="space-y-2">
             <div className="flex justify-between items-center p-2 border-b border-slate-50">
                <span className="text-sm font-medium text-slate-700">Beginner</span>
                <span className="text-sm font-mono text-indigo-700 font-bold">~0.5 - 1.0 kg / month</span>
             </div>
             <div className="flex justify-between items-center p-2 border-b border-slate-50">
                <span className="text-sm font-medium text-slate-700">Intermediate</span>
                <span className="text-sm font-mono text-indigo-700 font-bold">~0.25 - 0.5 kg / month</span>
             </div>
             <div className="flex justify-between items-center p-2">
                <span className="text-sm font-medium text-slate-700">Advanced</span>
                <span className="text-sm font-mono text-indigo-700 font-bold">Negligible - 0.25 kg</span>
             </div>
          </div>
        </div>
      </div>

      {/* SMART Goals */}
      <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          The SMART Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-emerald-400 text-lg mb-1">S</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Specific</p>
            <p className="text-sm text-slate-300">Clearly define what needs to be accomplished.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-emerald-400 text-lg mb-1">M</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Measurable</p>
            <p className="text-sm text-slate-300">Use numbers (kg, %, weeks) to track progress.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-emerald-400 text-lg mb-1">A</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Achievable</p>
            <p className="text-sm text-slate-300">Ensure the goal is realistic given the timeframe.</p>
          </div>
           <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-emerald-400 text-lg mb-1">R</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Relevant</p>
            <p className="text-sm text-slate-300">Aligns with the client's broader desires.</p>
          </div>
           <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-emerald-400 text-lg mb-1">T</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Time-bound</p>
            <p className="text-sm text-slate-300">Set a specific deadline for the goal.</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-lg">
          <p className="text-sm font-mono text-emerald-200">
            <strong>Example:</strong> "Reduce body fat by 4kg in 8 weeks (rate: 0.5kg/week) and increase muscle mass by 1kg in 2 months to improve definition."
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Practice Goal Setting
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GoalSettingGuide;