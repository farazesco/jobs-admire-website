// sections/DataInput.js
import React from 'react';
import { useResume } from '../context/ResumeContext'; // Named import
import InputField from '@components/resume-gen/InputField'; // Default import
import TextAreaField from '@components/resume-gen/TextAreaField'; // Default import
import SectionHeader from '@components/resume-gen/SectionHeader'; // Default import
import Button from '@components/resume-gen/Button'; // Default import

const DataInput = ({ onNext, onBack }) => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (section, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value,
      };
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', duration: '', description: '' }],
    }));
  };

  const removeLastExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.slice(0, -1),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', year: '', details: '' }],
    }));
  };

  const removeLastEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.slice(0, -1),
    }));
  };

  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  const removeLastSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.slice(0, -1),
    }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', link: '' }],
    }));
  };

  const removeLastProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.slice(0, -1),
    }));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Enter Your Resume Details</h2>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
        <InputField
          label="Full Name"
          id="name"
          value={resumeData.personal.name}
          onChange={(e) => handleChange('personal', 'name', e.target.value)}
          placeholder="John Doe"
        />
        <InputField
          label="Email"
          id="email"
          type="email"
          value={resumeData.personal.email}
          onChange={(e) => handleChange('personal', 'email', e.target.value)}
          placeholder="john.doe@example.com"
        />
        <InputField
          label="Phone"
          id="phone"
          type="tel"
          value={resumeData.personal.phone}
          onChange={(e) => handleChange('personal', 'phone', e.target.value)}
          placeholder="+1234567890"
        />
        <InputField
          label="LinkedIn Profile"
          id="linkedin"
          value={resumeData.personal.linkedin}
          onChange={(e) => handleChange('personal', 'linkedin', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
        />
        <InputField
          label="GitHub Profile"
          id="github"
          value={resumeData.personal.github}
          onChange={(e) => handleChange('personal', 'github', e.target.value)}
          placeholder="github.com/johndoe"
        />
        <InputField
          label="Address"
          id="address"
          value={resumeData.personal.address}
          onChange={(e) => handleChange('personal', 'address', e.target.value)}
          placeholder="123 Main St, City, Country"
        />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <TextAreaField
          label="Summary/Objective"
          id="summary"
          value={resumeData.summary}
          onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
          placeholder="A concise summary of your professional background and career goals."
        />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <SectionHeader
          title="Experience"
          onAdd={addExperience}
          onRemove={removeLastExperience}
          showRemove={resumeData.experience.length > 0}
        />
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50">
            <h4 className="font-medium text-gray-700 mb-2">Experience #{index + 1}</h4>
            <InputField
              label="Job Title"
              id={`exp-title-${index}`}
              value={exp.title}
              onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
              placeholder="Software Engineer"
            />
            <InputField
              label="Company"
              id={`exp-company-${index}`}
              value={exp.company}
              onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
              placeholder="Tech Solutions Inc."
            />
            <InputField
              label="Duration"
              id={`exp-duration-${index}`}
              value={exp.duration}
              onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
              placeholder="Jan 2020 - Present"
            />
            <TextAreaField
              label="Description"
              id={`exp-description-${index}`}
              value={exp.description}
              onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
              placeholder="Key responsibilities and achievements (use bullet points if desired)."
              rows={3}
            />
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <SectionHeader
          title="Education"
          onAdd={addEducation}
          onRemove={removeLastEducation}
          showRemove={resumeData.education.length > 0}
        />
        {resumeData.education.map((edu, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50">
            <h4 className="font-medium text-gray-700 mb-2">Education #{index + 1}</h4>
            <InputField
              label="Degree/Field of Study"
              id={`edu-degree-${index}`}
              value={edu.degree}
              onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
              placeholder="Master of Science in Computer Science"
            />
            <InputField
              label="Institution"
              id={`edu-institution-${index}`}
              value={edu.institution}
              onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
              placeholder="University of Example"
            />
            <InputField
              label="Year/Graduation Date"
              id={`edu-year-${index}`}
              value={edu.year}
              onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
              placeholder="2022"
            />
            <TextAreaField
              label="Details"
              id={`edu-details-${index}`}
              value={edu.details}
              onChange={(e) => handleArrayChange('education', index, 'details', e.target.value)}
              placeholder="Relevant coursework, honors, etc."
              rows={2}
            />
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <SectionHeader
          title="Skills"
          onAdd={addSkill}
          onRemove={removeLastSkill}
          showRemove={resumeData.skills.length > 0}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumeData.skills.map((skill, index) => (
            <InputField
              key={index}
              label={`Skill #${index + 1}`}
              id={`skill-${index}`}
              value={skill}
              onChange={(e) => handleArrayChange('skills', index, null, e.target.value)} // null for field as it's a direct array of strings
              placeholder="JavaScript, React, Node.js"
            />
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <SectionHeader
          title="Projects"
          onAdd={addProject}
          onRemove={removeLastProject}
          showRemove={resumeData.projects.length > 0}
        />
        {resumeData.projects.map((project, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50">
            <h4 className="font-medium text-gray-700 mb-2">Project #{index + 1}</h4>
            <InputField
              label="Project Name"
              id={`proj-name-${index}`}
              value={project.name}
              onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
              placeholder="E-commerce Platform"
            />
            <TextAreaField
              label="Description"
              id={`proj-description-${index}`}
              value={project.description}
              onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
              placeholder="Developed a full-stack e-commerce application..."
              rows={3}
            />
            <InputField
              label="Project Link (Optional)"
              id={`proj-link-${index}`}
              value={project.link}
              onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
              placeholder="https://example.com/project"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onBack} variant="secondary">
          Back to Templates
        </Button>
        <Button onClick={onNext}>
          Preview Resume
        </Button>
      </div>
    </div>
  );
};

export default DataInput;