
import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, Play, Send, ScanLine, RotateCcw, MessageSquare, AlertTriangle } from 'lucide-react';
import { ProblemData, AssessmentResult } from '../types';
import { gradeFoodLabelSubmission } from '../services/geminiService';

// Mock Product Data Generator
const PRODUCTS = [
  {
    name: "Super-Crunch Granola",
    nutrition: { energy: 450, fat: 18, saturates: 4.5, carbs: 65, sugars: 22, protein: 8, salt: 0.05 },
    ingredients: "Oats (60%), Sugar, Vegetable Oil, Honey (4%), Dried Banana, Almonds, Natural Flavouring.",
    questions: [
      "I'm trying to reduce my sugar intake. Is this a good breakfast option?",
      "Does this contain nuts? I have a mild allergy.",
      "Is this considered a low-fat food?"
    ]
  },
  {
    name: "Creamy Tomato Soup",
    nutrition: { energy: 58, fat: 3.5, saturates: 0.4, carbs: 5.2, sugars: 3.8, protein: 0.9, salt: 0.7 },
    ingredients: "Water, Tomatoes (30%), Vegetable Oil, Sugar, Modified Cornflour, Salt, Dried Skimmed Milk, Spices.",
    questions: [
      "I'm watching my salt intake for my blood pressure. Is this soup high in salt?",
      "I am vegan. Can I eat this soup?",
      "Is this a high protein meal?"
    ]
  },
  {
    name: "Protein Power Bar",
    nutrition: { energy: 380, fat: 14, saturates: 9, carbs: 35, sugars: 28, protein: 22, salt: 0.3 },
    ingredients: "Milk Protein Blend, Milk Chocolate Coating (Sugar, Cocoa Butter, Whole Milk Powder), Caramel Layer, Palm Oil, Peanuts.",
    questions: [
      "I want a low sugar snack. Is this suitable?",
      "Does this contain saturated fat?",
      "Is this gluten-free based on the ingredients?"
    ]
  },
  {
    name: "Frozen Veggie Burger",
    nutrition: { energy: 180, fat: 8, saturates: 1.1, carbs: 16, sugars: 2, protein: 12, salt: 1.2 },
    ingredients: "Rehydrated Soya Protein (55%), Rapeseed Oil, Onion, Wheat Flour (Calcium Carbonate, Iron, Niacin, Thiamin), Salt, Yeast Extract.",
    questions: [
      "I have Celiac disease (gluten intolerance). Is this safe?",
      "Is this high in saturated fat?",
      "What is the main ingredient in this burger?"
    ]
  }
];

const generateProblem = (): ProblemData => {
  const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
  const question = product.questions[Math.floor(Math.random() * product.questions.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    weightKg: 0, // Not needed
    bodyFatPercentage: 0, // Not needed
    difficulty: 'medium',
    productName: product.name,
    nutritionInfo: {
        energyKcal: product.nutrition.energy,
        fat: product.nutrition.fat,
        saturates: product.nutrition.saturates,
        carbs: product.nutrition.carbs,
        sugars: product.nutrition.sugars,
        protein: product.nutrition.protein,
        salt: product.nutrition.salt
    },
    ingredients: product.ingredients,
    clientQuestion: question
  };
};

// Helper to determine traffic light color for UI visualization only (simplified UK standards)
const getTrafficLight = (type: 'fat' | 'saturates' | 'sugars' | 'salt', value: number) => {
    if (type === 'fat') return value > 17.5 ? 'bg-red-500' : value > 3 ? 'bg-amber-500' : 'bg-green-500';
    if (type === 'saturates') return value > 5 ? 'bg-red-500' : value > 1.5 ? 'bg-amber-500' : 'bg-green-500';
    if (type === 'sugars') return value > 22.5 ? 'bg-red-500' : value > 5 ? 'bg-amber-500' : 'bg-green-500';
    if (type === 'salt') return value > 1.5 ? 'bg-red-500' : value > 0.3 ? 'bg-amber-500' : 'bg-green-500';
    return 'bg-slate-200';
};

const FoodLabelActivity: React.FC = () => {
  const [problem, setProblem] = useState<ProblemData | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    setProblem(generateProblem());
  }, []);

  const handleNextProblem = () => {
    setProblem(generateProblem());
    setUserResponse('');
    setResult(null);
  };

  const handleRetryCurrent = () => {
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!problem) return;
    if (!userResponse.trim()) {
      alert("Please record your response to the client.");
      return;
    }

    setIsSubmitting(true);
    try {
      const assessment = await gradeFoodLabelSubmission(problem, {
        problemId: problem.id,
        userResponse: userResponse
      });
      setResult(assessment);
    } catch (e) {
      console.error(e);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) return <div className="p-12 text-center">Loading activity...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Label Analysis</h1>
          <p className="text-slate-500">Interpret the product information to answer the client's query.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column: The "Product" */}
        <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 p-4">
                    <h3 className="font-bold text-lg text-slate-900">{problem.productName}</h3>
                </div>
                
                {/* Nutrition Table */}
                <div className="p-4">
                    <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Nutrition Information</h4>
                    <table className="w-full text-sm border-collapse border border-slate-200">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="border border-slate-200 p-2 text-left">Typical Values</th>
                                <th className="border border-slate-200 p-2 text-right">Per 100g</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-slate-200 p-2">Energy</td>
                                <td className="border border-slate-200 p-2 text-right">{problem.nutritionInfo?.energyKcal} kcal</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-200 p-2 font-semibold">Fat</td>
                                <td className="border border-slate-200 p-2 text-right flex justify-end items-center gap-2">
                                    {problem.nutritionInfo?.fat}g
                                    <div className={`w-2 h-2 rounded-full ${getTrafficLight('fat', problem.nutritionInfo?.fat || 0)}`}></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-200 p-2 pl-4 text-slate-500">of which saturates</td>
                                <td className="border border-slate-200 p-2 text-right flex justify-end items-center gap-2">
                                    {problem.nutritionInfo?.saturates}g
                                     <div className={`w-2 h-2 rounded-full ${getTrafficLight('saturates', problem.nutritionInfo?.saturates || 0)}`}></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-200 p-2 font-semibold">Carbohydrate</td>
                                <td className="border border-slate-200 p-2 text-right">{problem.nutritionInfo?.carbs}g</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-200 p-2 pl-4 text-slate-500">of which sugars</td>
                                <td className="border border-slate-200 p-2 text-right flex justify-end items-center gap-2">
                                    {problem.nutritionInfo?.sugars}g
                                     <div className={`w-2 h-2 rounded-full ${getTrafficLight('sugars', problem.nutritionInfo?.sugars || 0)}`}></div>
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-slate-200 p-2 font-semibold">Protein</td>
                                <td className="border border-slate-200 p-2 text-right">{problem.nutritionInfo?.protein}g</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-200 p-2 font-semibold">Salt</td>
                                <td className="border border-slate-200 p-2 text-right flex justify-end items-center gap-2">
                                    {problem.nutritionInfo?.salt}g
                                     <div className={`w-2 h-2 rounded-full ${getTrafficLight('salt', problem.nutritionInfo?.salt || 0)}`}></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Ingredients */}
                <div className="p-4 border-t border-slate-100">
                     <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Ingredients</h4>
                     <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
                        {problem.ingredients}
                     </p>
                </div>
            </div>
        </div>

        {/* Right Column: The Question & Response */}
        <div className="md:col-span-7 space-y-6">
            
            {/* The Question Card */}
            <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl flex gap-4">
                <div className="bg-white p-3 rounded-full h-fit border border-purple-100 shadow-sm text-purple-600">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-purple-900 mb-2">Client Question</h3>
                    <p className="text-lg font-medium text-purple-800 italic">"{problem.clientQuestion}"</p>
                </div>
            </div>

            {/* Response Area */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Record your response
                    <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-slate-600 mb-3">
                    Analyze the label data. Is the product suitable? Explain why using the nutritional values or ingredients list.
                </p>
                <textarea
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    disabled={!!result}
                    placeholder="E.g., No, this is not suitable because the sugar content is very high (22g per 100g), which puts it in the 'red' traffic light category..."
                    className="w-full h-40 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none disabled:bg-slate-50 disabled:text-slate-500"
                />
            </div>

            {/* Actions */}
            {!result && (
                <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
                    isSubmitting ? 'bg-slate-400 cursor-wait' : 'bg-purple-600 hover:bg-purple-700 hover:-translate-y-1 hover:shadow-xl'
                }`}
                >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing Response...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Submit Advice
                    </span>
                )}
                </button>
            )}

            {/* Feedback */}
            {result && (
                 <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden animate-in zoom-in-95 duration-300">
                    <div className={`p-6 border-b ${result.isCorrect ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                        <div className="flex items-center gap-3 mb-2">
                        {result.isCorrect ? (
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        ) : (
                            <AlertCircle className="w-8 h-8 text-amber-600" />
                        )}
                        <div>
                            <h3 className={`font-bold text-lg ${result.isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                            {result.isCorrect ? 'Great Advice!' : 'Review Your Analysis'}
                            </h3>
                            <p className={`text-sm ${result.isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                            Score: {result.score}/100
                            </p>
                        </div>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <h4 className="font-semibold text-slate-900 mb-2 text-sm uppercase tracking-wide">Feedback</h4>
                        <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                            {result.feedback}
                        </p>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3">
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
                        className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                        <Play className="w-4 h-4" /> Next Product
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FoodLabelActivity;
