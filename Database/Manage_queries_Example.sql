-- 1. Add Admin Example
INSERT INTO Admin (company_name, location, industry) 
VALUES ('Innovate AI', 'Seattle, WA', 'Technology');

-- 2. Add Applicant Example
INSERT INTO Applicant (full_name, email, education, experience, resume_link, CV_link, other_link, contact_number)
VALUES ('Lisa Brown', 'lisa.brown@email.com', 'MS Computer Science', '7 years ML engineering', 
        'resume.com/lbrown', 'cv.com/lbrown', 'github.com/lbrown', '678-901-2345');

-- 3. Post New Job Example
INSERT INTO Job_Posting (admin_id, title, description, location, salary_min, salary_max, posted_date, skills_required, is_active)
VALUES (1, 'ML Engineer', 'Seeking experienced ML engineer for NLP projects', 'San Francisco, CA', 
        130000, 190000, CURDATE(), 'Python, Machine Learning, NLP', TRUE);

-- 4. View Posted Jobs (All Active Jobs)
SELECT 
    j.job_id,
    j.title,
    j.description,
    j.location,
    j.salary_min,
    j.salary_max,
    j.posted_date,
    j.skills_required,
    a.company_name,
    a.industry
FROM Job_Posting j
JOIN Admin a ON j.admin_id = a.admin_id
WHERE j.is_active = TRUE
ORDER BY j.posted_date DESC;

-- 5. Search Jobs Example (searching for 'Python' in all fields)
SELECT 
    j.job_id,
    j.title,
    j.description,
    j.location,
    j.salary_min,
    j.salary_max,
    j.posted_date,
    j.skills_required,
    a.company_name,
    a.industry
FROM Job_Posting j
JOIN Admin a ON j.admin_id = a.admin_id
WHERE j.is_active = TRUE
AND (
    j.title LIKE '%Python%' OR
    a.company_name LIKE '%Python%' OR
    j.location LIKE '%Python%' OR
    j.skills_required LIKE '%Python%'
)
ORDER BY j.posted_date DESC;

-- 6. Filter Jobs Example (specific location and salary range)
SELECT 
    j.job_id,
    j.title,
    j.description,
    j.location,
    j.salary_min,
    j.salary_max,
    j.posted_date,
    j.skills_required,
    a.company_name,
    a.industry
FROM Job_Posting j
JOIN Admin a ON j.admin_id = a.admin_id
WHERE j.is_active = TRUE
AND (j.location = 'San Francisco, CA')
AND (a.industry = 'Technology')
AND (j.salary_min >= 100000)
AND (j.salary_max <= 200000)
ORDER BY j.posted_date DESC;

-- 7. Apply for Jobs Example
INSERT INTO Application (job_id, applicant_id, application_date, status)
VALUES (1, 3, CURDATE(), 'Reviewed');

-- 8. View Applications with Applicant Skills Example (for admin_id = 1)
SELECT 
    app.application_id,
    app.application_date,
    app.status,
    j.title AS job_title,
    j.location AS job_location,
    a.company_name,
    ap.full_name AS applicant_name,
    ap.email,
    ap.education,
    ap.experience,
    ap.resume_link,
    ap.CV_link,
    GROUP_CONCAT(s.skill_name) AS skills
FROM Application app
JOIN Job_Posting j ON app.job_id = j.job_id
JOIN Admin a ON j.admin_id = a.admin_id
JOIN Applicant ap ON app.applicant_id = ap.applicant_id
LEFT JOIN Applicant_Skills aps ON ap.applicant_id = aps.applicant_id
LEFT JOIN Skills s ON aps.skill_id = s.skill_id
WHERE j.admin_id = 1
GROUP BY app.application_id;

-- 9. Update Application Status Example
UPDATE Application 
SET status = 'reviewed'
WHERE application_id = 1;
-- 10. View Application Status Example (for applicant_id = 1)
SELECT 
    a.application_id,
    j.title,
    ad.company_name,
    a.application_date,
    a.status
FROM Application a
JOIN Job_Posting j ON a.job_id = j.job_id
JOIN Admin ad ON j.admin_id = ad.admin_id
WHERE a.applicant_id = 1
ORDER BY a.application_date DESC;

-- 11. Manage Admins Examples
-- 11.1 View All Admins
SELECT * FROM Admin;

-- 11.2 Update Admin Example
UPDATE Admin 
SET company_name = 'Tech Solutions International',
    location = 'San Francisco, CA',
    industry = 'Technology'
WHERE admin_id = 1;

-- 11.3 Delete Admin Example
DELETE FROM Admin WHERE admin_id = 5;

-- 12. Update Applicant Profile Example
UPDATE Applicant 
SET full_name = 'John Smith Jr',
    email = 'john.smith.jr@email.com',
    education = 'MS Computer Science',
    experience = '6 years software development',
    resume_link = 'resume.com/jsmith_jr',
    CV_link = 'cv.com/jsmith_jr',
    other_link = 'github.com/jsmith_jr',
    contact_number = '123-456-7891'
WHERE applicant_id = 1;

-- 13. Manage Applicant Skills Examples
-- 13.1 Add new skill
INSERT INTO Applicant_Skills (applicant_id, skill_id)
VALUES (1, 8);  -- Adding Machine Learning skill to John Smith

-- 13.2 Delete skill Example
DELETE FROM Applicant_Skills 
WHERE applicant_id = 1 AND skill_id = 2;  -- Remove JavaScript skill from John Smith

-- 13.3 View applicant's current skills Example
SELECT s.skill_id, s.skill_name
FROM Skills s
JOIN Applicant_Skills aps ON s.skill_id = aps.skill_id
WHERE aps.applicant_id = 1;

-- 13.4 Update all skills for an applicant Example
START TRANSACTION;
    -- Delete all current skills for John Smith
    DELETE FROM Applicant_Skills WHERE applicant_id = 1;
    
    -- Insert new skills for John Smith
    INSERT INTO Applicant_Skills (applicant_id, skill_id)
    VALUES 
    (1, 1),  -- Python
    (1, 3),  -- SQL
    (1, 8);  -- Machine Learning
COMMIT;