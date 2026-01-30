// sections/ResumePreview.js
import React, { useCallback, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useResume } from '../context/ResumeContext';
import Button from '@components/resume-gen/Button';

const ResumePreview = ({ onBack }) => {
  const { resumeData, selectedTemplate } = useResume();
  const resumeRef = useRef();
  const [loadingPdf, setLoadingPdf] = useState(false);

  // Function to generate PDF
  const generatePdf = useCallback(async () => {
    if (!resumeRef.current) return;

    setLoadingPdf(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, // Important if you have images from external sources
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personal.name || 'resume'}_${selectedTemplate}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Implement a user-friendly message box instead of alert
      // For now, logging to console.
    } finally {
      setLoadingPdf(false);
    }
  }, [resumeData, selectedTemplate]);

  // Template-specific rendering logic
  const renderResumeContent = () => {
    switch (selectedTemplate) {
      case 'modern':
        return (
          <div className="font-inter bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl mx-auto my-8 p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">{resumeData.personal.name || 'Your Name'}</h1>
              <p className="text-lg text-gray-600">
                {resumeData.personal.email} | {resumeData.personal.phone} |{' '}
                {resumeData.personal.linkedin && <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{resumeData.personal.linkedin.replace('https://', '').replace('www.', '')}</a>}
                {resumeData.personal.github && <span className="ml-2">| <a href={resumeData.personal.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{resumeData.personal.github.replace('https://', '').replace('www.', '')}</a></span>}
              </p>
              <p className="text-md text-gray-600">{resumeData.personal.address}</p>
            </div>

            {resumeData.summary && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-300 pb-2 mb-4">Summary</h2>
                <p className="text-gray-800 leading-relaxed">{resumeData.summary}</p>
              </section>
            )}

            {resumeData.experience.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-300 pb-2 mb-4">Experience</h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-md text-gray-700 italic">{exp.company} | {exp.duration}</p>
                    <p className="text-gray-800 mt-1 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {resumeData.education.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-300 pb-2 mb-4">Education</h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-md text-gray-700 italic">{edu.institution} | {edu.year}</p>
                    <p className="text-gray-800 mt-1 whitespace-pre-wrap">{edu.details}</p>
                  </div>
                ))}
              </section>
            )}

            {resumeData.skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-300 pb-2 mb-4">Skills</h2>
                <p className="text-gray-800">{resumeData.skills.filter(s => s.trim() !== '').join(', ')}</p>
              </section>
            )}

            {resumeData.projects.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-700 border-b-2 border-blue-300 pb-2 mb-4">Projects</h2>
                {resumeData.projects.map((proj, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{proj.name}</h3>
                    <p className="text-gray-800 mt-1 whitespace-pre-wrap">{proj.description}</p>
                    {proj.link && (
                      <p className="text-blue-600 hover:underline text-sm mt-1">
                        <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        );
      case 'classic':
        return (
          <div className="font-serif bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl mx-auto my-8 p-8 border border-gray-200">
            <header className="text-center mb-6 pb-4 border-b border-gray-300">
              <h1 className="text-3xl font-bold text-gray-900 uppercase">{resumeData.personal.name || 'Your Name'}</h1>
              <p className="text-md text-gray-700 mt-2">
                {resumeData.personal.address} | {resumeData.personal.phone} | {resumeData.personal.email}
              </p>
              <p className="text-md text-gray-700">
                {resumeData.personal.linkedin && <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline mr-2">LinkedIn</a>}
                {resumeData.personal.github && <a href={resumeData.personal.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">GitHub</a>}
              </p>
            </header>

            {resumeData.summary && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 pb-1 mb-3">Objective</h2>
                <p className="text-gray-800 leading-relaxed text-sm">{resumeData.summary}</p>
              </section>
            )}

            {resumeData.experience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 pb-1 mb-3">Experience</h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                      <span className="text-sm text-gray-600">{exp.duration}</span>
                    </div>
                    <p className="text-md text-gray-700 italic">{exp.company}</p>
                    <p className="text-gray-800 text-sm mt-1 whitespace-pre-wrap">{exp.description}</p>
                  </div>
                ))}
              </section>
            )}

            {resumeData.education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 pb-1 mb-3">Education</h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                      <span className="text-sm text-gray-600">{edu.year}</span>
                    </div>
                    <p className="text-md text-gray-700 italic">{edu.institution}</p>
                    <p className="text-gray-800 text-sm mt-1 whitespace-pre-wrap">{edu.details}</p>
                  </div>
                ))}
              </section>
            )}

            {resumeData.skills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 pb-1 mb-3">Skills</h2>
                <p className="text-gray-800 text-sm">{resumeData.skills.filter(s => s.trim() !== '').join(' • ')}</p>
              </section>
            )}

            {resumeData.projects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 pb-1 mb-3">Projects</h2>
                {resumeData.projects.map((proj, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{proj.name}</h3>
                    <p className="text-gray-800 text-sm mt-1 whitespace-pre-wrap">{proj.description}</p>
                    {proj.link && (
                      <p className="text-blue-700 hover:underline text-xs mt-1">
                        <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        );
      case 'creative':
        return (
          <div className="font-sans bg-white shadow-xl rounded-lg overflow-hidden max-w-3xl mx-auto my-8 flex">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-gray-800 text-white p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{resumeData.personal.name || 'Your Name'}</h2>
                <p className="text-gray-400 text-sm">{resumeData.personal.summary || 'Aspiring Professional'}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">Contact</h3>
                <p className="text-sm mb-1">{resumeData.personal.email}</p>
                <p className="text-sm mb-1">{resumeData.personal.phone}</p>
                <p className="text-sm mb-1">{resumeData.personal.address}</p>
                {resumeData.personal.linkedin && (
                  <p className="text-sm mb-1">
                    <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
                  </p>
                )}
                {resumeData.personal.github && (
                  <p className="text-sm mb-1">
                    <a href={resumeData.personal.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub</a>
                  </p>
                )}
              </div>

              {resumeData.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">Skills</h3>
                  <ul className="list-none p-0">
                    {resumeData.skills.filter(s => s.trim() !== '').map((skill, index) => (
                      <li key={index} className="text-sm mb-1">{skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {resumeData.education.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">Education</h3>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <p className="font-medium text-sm">{edu.degree}</p>
                      <p className="text-xs text-gray-400">{edu.institution}</p>
                      <p className="text-xs text-gray-400">{edu.year}</p>
                      <p className="text-xs mt-1 whitespace-pre-wrap">{edu.details}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className="w-2/3 p-8">
              {resumeData.summary && (
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">Profile</h2>
                  <p className="text-gray-700 leading-relaxed text-sm">{resumeData.summary}</p>
                </section>
              )}

              {resumeData.experience.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">Experience</h2>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                        <span className="text-sm text-gray-600">{exp.duration}</span>
                      </div>
                      <p className="text-md text-gray-700 italic">{exp.company}</p>
                      <p className="text-gray-700 text-sm mt-1 whitespace-pre-wrap">{exp.description}</p>
                    </div>
                  ))}
                </section>
              )}

              {resumeData.projects.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">Projects</h2>
                  {resumeData.projects.map((proj, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{proj.name}</h3>
                      <p className="text-gray-700 text-sm mt-1 whitespace-pre-wrap">{proj.description}</p>
                      {proj.link && (
                        <p className="text-blue-600 hover:underline text-xs mt-1">
                          <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link}</a>
                        </p>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center text-gray-600 p-8">
            <p>No template selected or template not found. Please go back and select a template.</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Resume Preview</h2>

      <div className="flex justify-center mb-6 space-x-4">
        <Button onClick={onBack} variant="secondary">
          Edit Details
        </Button>
        <Button onClick={generatePdf} disabled={loadingPdf}>
          {loadingPdf ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        {/* This div will be converted to PDF */}
        <div ref={resumeRef} className="bg-white rounded-lg overflow-hidden">
          {renderResumeContent()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;