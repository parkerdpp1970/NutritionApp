import React, { useState } from 'react';
import { User, Users, Droplets, Activity, Percent, Info, ChevronRight, Scale } from 'lucide-react';

interface DataPoint {
  label: string;
  fat: string;
  ffm: string;
  muscle: string;
  bone: string;
  water: string;
  muscleOfFFM: string;
  color: string;
  lightColor: string;
  borderColor: string;
  textColor: string;
}

const BodyCompositionExplorer: React.FC = () => {
  const [activeGender, setActiveGender] = useState<'men' | 'women'>('men');

  const data: Record<'men' | 'women', DataPoint> = {
    men: {
      label: 'Men',
      fat: '15-20%',
      ffm: '80-85%',
      muscle: '40%',
      bone: '3-5%',
      water: '55-60%',
      muscleOfFFM: '50%',
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    women: {
      label: 'Women',
      fat: '25-35%',
      ffm: '65-75%',
      muscle: '30-35%',
      bone: '3-4%',
      water: '50-55%',
      muscleOfFFM: '45%',
      color: 'bg-rose-500',
      lightColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-700'
    }
  };

  const current = data[activeGender];

  const StatCard = ({ icon: Icon, label, value, subtext, colorClass }: any) => (
    <div className={`p-5 rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:shadow-md ${current.borderColor}`}>
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${colorClass}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className={`text-2xl font-bold ${current.textColor}`}>{value}</span>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-slate-800">{label}</h3>
        {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 pt-8">
      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
        {/* Header Section */}
        <header className="px-8 py-10 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase mb-4">
            <Activity className="w-3 h-3" /> Health Insights
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Understanding Body Composition
          </h1>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto text-lg">
            A breakdown of total body mass into fat and fat-free compartments based on clinical research data.
          </p>
        </header>

        {/* Gender Toggle */}
        <div className="flex justify-center p-6 bg-white">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl w-full max-w-xs">
            <button
              onClick={() => setActiveGender('men')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                activeGender === 'men' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User className="w-4 h-4" /> Male
            </button>
            <button
              onClick={() => setActiveGender('women')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                activeGender === 'women' ? 'bg-white shadow-sm text-rose-500' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Users className="w-4 h-4" /> Female
            </button>
          </div>
        </div>

        {/* Main Composition Visualization */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* 2-Compartment Visual */}
            <div className={`p-8 rounded-[2rem] ${current.lightColor} border border-transparent transition-colors duration-500`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">2-Compartment View</h2>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-slate-400">
                  <Info className="w-3 h-3" /> Average Population Data
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Fat Mass (FM)</span>
                    <span className={`font-bold ${current.textColor}`}>{current.fat}</span>
                  </div>
                  <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${current.color} transition-all duration-700 ease-out`}
                      style={{ width: current.fat.split('-')[1] || current.fat }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Fat-Free Mass (FFM)</span>
                    <span className="font-bold text-slate-800">{current.ffm}</span>
                  </div>
                  <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-800 transition-all duration-700 ease-out"
                      style={{ width: current.ffm.replace('-', '').split('%')[0] + '%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/50">
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "The standard in most clinical and research settings, splitting body mass into fat and fat-free components."
                </p>
              </div>
            </div>

            {/* Detailed Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                icon={Activity} 
                label="Skeletal Muscle" 
                value={current.muscle} 
                subtext={`~${current.muscleOfFFM} of your FFM`}
                colorClass={current.color}
              />
              <StatCard 
                icon={Droplets} 
                label="Body Water" 
                value={current.water} 
                subtext="Intracellular & extracellular"
                colorClass="bg-cyan-500"
              />
              <StatCard 
                icon={Scale} 
                label="Bone Mineral" 
                value={current.bone} 
                subtext="Bone mineral content"
                colorClass="bg-amber-500"
              />
              <StatCard 
                icon={Percent} 
                label="Other Tissues" 
                value="Varies" 
                subtext="Organs and lean tissues"
                colorClass="bg-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Comparison Table Footer */}
        <div className="m-8 p-6 bg-slate-900 rounded-3xl text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" /> Comparison At A Glance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="pb-3 pr-4">Component</th>
                  <th className="pb-3 px-4">Men (Avg)</th>
                  <th className="pb-3 px-4">Women (Avg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-300">Fat Mass</td>
                  <td className="py-3 px-4 text-blue-400 font-bold">~15-20%</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">~25-35%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-300">Skeletal Muscle</td>
                  <td className="py-3 px-4 text-slate-400 font-bold">~40% BW</td>
                  <td className="py-3 px-4 text-slate-400 font-bold">~30-35% BW</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-300">Total Body Water</td>
                  <td className="py-3 px-4 text-slate-400 font-bold">~55-60%</td>
                  <td className="py-3 px-4 text-slate-400 font-bold">~50-55%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sources Footer */}
        <footer className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
            Data Source: Consensus AI Research Analysis (2025/2026)
          </div>
          <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase">
            <span>Kidwell-Chandler et al.</span>
            <span>Nuijten et al.</span>
            <span>Hamada et al.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BodyCompositionExplorer;