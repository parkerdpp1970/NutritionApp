
export interface ProblemData {
  id: string;
  weightKg: number;
  bodyFatPercentage: number;
  targetBodyFatPercentage?: number; // Added for Target Composition activity
  gender?: 'male' | 'female'; // Added for Muscle Mass activity
  difficulty: 'easy' | 'medium' | 'hard';
  clientName?: string; // For Goal Setting
  age?: number; // New: Age for Goal Setting context
  heightCm?: number; // New: Height for Goal Setting context
  clientGoal?: string; // For Goal Setting description
  experienceLevel?: 'Beginner' | 'Intermediate' | 'Advanced'; // For Goal Setting
  occupation?: string; // New: Context for Goal Setting
  lifestyle?: string; // New: Context for Goal Setting (stress, sleep, diet)
  trainingAvailability?: string; // New: Context for Goal Setting
  activityLevel?: string; // New: For Energy Expenditure (e.g., "Sedentary", "Lightly Active")
  activityMultiplier?: number; // New: For Energy Expenditure (e.g., 1.2, 1.375)
  // New for Macronutrients
  tdee?: number;
  macroSplit?: { carbs: number; protein: number; fat: number }; // Percentages e.g., 50, 30, 20
  
  // New for Food Labels
  productName?: string;
  nutritionInfo?: {
    energyKcal: number;
    fat: number;
    saturates: number;
    carbs: number;
    sugars: number;
    protein: number;
    salt: number;
  };
  ingredients?: string;
  clientQuestion?: string; // The specific question the client asks about the label
}

export interface UserSubmission {
  problemId: string;
  working: string;
  calculatedBFM: string;
  calculatedFFM: string;
}

export interface MuscleMassSubmission {
  problemId: string;
  working: string;
  calculatedFFM: string;
  calculatedSMM: string; // Skeletal Muscle Mass in kg
  calculatedSMMPercent: string; // SMM as % of Total Mass
}

export interface TargetCompositionSubmission {
  problemId: string;
  working: string;
  currentFFM: string;
  targetBodyMass: string;
  massLossRequired: string;
}

export interface GoalSettingSubmission {
  problemId: string;
  currentFatMass: string;
  fatLossTarget: string; // kg to lose
  fatLossRate: string; // kg per week
  fatLossWeeks: string;
  muscleGainTarget: string; // kg to gain
  muscleGainRate: string; // kg per month
  muscleGainMonths: string;
  smartGoal: string;
}

export interface EnergyExpenditureSubmission {
  problemId: string;
  working: string;
  calculatedBMR: string;
  calculatedTDEE: string;
}

export interface MacronutrientSubmission {
  problemId: string;
  working: string;
  carbsGrams: string;
  proteinGrams: string;
  fatGrams: string;
}

export interface FoodLabelSubmission {
  problemId: string;
  userResponse: string; // The student's answer to the client's question
}

export interface AssessmentResult {
  isCorrect: boolean;
  score: number; // 0 to 100
  feedback: string;
  corrections: {
    bfm?: number;
    ffm?: number;
    smm?: number;
    smmPercent?: number;
    targetBodyMass?: number;
    massLossRequired?: number;
    // Goal Setting corrections
    currentFatMass?: number;
    fatLossWeeks?: number;
    muscleGainMonths?: number;
    // Energy Expenditure corrections
    bmr?: number;
    tdee?: number;
    // Macronutrient corrections
    carbsGrams?: number;
    proteinGrams?: number;
    fatGrams?: number;
  };
  reasoningCritique: string;
}

export enum ActivityState {
  LEARN = 'LEARN',
  PRACTICE = 'PRACTICE',
  MUSCLE_MASS = 'MUSCLE_MASS',
  TARGET_COMPOSITION = 'TARGET_COMPOSITION',
  GOAL_SETTING = 'GOAL_SETTING',
  ENERGY_EXPENDITURE = 'ENERGY_EXPENDITURE',
  ENERGY_EXPENDITURE_PERSONAL = 'ENERGY_EXPENDITURE_PERSONAL',
  MACRONUTRIENT_BALANCE = 'MACRONUTRIENT_BALANCE',
  FOOD_LABELS = 'FOOD_LABELS',
}
