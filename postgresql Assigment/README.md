# l2a7-postgresql-assignment-Ujjalzaman

1. What is PostgreSQL?

PostgreSQL is an advanced, enterprise-class, and open-source relational database system.it's called DBMS which is stand for Database Management System.

2.What is the purpose of a database schema in PostgreSQL?

The PostgreSQL Schema  defines the logical structure and storage of data within the database. It contains all the tables, data types, indexes, functions, stored procedures, and everything related. One can define the different Schema in a database for different people accessing the application to avoid conflicts and unnecessary interference.

3.Explain the primary key and foreign key concepts in PostgreSQL.
Primary table -Primary key is a column in a table that uniquely identifies each row in the table.Only one primary key is allowed in a table.

ForeignKey - PostgreSQL foreign key maintains the referential integrity concepts with the two related tables.

4. What is the difference between the VARCHAR and CHAR data types?
CHAR the fixed-length character data type - the size is fixed that's why if we have defined 255 character and store only 50 character it's will take all the spaces.

VARCHAR the variable-length character data type (n) it's taking maximum of size

5. Explain the purpose of the WHERE clause in a SELECT statement.

The SQL WHERE clause is used to specify a condition while fetching the data from single table or joining with multiple tables.

You would use WHERE clause to filter the records and fetching only necessary records.
The WHERE clause is not only used in SELECT statement, but it is also used in UPDATE, DELETE statement, etc.

6.What are the LIMIT and OFFSET clauses used for?

The LIMIT row_count determines the number of rows (row_count) returned by the query.
The OFFSET offset clause skips the offset rows before beginning to return the rows.

7. How can you perform data modification using UPDATE statements?

To optimize update operations, we should keep the transaction size as short as possible
We need to consider the lock escalation mode of the modified table to minimize the usage of too many resources

8. What is the significance of the JOIN operation, and how does it work in PostgreSQL?

JOINS used to combine rows from two or more tables, based on a related column between those tables.  There are used when a user is trying to extract data from tables which have one-to-many or many-to-many relationships between them.

9. Explain the GROUP BY clause and its role in aggregation operations?

SQL allows the user to store more than 30 types of data in as many columns as required, so sometimes, it becomes difficult to find similar data in these columns. Group By in SQL helps us club together identical rows present in the columns of a table.

10. How can you calculate aggregate functions like COUNT, SUM, and AVG in PostgreSQL?

Aggregate functions perform a calculation on a set of rows and return a single row.
AVG() – return the average value.
COUNT() – return the number of values.
SUM() – return the sum of all or distinct values.

11. What is the purpose of an index in PostgreSQL, and how does it optimize query performance? 
Indexing is using for performance optiomization.

12. Explain the concept of a PostgreSQL view and how it differs from a table ?
A table contains data, a view is just a SELECT statement which has been saved in the database.
The advantage of a view is that it can join data from several tables thus creating a new view of it. Say you have a database with salaries and you need to do some complex statistical queries on it.
Instead of sending the complex query to the database all the time, you can save the query as a view and then SELECT * FROM view