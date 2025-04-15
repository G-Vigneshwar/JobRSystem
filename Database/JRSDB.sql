drop database job_recruitment;
CREATE DATABASE job_recruitment;

USE job_recruitment;
-- User Table
CREATE TABLE Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100),
    location VARCHAR(100),
    industry VARCHAR(50)
);

CREATE TABLE Applicant (
    applicant_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100),
    education VARCHAR(200),
    experience TEXT,
    resume_link VARCHAR(255),
    CV_link VARCHAR(255),
    other_link VARCHAR(255),
    contact_number VARCHAR(20)
);

/*
DROP TABLE Resume;
DROP TABLE Cover_Letter;
CREATE TABLE Resume (
    resume_id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    file_size INT,
    file_type VARCHAR(50)
);

CREATE TABLE Cover_Letter (
    cover_letter_id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    file_size INT,
    file_type VARCHAR(50)
);
*/

CREATE TABLE Job_Posting (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    title VARCHAR(100),
    description TEXT,
    location VARCHAR(100),
    salary_min DECIMAL(10, 2),
    salary_max DECIMAL(10, 2),
    posted_date DATE,
    skills_required TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (admin_id) REFERENCES Admin(admin_id) ON DELETE CASCADE
);

CREATE TABLE Application (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    applicant_id INT,
    application_date DATE,
    status ENUM('Submitted', 'Reviewed', 'Interviewed', 'Offered', 'Rejected'),
    FOREIGN KEY (job_id) REFERENCES Job_Posting(job_id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES Applicant(applicant_id) ON DELETE CASCADE
);

CREATE TABLE Skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(50)
);

CREATE TABLE Applicant_Skills (
    applicant_id INT,
    skill_id INT,
    PRIMARY KEY (applicant_id, skill_id),
    FOREIGN KEY (applicant_id) REFERENCES Applicant(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id) ON DELETE CASCADE
);