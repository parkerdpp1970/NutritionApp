
import React, { useState, useEffect } from 'react';
import { BookOpen, Calculator, BicepsFlexed, FileText, Target, TrendingUp, Calendar, ChevronDown, Scale, Info, Presentation, Users, Activity, Layers, Play, Zap, UserCircle, PieChart, ScanLine, GraduationCap, ClipboardCheck, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface ActivityGroup {
  id: number;
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [openActivity, setOpenActivity] = useState<number | null>(null);
  
  // Sidebar visibility states
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);

  // Group open states
  const [bodyCompOpen, setBodyCompOpen] = useState(false);
  const [energyExpOpen, setEnergyExpOpen] = useState(false);
  const [nutritionOpen, setNutritionOpen] = useState(false);
  const [foodLabelOpen, setFoodLabelOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  const activities: ActivityGroup[] = [
    {
        id: 100,
        title: "1. Introduction to Mass",
        icon: Info,
        items: [
            { id: 'body-intro', label: 'Weight vs. Mass', icon: BookOpen }
        ]
    },
    {
      id: 0,
      title: "Interactive Lesson",
      icon: Presentation,
      items: [
        { id: 'lesson', label: 'Start Lesson', icon: Play }
      ]
    },
    {
      id: 1,
      title: "2. Reference Data",
      icon: Users,
      items: [
        { id: 'norms', label: 'Interactive Model', icon: Activity }
      ]
    },
    {
      id: 2,
      title: "3. Fat Mass & Fat-Free Mass",
      icon: Scale,
      items: [
        { id: 'learn', label: 'Learner Guide', icon: BookOpen },
        { id: 'practice', label: 'Learner Activity', icon: Calculator }
      ]
    },
    {
      id: 3,
      title: "4. Skeletal Muscle Mass",
      icon: BicepsFlexed,
      items: [
        { id: 'muscle-guide', label: 'Learner Guide', icon: FileText },
        { id: 'muscle', label: 'Learner Activity', icon: Calculator }
      ]
    },
    {
      id: 4,
      title: "5. Target Body Composition",
      icon: Target,
      items: [
        { id: 'target-guide', label: 'Learner Guide', icon: FileText },
        { id: 'target-activity', label: 'Learner Activity', icon: Calculator }
      ]
    },
    {
      id: 5,
      title: "6. Composition Analysis",
      icon: TrendingUp,
      items: [
        { id: 'change-guide', label: 'Learner Guide', icon: FileText },
        { id: 'change-activity', label: 'Learner Activity', icon: Calculator }
      ]
    },
    {
      id: 6,
      title: "7. SMART Goal Setting",
      icon: Calendar,
      items: [
        { id: 'goal-guide', label: 'Learner Guide', icon: FileText },
        { id: 'goal-activity', label: 'Learner Activity', icon: Calculator }
      ]
    }
  ];

  const energyActivities: ActivityGroup[] = [
    {
      id: 60,
      title: "Interactive Lesson",
      icon: Presentation,
      items: [
        { id: 'energy-lesson', label: 'Start Lesson', icon: Play }
      ]
    },
    {
      id: 7,
      title: "1. Daily Energy Needs",
      icon: Zap,
      items: [
        { id: 'energy-guide', label: 'Learner Guide', icon: FileText },
        { id: 'energy-activity', label: 'Learner Activity', icon: Calculator }
      ]
    },
    {
      id: 8,
      title: "2. Personal Calculator",
      icon: UserCircle,
      items: [
        { id: 'energy-personal', label: 'Learner Activity', icon: Calculator }
      ]
    }
  ];

  const nutritionActivities: ActivityGroup[] = [
    {
      id: 9,
      title: "1. Macronutrient Balance",
      icon: PieChart,
      items: [
        { id: 'nutrition-intro', label: 'Introduction', icon: Info },
        { id: 'macro-guide', label: 'Learner Guide', icon: FileText },
        { id: 'macro-activity', label: 'Learner Activity', icon: Calculator }
      ]
    }
  ];

  const foodLabelActivities: ActivityGroup[] = [
    {
      id: 10,
      title: "1. Packaging Analysis",
      icon: ScanLine,
      items: [
        { id: 'label-guide', label: 'Learner Guide', icon: FileText },
        { id: 'label-activity', label: 'Learner Activity', icon: Calculator }
      ]
    }
  ];

  const caseStudyActivities: ActivityGroup[] = [
    {
      id: 11,
      title: "Interactive Scenarios",
      icon: Users,
      items: [
        { id: 'case-studies', label: 'Launch Case Studies', icon: Play }
      ]
    }
  ];

  // Auto-expand the group containing the active tab
  useEffect(() => {
    const expandGroup = (groups: ActivityGroup[], setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (groups.some(group => group.items.some(item => item.id === activeTab))) {
            setOpenActivity(groups.find(group => group.items.some(item => item.id === activeTab))?.id || null);
            setOpen(true);
        }
    };

    expandGroup(activities, setBodyCompOpen);
    expandGroup(energyActivities, setEnergyExpOpen);
    expandGroup(nutritionActivities, setNutritionOpen);
    expandGroup(foodLabelActivities, setFoodLabelOpen);
    expandGroup(caseStudyActivities, setCaseStudiesOpen);
  }, [activeTab]);

  const toggleActivity = (id: number) => {
    setOpenActivity(openActivity === id ? null : id);
  };

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setIsMobileOpen(false); // Close sidebar on mobile when item clicked
  };

  const renderGroup = (group: ActivityGroup, colorClass: string) => {
     const isOpen = openActivity === group.id;
     const Icon = group.icon;
     const isActiveGroup = group.items.some(item => item.id === activeTab);
     
     return (
        <div key={group.id} className="mb-1">
        <button
            onClick={() => toggleActivity(group.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group ${
            isOpen 
                ? `bg-${colorClass}-50 text-${colorClass}-800` 
                : isActiveGroup 
                ? `bg-slate-50 text-${colorClass}-700` 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
        >
            <div className="flex items-center gap-3 overflow-hidden">
            <div className={`flex-shrink-0 p-0.5 rounded transition-colors ${isOpen || isActiveGroup ? `text-${colorClass}-600` : 'text-slate-400 group-hover:text-slate-600'}`}>
                <Icon className="w-4 h-4" />
            </div>
            <span className="truncate text-xs md:text-sm">{group.title}</span>
            </div>
            <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform duration-300 ${isOpen ? `rotate-180 text-${colorClass}-600` : 'text-slate-400'}`} />
        </button>
        
        <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}
        >
            <div className="ml-3 mr-1 space-y-1 pl-3 border-l-2 border-slate-200/50 py-1">
            {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isActive = activeTab === item.id;
                return (
                <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive
                        ? `bg-white text-${colorClass}-700 font-semibold shadow-sm border border-slate-100`
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                    <ItemIcon className={`w-3.5 h-3.5 ${isActive ? `text-${colorClass}-500` : 'text-slate-400'}`} />
                    {item.label}
                </button>
                );
            })}
            </div>
        </div>
        </div>
     );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300" 
            onClick={() => setIsMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
            fixed md:static inset-y-0 left-0 z-50 h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
            ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'} 
            md:translate-x-0
            ${isDesktopOpen ? 'md:w-80' : 'md:w-0 md:border-none md:overflow-hidden'}
        `}
      >
        <div className="p-4 border-b border-slate-100 flex-shrink-0 flex items-center justify-between min-h-[4.5rem]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-primary-600 p-2 rounded-lg text-white flex-shrink-0">
                <BookOpen className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
                <span className="font-bold text-lg tracking-tight text-slate-900 block leading-none whitespace-nowrap">Learner Activities</span>
            </div>
          </div>
          {/* Close Sidebar Button */}
          <button 
            onClick={() => { setIsMobileOpen(false); setIsDesktopOpen(false); }}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            title="Close Panel"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto flex-1 custom-scrollbar min-w-[18rem]">
          {/* Course Aims Button */}
          <button
            onClick={() => handleNavClick('aims')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 mb-1 ${
              activeTab === 'aims'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
             <div className={`flex-shrink-0 p-1 rounded transition-colors ${activeTab === 'aims' ? 'text-white' : 'text-slate-400'}`}>
               <GraduationCap className="w-5 h-5" />
             </div>
             <span>Course Aims</span>
          </button>

          {/* Body Composition Section Dropdown */}
          <div className="pt-2">
            <button
                onClick={() => setBodyCompOpen(!bodyCompOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group mb-1 ${
                    bodyCompOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
                <div className="flex items-center gap-3">
                     <div className={`flex-shrink-0 p-1 rounded transition-colors ${bodyCompOpen ? 'bg-white text-primary-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                        <Layers className="w-5 h-5" />
                     </div>
                     <span>Body Composition</span>
                </div>
                 <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${bodyCompOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${bodyCompOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100 ml-6 my-1">
                  {activities.map((group) => renderGroup(group, 'primary'))}
                </div>
            </div>
          </div>

          {/* Energy Expenditure Section Dropdown */}
          <div className="pt-2">
            <button
                onClick={() => setEnergyExpOpen(!energyExpOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group mb-1 ${
                    energyExpOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
                <div className="flex items-center gap-3">
                     <div className={`flex-shrink-0 p-1 rounded transition-colors ${energyExpOpen ? 'bg-white text-amber-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                        <Zap className="w-5 h-5" />
                     </div>
                     <span>Energy Expenditure</span>
                </div>
                 <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${energyExpOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${energyExpOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100 ml-6 my-1">
                  {energyActivities.map((group) => renderGroup(group, 'amber'))}
                </div>
            </div>
          </div>

          {/* Macronutrients Section Dropdown */}
           <div className="pt-2">
            <button
                onClick={() => setNutritionOpen(!nutritionOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group mb-1 ${
                    nutritionOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
                <div className="flex items-center gap-3">
                     <div className={`flex-shrink-0 p-1 rounded transition-colors ${nutritionOpen ? 'bg-white text-orange-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                        <PieChart className="w-5 h-5" />
                     </div>
                     <span>Macronutrients</span>
                </div>
                 <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${nutritionOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${nutritionOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100 ml-6 my-1">
                  {nutritionActivities.map((group) => renderGroup(group, 'orange'))}
                </div>
            </div>
          </div>

          {/* Food Labelling Section Dropdown */}
          <div className="pt-2">
            <button
                onClick={() => setFoodLabelOpen(!foodLabelOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group mb-1 ${
                    foodLabelOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
                <div className="flex items-center gap-3">
                     <div className={`flex-shrink-0 p-1 rounded transition-colors ${foodLabelOpen ? 'bg-white text-purple-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                        <ScanLine className="w-5 h-5" />
                     </div>
                     <span>Food Labelling</span>
                </div>
                 <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${foodLabelOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${foodLabelOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100 ml-6 my-1">
                  {foodLabelActivities.map((group) => renderGroup(group, 'purple'))}
                </div>
            </div>
          </div>

          {/* Nutrition Case Studies Section Dropdown */}
          <div className="pt-2">
            <button
                onClick={() => setCaseStudiesOpen(!caseStudiesOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group mb-1 ${
                    caseStudiesOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
                <div className="flex items-center gap-3">
                     <div className={`flex-shrink-0 p-1 rounded transition-colors ${caseStudiesOpen ? 'bg-white text-teal-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                        <ClipboardCheck className="w-5 h-5" />
                     </div>
                     <span>Nutrition Case Studies</span>
                </div>
                 <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${caseStudiesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${caseStudiesOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100 ml-6 my-1">
                  {caseStudyActivities.map((group) => renderGroup(group, 'teal'))}
                </div>
            </div>
          </div>

        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
        
        {/* Toggle Bar (Visible on Mobile or when Desktop Sidebar is closed) */}
        <div className={`
            flex items-center p-4 z-30 transition-all duration-300
            ${!isDesktopOpen ? 'md:absolute md:top-4 md:left-4 md:p-0' : 'md:hidden'}
            bg-white/80 backdrop-blur-sm md:bg-transparent border-b border-slate-200 md:border-none
        `}>
            {/* Mobile Trigger */}
            <button 
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden p-2 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-700 hover:bg-slate-50 mr-3"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Trigger (Open) */}
            <button
                onClick={() => setIsDesktopOpen(true)}
                className={`
                    hidden md:flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 shadow-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600 transition-all
                    ${isDesktopOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
            >
                <PanelLeftOpen className="w-5 h-5" />
                <span className="font-semibold text-sm">Activities</span>
            </button>

            {/* Mobile Title */}
            <span className="md:hidden font-bold text-slate-900 truncate ml-1">
                Nutrition Activities
            </span>
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth p-4 md:p-12 pb-32">
          <div className={`mx-auto transition-all duration-300 ${activeTab === 'lesson' || activeTab === 'energy-lesson' || activeTab === 'case-studies' ? 'max-w-[1600px]' : 'max-w-5xl'}`}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
