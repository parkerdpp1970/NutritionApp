
import React from 'react';
import { ArrowRight, ScanLine, Eye, AlertTriangle, List, Scale, Info, CheckCircle2, ShieldAlert, CalendarClock, Award } from 'lucide-react';

const FoodLabelGuide: React.FC<{ onStartPractice: () => void }> = ({ onStartPractice }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reading Food Labels</h1>
        <p className="text-lg text-slate-600">
          Understanding food packaging is a vital skill for fitness professionals to help clients make informed, safe, and healthier choices.
        </p>
      </div>

      {/* Activity Aim */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl">
        <h3 className="flex items-center gap-2 font-bold text-purple-900 text-lg mb-2">
            <ScanLine className="w-5 h-5 text-purple-600" />
            Activity Aim
        </h3>
        <p className="text-purple-800 leading-relaxed">
            To interpret nutritional information and ingredient lists on food packaging according to UK labelling laws, enabling you to advise clients on product suitability and health impact.
        </p>
      </div>

      {/* Why Read Labels? */}
      <div className="grid md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Why Read Labels?</h2>
            </div>
            <ul className="space-y-3 text-slate-600">
                <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span><strong>Informed Choices:</strong> Know exactly what you are putting into your body.</span>
                </li>
                 <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span><strong>Compare Products:</strong> Quickly decide which of two similar products is healthier.</span>
                </li>
                 <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span><strong>Safety:</strong> Identify allergens that could cause severe reactions.</span>
                </li>
            </ul>
         </div>

         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 p-2 rounded-lg">
                    <Scale className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">The 100g Rule</h2>
            </div>
            <p className="text-slate-600 mb-4">
                One of the most important skills is knowing <strong>which column</strong> to look at.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                <p className="mb-2"><strong>Per 100g Column:</strong> Use this to <span className="text-amber-600 font-bold">COMPARE</span> products. It puts everything on a level playing field.</p>
                <p><strong>Per Portion Column:</strong> Use this to <span className="text-emerald-600 font-bold">TRACK</span> intake. This tells you what you will actually consume.</p>
            </div>
         </div>
      </div>

      {/* UK Law Highlights */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Key UK Labelling Laws</h2>
        
        <div className="space-y-6">
            {/* 1. Ingredients List */}
            <div className="flex gap-4 items-start">
                <div className="bg-slate-100 p-3 rounded-lg flex-shrink-0 mt-1">
                    <List className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">The Ingredients List</h3>
                    <p className="text-slate-600">
                        Ingredients <strong>MUST</strong> be listed in descending order by weight. The first ingredient listed is the main component of the food.
                    </p>
                    <div className="mt-2 bg-slate-50 p-3 rounded text-sm text-slate-500 italic border-l-4 border-slate-300">
                        "If 'Sugar' is the second ingredient in a 'healthy' cereal bar, it is primarily a sugar bar."
                    </div>
                </div>
            </div>

            {/* 2. Allergens */}
            <div className="flex gap-4 items-start">
                <div className="bg-red-50 p-3 rounded-lg flex-shrink-0 mt-1">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">Allergen Emphasis</h3>
                    <p className="text-slate-600">
                        The 14 major allergens (e.g., peanuts, gluten, milk) must be <strong>emphasised</strong> in the ingredients list, usually by using <strong>bold</strong> text, contrasting colours, or underlining.
                    </p>
                </div>
            </div>

            {/* 3. Traffic Lights */}
             <div className="flex gap-4 items-start">
                <div className="bg-green-50 p-3 rounded-lg flex-shrink-0 mt-1">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">Traffic Light System</h3>
                    <p className="text-slate-600 mb-3">
                        Front-of-pack labelling uses colour coding to show if a product is High (Red), Medium (Amber), or Low (Green) in key nutrients per 100g.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-center">
                        <div className="border border-red-200 bg-red-50 p-2 rounded">
                            <strong className="text-red-700 block">RED (High)</strong>
                            <span className="text-red-600">Eat rarely / small amounts</span>
                        </div>
                        <div className="border border-amber-200 bg-amber-50 p-2 rounded">
                            <strong className="text-amber-700 block">AMBER (Medium)</strong>
                            <span className="text-amber-600">Eat occasionally</span>
                        </div>
                         <div className="border border-green-200 bg-green-50 p-2 rounded">
                            <strong className="text-green-700 block">GREEN (Low)</strong>
                            <span className="text-green-600">Healthier choice</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Strict Claims Rules (New) */}
            <div className="flex gap-4 items-start">
                <div className="bg-indigo-50 p-3 rounded-lg flex-shrink-0 mt-1">
                    <ShieldAlert className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">Strict Rules on Claims</h3>
                    <p className="text-slate-600 mb-2">
                        Food manufacturers cannot simply make up health benefits. All claims are strictly regulated by UK law.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                         <div className="bg-slate-50 p-3 rounded border border-slate-200">
                             <div className="flex items-center gap-2 mb-1">
                                 <AlertTriangle className="w-4 h-4 text-red-500" />
                                 <h4 className="font-bold text-slate-900 text-sm">Medicinal Claims Prohibited</h4>
                             </div>
                             <p className="text-xs text-slate-600">
                                 It is <strong>illegal</strong> to claim that a food can prevent, treat, or cure a human disease. You cannot say "cures cancer" or "treats flu".
                             </p>
                         </div>
                         <div className="bg-slate-50 p-3 rounded border border-slate-200">
                             <div className="flex items-center gap-2 mb-1">
                                 <Award className="w-4 h-4 text-indigo-500" />
                                 <h4 className="font-bold text-slate-900 text-sm">Nutrition Claims</h4>
                             </div>
                             <p className="text-xs text-slate-600">
                                 Terms like <strong>"Low Fat"</strong> or <strong>"High Protein"</strong> must meet specific nutritional criteria (e.g., Low Fat must be &lt;3g per 100g).
                             </p>
                         </div>
                    </div>
                </div>
            </div>

            {/* 5. Date Markings (New) */}
             <div className="flex gap-4 items-start">
                <div className="bg-orange-50 p-3 rounded-lg flex-shrink-0 mt-1">
                    <CalendarClock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">Date Markings</h3>
                    <p className="text-slate-600 mb-2">
                        Understanding the difference between date types is crucial for food safety.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                         <div className="border-l-4 border-red-400 pl-3 py-1">
                             <span className="block font-bold text-slate-900 text-sm uppercase">Use By</span>
                             <span className="text-xs text-slate-600 leading-snug">About <strong>SAFETY</strong>. Do not eat after this date, even if it looks fine. Found on perishables like meat/dairy.</span>
                         </div>
                         <div className="border-l-4 border-emerald-400 pl-3 py-1">
                             <span className="block font-bold text-slate-900 text-sm uppercase">Best Before</span>
                             <span className="text-xs text-slate-600 leading-snug">About <strong>QUALITY</strong>. Safe to eat after this date, but texture/flavour may decline. Found on frozen/dried goods.</span>
                         </div>
                    </div>
                </div>
            </div>

        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onStartPractice}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Start Label Analysis
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FoodLabelGuide;
