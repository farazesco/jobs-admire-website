// sections/TemplateSelection.js
import React from 'react';
import { useResume } from '../context/ResumeContext';
import TemplateCard from '@components/resume-gen/TemplateCard';
import Button from '@components/resume-gen/Button';
import templates from '../data/templates'; // Import templates data

const TemplateSelection = ({ onNext }) => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Select Your Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={setSelectedTemplate}
          />
        ))}
      </div>
      <div className="text-center">
        <Button onClick={onNext}>Proceed to Fill Data</Button>
      </div>
    </div>
  );
};

export default TemplateSelection;