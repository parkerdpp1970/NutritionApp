
import React from 'react';
import { ArrowRight, Info, PieChart, Apple, Droplets, Wheat, Calculator, Fish, Milk, Ban, CheckCircle2, Flame, AlertCircle } from 'lucide-react';

const MacronutrientGuide: React.FC<{ onStartPractice: () => void }> = ({ onStartPractice }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Macronutrient Balance</h1>
        <p className="text-lg text-slate-600">
          Understanding the UK Healthy Eating Guidelines and how to calculate macronutrient requirements for specific client goals.
        </p>
      </div>

      {/* Activity Aim */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
        <h3 className="flex items-center gap-2 font-bold text-orange-900 text-lg mb-2">
            <PieChart className="w-5 h-5 text-orange-600" />
            Activity Aim
        </h3>
        <p className="text-orange-800 leading-relaxed">
            To interpret UK nutrition guidelines (Eatwell Guide) and calculate daily gram targets for <strong>Carbohydrates, Protein, and Fats</strong> based on a client's specific caloric needs and goals.
        </p>
      </div>

      {/* Section 1: The Essentials (UK Guidelines) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="border-b border-slate-100 pb-6 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Apple className="w-6 h-6 text-green-600" />
                The Eatwell Guide Guidelines
            </h2>
            <p className="text-slate-600 leading-relaxed">
                The UK government’s healthy eating guidelines are summarized by the Eatwell Guide. A balanced diet should consist of a variety of foods in specific proportions, focusing on increasing fruit and vegetables, choosing higher-fibre carbohydrates, and reducing fat, salt, and sugar.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {/* 1. Fruit & Veg */}
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Apple className="w-24 h-24 text-emerald-900" /></div>
                <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-emerald-600 border border-emerald-100">
                        <Apple className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-emerald-900 text-lg">1. Fruit & Vegetables</h3>
                </div>
                <ul className="space-y-2 text-sm text-emerald-800 relative z-10">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                        <span><strong>5 A Day:</strong> Eat at least 5 portions (80g each) daily.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                        <span><strong>Variety:</strong> Should make up over a third of daily intake.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                        <span><strong>Limit:</strong> Juice/smoothies to 150ml/day (max 1 portion).</span>
                    </li>
                </ul>
            </div>

            {/* 2. Carbohydrates */}
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Wheat className="w-24 h-24 text-amber-900" /></div>
                <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-amber-600 border border-amber-100">
                        <Wheat className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-amber-900 text-lg">2. Starchy Carbohydrates & Fibre</h3>
                </div>
                <ul className="space-y-2 text-sm text-amber-800 relative z-10">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                        <span><strong>Fibre:</strong> Eat 30 to 40 grams of fibre per day.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                        <span><strong>Base Meals:</strong> Make up over a third of your diet.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                        <span><strong>Wholegrain:</strong> Choose higher-fibre options (brown rice, wholewheat pasta, skin-on potatoes).</span>
                    </li>
                </ul>
            </div>

            {/* 3. Dairy */}
            <div className="bg-sky-50 rounded-xl p-5 border border-sky-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Milk className="w-24 h-24 text-sky-900" /></div>
                <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-sky-600 border border-sky-100">
                        <Milk className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sky-900 text-lg">3. Dairy & Alternatives</h3>
                </div>
                <ul className="space-y-2 text-sm text-sky-800 relative z-10">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-sky-600" />
                        <span><strong>Lower Fat:</strong> Opt for 1% milk or reduced-fat cheese.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-sky-600" />
                        <span><strong>Alternatives:</strong> Choose fortified, unsweetened options like soya.</span>
                    </li>
                </ul>
            </div>

             {/* 4. Protein */}
            <div className="bg-rose-50 rounded-xl p-5 border border-rose-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Fish className="w-24 h-24 text-rose-900" /></div>
                <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div className="bg-white p-2 rounded-lg shadow-sm text-rose-600 border border-rose-100">
                        <Fish className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-rose-900 text-lg">4. Protein Sources</h3>
                </div>
                <ul className="space-y-2 text-sm text-rose-800 relative z-10">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-rose-600" />
                        <span><strong>Sources:</strong> Prioritize beans, pulses, fish, eggs, and lean meat.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-rose-600" />
                        <span><strong>Fish:</strong> Aim for 2 portions weekly (1 oily).</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Footer: Limits & Calories */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Ban className="w-4 h-4 text-red-500" /> Limits & Hydration
                </h4>
                <div className="space-y-2 text-sm text-slate-600">
                    <p className="flex justify-between border-b border-slate-200 pb-1">
                        <span>Fluids</span> 
                        <span className="font-semibold text-slate-800">6-8 glasses daily</span>
                    </p>
                    <p className="flex justify-between border-b border-slate-200 pb-1">
                        <span>Salt</span> 
                        <span className="font-semibold text-slate-800">Max 6g per day</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Oils</span> 
                        <span className="font-semibold text-slate-800">Use unsaturated in moderation</span>
                    </p>
                </div>
            </div>
             <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Flame className="w-4 h-4 text-orange-500" /> Daily Calorie Guidelines
                </h4>
                 <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-100 mb-2 shadow-sm">
                    <span className="text-slate-600 font-medium text-sm">Men</span>
                    <span className="font-mono font-bold text-slate-900">~2,500 kcal</span>
                 </div>
                 <div className="flex justify-between items-center bg-white p-3 rounded border border-slate-100 shadow-sm">
                    <span className="text-slate-600 font-medium text-sm">Women</span>
                    <span className="font-mono font-bold text-slate-900">~2,000 kcal</span>
                 </div>
            </div>
        </div>
      </div>

      {/* Section 2: The Math (Calories to Grams) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <div className="w-full">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Calculating Macros: The Math</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Once you have a client's TDEE (Total Daily Energy Expenditure), you need to convert that calorie number into grams of food. To do this, you must know the <strong>energy density</strong> of each macronutrient.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
               <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg text-center">
                  <span className="block text-sm font-bold text-blue-800 uppercase mb-2">Carbohydrates</span>
                  <span className="text-3xl font-mono font-bold text-blue-900">4</span>
                  <span className="block text-xs text-blue-600 mt-1">kcals per gram</span>
               </div>
               <div className="p-4 border border-indigo-100 bg-indigo-50 rounded-lg text-center">
                  <span className="block text-sm font-bold text-indigo-800 uppercase mb-2">Protein</span>
                  <span className="text-3xl font-mono font-bold text-indigo-900">4</span>
                  <span className="block text-xs text-indigo-600 mt-1">kcals per gram</span>
               </div>
               <div className="p-4 border border-amber-100 bg-amber-50 rounded-lg text-center">
                  <span className="block text-sm font-bold text-amber-800 uppercase mb-2">Fat</span>
                  <span className="text-3xl font-mono font-bold text-amber-900">9</span>
                  <span className="block text-xs text-amber-600 mt-1">kcals per gram</span>
               </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-4 border-b border-slate-700 pb-2">Standard Worked Example</h3>
                <p className="text-slate-300 text-sm mb-4">
                    <strong>Client Goal:</strong> Maintenance<br/>
                    <strong>TDEE:</strong> 2,400 kcal<br/>
                    <strong>Standard Split:</strong> 50% Carbs, 20% Protein, 30% Fat
                </p>

                <div className="space-y-4 font-mono text-sm">
                    {/* Carbs */}
                    <div className="bg-white/10 p-3 rounded border border-white/10">
                        <div className="flex justify-between text-blue-300 font-bold mb-1">
                            <span>Carbohydrates (50%)</span>
                        </div>
                        <p className="text-slate-400 mb-1">Step 1: 2400 × 0.50 = 1200 kcal</p>
                        <p className="text-white">Step 2: 1200 ÷ 4 = <strong>300g</strong></p>
                    </div>

                    {/* Protein */}
                    <div className="bg-white/10 p-3 rounded border border-white/10">
                        <div className="flex justify-between text-indigo-300 font-bold mb-1">
                            <span>Protein (20%)</span>
                        </div>
                        <p className="text-slate-400 mb-1">Step 1: 2400 × 0.20 = 480 kcal</p>
                        <p className="text-white">Step 2: 480 ÷ 4 = <strong>120g</strong></p>
                    </div>

                    {/* Fat */}
                    <div className="bg-white/10 p-3 rounded border border-white/10">
                        <div className="flex justify-between text-amber-300 font-bold mb-1">
                            <span>Fat (30%)</span>
                        </div>
                        <p className="text-slate-400 mb-1">Step 1: 2400 × 0.30 = 720 kcal</p>
                        <p className="text-white">Step 2: 720 ÷ 9 = <strong>80g</strong></p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Splits by Goal */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
         <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-slate-500" />
            Example Ratios by Goal
         </h2>

         <div className="bg-slate-50 border-l-4 border-slate-400 p-4 mb-6 rounded-r-lg">
            <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Research Insight: Weight Loss
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
                There is no single "best" macronutrient split for weight loss. Evidence supports <strong>creating a calorie deficit</strong> and ensuring <strong>sufficient protein</strong> (for satiety and muscle retention) as the most important factors. The ratio of fats to carbohydrates can vary based on individual preference and adherence.
            </p>
         </div>

         <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="border border-slate-100 rounded-lg p-4">
                <h4 className="font-bold text-slate-800 mb-1">General Health</h4>
                <div className="flex gap-1 h-2 mb-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-[50%]"></div>
                    <div className="bg-indigo-500 w-[15%]"></div>
                    <div className="bg-amber-500 w-[35%]"></div>
                </div>
                <ul className="text-slate-500 text-xs space-y-1">
                    <li><span className="text-blue-600 font-bold">50%</span> Carbs</li>
                    <li><span className="text-indigo-600 font-bold">15%</span> Protein</li>
                    <li><span className="text-amber-600 font-bold">35%</span> Fat</li>
                </ul>
            </div>
             <div className="border border-slate-100 rounded-lg p-4">
                <h4 className="font-bold text-slate-800 mb-1">Muscle Gain / Athlete</h4>
                <div className="flex gap-1 h-2 mb-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-[45%]"></div>
                    <div className="bg-indigo-500 w-[30%]"></div>
                    <div className="bg-amber-500 w-[25%]"></div>
                </div>
                <ul className="text-slate-500 text-xs space-y-1">
                    <li><span className="text-blue-600 font-bold">45%</span> Carbs</li>
                    <li><span className="text-indigo-600 font-bold">30%</span> Protein</li>
                    <li><span className="text-amber-600 font-bold">25%</span> Fat</li>
                </ul>
            </div>
             <div className="border border-slate-100 rounded-lg p-4">
                <h4 className="font-bold text-slate-800 mb-1">Weight Loss (High Protein Example)</h4>
                <div className="flex gap-1 h-2 mb-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-[40%]"></div>
                    <div className="bg-indigo-500 w-[30%]"></div>
                    <div className="bg-amber-500 w-[30%]"></div>
                </div>
                <ul className="text-slate-500 text-xs space-y-1 mb-2">
                    <li><span className="text-blue-600 font-bold">40%</span> Carbs (Flexible)</li>
                    <li><span className="text-indigo-600 font-bold">30%</span> Protein (Key)</li>
                    <li><span className="text-amber-600 font-bold">30%</span> Fat (Flexible)</li>
                </ul>
                <p className="text-[10px] text-slate-400 italic leading-tight">
                    *Example only. Prioritize deficit + protein.
                </p>
            </div>
         </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Practice Calculations
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default MacronutrientGuide;
