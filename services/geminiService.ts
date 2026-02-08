
import { GoogleGenAI, Type } from "@google/genai";
import { ProblemData, UserSubmission, MuscleMassSubmission, TargetCompositionSubmission, GoalSettingSubmission, EnergyExpenditureSubmission, MacronutrientSubmission, FoodLabelSubmission, AssessmentResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const gradeStudentSubmission = async (
  problem: ProblemData,
  submission: UserSubmission
): Promise<AssessmentResult> => {
  try {
    const prompt = `
      You are an expert Nutrition Professor. A student has submitted an answer for a Body Composition calculation exercise.
      
      Problem Data:
      - Total Body Mass: ${problem.weightKg} kg
      - Body Fat Percentage: ${problem.bodyFatPercentage}%
      
      Student Submission:
      - Calculated Body Fat Mass (BFM): ${submission.calculatedBFM}
      - Calculated Fat-Free Mass (FFM): ${submission.calculatedFFM}
      - Student's Written Working: "${submission.working}"

      Your task:
      1. Calculate the correct BFM and FFM yourself.
      2. Check if the student's final numbers are correct (allow for minor rounding differences of +/- 0.1).
      3. Analyse the student's "Written Working". Did they show the correct steps? Did they convert percentage to decimal correctly? Is the logic sound?
      4. Provide constructive feedback. If they made a mistake, explain where (e.g., "You forgot to convert 20% to 0.2").
      5. Assign a score from 0 to 100 based on both accuracy and the quality of their shown working.
      6. IMPORTANT: Provide all text feedback using UK English spelling (e.g., 'analyse', 'practise', 'centre').

      Return the result in strict JSON format matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            reasoningCritique: { type: Type.STRING },
            corrections: {
              type: Type.OBJECT,
              properties: {
                bfm: { type: Type.NUMBER },
                ffm: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AssessmentResult;

  } catch (error) {
    console.error("Error assessing submission:", error);
    const correctBFM = problem.weightKg * (problem.bodyFatPercentage / 100);
    const correctFFM = problem.weightKg - correctBFM;
    return {
      isCorrect: false,
      score: 0,
      feedback: "There was an error connecting to the grading assistant. Please check your internet connection.",
      reasoningCritique: "Unable to analyse reasoning.",
      corrections: {
        bfm: Number(correctBFM.toFixed(2)),
        ffm: Number(correctFFM.toFixed(2))
      }
    };
  }
};

export const gradeMuscleMassSubmission = async (
  problem: ProblemData,
  submission: MuscleMassSubmission
): Promise<AssessmentResult> => {
  try {
    const prompt = `
      You are an expert Nutrition Professor. A student is estimating Skeletal Muscle Mass (SMM) based on Fat-Free Mass (FFM).
      
      Rules for Calculation (Average Population, non-athlete):
      - Men: SMM is approximately 49% to 50% of FFM.
      - Women: SMM is approximately 41% to 45% of FFM.
      
      Problem Data:
      - Gender: ${problem.gender}
      - Total Body Mass: ${problem.weightKg} kg
      - Body Fat Percentage: ${problem.bodyFatPercentage}%
      
      Student Submission:
      - Calculated FFM: ${submission.calculatedFFM}
      - Estimated SMM (kg): ${submission.calculatedSMM}
      - SMM as % of Total Mass: ${submission.calculatedSMMPercent}%
      - Written Working: "${submission.working}"

      Your task:
      1. Calculate the FFM.
      2. Calculate the valid range for SMM (kg) based on the gender percentages provided above.
      3. Calculate the valid range for SMM % of Total Mass.
      4. Check if the student's answers fall within these valid ranges (allow for rounding).
      5. Review their working. Did they use a percentage within the correct range (e.g., did they use 0.50 for a male, or 0.42 for a female)?
      6. Provide feedback.
      7. IMPORTANT: Provide all text feedback using UK English spelling.

      Return the result in strict JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            reasoningCritique: { type: Type.STRING },
            corrections: {
              type: Type.OBJECT,
              properties: {
                ffm: { type: Type.NUMBER },
                smm: { type: Type.NUMBER },
                smmPercent: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AssessmentResult;

  } catch (error) {
    console.error("Error assessing muscle mass submission:", error);
    return {
      isCorrect: false,
      score: 0,
      feedback: "Error connecting to grading assistant.",
      reasoningCritique: "N/A",
      corrections: {
        ffm: 0,
        smm: 0,
        smmPercent: 0
      }
    };
  }
};

export const gradeTargetCompositionSubmission = async (
  problem: ProblemData,
  submission: TargetCompositionSubmission
): Promise<AssessmentResult> => {
  try {
    const prompt = `
      You are an expert Nutrition Professor. A student is calculating the Target Body Mass required to achieve a specific body fat percentage, assuming Fat-Free Mass (FFM) remains constant.
      
      Problem Data:
      - Current Total Mass: ${problem.weightKg} kg
      - Current Body Fat %: ${problem.bodyFatPercentage}%
      - Goal Body Fat %: ${problem.targetBodyFatPercentage}%
      
      The Formula typically taught is:
      1. Calculate Current FFM = Current Mass * (1 - Current BF Decimal)
      2. Target Body Mass = Current FFM / (1 - Goal BF Decimal)
      3. Mass Loss Required = Current Mass - Target Body Mass
      
      Student Submission:
      - Calculated Current FFM: ${submission.currentFFM}
      - Calculated Target Body Mass: ${submission.targetBodyMass}
      - Calculated Mass Loss Required: ${submission.massLossRequired}
      - Written Working: "${submission.working}"

      Your task:
      1. Perform the calculations yourself.
      2. Grade the student's submission. Allow for minor rounding differences (+/- 0.2kg).
      3. Critically analyse their working out.
      4. Provide clear, encouraging feedback explaining the steps if they got it wrong.
      5. IMPORTANT: Provide all text feedback using UK English spelling.

      Return the result in strict JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            reasoningCritique: { type: Type.STRING },
            corrections: {
              type: Type.OBJECT,
              properties: {
                ffm: { type: Type.NUMBER },
                targetBodyMass: { type: Type.NUMBER },
                massLossRequired: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AssessmentResult;

  } catch (error) {
    console.error("Error assessing target composition submission:", error);
    return {
      isCorrect: false,
      score: 0,
      feedback: "Error connecting to grading assistant.",
      reasoningCritique: "N/A",
      corrections: {
        ffm: 0,
        targetBodyMass: 0,
        massLossRequired: 0
      }
    };
  }
};

export const gradeGoalSettingSubmission = async (
  problem: ProblemData,
  submission: GoalSettingSubmission
): Promise<AssessmentResult> => {
  try {
    const prompt = `
      You are an expert Nutrition Professor. A student is setting a SMART goal for a client based on physiological data and lifestyle constraints.
      
      Client Profile:
      - Name: ${problem.clientName}
      - Age: ${problem.age} years old
      - Height: ${problem.heightCm} cm
      - Experience: ${problem.experienceLevel}
      - Current Stats: ${problem.weightKg} kg, ${problem.bodyFatPercentage}% Body Fat.
      - Occupation: ${problem.occupation}
      - Lifestyle Factors: ${problem.lifestyle}
      - Training Availability: ${problem.trainingAvailability}
      - Client's Stated Desire: "${problem.clientGoal}"
      
      Student Submission Data:
      1. Calculated Current Fat Mass: ${submission.currentFatMass} kg
      2. Proposed Fat Loss: ${submission.fatLossTarget} kg at ${submission.fatLossRate} kg/week -> Est Time: ${submission.fatLossWeeks} weeks.
      3. Proposed Muscle Gain: ${submission.muscleGainTarget} kg at ${submission.muscleGainRate} kg/month -> Est Time: ${submission.muscleGainMonths} months.
      4. SMART Objective: "${submission.smartGoal}"
      
      Guidelines for Grading:
      1. **Physiological Accuracy**: Check the Current Fat Mass calculation.
      2. **Mathematical Consistency**: Check if Time = Total Amount / Rate.
      3. **Realism & "Achievability" (CRITICAL)**: 
         - Does the plan respect the client's lifestyle?
         - CONSIDER AGE: Older clients (40+) may need slower muscle gain rates or fat loss rates than 20-year-olds due to recovery.
         - CONSIDER HEIGHT/WEIGHT: Is the client already quite light/short? Or tall/heavy? 
         - If the client is high stress/low availability, is the rate conservative (e.g. 0.5kg/week)? Aggressive rates (>0.8kg/week) should be penalized for stressed/busy clients.
         - If the client wants unrealistic results (e.g., "get shredded in 4 weeks" while working 60h/week), the student MUST have set a MORE realistic goal or explained the compromise.
         - The student's goal should balance the client's desire with their reality.
      4. **SMART Structure**: Does the objective text include Start, Action, Target, and Time?
      5. IMPORTANT: Provide all text feedback using UK English spelling.
      
      Your Task:
      - Validate the math.
      - Critically assess if the goal is REALISTIC for THIS specific client persona.
      - Provide feedback specifically on whether the chosen rate fits the lifestyle.
      
      Return result in JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            reasoningCritique: { type: Type.STRING },
            corrections: {
              type: Type.OBJECT,
              properties: {
                currentFatMass: { type: Type.NUMBER },
                fatLossWeeks: { type: Type.NUMBER },
                muscleGainMonths: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AssessmentResult;

  } catch (error) {
    console.error("Error assessing goal setting submission:", error);
    const fm = problem.weightKg * (problem.bodyFatPercentage / 100);
    return {
      isCorrect: false,
      score: 0,
      feedback: "Error connecting to grading assistant.",
      reasoningCritique: "N/A",
      corrections: {
        currentFatMass: Number(fm.toFixed(2)),
        fatLossWeeks: 0,
        muscleGainMonths: 0
      }
    };
  }
};

export const gradeEnergyExpenditureSubmission = async (
  problem: ProblemData,
  submission: EnergyExpenditureSubmission
): Promise<AssessmentResult> => {
  try {
    const prompt = `
      You are an expert Nutrition Professor. A student is calculating Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).
      
      Using the Mifflin-St Jeor Equation:
      - Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
      - Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
      
      Client Data:
      - Gender: ${problem.gender}
      - Weight: ${problem.weightKg} kg
      - Height: ${problem.heightCm} cm
      - Age: ${problem.age} years
      - Activity Level: ${problem.activityLevel} (Multiplier: ${problem.activityMultiplier})
      
      Student Submission:
      - Calculated BMR: ${submission.calculatedBMR}
      - Calculated TDEE: ${submission.calculatedTDEE}
      - Working: "${submission.working}"
      
      Your Task:
      1. Calculate the true BMR using Mifflin-St Jeor.
      2. Calculate the true TDEE (BMR * Activity Multiplier).
      3. Grade the student's accuracy (allow for rounding differences of +/- 10-20 kcal).
      4. Review their working out for the correct formula application.
      5. Provide constructive feedback using UK English spelling.
      
      Return result in JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            reasoningCritique: { type: Type.STRING },
            corrections: {
              type: Type.OBJECT,
              properties: {
                bmr: { type: Type.NUMBER },
                tdee: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AssessmentResult;
  } catch (error) {
    console.error("Error assessing energy expenditure submission:", error);
    return {
      isCorrect: false,
      score: 0,
      feedback: "Error connecting to grading assistant.",
      reasoningCritique: "N/A",
      corrections: {
        bmr: 0,
        tdee: 0
      }
    };
  }
};

export const gradeMacronutrientSubmission = async (
  problem: ProblemData,
  submission: MacronutrientSubmission
): Promise<AssessmentResult> => {
  try {
    const prompt = `
      You are an expert Nutrition Professor. A student is calculating Macronutrient Gram targets based on a client's TDEE and a specific macronutrient percentage split.
      
      Calculations needed:
      - Carbohydrates: 4 kcal per gram
      - Protein: 4 kcal per gram
      - Fat: 9 kcal per gram
      
      Client Data:
      - TDEE: ${problem.tdee} kcal
      - Assigned Split: ${problem.macroSplit?.carbs}% Carbs / ${problem.macroSplit?.protein}% Protein / ${problem.macroSplit?.fat}% Fat
      - Goal: ${problem.clientGoal}
      
      Student Submission:
      - Carbs: ${submission.carbsGrams}g
      - Protein: ${submission.proteinGrams}g
      - Fats: ${submission.fatGrams}g
      - Working: "${submission.working}"
      
      Your Task:
      1. Calculate the exact grams required for Carbs, Protein, and Fat based on the TDEE and % split.
      2. Verify the math: (Total Kcal * Percentage) / Energy Density of Nutrient.
      3. Grade the student's values (allow +/- 3g rounding error).
      4. Provide constructive feedback using UK English spelling (e.g., 'fibre', 'centre').
      
      Return result in JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            reasoningCritique: { type: Type.STRING },
            corrections: {
              type: Type.OBJECT,
              properties: {
                carbsGrams: { type: Type.NUMBER },
                proteinGrams: { type: Type.NUMBER },
                fatGrams: { type: Type.NUMBER },
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AssessmentResult;
  } catch (error) {
    console.error("Error assessing macronutrient submission:", error);
    return {
      isCorrect: false,
      score: 0,
      feedback: "Error connecting to grading assistant.",
      reasoningCritique: "N/A",
      corrections: {
        carbsGrams: 0,
        proteinGrams: 0,
        fatGrams: 0,
      }
    };
  }
};

export const gradeFoodLabelSubmission = async (
  problem: ProblemData,
  submission: FoodLabelSubmission
): Promise<AssessmentResult> => {
  try {
    const prompt = `
      You are an expert Nutritionist assessing a student's ability to interpret food labels according to UK labelling laws.
      
      Product Details:
      - Name: ${problem.productName}
      - Nutrition Info (per 100g): 
        - Energy: ${problem.nutritionInfo?.energyKcal} kcal
        - Fat: ${problem.nutritionInfo?.fat}g (Saturates: ${problem.nutritionInfo?.saturates}g)
        - Carbs: ${problem.nutritionInfo?.carbs}g (Sugars: ${problem.nutritionInfo?.sugars}g)
        - Protein: ${problem.nutritionInfo?.protein}g
        - Salt: ${problem.nutritionInfo?.salt}g
      - Ingredients List: "${problem.ingredients}"
      
      Client's Question: "${problem.clientQuestion}"
      
      Student's Recorded Response: "${submission.userResponse}"
      
      Your Task:
      1. Analyze the product data. Is it high/low in fat, sugar, or salt based on UK Traffic Light standards? Does it contain specific allergens mentioned in the question?
      2. Evaluate the student's answer. 
         - Did they correctly interpret the label data?
         - Did they answer the specific question asked by the client?
         - Is the advice safe and accurate?
      3. Provide constructive feedback using UK English spelling.
      
      Return result in JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            reasoningCritique: { type: Type.STRING },
            corrections: {
              type: Type.OBJECT,
              properties: {
                // No specific numeric corrections needed for text analysis
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AssessmentResult;
  } catch (error) {
    console.error("Error assessing food label submission:", error);
    return {
      isCorrect: false,
      score: 0,
      feedback: "Error connecting to grading assistant.",
      reasoningCritique: "N/A",
      corrections: {}
    };
  }
};
