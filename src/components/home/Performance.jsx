import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { Users, Building, Clock, Award, Briefcase, TrendingUp, ChevronRight, Check, PieChart, BarChart4, Target } from 'lucide-react';

// Intersection Observer Hook for animations
const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

const StatCard = ({ icon, number, label, delay, accent, percentage, subtitle }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const target = parseInt(number);
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Easing function for more natural counting
      const easeOutQuad = progress * (2 - progress);
      setCount(Math.round(easeOutQuad * target));
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [number, isVisible]);
  
  return (
    <div ref={ref} className="relative group" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0, transition: `all 0.8s ease-out ${delay}ms` }}>
      {/* Background glow effect */}
      <div className={`absolute inset-0 ${accent} blur-2xl opacity-5 rounded-3xl group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      <div className="relative h-full overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className={`${accent.replace('bg-', 'text-')} p-3 rounded-xl bg-opacity-10 ${accent}`}>
              {icon}
            </div>
            
            {percentage && (
              <div className="flex items-center px-3 py-1 text-xs font-medium text-green-600 rounded-full bg-green-50">
                <TrendingUp size={12} className="mr-1" />
                +{percentage}%
              </div>
            )}
          </div>
          
          <div className="mb-2">
            <div className="flex items-baseline">
              <h2 className="text-6xl font-bold text-gray-800">
                {count}
              </h2>
              <span className="ml-1 text-3xl font-bold text-sky-500">+</span>
            </div>
            {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
          </div>
          
          <p className="text-sm font-medium tracking-wider text-gray-600 uppercase">{label}</p>
        </div>
        
        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 h-1 ${accent} w-full opacity-80`}></div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref} 
      className="flex items-start p-4"
      style={{ 
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)', 
        opacity: isVisible ? 1 : 0, 
        transition: 'all 0.8s ease-out' 
      }}
    >
      <div className="p-2 mr-4 rounded-lg bg-sky-50 text-sky-600">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const AdvancedStatsSection = () => {
  const { t } = useTranslation('common');
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  const stats = [
    { 
      icon: <Briefcase size={28} />, 
      number: "500", 
      label: t("labels.performance.stats.jobFulfillment"), 
      delay: 0,
      accent: "bg-sky-500",
      percentage: "32",
      subtitle: t("labels.performance.stats.sinceLastQuarter")
    },
    { 
      icon: <Building size={28} />, 
      number: "3", 
      label: t("labels.performance.stats.branches"), 
      delay: 200,
      accent: "bg-indigo-500",
      percentage: "15",
      subtitle: t("labels.performance.stats.acrossMajorCities")
    },
    { 
      icon: <Clock size={28} />, 
      number: "2", 
      label: t("labels.performance.stats.yearsExperience"), 
      delay: 400,
      accent: "bg-emerald-500",
      percentage: "100",
      subtitle: t("labels.performance.stats.industryExpertise")
    },
    { 
      icon: <Users size={28} />, 
      number: "150", 
      label: t("labels.performance.stats.happyClients"), 
      delay: 600,
      accent: "bg-amber-500",
      percentage: "24",
      subtitle: t("labels.performance.stats.withSatisfaction")
    }
  ];

  const features = [
    {
      icon: <Target size={20} />,
      title: t("labels.performance.features.targetedRecruitment"),
      description: t("labels.performance.features.targetedRecruitmentDesc")
    },
    {
      icon: <BarChart4 size={20} />,
      title: t("labels.performance.features.performanceTracking"),
      description: t("labels.performance.features.performanceTrackingDesc")
    },
    {
      icon: <Check size={20} />,
      title: t("labels.performance.features.qualityAssurance"),
      description: t("labels.performance.features.qualityAssuranceDesc")
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
     
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        
        {/* Stats Grid */}
       
        
        {/* Middle section with chart */}
        <div className="mb-24 overflow-hidden bg-white shadow-xl rounded-3xl">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <h3 className="mb-4 font-semibold text-sky-600">{t("labels.performance.growth.trajectory")}</h3>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                {t("labels.performance.growth.title")}
              </h2>
              <p className="mb-8 text-gray-600">
                {t("labels.performance.growth.description")}
              </p>
              
              <div className="grid grid-cols-1 gap-2">
                {features.map((feature, index) => (
                  <FeatureItem 
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
            
            {/* Chart placeholder */}
            <div className="relative flex items-center justify-center p-8 bg-gray-50">
              <div className="absolute inset-0 opacity-50 bg-gradient-to-tr from-sky-50 to-indigo-50"></div>
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                <PieChart size={32} className="mb-4 text-sky-500" />
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">{t("labels.performance.metrics.title")}</h3>
                  <p className="mb-6 text-gray-600">{t("labels.performance.metrics.subtitle")}</p>
                </div>
                
                {/* Simplified chart representation */}
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{t("labels.performance.metrics.jobSuccessRate")}</span>
                    <span className="text-sm font-medium text-gray-800">92%</span>
                  </div>
                  <div className="h-2 mb-6 bg-gray-200 rounded-full">
                    <div className="h-full rounded-full bg-sky-500" style={{ width: '92%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{t("labels.performance.metrics.clientRetention")}</span>
                    <span className="text-sm font-medium text-gray-800">88%</span>
                  </div>
                  <div className="h-2 mb-6 bg-gray-200 rounded-full">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">{t("labels.performance.metrics.candidateSatisfaction")}</span>
                    <span className="text-sm font-medium text-gray-800">95%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action Section */}
       
      </div>
    </div>
  );
};

export default AdvancedStatsSection;