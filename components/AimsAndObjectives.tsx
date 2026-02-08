
import React, { useState } from 'react';
import { Layers, Zap, PieChart, ScanLine, ArrowRight, Target, GraduationCap, Users, X, CheckCircle2, Search, MessageCircle } from 'lucide-react';

interface TopicDetail {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  aims: string[];
  relevance: string;
}

const TOPICS: TopicDetail[] = [
  {
    id: 'body-comp',
    title: 'Body Composition',
    icon: Layers,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    aims: [
      "Differentiate between Body Mass and Weight.",
      "Calculate Fat Mass (FM) and Fat-Free Mass (FFM) from Bio-Electrical Impedance data.",
      "Estimate Skeletal Muscle Mass based on gender-specific variables.",
      "Analyze changes in composition over time (not just scale weight)."
    ],
    relevance: "Scale weight can be deceptive. A client might lose muscle and gain fat while staying the same weight. Understanding composition allows you to set safer, more effective goals."
  },
  {
    id: 'energy',
    title: 'Energy Expenditure',
    icon: Zap,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    aims: [
      "Define Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).",
      "Apply the Mifflin-St Jeor equation accurately.",
      "Determine appropriate Physical Activity Level (PAL) multipliers.",
      "Calculate personal energy needs for clients."
    ],
    relevance: "Energy balance is the fundamental law of weight management. Without knowing a client's expenditure, any diet plan is just a guess. Precision builds trust."
  },
  {
    id: 'macros',
    title: 'Macronutrients',
    icon: PieChart,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    aims: [
      "Identify the three macronutrients and their energy density values (4, 4, 9 kcal/g).",
      "Interpret UK Eatwell Guide recommendations.",
      "Calculate daily gram targets for Carbohydrates, Proteins, and Fats based on TDEE.",
      "Adjust ratios based on client goals (e.g., muscle gain vs. endurance)."
    ],
    relevance: "Calories determine weight, but macronutrients determine how you feel, perform, and recover. Tailoring these to the client prevents burnout and hunger."
  },
  {
    id: 'labels',
    title: 'Food Labelling',
    icon: ScanLine,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    aims: [
      "Interpret UK Nutrition labels (per 100g vs per portion).",
      "Understand the 'Traffic Light' system for Fat, Sugar, and Salt.",
      "Identify allergens and ingredient hierarchy.",
      "Critically analyse 'health halo' products."
    ],
    relevance: "Clients spend their lives in supermarkets, not gyms. Teaching them to navigate food labels empowers them to make better choices when you aren't there."
  }
];

const AimsAndObjectives: React.FC<{ onStartCourse: () => void }> = ({ onStartCourse }) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null);

  return (
    <div className="animate-in fade-in duration-700 relative">
      
      {/* Modal for Topic Details */}
      {selectedTopic && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedTopic(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-6 ${selectedTopic.bgColor} border-b ${selectedTopic.borderColor} flex justify-between items-center`}>
               <div className="flex items-center gap-3">
                  <div className={`p-2 bg-white rounded-lg shadow-sm ${selectedTopic.color}`}>
                    <selectedTopic.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">{selectedTopic.title}</h2>
               </div>
               <button onClick={() => setSelectedTopic(null)} className="p-2 hover:bg-white/50 rounded-full transition-colors">
                 <X className="w-6 h-6 text-slate-500" />
               </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
               <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-slate-500" />
                    Aims & Objectives
                  </h3>
                  <ul className="space-y-3">
                    {selectedTopic.aims.map((aim, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-700 leading-relaxed">
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${selectedTopic.color} mt-0.5`} />
                        <span>{aim}</span>
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <h3 className="text-md font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-slate-500" />
                    Why it matters as a fitness professional
                  </h3>
                  <p className="text-slate-600 italic leading-relaxed">
                    "{selectedTopic.relevance}"
                  </p>
               </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedTopic(null)} 
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-widest uppercase">
                <GraduationCap className="w-4 h-4" /> Nutrition & Body Management
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Course Aims & Objectives
            </h1>
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 max-w-4xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Overarching Aim</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                    The aim of this application is to develop your <strong className="text-slate-900">knowledge, skills, and behaviour</strong> in being able to give sound nutritional advice. 
                </p>
                <div className="my-6 border-t border-slate-100"></div>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div className="flex gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg h-fit">
                            <Search className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Evidence Gathering</h4>
                            <p className="text-sm text-slate-600">Develop the ability to gather and analyse physiological data accurately.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                         <div className="bg-purple-50 p-3 rounded-lg h-fit">
                            <MessageCircle className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Questioning Skills</h4>
                            <p className="text-sm text-slate-600">Develop questioning skills to understand client needs and help them reach health & fitness goals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Core Topics</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            {TOPICS.map((topic) => (
                <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className="group bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all text-left flex flex-col h-full"
                >
                    <div className={`w-14 h-14 rounded-2xl ${topic.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                        <topic.icon className={`w-7 h-7 ${topic.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {topic.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 flex-grow">
                        Click to view the detailed aims and professional relevance for this section.
                    </p>
                    <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                        View Objectives <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
            ))}
        </div>

        <div className="flex justify-center">
            <button
                onClick={onStartCourse}
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
                Start Learning
                <ArrowRight className="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default AimsAndObjectives;
