select * from Admin;
select * from Applicant;
select * from Applicant_Skills;
select * from Application;
select * from Job_Posting;
select * from Skills;

-- 1. Add Admins
INSERT INTO Admin (company_name, location, industry) 
VALUES (?, ?, ?);

-- 2. Add Applicant
INSERT INTO Applicant (full_name, email, education, experience, resume_link, CV_link, other_link, contact_number)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);

-- 3. Post New Job
INSERT INTO Job_Posting (admin_id, title, description, location, salary_min, salary_max, posted_date, skills_required, is_active)
VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?, TRUE);

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

-- 5. Search Jobs (by title, company, location or skills)
SELECT 
    j.job_id, j.title, j.description, j.location, j.salary_min, j.salary_max, j.posted_date, j.skills_required,
    a.company_name, a.industry
FROM Job_Posting j
JOIN Admin a ON j.admin_id = a.admin_id
WHERE j.is_active = TRUE
AND (
    j.title LIKE CONCAT('%', ?, '%') OR
    a.company_name LIKE CONCAT('%', ?, '%') OR
    j.location LIKE CONCAT('%', ?, '%') OR
    j.skills_required LIKE CONCAT('%', ?, '%')
)
ORDER BY j.posted_date DESC;

-- 6. Filter Jobs (multiple criteria)
SELECT 
    j.job_id, j.title, j.description, j.location, j.salary_min, j.salary_max, 
    j.posted_date, j.skills_required, a.company_name, a.industry
FROM Job_Posting j
JOIN Admin a ON j.admin_id = a.admin_id
WHERE j.is_active = TRUE
AND (? IS NULL OR j.location = ?)
AND (? IS NULL OR a.industry = ?)
AND (? IS NULL OR j.salary_min >= ?)
AND (? IS NULL OR j.salary_max <= ?)
ORDER BY j.posted_date DESC;

-- 7. Apply for Jobs
INSERT INTO Application (job_id, applicant_id, application_date, status)
VALUES (?, ?, CURDATE(), 'pending');

-- 8. View Applications with Applicant Skills
SELECT 
    app.application_id, app.application_date, app.status, j.title AS job_title, j.location AS job_location,
    a.company_name, ap.full_name AS applicant_name, ap.email, ap.education, ap.experience, ap.resume_link, ap.CV_link, GROUP_CONCAT(s.skill_name) AS skills
FROM Application app
JOIN Job_Posting j ON app.job_id = j.job_id
JOIN Admin a ON j.admin_id = a.admin_id
JOIN Applicant ap ON app.applicant_id = ap.applicant_id
LEFT JOIN Applicant_Skills aps ON ap.applicant_id = aps.applicant_id
LEFT JOIN Skills s ON aps.skill_id = s.skill_id
WHERE j.admin_id = ? 
GROUP BY app.application_id;

-- 9. Update Application Status
UPDATE Application 
SET status = ?
WHERE application_id = ?;

-- 10. View Application Status (for applicant)
SELECT 
    a.application_id,
    j.title,
    ad.company_name,
    a.application_date,
    a.status
FROM Application a
JOIN Job_Posting j ON a.job_id = j.job_id
JOIN Admin ad ON j.admin_id = ad.admin_id
WHERE a.applicant_id = ?
ORDER BY a.application_date DESC;

-- 11. Manage Admins
-- 11.1 View All Admins
SELECT * FROM Admin;

-- 11.2 Update Admin
UPDATE Admin 
SET company_name = ?,
    location = ?,
    industry = ?
WHERE admin_id = ?;

-- 11.3 Delete Admin (will cascade delete related jobs and applications)
DELETE FROM Admin WHERE admin_id = ?;

-- 12. Update Applicant Profile
UPDATE Applicant 
SET full_name = ?,
    email = ?,
    education = ?,
    experience = ?,
    resume_link = ?,
    CV_link = ?,
    other_link = ?,
    contact_number = ?
WHERE applicant_id = ?;

-- 13. Manage Applicant Skills
-- 13.1 Add new skill
INSERT INTO Applicant_Skills (applicant_id, skill_id)
VALUES (?, ?);

-- 13.2 Delete skill
DELETE FROM Applicant_Skills 
WHERE applicant_id = ? AND skill_id = ?;

-- 13.3 View applicant's current skills
SELECT s.skill_id, s.skill_name
FROM Skills s
JOIN Applicant_Skills aps ON s.skill_id = aps.skill_id
WHERE aps.applicant_id = ?;

-- 13.4 Update all skills for an applicant (transaction)
START TRANSACTION;
    -- Delete all current skills
    DELETE FROM Applicant_Skills WHERE applicant_id = ?;
    
    -- Insert new skills
    INSERT INTO Applicant_Skills (applicant_id, skill_id)
    VALUES (?, ?), (?, ?), (?, ?); -- Multiple pairs can be inserted
COMMIT;