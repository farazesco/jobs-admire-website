import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight, BookOpen, Sparkles, TrendingUp, Eye } from 'lucide-react';

export default function BlogCarousel() {
  const { t } = useTranslation('common');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        console.log('Starting to fetch blogs...');
        
        // Try multiple possible API endpoints
        let res;
        let data;
        
        // First try the list endpoint
        try {
          res = await fetch(`https://phpstack-1309382-5454384.cloudwaysapps.com/api/blogs.php/blogs?v=${Date.now()}`);
          if (res.ok) {
            data = await res.json();
          }
        } catch (e) {
          console.log('First endpoint failed, trying alternative...');
        }
        
        // If that fails, try alternative endpoint structure
        if (!data) {
          try {
            res = await fetch(`https://phpstack-1309382-5454384.cloudwaysapps.com/api/blogs.php?v=${Date.now()}`);
            if (res.ok) {
              data = await res.json();
            }
          } catch (e) {
            console.log('Second endpoint failed, trying third...');
          }
        }
        
        // Third attempt with different structure
        if (!data) {
          res = await fetch(`https://phpstack-1309382-5454384.cloudwaysapps.com/api/blogs.php/blogs/list?v=${Date.now()}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
          }
          data = await res.json();
        }
        
        console.log('Raw API response:', data);
        console.log('Data type:', typeof data);
        console.log('Is array:', Array.isArray(data));
        
        // Handle different possible response structures
        let blogsArray = [];
        if (Array.isArray(data)) {
          blogsArray = data;
        } else if (data && data.blogs && Array.isArray(data.blogs)) {
          blogsArray = data.blogs;
        } else if (data && data.data && Array.isArray(data.data)) {
          blogsArray = data.data;
        } else if (data && typeof data === 'object') {
          // If it's an object, try to find an array property
          const arrayProperty = Object.values(data).find(value => Array.isArray(value));
          if (arrayProperty) {
            blogsArray = arrayProperty;
          }
        }
        
        console.log('Processed blogs array:', blogsArray);
        console.log('Number of blogs:', blogsArray.length);
        
        // Take only the first 6 blogs for the carousel
        setBlogs(blogsArray.slice(0, 6));
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Auto-slide functionality with pause/resume
  useEffect(() => {
    if (blogs.length <= 1 || !isAutoPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Slower transition for better UX

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [blogs.length, isAutoPlaying]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
  };

  const resumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    if (!content) return '5 min';
    const plainText = content.replace(/<[^>]*>/g, '');
    const words = plainText.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Truncate text
  const truncateText = (text, maxLength = 140) => {
    if (!text) return '';
    const plainText = text.replace(/<[^>]*>/g, '');
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
  };

  if (loading) {
    return (
      <section className="relative py-20 overflow-hidden bg-white">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-blue-500 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 animate-spin"></div>
              <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text mb-2">
              {t('labels.blog.curatingTitle')}
            </h3>
            <p className="text-slate-600 text-lg">{t('labels.blog.loadingInsights')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="p-8 text-center bg-white/80 backdrop-blur-sm border border-red-100 rounded-3xl shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-red-400 to-rose-500 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-800">{t('labels.blog.unableToLoadContent')}</h3>
              <p className="mb-6 text-red-600 leading-relaxed">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('labels.blog.tryAgain')}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="p-8 text-center bg-white/80 backdrop-blur-sm border border-amber-100 rounded-3xl shadow-xl">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-slate-800">{t('labels.blog.comingSoon')}</h3>
              <p className="text-slate-600 leading-relaxed">{t('labels.blog.comingSoonDescription')}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!mounted) return null;

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-sky-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-r from-indigo-300 to-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"></div>
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-cyan-300 to-sky-400 rounded-full mix-blend-multiply filter blur-xl animate-float-slow"></div>
      </div>

      <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
        {/* Redesigned Spectacular Header */}
        <div className="relative mb-20">
          {/* Floating Elements */}
          <div className="absolute top-0 left-1/4 w-20 h-20 bg-gradient-to-r from-sky-300 to-blue-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-10 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -top-5 left-1/2 w-12 h-12 bg-gradient-to-r from-emerald-300 to-teal-400 rounded-full opacity-20 animate-ping"></div>
          
          <div className="relative text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center mb-8 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 rounded-full blur-lg opacity-70 animate-pulse"></div>
                <div className="relative px-8 py-4 bg-white/90 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-purple-700 shadow-lg">
                      <Sparkles size={16} className="text-white animate-spin" />
                    </div>
                    <span className="text-sm font-black text-transparent bg-gradient-to-r from-slate-800 via-sky-700 to-blue-600 bg-clip-text tracking-wider uppercase">
                      {t('labels.blog.premiumBadge')}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Title with Advanced Typography */}
            <div className="mb-8 space-y-2">
              <h1 className="text-6xl font-black text-transparent md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text leading-none tracking-tight">
                {t('labels.blog.titleEducational')}
              </h1>
              <div className="relative">
                <h1 className="text-6xl font-black text-transparent md:text-7xl lg:text-8xl xl:text-9xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 bg-clip-text leading-none tracking-tight">
                  {t('labels.blog.titleInsights')}
                </h1>
                {/* Decorative underline */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 rounded-full shadow-lg"></div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-sky-300 via-blue-400 to-purple-500 rounded-full blur-sm"></div>
              </div>
            </div>
            
            {/* Enhanced Description */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-slate-600 leading-relaxed mb-6">
                <span className="font-semibold text-transparent bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text">{t('labels.blog.discoverTransformative')}</span> scholarship opportunities, 
                <span className="font-semibold text-transparent bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text"> {t('labels.blog.expertCareerGuidance')}</span>, and 
                <span className="font-semibold text-transparent bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text">{t('labels.blog.cuttingEdgeResources')}</span> {t('labels.blog.thatAccelerate')}
              </p>
              
              {/* Stats/Features Row */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-sky-100 shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-700">{t('labels.blog.latestUpdates')}</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-purple-100 shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-700">{t('labels.blog.expertInsights')}</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-blue-100 shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-700">{t('labels.blog.careerGuidance')}</span>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-sky-300 to-transparent"></div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 animate-pulse"></div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-sky-300 to-blue-400 animate-pulse animation-delay-1000"></div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-gradient-to-r from-sky-200 to-blue-300 animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel Container */}
        <div 
          className="relative group"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Main Carousel with enhanced styling */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/70 backdrop-blur-sm border border-white/20">
            <div 
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {blogs.map((blog, index) => (
                <div key={blog.id || index} className="flex-shrink-0 w-full">
                  <div className="grid gap-12 p-12 lg:grid-cols-2 lg:gap-16 items-center min-h-[500px]">
                    {/* Enhanced Blog Content */}
                    <div className="flex flex-col justify-center space-y-6">
                      {/* Meta Information */}
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-200/50">
                          <Calendar size={16} className="mr-2 text-sky-600" />
                          <span className="text-sm font-semibold text-sky-700">{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200/50">
                          <Clock size={16} className="mr-2 text-emerald-600" />
                          <span className="text-sm font-semibold text-emerald-700">{calculateReadTime(blog.content)}</span>
                        </div>
                      </div>
                      
                      {/* Title with enhanced typography */}
                      <h3 className="text-3xl font-bold text-slate-800 lg:text-4xl xl:text-5xl leading-tight">
                        {blog.title}
                      </h3>
                      
                      {/* Enhanced description */}
                      <p className="text-lg text-slate-600 leading-relaxed lg:text-xl">
                        {truncateText(blog.excerpt || blog.content)}
                      </p>
                      
                      {/* Enhanced CTA Button */}
                      <div className="pt-4">
                        <Link 
                          href={`/blog/${blog.slug}`}
                          className="inline-flex items-center px-8 py-4 font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 transform hover:scale-105 hover:shadow-xl shadow-lg group/btn"
                        >
                          <span className="mr-3">{t('labels.blog.readFullArticle')}</span>
                          <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Enhanced Blog Image */}
                    <div className="order-first lg:order-last">
                      <div className="relative group/img">
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl blur-lg opacity-25 group-hover/img:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative overflow-hidden rounded-2xl transform transition-transform duration-500 group-hover/img:scale-105">
                          <img
                            src={blog.featuredImage || "/images/journey.svg"}
                            alt={blog.title}
                            className="object-cover w-full h-80 lg:h-96 xl:h-[400px]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          
                          {/* Enhanced tag badge */}
                          {blog.tags && blog.tags.length > 0 && (
                            <div className="absolute top-6 left-6">
                              <span className="px-4 py-2 text-sm font-bold text-white rounded-full bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg backdrop-blur-sm">
                                {blog.tags[0]}
                              </span>
                            </div>
                          )}
                          
                          {/* Engagement indicator */}
                          <div className="absolute bottom-6 right-6">
                            <div className="flex items-center px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                              <Eye size={14} className="mr-2 text-slate-600" />
                              <span className="text-sm font-semibold text-slate-700">{t('labels.blog.featured')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          {blogs.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-white/20 text-slate-700 hover:text-sky-600 hover:bg-white transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label={t("labels.blog.previousAria")}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-xl border border-white/20 text-slate-700 hover:text-sky-600 hover:bg-white transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label={t("labels.blog.nextAria")}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Enhanced Pagination Dots */}
        {blogs.length > 1 && (
          <div className="flex justify-center mt-10 space-x-3">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 w-12 shadow-lg' 
                    : 'bg-slate-300 hover:bg-slate-400 w-3'
                }`}
                aria-label={t('labels.blog.goToBlog', { number: index + 1 })}
              />
            ))}
          </div>
        )}

        {/* Enhanced Auto-play indicator */}
        {blogs.length > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
              <div className={`w-2 h-2 rounded-full mr-2 ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`}></div>
              <span className="text-sm font-medium text-slate-600">
                {isAutoPlaying ? t('labels.blog.autoPlaying') : t('labels.blog.paused')}
              </span>
            </div>
          </div>
        )}

        {/* Enhanced View All Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center px-10 py-5 font-bold text-slate-700 transition-all duration-300 border-2 rounded-full border-slate-200 hover:border-sky-300 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 transform hover:scale-105 hover:shadow-lg group/all bg-white/70 backdrop-blur-sm"
          >
            <TrendingUp size={20} className="mr-3 text-sky-600" />
            <span>{t('labels.blog.exploreAllArticles')}</span>
            <ArrowRight size={18} className="ml-3 transition-transform duration-300 group-hover/all:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}