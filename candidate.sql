-- Create database
CREATE DATABASE job_applications;
USE job_applications;

-- Main applications table
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    surname VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    job_category VARCHAR(100),
    password VARCHAR(255),
    address TEXT,
    country VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(100),
    place_of_birth VARCHAR(255),
    passport_number VARCHAR(50),
    gender VARCHAR(10),
    abroad_residence_address TEXT,
    
    -- Job specific fields
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    programming_languages TEXT,
    experience INT,
    medical_license VARCHAR(100),
    specialization VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Experiences table (for projects, work, qualifications, skills)
CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT,
    type VARCHAR(50), -- 'project', 'work', 'qualification', 'skill'
    skill_type VARCHAR(50), -- only for skills: 'technical', 'soft', 'language', 'certification'
    title VARCHAR(255),
    organization VARCHAR(255),
    start_date DATE,
    end_date DATE,
    reference TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_email ON applications(email);
CREATE INDEX idx_job_category ON applications(job_category);
CREATE INDEX idx_created_at ON applications(created_at);
CREATE INDEX idx_application_id ON experiences(application_id);
CREATE INDEX idx_experience_type ON experiences(type);