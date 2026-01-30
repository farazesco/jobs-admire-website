// context/ResumeContext.js
import React, { createContext, useContext, useState } from 'react';

// ResumeContext will hold the resume data and the selected template
const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personal: { name: '', email: '', phone: '', linkedin: '', github: '', address: '' },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });
  const [selectedTemplate, setSelectedTemplate] = useState('modern'); // Default template

  const value = {
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
