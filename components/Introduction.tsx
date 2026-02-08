
import React from 'react';
import { ArrowRight, Target, Users, Activity, Scale, Info, PlayCircle } from 'lucide-react';

const Introduction: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Body Composition Analysis</h1>
        <p className="text-xl text-slate-600">
          Essential calculations for fitness professionals to manage client body mass goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Aim Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Aim of these Activities</h2>
          <p className="text-slate-600 leading-relaxed flex-grow">
            The aim of these activities is to develop a comprehensive understanding of body composition. You will learn to analyse key aspects of body mass and apply this knowledge to calculate accurate metrics and set effective, client-specific SMART body composition targets.
          </p>
        </div>

        {/* Importance Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Why it Matters</h2>
          <p className="text-slate-600 leading-relaxed flex-grow">
            Many people have goals of managing their body weight, and this directly relates to body composition. Weight alone doesn't tell the full story. Understanding the proportion of fat and fat-free mass is crucial for fitness professionals to give effective advice.
          </p>
        </div>
      </div>

      {/* Mass vs Weight Section */}
      <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-yellow-400/20 p-2 rounded-lg">
                  <Scale className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Weight vs. Mass: A Crucial Distinction</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">The UK Context</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        In the UK (and in everyday language), we often use the term "weight" incorrectly. We might say "I weigh 70kg". However, scientifically speaking, this is inaccurate.
                    </p>
                    <p className="text-slate-300 leading-relaxed border-l-4 border-yellow-400/50 pl-4">
                        <strong>Weight</strong> is actually a force – it is the measure of gravity pulling on an object (measured in Newtons). Your weight would change if you stood on the Moon.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">What is Body Mass?</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        <strong>Body Mass</strong> refers to the total amount of matter ("stuff") that makes up your body. This includes your muscles, bones, fat, water, and organs.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                        Unlike weight, your <strong>mass</strong> remains the same regardless of gravity. It is the true quantity of biological material you are made of.
                    </p>
                </div>
            </div>

            {/* Video Button */}
            <div className="flex justify-center mb-8">
                <a 
                    href="https://youtu.be/U78NOo-oxOY?si=nrAe-qb6BZBSxCno" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <PlayCircle className="w-6 h-6" />
                    <span>Watch: Weight vs Mass Explained</span>
                </a>
            </div>

            <div className="p-5 bg-white/10 rounded-xl border border-white/10">
                <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-sky-400 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-white mb-2 text-lg">Why is it measured in Kilograms (kg)?</h4>
                        <p className="text-slate-300 text-base leading-relaxed">
                            We measure body mass in <strong>kilograms</strong> because the kilogram is the standard base unit for mass in the International System of Units (SI). It provides a constant, universal standard for quantifying the amount of substance in the human body, which is essential for accurate calculations in nutrition and medicine.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Definition Card */}
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="bg-emerald-50 w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center">
            <Activity className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Body Composition</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              While mass tells us "how much" matter there is, <strong>body composition</strong> tells us what that matter is made of.
            </p>
            <p className="text-slate-600 leading-relaxed">
              In this application, you will practise:
            </p>
            <ul className="list-disc list-inside mt-2 text-slate-600 space-y-1 ml-2">
              <li>Calculating <strong>Fat Mass</strong> from bio-electrical impedance percentages.</li>
              <li>Calculating <strong>Fat-Free Mass</strong> (everything that isn't fat).</li>
              <li>Estimating <strong>Skeletal Muscle Mass</strong>.</li>
              <li>Setting and tracking <strong>SMART body composition goals</strong>.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onStart}
          className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Start Learning Guide
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Introduction;
