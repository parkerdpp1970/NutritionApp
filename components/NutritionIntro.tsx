
import React, { useState } from 'react';
import { ArrowRight, Utensils, Droplets, Leaf, PieChart, Info, CheckCircle2, PlayCircle, X, ChevronRight, Beaker, Apple, Wheat, Fish, Milk } from 'lucide-react';

const NutritionIntro: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [macroTab, setMacroTab] = useState<'carbs' | 'protein' | 'fats'>('carbs');
  const [showPresentation, setShowPresentation] = useState(false);

  const renderModalContent = () => {
    if (!activeTopic) return null;

    const closeButton = (
      <button 
        onClick={(e) => { e.stopPropagation(); setActiveTopic(null); setShowPresentation(false); }}
        className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
    );

    switch (activeTopic) {
      case 'macros':
        return (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          >
            <div className="p-6 bg-orange-50 border-b border-orange-100 flex justify-between items-center relative">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-orange-600">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Macronutrients</h2>
                    <p className="text-sm text-orange-800">The energy-yielding nutrients required in large amounts.</p>
                  </div>
               </div>
               {closeButton}
            </div>
            
            <div className="flex border-b border-slate-200">
               <button 
                 onClick={() => { setMacroTab('carbs'); setShowPresentation(false); }}
                 className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${macroTab === 'carbs' ? 'border-b-2 border-orange-500 text-orange-700 bg-orange-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
               >
                 Carbohydrates
               </button>
               <button 
                 onClick={() => { setMacroTab('protein'); setShowPresentation(false); }}
                 className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${macroTab === 'protein' ? 'border-b-2 border-orange-500 text-orange-700 bg-orange-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
               >
                 Proteins
               </button>
               <button 
                 onClick={() => { setMacroTab('fats'); setShowPresentation(false); }}
                 className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${macroTab === 'fats' ? 'border-b-2 border-orange-500 text-orange-700 bg-orange-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
               >
                 Fats
               </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
               {macroTab === 'carbs' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                    {showPresentation ? (
                        <div className="flex flex-col h-full min-h-[600px]">
                            <button 
                                onClick={() => setShowPresentation(false)}
                                className="self-start mb-4 flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Facts
                            </button>
                            <iframe 
                                src="https://carbohydrates-jxh5qpr.gamma.site/" 
                                className="w-full flex-1 rounded-xl border border-slate-200 shadow-sm"
                                allow="fullscreen"
                                title="Carbohydrates Presentation"
                            />
                        </div>
                    ) : (
                    <>
                    <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                        <div className="flex gap-4 items-start">
                            <div className="bg-amber-100 p-3 rounded-lg"><Wheat className="w-6 h-6 text-amber-700" /></div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">The Body's Primary Energy Source</h3>
                                <p className="text-slate-600">Carbohydrates are broken down into glucose, which is the preferred fuel for the brain and muscles during exercise.</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                            <button 
                                onClick={() => setShowPresentation(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Interactive Presentation
                            </button>
                            <a 
                                href="https://youtu.be/15fDKIY_12c?si=2cS10LJBesftShwZ" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Watch: Overview
                            </a>
                            <a 
                                href="https://youtu.be/p30YFqVpeM4?si=U77HVqIFecBiF0-1" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Watch: Biochemistry
                            </a>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Beaker className="w-4 h-4 text-slate-500" /> Chemical Structure
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <span className="text-xs font-bold text-amber-600 uppercase mb-1 block">Simple Carbs (Sugars)</span>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li><strong>Monosaccharides:</strong> Single sugar molecules (e.g., Glucose, Fructose). Fast energy.</li>
                                    <li><strong>Disaccharides:</strong> Two sugar molecules linked (e.g., Sucrose = table sugar, Lactose = milk sugar).</li>
                                </ul>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <span className="text-xs font-bold text-emerald-600 uppercase mb-1 block">Complex Carbs</span>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li><strong>Polysaccharides:</strong> Long chains of glucose molecules (Starch).</li>
                                    <li>Provides sustained energy and digestive health support.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-800 mb-2">Where to get them?</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-slate-700">
                            <span className="px-3 py-2 bg-slate-100 rounded-lg">Bread & Pasta</span>
                            <span className="px-3 py-2 bg-slate-100 rounded-lg">Rice & Potatoes</span>
                            <span className="px-3 py-2 bg-slate-100 rounded-lg">Fruits (Fructose)</span>
                            <span className="px-3 py-2 bg-slate-100 rounded-lg">Vegetables</span>
                        </div>
                    </div>
                    </>
                    )}
                 </div>
               )}

               {macroTab === 'protein' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                    {/* Header + Videos */}
                    <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                        <div className="flex gap-4 items-start">
                            <div className="bg-rose-100 p-3 rounded-lg"><Fish className="w-6 h-6 text-rose-700" /></div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Growth, Repair & Maintenance</h3>
                                <p className="text-slate-600 mb-2">Proteins are the fundamental building blocks of the body (4 kcal/g). They are essential for:</p>
                                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                                    <li><strong>Growth & Repair:</strong> Muscle tissue, skin, hair, and nails.</li>
                                    <li><strong>Enzymes & Hormones:</strong> Regulating body processes (e.g., Insulin).</li>
                                    <li><strong>Immune System:</strong> Antibodies are proteins.</li>
                                    <li><strong>Energy:</strong> Secondary source if carbs/fats are depleted.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                            <a 
                                href="https://youtu.be/652GrZpLkPs?si=vrsj4BIZepu750Qv" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Proteins: Overview
                            </a>
                            <a 
                                href="https://youtu.be/vQo5taiq_5E?si=8Ns4V0I1reCf-AB2" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> What are Proteins?
                            </a>
                            <a 
                                href="https://youtu.be/WUcWUjIlOIM?si=J7SGKlgYGoDGxJuZ" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Eat More Protein
                            </a>
                            <a 
                                href="https://youtu.be/zBDYkgfh37c?si=uHzK_Ah_a6OMU2q2" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Build Muscle
                            </a>
                        </div>
                    </div>

                    {/* Chemical Structure Section */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <Beaker className="w-4 h-4 text-slate-500" /> Chemical Structure: Amino Acids
                        </h4>
                        <p className="text-sm text-slate-600 mb-4">
                            Proteins are long chains of smaller units called <strong>Amino Acids</strong> linked by peptide bonds. They contain Carbon, Hydrogen, Oxygen, and <strong className="text-rose-600">Nitrogen</strong>.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                <span className="block font-bold text-rose-700 mb-1">Essential Amino Acids (9)</span>
                                <p className="text-slate-600 text-xs mb-2">The body <strong>cannot</strong> make these. They must come from your diet.</p>
                                <div className="flex flex-wrap gap-1">
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Histidine</span>
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Isoleucine</span>
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Leucine</span>
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Lysine</span>
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Methionine</span>
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Phenylalanine</span>
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Threonine</span>
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Tryptophan</span>
                                   <span className="text-[10px] bg-rose-50 text-rose-800 px-2 py-1 rounded">Valine</span>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                <span className="block font-bold text-slate-700 mb-1">Non-Essential Amino Acids (11)</span>
                                <p className="text-slate-600 text-xs">The body <strong>can</strong> synthesise these (usually from other amino acids), so they are not strictly required in the diet every day.</p>
                            </div>
                        </div>
                    </div>

                    {/* Sources Section */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                             <div className="flex items-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                                <h4 className="font-bold text-slate-800">Complete Proteins (HBV)</h4>
                             </div>
                             <p className="text-xs text-slate-500 mb-3">High Biological Value. Contain all 9 essential amino acids in sufficient amounts.</p>
                             <div className="flex flex-wrap gap-2 text-sm">
                                <span className="px-3 py-1 bg-white border border-rose-100 text-rose-800 rounded-lg shadow-sm">Meat</span>
                                <span className="px-3 py-1 bg-white border border-rose-100 text-rose-800 rounded-lg shadow-sm">Poultry</span>
                                <span className="px-3 py-1 bg-white border border-rose-100 text-rose-800 rounded-lg shadow-sm">Fish</span>
                                <span className="px-3 py-1 bg-white border border-rose-100 text-rose-800 rounded-lg shadow-sm">Eggs</span>
                                <span className="px-3 py-1 bg-white border border-rose-100 text-rose-800 rounded-lg shadow-sm">Dairy</span>
                                <span className="px-3 py-1 bg-white border border-rose-100 text-rose-800 rounded-lg shadow-sm">Soy & Quinoa*</span>
                             </div>
                             <p className="text-[10px] text-slate-400 mt-2">*Plant sources that are complete.</p>
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                             <div className="flex items-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <h4 className="font-bold text-slate-800">Incomplete Proteins (LBV)</h4>
                             </div>
                             <p className="text-xs text-slate-500 mb-3">Low Biological Value. Missing one or more essential amino acids. Need "Protein Complementation".</p>
                             <div className="flex flex-wrap gap-2 text-sm">
                                <span className="px-3 py-1 bg-white border border-emerald-100 text-emerald-800 rounded-lg shadow-sm">Beans</span>
                                <span className="px-3 py-1 bg-white border border-emerald-100 text-emerald-800 rounded-lg shadow-sm">Lentils</span>
                                <span className="px-3 py-1 bg-white border border-emerald-100 text-emerald-800 rounded-lg shadow-sm">Nuts</span>
                                <span className="px-3 py-1 bg-white border border-emerald-100 text-emerald-800 rounded-lg shadow-sm">Seeds</span>
                                <span className="px-3 py-1 bg-white border border-emerald-100 text-emerald-800 rounded-lg shadow-sm">Grains</span>
                             </div>
                        </div>
                    </div>
                 </div>
               )}

               {macroTab === 'fats' && (
                 <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                    {showPresentation ? (
                        <div className="flex flex-col h-full min-h-[600px]">
                            <button 
                                onClick={() => setShowPresentation(false)}
                                className="self-start mb-4 flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" /> Back to Facts
                            </button>
                            <iframe 
                                src="https://lipids--wcxy4k7.gamma.site/" 
                                className="w-full flex-1 rounded-xl border border-slate-200 shadow-sm"
                                allow="fullscreen"
                                title="Lipids Presentation"
                            />
                        </div>
                    ) : (
                    <>
                    {/* Header + Videos */}
                    <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
                        <div className="flex gap-4 items-start">
                            <div className="bg-yellow-100 p-3 rounded-lg"><Droplets className="w-6 h-6 text-yellow-700" /></div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Essential for Health</h3>
                                <p className="text-slate-600 mb-2">Fats are the most energy-dense macronutrient (9 kcal/g). They are crucial for:</p>
                                <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                                    <li><strong>Energy Storage:</strong> The body's primary energy reserve.</li>
                                    <li><strong>Insulation & Protection:</strong> Keeping us warm and cushioning organs.</li>
                                    <li><strong>Absorption:</strong> Transporting Fat-Soluble Vitamins (A, D, E, K).</li>
                                    <li><strong>Structure:</strong> Building cell membranes and hormones.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                            <button 
                                onClick={() => setShowPresentation(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Interactive Presentation
                            </button>
                            <a 
                                href="https://youtu.be/fbwLD4Vz0UQ?si=MVQUBVh2Coo5gU7v" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Fats are Important
                            </a>
                            <a 
                                href="https://youtu.be/bgOMovjNb3w?si=SCBZfT9N1HygHAtO" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Healthy Fats
                            </a>
                            <a 
                                href="https://youtu.be/oTU-_nvsE3E?si=_pXfgmFWrzHpg-kl" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm justify-center md:justify-start"
                            >
                                <PlayCircle className="w-4 h-4" /> Seed Oils Controversy
                            </a>
                        </div>
                    </div>

                    {/* Chemical Structure Section */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <Beaker className="w-4 h-4 text-slate-500" /> Chemical Structure: Chain Lengths
                        </h4>
                        <p className="text-sm text-slate-600 mb-4">
                            Fats consist of chains of carbon atoms. The length of the chain determines how they are digested and used.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <span className="block font-bold text-yellow-700 mb-1">Short-Chain (SCFA)</span>
                                <p className="text-slate-600 text-xs">Less than 6 carbons. Often produced by gut bacteria (from fibre). Vital for gut health.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <span className="block font-bold text-yellow-700 mb-1">Medium-Chain (MCT)</span>
                                <p className="text-slate-600 text-xs">6-12 carbons. Digested quickly and sent to liver. Found in coconut oil.</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                <span className="block font-bold text-yellow-700 mb-1">Long-Chain (LCFA)</span>
                                <p className="text-slate-600 text-xs">13-21 carbons. The most common fats in our diet (meat, fish, most oils).</p>
                            </div>
                        </div>
                    </div>

                    {/* Types of Fat Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                             <div className="flex items-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <h4 className="font-bold text-slate-800">Unsaturated (Healthy)</h4>
                             </div>
                             <p className="text-xs text-slate-500 mb-3">Liquid at room temperature. Contains double bonds.</p>
                             
                             <div className="space-y-3">
                                <div>
                                    <span className="text-xs font-bold text-slate-700 uppercase">Monounsaturated</span>
                                    <ul className="text-sm text-slate-600 pl-2 border-l-2 border-emerald-200 mt-1">
                                        <li>Olive Oil, Avocados, Nuts</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-700 uppercase">Polyunsaturated</span>
                                    <ul className="text-sm text-slate-600 pl-2 border-l-2 border-emerald-200 mt-1 space-y-1">
                                        <li><strong>Omega-3:</strong> Oily fish, Flaxseeds. <span className="text-emerald-600 text-xs">(Anti-inflammatory)</span></li>
                                        <li><strong>Omega-6:</strong> Vegetable oils, Seeds. <span className="text-amber-600 text-xs">(Can be pro-inflammatory)</span></li>
                                    </ul>
                                </div>
                             </div>
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                             <div className="flex items-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                <h4 className="font-bold text-slate-800">Saturated (Limit)</h4>
                             </div>
                             <p className="text-xs text-slate-500 mb-3">Solid at room temperature. No double bonds.</p>
                             <ul className="text-sm space-y-1 text-slate-700 list-disc list-inside mb-4">
                                <li>Animal Fat (Meat, Lard)</li>
                                <li>Butter & Cheese</li>
                                <li>Coconut Oil (Plant source)</li>
                                <li>Processed cakes/biscuits</li>
                             </ul>
                             <div className="bg-white p-3 rounded border border-slate-200">
                                <span className="text-xs font-bold text-red-600 uppercase block mb-1">Trans Fats (Avoid)</span>
                                <p className="text-xs text-slate-600">Industrial fats found in some ultra-processed foods.</p>
                             </div>
                        </div>
                    </div>
                    </>
                    )}
                 </div>
               )}
            </div>
          </div>
        );

      case 'micros':
        return (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
          >
             <div className="p-6 bg-emerald-50 border-b border-emerald-100 flex justify-between items-center relative">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-emerald-600">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Micronutrients</h2>
                    <p className="text-sm text-emerald-800">Vitamins and Minerals required in small amounts.</p>
                  </div>
               </div>
               {closeButton}
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto space-y-8">
                {/* Vitamins Section */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-sky-500" /> Vitamins
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-sky-50 p-5 rounded-xl border border-sky-100">
                            <h4 className="font-bold text-sky-900 mb-2">Water Soluble (B, C)</h4>
                            <p className="text-sm text-sky-800 mb-3">Not stored in the body. Need daily intake. Excess is excreted.</p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex gap-2">
                                    <span className="font-bold min-w-[3rem]">Vit C:</span>
                                    <span>Immunity, collagen formation (Citrus fruits).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold min-w-[3rem]">B-Complex:</span>
                                    <span>Energy production (Whole grains, meat).</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                            <h4 className="font-bold text-amber-900 mb-2">Fat Soluble (A, D, E, K)</h4>
                            <p className="text-sm text-amber-800 mb-3">Stored in fatty tissue/liver. Need dietary fat to be absorbed.</p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex gap-2">
                                    <span className="font-bold min-w-[3rem]">Vit D:</span>
                                    <span>Bone health (Sunlight, oily fish).</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold min-w-[3rem]">Vit A:</span>
                                    <span>Vision, immunity (Carrots, liver).</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Minerals Section */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-500" /> Minerals
                    </h3>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                                <span className="block font-bold text-slate-800 mb-1">Calcium</span>
                                <p className="text-slate-600">Essential for bone density and muscle contraction. (Dairy, leafy greens).</p>
                            </div>
                            <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                                <span className="block font-bold text-slate-800 mb-1">Iron</span>
                                <p className="text-slate-600">Transporting oxygen in blood. (Red meat, spinach).</p>
                            </div>
                            <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                                <span className="block font-bold text-slate-800 mb-1">Magnesium</span>
                                <p className="text-slate-600">Energy production and muscle function. (Nuts, seeds).</p>
                            </div>
                            <div className="bg-white p-3 rounded shadow-sm border border-slate-100">
                                <span className="block font-bold text-slate-800 mb-1">Zinc</span>
                                <p className="text-slate-600">Immune function and healing. (Meat, shellfish).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );

      case 'fiber':
         return (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative animate-in zoom-in-95 duration-200"
          >
            {closeButton}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100 rounded-lg text-amber-600"><Leaf className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">Fibre</h2>
            </div>
            
            <p className="text-slate-600 mb-6">
               Dietary fibre is a type of carbohydrate found in plant foods that the body cannot digest. It passes through the stomach and intestines largely unchanged.
            </p>

            <div className="mb-6">
                 <a 
                    href="https://youtu.be/W2F37FrEJsA?si=P9R-cIY6q-cXxTJC" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-bold text-sm shadow-sm"
                >
                    <PlayCircle className="w-4 h-4" /> Watch: Fibre Explained
                </a>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                 <div className="p-4 border border-amber-100 bg-amber-50 rounded-xl">
                    <h3 className="font-bold text-amber-900 mb-2">Soluble Fibre</h3>
                    <p className="text-xs text-amber-800 mb-2">Dissolves in water. Helps lower glucose and cholesterol.</p>
                    <div className="text-xs font-bold text-amber-900">Sources: Oats, peas, beans, apples, citrus fruits.</div>
                </div>
                 <div className="p-4 border border-slate-200 bg-slate-50 rounded-xl">
                    <h3 className="font-bold text-slate-900 mb-2">Insoluble Fibre</h3>
                    <p className="text-xs text-slate-700 mb-2">Does not dissolve. Promotes movement through the digestive system.</p>
                    <div className="text-xs font-bold text-slate-700">Sources: Whole wheat flour, wheat bran, nuts, cauliflower.</div>
                </div>
            </div>
          </div>
        );

      case 'water':
        return (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative animate-in zoom-in-95 duration-200"
          >
            {closeButton}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Droplets className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">Water & Hydration</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                     <p className="text-slate-600 mb-6 leading-relaxed">
                        Water is the main component of the human body (approx 60%). It regulates temperature, lubricates joints, and transports nutrients to cells.
                    </p>
                    
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4" /> Recommendation
                        </h3>
                        <p className="text-blue-800 text-sm">
                            The Eatwell Guide recommends drinking <strong>6 to 8 glasses</strong> of fluid a day (approx. 1.5 - 2 litres).
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-slate-800">Where do we get water?</h3>
                    
                    <div className="p-3 border border-slate-200 rounded-lg flex justify-between items-center">
                        <span className="text-sm text-slate-600">Fluids (Water, Tea, Milk)</span>
                        <span className="font-bold text-blue-600">~70-80%</span>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg flex justify-between items-center">
                        <span className="text-sm text-slate-600">Solid Foods</span>
                        <span className="font-bold text-blue-600">~20-30%</span>
                    </div>

                    <div className="mt-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">High Water Content Foods</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Cucumber (96%)
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-400"></span> Watermelon (92%)
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Strawberries (91%)
                            </div>
                             <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-600"></span> Spinach (91%)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Modal Overlay */}
      {activeTopic && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveTopic(null)}
        >
          {renderModalContent()}
        </div>
      )}

      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Fundamentals of Nutrition</h1>
        <p className="text-xl text-slate-600">
          Before diving into calculations, let's review the building blocks of a healthy diet.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-6">
        {/* Macronutrients */}
        <button 
            onClick={() => { setActiveTopic('macros'); setMacroTab('carbs'); }}
            className="text-left bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-orange-300 hover:shadow-md transition-all group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    Click to Explore <ChevronRight className="w-3 h-3" />
                </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
                <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <PieChart className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">1. Macronutrients</h3>
            </div>
            <p className="text-slate-600 mb-4 h-12">Nutrients needed in large amounts that provide energy (calories) for the body to function.</p>
            <ul className="text-sm text-slate-600 space-y-2 bg-slate-50 p-4 rounded-lg pointer-events-none">
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> Carbohydrates (4 kcal/g)
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> Proteins (4 kcal/g)
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> Fats (9 kcal/g)
                </li>
            </ul>
        </button>

        {/* Micronutrients */}
        <button 
            onClick={() => setActiveTopic('micros')}
            className="text-left bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all group relative"
        >
             <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    Click to Explore <ChevronRight className="w-3 h-3" />
                </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
                <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Utensils className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">2. Micronutrients</h3>
            </div>
            <p className="text-slate-600 mb-4 h-12">Nutrients needed in smaller amounts. They do not provide energy but are vital for health and metabolism.</p>
            <ul className="text-sm text-slate-600 space-y-2 bg-slate-50 p-4 rounded-lg pointer-events-none">
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Vitamins (A, B, C, D, E, K)
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Minerals (Calcium, Iron, Zinc, etc.)
                </li>
            </ul>
        </button>

        {/* Fibre */}
        <button 
            onClick={() => setActiveTopic('fiber')}
            className="text-left bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all group relative"
        >
             <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-amber-50 text-amber-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    Click to Explore <ChevronRight className="w-3 h-3" />
                </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
                <div className="bg-amber-100 p-3 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <Leaf className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">3. Fibre</h3>
            </div>
            <p className="text-slate-600 mb-4 h-12">A type of complex carbohydrate that the body cannot digest. It is crucial for digestive health.</p>
            <ul className="text-sm text-slate-600 space-y-2 bg-slate-50 p-4 rounded-lg pointer-events-none">
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" /> Soluble Fibre
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" /> Insoluble Fibre
                </li>
            </ul>
        </button>

        {/* Water */}
        <button 
            onClick={() => setActiveTopic('water')}
            className="text-left bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group relative"
        >
             <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    Click to Explore <ChevronRight className="w-3 h-3" />
                </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">4. Water</h3>
            </div>
            <p className="text-slate-600 mb-4 h-12">Essential for life. Makes up ~60% of body weight and is involved in every bodily function.</p>
            <ul className="text-sm text-slate-600 space-y-2 bg-slate-50 p-4 rounded-lg pointer-events-none">
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Hydration & Temperature Regulation
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Nutrient Transport
                </li>
            </ul>
        </button>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onStart}
          className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          I'm ready to calculate
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default NutritionIntro;
