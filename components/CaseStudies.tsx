
import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

const CaseStudies: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col ${isFullscreen ? 'h-full' : ''}`}>
      {!isFullscreen && (
        <div className="text-center max-w-3xl mx-auto mb-6 flex-shrink-0 space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Nutrition Case Studies</h1>
          <p className="text-lg text-slate-600">
            Apply your knowledge to real-world scenarios in this interactive module.
          </p>
        </div>
      )}

      <div className={`flex flex-col items-center justify-center transition-all duration-300 ease-in-out
        ${isFullscreen 
          ? 'fixed inset-0 z-50 bg-slate-900 p-0 h-full' 
          : 'relative w-full'
        }`}
      >
        <div className={`bg-white shadow-sm border border-slate-200 w-full flex justify-center overflow-hidden relative transition-all duration-300
            ${isFullscreen ? 'h-full w-full border-0 rounded-none' : 'h-[600px] lg:h-[700px] rounded-2xl p-2'}`}
        >
            {/* Toggle Button */}
            <button 
                onClick={toggleFullscreen}
                className={`absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-slate-700 p-2 rounded-lg shadow-md border border-slate-200 transition-all hover:scale-105 group ${isFullscreen ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : ''}`}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? (
                    <Minimize2 className="w-5 h-5" />
                ) : (
                    <Maximize2 className="w-5 h-5" />
                )}
            </button>

            <iframe 
                src="https://698903dcc288e6217cb51de7--deft-klepon-cdd096.netlify.app/" 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: isFullscreen ? '0' : '0.75rem',
                    border: 'none' 
                }} 
                allow="fullscreen" 
                title="Nutrition Case Studies"
            ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
