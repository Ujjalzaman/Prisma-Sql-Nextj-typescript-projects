CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    frontend_mark INT DEFAULT NULL,
    backend_mark INT DEFAULT NULL,
    status VARCHAR(50) DEFAULT NULL
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50) NOT NULL,
    credits INT
);

CREATE TABLE enrollment (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    CONSTRAINT fk_constraints_studentId FOREIGN KEY (student_id) REFERENCES students(student_id),
    CONSTRAINT fk_constraints_course_id FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO students (student_id, student_name, age, email, frontend_mark, backend_mark)
VALUES
    (1, 'Alice', 22, 'alice@gmail.com', 55, 51),
    (2, 'teslist', 22, 'teslist@gmail.com', 55, 41),
    (3, 'erf', 22, 'erf@gmail.com', 25, 31),
    (4, 'ojerg', 22, 'ojerg@gmail.com', 55, 52),
    (5, 'ljye', 22, 'ljye@gmail.com', 11, 58),
    (6, 'yers', 22, 'yers@gmail.com', 25, 45);

INSERT INTO courses (course_id, course_name, credits)
VALUES
    (1, 'Next.js', 3),
    (2, 'React.js', 4),
    (3, 'Databases', 3),
    (4, 'Prisma', 2),
    (5, 'Nest.js', 3),
    (6, 'Angular.js', 2);

INSERT INTO enrollment (enrollment_id, student_id, course_id)
VALUES
    (1, 1, 1),
    (2, 1, 1),
    (3, 2, 2),
    (4, 3, 1),
    (5, 1, 3),
    (6, 4, 2);

-- Query 1:
INSERT INTO students (student_id, student_name, age, email, frontend_mark, backend_mark)
VALUES (7, 'ujjal zaman', 26, 'ujjalzaman@gmail.com', 50, 55);


-- Query 2:
SELECT s.student_name from enrollment e
JOIN courses as c ON e.course_id = c.course_id
JOIN students as s on e.student_id = s.student_id WHERE c.course_name = 'Next.js';

-- Query 3:
UPDATE students SET status = 'Awarded' 
WHERE (frontend_mark + backend_mark) = (
    SELECT MAX (frontend_mark + backend_mark) from students
);

-- Query 4:
DELETE from courses WHERE course_id NOT IN (
    SELECT DISTINCT course_id from enrollment
);

-- Query 5:
SELECT * FROM students ORDER BY student_id LIMIT 2 OFFSET 2;

-- Query 6:
SELECT c.course_name, COUNT(e.student_id) as student FROM courses as c
JOIN enrollment as e ON e.course_id = c.course_id GROUP BY c.course_name;

-- Query 7:
SELECT AVG(age) AS student_average_age from students GROUP BY age;

-- Query 8
SELECT * from students WHERE email LIKE '%alice@gmail.com%';
