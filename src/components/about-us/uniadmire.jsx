import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Handshake, Users, Award, Briefcase, TrendingUp, Globe, CheckCircle, ChevronLeft, ChevronRight, Calendar, Star, Share2, ArrowRight, ExternalLink } from 'lucide-react';

// Import your translation files
import enTranslations from '../../../public/locales/en/about.json';
import trTranslations from '../../../public/locales/tr/about.json';
import arTranslations from '../../../public/locales/ar/about.json';
import frTranslations from '../../../public/locales/fr/about.json';
import deTranslations from '../../../public/locales/de/about.json';
import ruTranslations from '../../../public/locales/ru/about.json';
import faTranslations from '../../../public/locales/fa/about.json';

const PremiumTimeline = () => {
  const router = useRouter();
  const { locale } = router;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const timelineRef = useRef(null);
  const scrollRef = useRef(null);

  // Get translations based on current locale
  const getTranslations = () => {
    switch (locale) {
      case 'tr':
        return trTranslations;
      case 'ar':
        return arTranslations;
      case 'fr':
        return frTranslations;
      case 'ru':
        return ruTranslations;
      case 'de':
        return deTranslations;
      case 'fa':
        return faTranslations;
      default:
        return enTranslations;
    }
  };

  const t = getTranslations();

  // Icon mapping for timeline data
  const iconMap = {
    handshake: <Handshake className="w-full h-full p-3" />,
    users: <Users className="w-full h-full p-3" />,
    award: <Award className="w-full h-full p-3" />,
    globe: <Globe className="w-full h-full p-3" />,
    briefcase: <Briefcase className="w-full h-full p-3" />,
    trending: <TrendingUp className="w-full h-full p-3" />
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  const scrollToElement = (index) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;
      const elementWidth = scrollWidth / t.timelineData.length;
      const scrollPosition = (elementWidth * index) - (clientWidth / 2) + (elementWidth / 2);
      
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (activeIndex < t.timelineData.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setActiveIndex(prev => prev + 1);
      scrollToElement(activeIndex + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setActiveIndex(prev => prev - 1);
      scrollToElement(activeIndex - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleDotClick = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex(index);
      scrollToElement(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="relative min-h-screen px-4 py-20 overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50/40 to-sky-100 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute rounded-full top-20 left-20 w-96 h-96 bg-gradient-to-r from-sky-200/30 to-blue-200/20 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-32 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/25 to-sky-300/15 blur-2xl animate-pulse"></div>
      </div>
      
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="relative mb-16 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-5xl text-sky-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-400">
              {t.header.title.prefix} {t.header.title.highlight} {t.header.title.suffix}
            </span>
          </h1>
          <p 
            className="max-w-2xl mx-auto text-lg transition-all duration-1000 text-sky-600"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '200ms'
            }}
          >
            {t.header.description}
          </p>
        </div>
        
        {/* Timeline Container */}
        <div 
          ref={timelineRef}
          className="mb-20"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 1s, transform 1s',
            transitionDelay: '400ms'
          }}
        >
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border
                  ${activeIndex === 0 
                    ? 'bg-sky-100/50 border-sky-200 text-sky-300 cursor-not-allowed' 
                    : 'bg-white border-sky-200 text-sky-600 hover:bg-sky-50 hover:border-sky-300 shadow-md hover:shadow-lg'
                  }
                `}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 border rounded-full bg-white/80 backdrop-blur-sm border-sky-200">
                  <span className="text-sm font-semibold text-sky-700">
                    {activeIndex + 1} / {t.timelineData.length}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleNext}
                disabled={activeIndex === t.timelineData.length - 1}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border
                  ${activeIndex === t.timelineData.length - 1 
                    ? 'bg-sky-100/50 border-sky-200 text-sky-300 cursor-not-allowed' 
                    : 'bg-white border-sky-200 text-sky-600 hover:bg-sky-50 hover:border-sky-300 shadow-md hover:shadow-lg'
                  }
                `}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Timeline Track */}
            <div className="relative mb-12">
              <div 
                ref={scrollRef}
                className="relative pb-6 overflow-x-auto hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Progress Line */}
                <div className="absolute w-full h-1 transform -translate-y-1/2 bg-sky-200 top-8" style={{ left: '0', right: '0' }}></div>
                <div 
                  className="absolute h-1 transition-all duration-500 transform -translate-y-1/2 bg-gradient-to-r from-sky-400 to-blue-500 top-8"
                  style={{ 
                    width: `${(activeIndex / (t.timelineData.length - 1)) * 100}%`,
                    left: '0'
                  }}
                ></div>
                
                <div className="flex justify-between min-w-full">
                  {t.timelineData.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col items-center snap-center"
                      style={{ width: `${100 / t.timelineData.length}%` }}
                    >
                      <div 
                        className={`
                          relative h-16 w-16 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center
                          ${index === activeIndex 
                            ? 'bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg scale-110' 
                            : index < activeIndex 
                              ? 'bg-gradient-to-br from-sky-300 to-blue-500 opacity-80' 
                              : 'bg-white border-2 border-sky-200'
                          }
                        `}
                        onClick={() => handleDotClick(index)}
                      >
                        <div className={`${index <= activeIndex ? 'text-white' : 'text-sky-400'}`}>
                          {iconMap[item.iconKey]}
                        </div>
                        
                        {index === activeIndex && (
                          <>
                            <span className="absolute w-full h-full rounded-full animate-ping bg-sky-400 opacity-20"></span>
                            <span className="absolute px-3 py-1 text-sm font-medium bg-white border rounded-full shadow-sm -top-10 text-sky-600 border-sky-100">
                              {t.navigation.active}
                            </span>
                          </>
                        )}
                      </div>
                      
                      <div className={`
                        mt-5 px-4 text-center transition-all duration-300 transform
                        ${index === activeIndex ? 'scale-110 -translate-y-1' : 'scale-100'}
                      `}>
                        <span className={`block mb-1 font-bold ${index === activeIndex ? 'text-sky-700' : 'text-sky-500'}`}>
                          {item.date}
                        </span>
                        <h4 className={`text-sm ${index === activeIndex ? 'text-sky-900' : 'text-sky-600'} line-clamp-2`}>
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Active Content Card */}
            <div className="relative">
              <div 
                className="overflow-hidden transition-all duration-500 transform border shadow-xl bg-white/90 backdrop-blur-md rounded-3xl border-sky-200 hover:shadow-2xl"
              >
                <div className="lg:flex">
                  {/* Image Column */}
                  <div className="relative overflow-hidden lg:w-2/5">
                    <div 
                      className="relative h-56 overflow-hidden bg-gradient-to-br from-sky-400 to-blue-600 lg:h-full"
                    >
                      <div className="absolute inset-0 opacity-30 pattern-grid-lg" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 10%, transparent 10%)", backgroundSize: "12px 12px" }}></div>
                      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-white">
                        <div className="flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full shadow-lg">
                          <div className="w-10 h-10 text-sky-600">
                            {iconMap[t.timelineData[activeIndex].iconKey]}
                          </div>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-center">{t.timelineData[activeIndex].date}</h3>
                        <div className="text-center">
                          <p className="text-sm text-sky-100">{t.navigation.milestone} {activeIndex + 1} {t.navigation.of} {t.timelineData.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Column */}
                  <div className="p-8 lg:w-3/5">
                    <div className="mb-6">
                      <div className="flex justify-between">
                        <div className="flex mb-3 space-x-2">
                          {t.timelineData[activeIndex].tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-sky-100 text-sky-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="transition-colors text-sky-400 hover:text-sky-600">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                      <h2 className="mb-3 text-2xl font-bold text-sky-900">{t.timelineData[activeIndex].title}</h2>
                      <p className="leading-relaxed text-sky-600">{t.timelineData[activeIndex].description}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shadow Effect */}
              <div className="absolute -z-10 inset-0 transform translate-y-2 scale-[0.98] opacity-40 blur-xl bg-gradient-to-r from-sky-200 to-blue-300 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .pattern-grid-lg {
          background-size: 20px 20px;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );  
}

export default PremiumTimeline;