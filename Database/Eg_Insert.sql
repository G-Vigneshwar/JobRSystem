USE job_recruitment;

-- Insert Admin records
INSERT INTO Admin (company_name, location, industry) VALUES
('Tech Solutions Inc.', 'New York, NY', 'Technology'),
('Healthcare Plus', 'Boston, MA', 'Healthcare'),
('Financial Experts Ltd', 'Chicago, IL', 'Finance'),
('Green Energy Co', 'San Francisco, CA', 'Energy');

-- Insert Applicant records
INSERT INTO Applicant (full_name, email, education, experience, resume_link, CV_link, other_link, contact_number) VALUES
('John Doe', 'john.doe@email.com', 'Bachelor in Computer Science', '5 years software development experience', 
 'https://storage/resume/john_doe.pdf', 'https://storage/cv/john_doe.pdf', 'https://github.com/johndoe', '+1-234-567-8901'),
('Jane Smith', 'jane.smith@email.com', 'Master in Data Science', '3 years data analyst experience', 
 'https://storage/resume/jane_smith.pdf', 'https://storage/cv/jane_smith.pdf', 'https://linkedin.com/in/janesmith', '+1-234-567-8902'),
('Bob Wilson', 'bob.wilson@email.com', 'Bachelor in Business Administration', '4 years project management experience', 
 'https://storage/resume/bob_wilson.pdf', 'https://storage/cv/bob_wilson.pdf', 'https://portfolio.com/bobwilson', '+1-234-567-8903'),
('Alice Brown', 'alice.brown@email.com', 'Master in Artificial Intelligence', '2 years ML engineer experience', 
 'https://storage/resume/alice_brown.pdf', 'https://storage/cv/alice_brown.pdf', 'https://github.com/alicebrown', '+1-234-567-8904');

-- Insert Skills records
INSERT INTO Skills (skill_name) VALUES
('Python'),
('Java'),
('SQL'),
('Project Management'),
('Machine Learning'),
('Data Analysis'),
('JavaScript'),
('Cloud Computing');

-- Insert Applicant_Skills records
INSERT INTO Applicant_Skills (applicant_id, skill_id) VALUES
(1, 1), -- John Doe knows Python
(1, 3), -- John Doe knows SQL
(1, 7), -- John Doe knows JavaScript
(2, 1), -- Jane Smith knows Python
(2, 5), -- Jane Smith knows Machine Learning
(2, 6), -- Jane Smith knows Data Analysis
(3, 4), -- Bob Wilson knows Project Management
(3, 3), -- Bob Wilson knows SQL
(4, 1), -- Alice Brown knows Python
(4, 5), -- Alice Brown knows Machine Learning
(4, 8); -- Alice Brown knows Cloud Computing

-- Insert Job_Posting records
INSERT INTO Job_Posting (admin_id, title, description, location, salary_min, salary_max, posted_date, skills_required, is_active) VALUES
(1, 'Senior Software Engineer', 'Looking for an experienced software engineer with strong Python and JavaScript skills.', 
 'New York, NY', 100000.00, 150000.00, '2024-01-15', 'Python, JavaScript, SQL', TRUE),
(1, 'Data Scientist', 'Seeking a data scientist with machine learning expertise.', 
 'New York, NY', 90000.00, 130000.00, '2024-01-16', 'Python, Machine Learning, Data Analysis', TRUE),
(2, 'Project Manager', 'Healthcare IT project manager needed for large-scale implementations.', 
 'Boston, MA', 85000.00, 120000.00, '2024-01-17', 'Project Management, Healthcare IT', TRUE),
(3, 'ML Engineer', 'Looking for an ML engineer with cloud computing experience.', 
 'Chicago, IL', 95000.00, 140000.00, '2024-01-18', 'Python, Machine Learning, Cloud Computing', TRUE);

-- Insert Application records
INSERT INTO Application (job_id, applicant_id, application_date, status) VALUES
(1, 1, '2024-01-20', 'Reviewed'),
(2, 2, '2024-01-21', 'Reviewed'),
(3, 3, '2024-01-22', 'Reviewed'),
(4, 4, '2024-01-23', 'Reviewed'),
(1, 2, '2024-01-24', 'Reviewed'),
(2, 4, '2024-01-25', 'Reviewed');

-- Verify data insertion
SELECT 'Admin count: ' as 'Table Check', COUNT(*) FROM Admin
UNION ALL
SELECT 'Applicant count: ', COUNT(*) FROM Applicant
UNION ALL
SELECT 'Skills count: ', COUNT(*) FROM Skills
UNION ALL
SELECT 'Applicant_Skills count: ', COUNT(*) FROM Applicant_Skills
UNION ALL
SELECT 'Job_Posting count: ', COUNT(*) FROM Job_Posting
UNION ALL
SELECT 'Application count: ', COUNT(*) FROM Application;