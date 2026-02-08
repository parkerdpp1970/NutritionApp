
import React, { useState } from 'react';
import { ArrowRight, Calculator, Zap, Activity, Info, X, Brain, Heart, Flame, Dumbbell } from 'lucide-react';

const EnergyExpenditureGuide: React.FC<{ onStartPractice: () => void }> = ({ onStartPractice }) => {
  const [activeModal, setActiveModal] = useState<'bmr' | 'pal' | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Information Modals */}
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
                  {activeModal === 'bmr' ? <Brain className="w-5 h-5 text-amber-600"/> : <Dumbbell className="w-5 h-5 text-emerald-600"/>}
                  {activeModal === 'bmr' ? 'Understanding BMR' : 'Activity & Choice'}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>
             
             <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
               {activeModal === 'bmr' ? (
                 <>
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <h4 className="font-bold text-amber-900 mb-2">What is Basal Metabolic Rate?</h4>
                        <p className="text-sm text-amber-800 leading-relaxed">
                            BMR represents the minimum amount of energy (calories) your body requires to perform basic life-sustaining functions while at complete rest.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                            <Heart className="w-4 h-4 text-rose-500" />
                            Where does the energy go?
                        </h4>
                        <p className="text-sm text-slate-600 mb-3">
                            Even when you are sleeping, your body is hard at work. High-metabolic organs consume the majority of this energy:
                        </p>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                            <li className="bg-slate-50 p-2 rounded border border-slate-100">🧠 <strong>Brain:</strong> ~20%</li>
                            <li className="bg-slate-50 p-2 rounded border border-slate-100">🫀 <strong>Heart:</strong> ~10%</li>
                            <li className="bg-slate-50 p-2 rounded border border-slate-100">🩸 <strong>Liver:</strong> ~20%</li>
                            <li className="bg-slate-50 p-2 rounded border border-slate-100">🧪 <strong>Kidneys:</strong> ~5-10%</li>
                        </ul>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                        <h4 className="font-semibold text-slate-800 mb-2">Why Mifflin-St Jeor?</h4>
                        <p className="text-sm text-slate-600">
                            Introduced in 1990, the Mifflin-St Jeor equation is widely considered one of the most reliable formulas for estimating BMR in healthy populations. It updates older formulas (like Harris-Benedict) to better reflect modern lifestyles and body compositions.
                        </p>
                    </div>
                 </>
               ) : (
                 <>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <h4 className="font-bold text-emerald-900 mb-2">The Power of Movement</h4>
                        <p className="text-sm text-emerald-800 leading-relaxed">
                            The Activity Multiplier accounts for all the energy you burn through movement, not just your BMR. This is the most <strong>variable</strong> component of your total energy expenditure.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                            <Flame className="w-4 h-4 text-orange-500" />
                            It's Your Choice
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            Unlike your age, height, or genetics (which determine BMR), your activity level is something you can actively control. 
                        </p>
                        <ul className="space-y-3 text-sm">
                            <li className="flex gap-3">
                                <span className="bg-slate-100 p-1.5 rounded h-fit">🚶</span>
                                <span className="text-slate-700"><strong>NEAT (Non-Exercise Activity):</strong> Walking, standing, fidgeting, and cleaning. Increasing this has a huge impact on your multiplier.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="bg-slate-100 p-1.5 rounded h-fit">🏃</span>
                                <span className="text-slate-700"><strong>EAT (Exercise Activity):</strong> Structured workouts like running or weightlifting.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                        <p className="text-sm text-slate-600 italic">
                            "By choosing to be more active—taking the stairs, walking to work, or playing sports—you directly increase your multiplier, allowing for a higher calorie intake or creating a deficit for weight loss."
                        </p>
                    </div>
                 </>
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

      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Calculating Energy Expenditure</h1>
        <p className="text-lg text-slate-600">
          Learn how to estimate a client's daily energy needs using the Mifflin-St Jeor equation and Physical Activity Levels (PAL).
        </p>
      </div>

      {/* Activity Aim */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
        <h3 className="flex items-center gap-2 font-bold text-amber-900 text-lg mb-2">
            <Zap className="w-5 h-5 text-amber-600" />
            Activity Aim
        </h3>
        <p className="text-amber-800 leading-relaxed">
            To calculate <strong>Basal Metabolic Rate (BMR)</strong> and <strong>Total Daily Energy Expenditure (TDEE)</strong> to accurately determine the caloric needs of a client.
        </p>
      </div>

      {/* The Formula Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
            <Calculator className="w-6 h-6 text-amber-600" />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Step 1: The Mifflin-St Jeor Equation</h2>
                <button 
                    onClick={() => setActiveModal('bmr')}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200 transition-colors"
                >
                    <Info className="w-3.5 h-3.5" /> What is BMR?
                </button>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              This equation calculates BMR—the energy required to keep the body functioning at complete rest.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">For Men</h3>
                    <p className="font-mono text-slate-800 text-sm md:text-base">
                        (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) <span className="text-blue-600 font-bold">+ 5</span>
                    </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                    <h3 className="font-bold text-rose-700 mb-2 flex items-center gap-2">For Women</h3>
                    <p className="font-mono text-slate-800 text-sm md:text-base">
                        (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) <span className="text-rose-600 font-bold">- 161</span>
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multipliers Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
            <Activity className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Step 2: Activity Multiplier (PAL)</h2>
                <button 
                    onClick={() => setActiveModal('pal')}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition-colors"
                >
                    <Info className="w-3.5 h-3.5" /> About Activity
                </button>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              To find Total Daily Energy Expenditure (TDEE), multiply the BMR by an activity factor representing the client's lifestyle.
            </p>
            
            <div className="overflow-hidden border border-slate-200 rounded-xl">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-100 text-slate-600 font-bold">
                        <tr>
                            <th className="p-3">Activity Level</th>
                            <th className="p-3">Description</th>
                            <th className="p-3 text-right">Multiplier</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        <tr>
                            <td className="p-3 font-medium text-slate-800">Sedentary</td>
                            <td className="p-3 text-slate-600">Little or no exercise, desk job</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-600">1.2</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-slate-800">Lightly Active</td>
                            <td className="p-3 text-slate-600">Light exercise 1-3 days/week</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-600">1.375</td>
                        </tr>
                         <tr>
                            <td className="p-3 font-medium text-slate-800">Moderately Active</td>
                            <td className="p-3 text-slate-600">Moderate exercise 3-5 days/week</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-600">1.55</td>
                        </tr>
                         <tr>
                            <td className="p-3 font-medium text-slate-800">Very Active</td>
                            <td className="p-3 text-slate-600">Heavy exercise 6-7 days/week</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-600">1.725</td>
                        </tr>
                         <tr>
                            <td className="p-3 font-medium text-slate-800">Extra Active</td>
                            <td className="p-3 text-slate-600">Very hard exercise & physical job</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-600">1.9</td>
                        </tr>
                    </tbody>
                </table>
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
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4 text-sm bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="px-3 py-1 bg-white rounded border border-slate-100 shadow-sm">
                        <span className="text-slate-500 font-bold uppercase text-xs mr-2">Gender</span>
                        <span className="text-slate-900 font-bold">Female</span>
                    </div>
                     <div className="px-3 py-1 bg-white rounded border border-slate-100 shadow-sm">
                        <span className="text-slate-500 font-bold uppercase text-xs mr-2">Weight</span>
                        <span className="text-slate-900 font-bold">65 kg</span>
                    </div>
                     <div className="px-3 py-1 bg-white rounded border border-slate-100 shadow-sm">
                        <span className="text-slate-500 font-bold uppercase text-xs mr-2">Height</span>
                        <span className="text-slate-900 font-bold">168 cm</span>
                    </div>
                     <div className="px-3 py-1 bg-white rounded border border-slate-100 shadow-sm">
                        <span className="text-slate-500 font-bold uppercase text-xs mr-2">Age</span>
                        <span className="text-slate-900 font-bold">30 yrs</span>
                    </div>
                     <div className="px-3 py-1 bg-white rounded border border-slate-100 shadow-sm">
                        <span className="text-slate-500 font-bold uppercase text-xs mr-2">Activity</span>
                        <span className="text-slate-900 font-bold">Moderately Active (1.55)</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-slate-800 mb-2">1. Calculate BMR</h4>
                        <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                            <p className="mb-1 text-slate-500">// (10 × 65) + (6.25 × 168) - (5 × 30) - 161</p>
                            <p className="mb-1">650 + 1050 - 150 - 161</p>
                            <p>= <strong className="text-amber-600">1,389 kcal</strong></p>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold text-slate-800 mb-2">2. Calculate TDEE</h4>
                        <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                            <p className="mb-1 text-slate-500">// BMR × 1.55</p>
                            <p>1389 × 1.55 = <strong className="text-emerald-600">2,153 kcal</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Practice Calculations
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default EnergyExpenditureGuide;
