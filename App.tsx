
import React, { useState } from 'react';
import Layout from './components/Layout';
import Introduction from './components/Introduction'; // Kept for legacy if needed, but unused in new flow
import AimsAndObjectives from './components/AimsAndObjectives';
import BodyCompositionIntro from './components/BodyCompositionIntro';
import NutritionIntro from './components/NutritionIntro';
import Lesson from './components/Lesson';
import EnergyLesson from './components/EnergyLesson';
import LearningGuide from './components/LearningGuide';
import MuscleLearningGuide from './components/MuscleLearningGuide';
import TargetCompositionGuide from './components/TargetCompositionGuide';
import CompositionChangeGuide from './components/CompositionChangeGuide';
import GoalSettingGuide from './components/GoalSettingGuide';
import EnergyExpenditureGuide from './components/EnergyExpenditureGuide';
import MacronutrientGuide from './components/MacronutrientGuide';
import FoodLabelGuide from './components/FoodLabelGuide';
import PracticeActivity from './components/PracticeActivity';
import MuscleMassActivity from './components/MuscleMassActivity';
import TargetCompositionActivity from './components/TargetCompositionActivity';
import CompositionChangeActivity from './components/CompositionChangeActivity';
import GoalSettingActivity from './components/GoalSettingActivity';
import EnergyExpenditureActivity from './components/EnergyExpenditureActivity';
import EnergyExpenditurePersonalActivity from './components/EnergyExpenditurePersonalActivity';
import MacronutrientActivity from './components/MacronutrientActivity';
import FoodLabelActivity from './components/FoodLabelActivity';
import BodyCompositionExplorer from './components/BodyCompositionExplorer';
import CaseStudies from './components/CaseStudies';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('aims');

  // Simple router based on state
  const renderContent = () => {
    switch (activeTab) {
      case 'aims':
        return <AimsAndObjectives onStartCourse={() => setActiveTab('body-intro')} />;
      case 'body-intro':
        return <BodyCompositionIntro onStart={() => setActiveTab('norms')} />;
      case 'lesson':
        return <Lesson />;
      case 'norms':
        return <BodyCompositionExplorer />;
      case 'learn':
        return <LearningGuide onStartPractice={() => setActiveTab('practice')} />;
      case 'practice':
        return <PracticeActivity />;
      case 'muscle-guide':
        return <MuscleLearningGuide onStartPractice={() => setActiveTab('muscle')} />;
      case 'muscle':
        return <MuscleMassActivity />;
      case 'target-guide':
        return <TargetCompositionGuide onStartPractice={() => setActiveTab('target-activity')} />;
      case 'target-activity':
        return <TargetCompositionActivity />;
      case 'change-guide':
        return <CompositionChangeGuide onStartPractice={() => setActiveTab('change-activity')} />;
      case 'change-activity':
        return <CompositionChangeActivity />;
      case 'goal-guide':
        return <GoalSettingGuide onStartPractice={() => setActiveTab('goal-activity')} />;
      case 'goal-activity':
        return <GoalSettingActivity />;
      case 'energy-lesson':
        return <EnergyLesson />;
      case 'energy-guide':
        return <EnergyExpenditureGuide onStartPractice={() => setActiveTab('energy-activity')} />;
      case 'energy-activity':
        return <EnergyExpenditureActivity />;
      case 'energy-personal':
        return <EnergyExpenditurePersonalActivity />;
      case 'nutrition-intro':
        return <NutritionIntro onStart={() => setActiveTab('macro-guide')} />;
      case 'macro-guide':
        return <MacronutrientGuide onStartPractice={() => setActiveTab('macro-activity')} />;
      case 'macro-activity':
        return <MacronutrientActivity />;
      case 'label-guide':
        return <FoodLabelGuide onStartPractice={() => setActiveTab('label-activity')} />;
      case 'label-activity':
        return <FoodLabelActivity />;
      case 'case-studies':
        return <CaseStudies />;
      default:
        return <AimsAndObjectives onStartCourse={() => setActiveTab('body-intro')} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
